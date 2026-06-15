$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WikiDir = Join-Path $ProjectRoot "wiki"
$ReportPath = Join-Path $ProjectRoot "logs\wiki-health-report.md"
$Now = Get-Date

$WikiFiles = @()
foreach ($subdir in @("concepts", "pages")) {
    $path = Join-Path $WikiDir $subdir
    if (Test-Path -LiteralPath $path) {
        $WikiFiles += Get-ChildItem -LiteralPath $path -Filter "*.md" -Recurse
    }
}

function Get-Field {
    param([string]$Text, [string]$Name, [string]$Default = "")
    $match = [regex]::Match($Text, "(?m)^$([regex]::Escape($Name)):\s*(.+)$")
    if ($match.Success) { return $match.Groups[1].Value.Trim().Trim('"') }
    return $Default
}

$Rows = New-Object System.Collections.Generic.List[string]
$Rows.Add("| Page | Type | Review | Quality | Confidence | Stale | Issues |")
$Rows.Add("| --- | --- | --- | --- | --- | --- | --- |")

$NeedsReview = 0
$MissingSources = 0
$MissingEvidence = 0
$Stale = 0

foreach ($file in $WikiFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    $type = Get-Field $content "type" "unknown"
    $review = Get-Field $content "review_status" "missing"
    $quality = Get-Field $content "quality_class" "missing"
    $confidence = Get-Field $content "confidence" "missing"
    $staleField = Get-Field $content "stale" "missing"
    $issues = New-Object System.Collections.Generic.List[string]

    if ($review -eq "needs_review" -or $content -match "NEEDS_REVIEW") { $NeedsReview += 1; $issues.Add("review") }
    if ($content -notmatch "sources:\s*`r?`n\s*- ") { $MissingSources += 1; $issues.Add("source") }
    if ($content -notmatch "## Evidence Map") { $MissingEvidence += 1; $issues.Add("evidence") }
    if ($staleField -eq "true") { $Stale += 1; $issues.Add("stale") }

    $issueText = if ($issues.Count -eq 0) { "ok" } else { $issues -join ", " }
    $rel = (Resolve-Path -LiteralPath $file.FullName -Relative).Replace('\', '/')
    $Rows.Add("| [$($file.BaseName)]($rel) | $type | $review | $quality | $confidence | $staleField | $issueText |")
}

$Report = @(
    "# Wiki Health Report",
    "",
    "Generated: $($Now.ToString("yyyy-MM-dd HH:mm:ss zzz"))",
    "",
    "## Summary",
    "",
    "- Total pages: $($WikiFiles.Count)",
    "- Needs review: $NeedsReview",
    "- Stale pages: $Stale",
    "- Missing sources: $MissingSources",
    "- Missing evidence map: $MissingEvidence",
    "",
    "## Page Table",
    "",
    ($Rows -join [Environment]::NewLine),
    "",
    "File updated at: $($Now.ToString("yyyy-MM-dd HH:mm:ss zzz"))"
)

Set-Content -LiteralPath $ReportPath -Value ($Report -join [Environment]::NewLine) -Encoding UTF8
Write-Output "Wrote $ReportPath"
