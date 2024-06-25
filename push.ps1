$Source = Get-Location
$Destination = Join-Path $Source "..\MeowBot"
$ParentDir = Get-Item -Path ".."

$RepoURL = "https://github.com/ryokr/MeowBot.git"

Set-Location -Path $ParentDir
git clone $RepoURL
Set-Location -Path $Source

Get-ChildItem -Path $Destination -Exclude ".git" | Remove-Item -Recurse -Force
robocopy $Source $Destination /E /XD "$Source\node_modules" /XF "package-lock.json" ".env"

Set-Location -Path $Destination
git add .
git commit -S -m 'Meow'
git push origin
Set-Location -Path $Source

Remove-Item -Path $Destination -Recurse -Force
clear