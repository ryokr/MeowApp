$RepoURLs = @(
   "https://github.com/ryokr/MeowBot.git",
   "https://github.com/Pooba-Saga/MeowBot1.git",
   "https://github.com/Pooba-Saga/MeowBot2.git"
)

if ($args.Count -eq 0) {
   Write-Host "No argument provided"
   exit
}

$arg = [int]$args[0]
if ($arg -lt 0 -or $arg -ge $RepoURLs.Count) {
   Write-Host "Invalid argument. Please provide a valid numeric argument (0, 1, or 2)."
   exit
}

$SelectedRepoURL = $RepoURLs[$arg]
$RepoName = ($SelectedRepoURL -split "/")[-1] -replace "\.git$", ""

$Local = Get-Location
$Repo = Join-Path $Local "..\$RepoName"
$Parent = Get-Item -Path ".."

Set-Location -Path $Parent
git clone $SelectedRepoURL
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