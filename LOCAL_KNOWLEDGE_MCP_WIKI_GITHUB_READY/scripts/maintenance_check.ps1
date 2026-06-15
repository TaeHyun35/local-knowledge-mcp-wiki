$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WikiDir = Join-Path $ProjectRoot "wiki"
$LogPath = Join-Path $ProjectRoot "logs\maintenance-log.md"
$Now = Get-Date

$BlockingIssues = New-Object System.Collections.Generic.List[string]
$ReviewQueue = New-Object System.Collections.Generic.List[string]
$WikiFiles = @()
foreach ($subdir in @("concepts", "pages")) {
    $path = Join-Path $WikiDir $subdir
    if (Test-Path -LiteralPath $path) {
        $WikiFiles += Get-ChildItem -LiteralPath $path -Filter "*.md" -Recurse
    }
}

foreach ($file in $WikiFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    $relative = Resolve-Path -LiteralPath $file.FullName -Relative

    if ($content -match "NEEDS_REVIEW") {
        $ReviewQueue.Add("review-needed | $relative")
    }

    foreach ($field in @("type:", "status:", "quality_class:", "review_status:", "confidence:", "source_count:", "sources:", "stale:")) {
        if ($content -notmatch [regex]::Escape($field)) {
            $BlockingIssues.Add("missing-field | $relative -> $field")
        }
    }

    if ($content -notmatch "## Evidence Map") {
        $BlockingIssues.Add("missing-evidence-map | $relative")
    }

    if ($content -match "(?m)^type:\s*risk\s*$" -and $content -notmatch "related_controls:\s*`r?`n\s*- ") {
        $BlockingIssues.Add("risk-without-control | $relative")
    }

    if ($content -match "(?m)^type:\s*control\s*$" -and $content -notmatch "mitigates:\s*`r?`n\s*- ") {
        $BlockingIssues.Add("control-without-risk | $relative")
    }

    $links = [regex]::Matches($content, "\[\[([^\]|#]+)")
    foreach ($link in $links) {
        $target = $link.Groups[1].Value
        $basename = Split-Path -Leaf $target
        $basename = $basename -replace "\.md$", ""
        $found = $WikiFiles | Where-Object { $_.BaseName -eq $basename } | Select-Object -First 1
        if (-not $found) {
            $BlockingIssues.Add("broken-wikilink | $relative -> $target")
        }
    }
}

$LogContent = Get-Content -LiteralPath $LogPath -Raw -Encoding UTF8
if ($BlockingIssues.Count -eq 0) {
    $Summary = "- $($Now.ToString("yyyy-MM-dd HH:mm:ss zzz")) | blocking issues: 0 | review queue: $($ReviewQueue.Count)"
} else {
    $Summary = "- $($Now.ToString("yyyy-MM-dd HH:mm:ss zzz")) | blocking issues: $($BlockingIssues.Count) | review queue: $($ReviewQueue.Count)`r`n"
    foreach ($issue in $BlockingIssues) {
        $Summary += "  - $issue`r`n"
    }
}
$LogContent = $LogContent -replace "<!-- MAINTENANCE_LOG_START -->", "<!-- MAINTENANCE_LOG_START -->`r`n$Summary"
Set-Content -LiteralPath $LogPath -Value $LogContent -Encoding UTF8

if ($BlockingIssues.Count -eq 0) {
    Write-Output "Maintenance check passed."
    Write-Output "Blocking issues: 0"
    Write-Output "Review queue: $($ReviewQueue.Count)"
} else {
    Write-Output "Maintenance check found $($BlockingIssues.Count) blocking issue(s):"
    $BlockingIssues | ForEach-Object { Write-Output "- $_" }
    Write-Output "Review queue: $($ReviewQueue.Count)"
}
