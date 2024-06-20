$Source = Get-Location
$Destination = Join-Path $Source "..\MeowBot"

Get-ChildItem -Path $Destination -Exclude ".git" | Remove-Item -Recurse -Force
robocopy $Source $Destination /E /XD "$Source\node_modules" /XF "package-lock.json" ".env"

Set-Location -Path $Destination
git add --all
git commit -S -m 'Meow'
git push -u origin main
Set-Location -Path $Source