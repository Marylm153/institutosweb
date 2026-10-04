param(
  [string]$Branch = "pages",
  [string]$Remote = "origin"
)

# Publica el sitio compilado (dist/) en el branch de Codeberg Pages.
# El branch de Pages debe contener SOLO el build, nunca el codigo fuente.
# Uso: powershell -File scripts/publish-pages.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$previous = Get-Location

Push-Location $root
try {
  Write-Output "Compilando el sitio..."
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "Fallo la compilacion (npm run build)." }

  $dist = Join-Path $root "dist"
  if (-not (Test-Path -LiteralPath $dist)) { throw "No existe dist/." }

  $wt = Join-Path $env:TEMP "institutos-pages-worktree"
  if (Test-Path -LiteralPath $wt) {
    git worktree remove --force $wt 2>$null
    if (Test-Path -LiteralPath $wt) { Remove-Item -Recurse -Force $wt }
  }

  git worktree add --force $wt $Branch | Out-Host
  if ($LASTEXITCODE -ne 0) { throw "No se pudo preparar el worktree del branch '$Branch'." }

  git -C $wt rm -r --quiet .
  Copy-Item -Path (Join-Path $dist "*") -Destination $wt -Recurse -Force
  git -C $wt add -A

  git -C $wt diff --cached --quiet
  if ($LASTEXITCODE -ne 0) {
    git -C $wt commit -m "Publicar sitio compilado en Codeberg Pages" | Out-Null
    git -C $wt push $Remote $Branch
    if ($LASTEXITCODE -ne 0) {
      throw "El push a $Remote/$Branch fallo. Verifica tus credenciales de Codeberg (token con permiso de escritura) e intentalo de nuevo."
    }
    Write-Output "Publicado en $Remote/$Branch."
  } else {
    Write-Output "Sin cambios: el branch '$Branch' ya esta actualizado."
  }
} finally {
  if ($wt -and (Test-Path -LiteralPath $wt)) { git worktree remove --force $wt 2>$null }
  Set-Location $previous
}
