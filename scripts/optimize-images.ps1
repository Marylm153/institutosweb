param(
  [string]$Path = "Assets/images/institutos",
  [int]$MaxSize = 1400,
  [int]$Quality = 76
)

Add-Type -AssemblyName System.Drawing

$root = Resolve-Path -LiteralPath $Path
$files = Get-ChildItem -LiteralPath $root -Recurse -File -Include *.jpg, *.jpeg
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

$before = 0
$after = 0

foreach ($file in $files) {
  $before += $file.Length
  $image = [System.Drawing.Image]::FromFile($file.FullName)
  try {
    $ratio = [Math]::Min(1, $MaxSize / [Math]::Max($image.Width, $image.Height))
    $width = [int]($image.Width * $ratio)
    $height = [int]($image.Height * $ratio)
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($image, 0, 0, $width, $height)
    $graphics.Dispose()

    $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

    $temp = "$($file.FullName).tmp.jpg"
    $bitmap.Save($temp, $encoder, $parameters)
    $bitmap.Dispose()
    $image.Dispose()
    Move-Item -LiteralPath $temp -Destination $file.FullName -Force
    $after += (Get-Item -LiteralPath $file.FullName).Length
  } catch {
    if ($image) { $image.Dispose() }
    Write-Warning "No se pudo optimizar $($file.Name): $_"
  }
}

Write-Output ("Archivos: {0}" -f $files.Count)
Write-Output ("Antes:  {0:N1} MB" -f ($before / 1MB))
Write-Output ("Despues: {0:N1} MB" -f ($after / 1MB))
