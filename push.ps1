$RepoURLs = @(
   "https://github.com/Pooba-Saga/MeowBot-Ei",
   "https://github.com/ryokr/MeowBot"
)
$Local = Get-Location
$Parent = Get-Item -Path ".."

foreach ($RepoURL in $RepoURLs) {
   $RepoName = ($RepoURL -split "/")[-1]
   $Repo = Join-Path $Local "..\$RepoName"

   Set-Location -Path $Parent
   git clone $RepoURL
   Set-Location -Path $Local

   Get-ChildItem -Path $Repo -Exclude ".git" | Remove-Item -Recurse -Force
   if ($RepoName -eq "MeowBot") {
      robocopy $Local $Repo /E /XD "$Local\node_modules" /XF ".env" "package-lock.json" 
   } else {
      robocopy $Local $Repo /E /XD "$Local\node_modules" "$Local\.github" /XF ".env" ".prettierrc" "CODE_OF_CONDUCT.md" "CONTRIBUTING.md" "LICENSE" "README.md" "SECURITY.md" "package-lock.json"
   }

   Set-Location -Path $Repo
   git add .
   git commit -S -m 'From Ryo.o With ❤️‍🔥'
   git push origin
   Set-Location -Path $Local

   Remove-Item -Path $Repo -Recurse -Force
}
clear