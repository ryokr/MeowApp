$Local = Get-Location
$Parent = Get-Item -Path ".."

$RepoURLs = @(
   "https://github.com/ryokr/MeowBot.git",
   "https://github.com/Pooba-Saga/MeowBot1.git",
   "https://github.com/Pooba-Saga/MeowBot2.git"
)

# Loop through each URL
foreach ($RepoURL in $RepoURLs) {
   # Extract the repo name from the URL
   $RepoName = $RepoURL.Split('/')[-1].Replace('.git', '')
   $RepoPath = Join-Path $Parent.FullName $RepoName

   # Clone the repository
   Set-Location -Path $Parent
   git clone $RepoURL
   Set-Location -Path $Local

   # Remove existing content in the cloned repo (except .git)
   Get-ChildItem -Path $RepoPath -Exclude ".git" | Remove-Item -Recurse -Force

   # Copy content from local to the cloned repo (excluding specific files and folders)
   robocopy $Local $RepoPath /E /XD "$Local\node_modules" /XF "package-lock.json" ".env"

   # Commit and push changes to the cloned repo
   Set-Location -Path $RepoPath
   git add .
   git commit -S -m 'From Ryo.o With ❤️‍🔥'
   git push origin

   # Clean up by removing the cloned repo
   Remove-Item -Path $RepoPath -Recurse -Force
}

# Clear the screen
clear
