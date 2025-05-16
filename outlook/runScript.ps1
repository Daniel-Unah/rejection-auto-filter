$outlook = New-Object -ComObject Outlook.Application
$namespace = $outlook.GetNamespace("MAPI")
$inbox = $namespace.GetDefaultFolder(6)  

$rejectionsFolder = $namespace.Folders | Where-Object { $_.Name -eq "Rejections" }
if (!$rejectionsFolder) {
  $rejectionsFolder = $namespace.Folders.Add("Rejections")
}

$cutoffDate = (Get-Date).AddHours(-24)
$emails = $inbox.Items | Where-Object { $_.ReceivedTime -ge $cutoffDate }

$keywords = @(
  "unfortunately", "regret to inform", "not moving forward",
  "after careful consideration", "we’ve decided to proceed"
)

$emails | ForEach-Object {
  $subject = $_.Subject.ToLower()
  $body = $_.Body.ToLower()
  $isRejection = $keywords | Where-Object { $subject -match $_ -or $body -match $_ }

  if ($isRejection) {
    $_.Move($rejectionsFolder) | Out-Null
    Write-Host "Moved: $($_.Subject)"
  }
}