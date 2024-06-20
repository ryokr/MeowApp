$sourceDir = (Get-Location).Path
$parentDir = (Get-Item $sourceDir).Parent.FullName
$destDir = Join-Path $parentDir "MeowBot"
$excludeList = @("node_modules", "package-lock.json", ".env")

function ShouldExclude {
   param (
      [string]$path,
      [string[]]$exclusions
   )

   foreach ($exclude in $exclusions) {
      if ($path -like "*\$exclude*") {
         return $true
      }
   }
   return $false
}

Get-ChildItem -Path $destDir -Recurse -Force | Remove-Item -Recurse -Force

Get-ChildItem -Path $sourceDir -Recurse -Force | ForEach-Object {
   $relativePath = $_.FullName -replace [regex]::Escape($sourceDir), ""
   $destPath = Join-Path $destDir $relativePath

   if (-not (ShouldExclude -path $_.FullName -exclusions $excludeList)) {
      if ($_.PSIsContainer) {
         New-Item -Path $destPath -ItemType Directory -Force
      } else {
         Copy-Item -Path $_.FullName -Destination $destPath -Force
      }
   }
}

Set-Location $destDir

git add --all
git commit -S -m 'Meow'
git push -u origin main

Set-Location $sourceDir