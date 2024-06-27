$Local = Get-Location
$Repo = Join-Path $Local "..\MeowBot"
$Parent = Get-Item -Path ".."

$RepoURL = "https://github.com/ryokr/MeowBot.git"

Set-Location -Path $Parent
git clone $RepoURL
Set-Location -Path $Local

Get-ChildItem -Path $Repo -Exclude ".git" | Remove-Item -Recurse -Force
robocopy $Local $Repo /E /XD "$Local\node_modules" /XF "package-lock.json" ".env"

Set-Location -Path $Repo
git add .
git commit -S -m 'From Ryo.o With ❤️‍🔥'
git push origin
Set-Location -Path $Local

Remove-Item -Path $Repo -Recurse -Force
clear