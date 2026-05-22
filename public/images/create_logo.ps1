@"
Add-Type -AssemblyName System.Drawing

# Create a new Bitmap
$bitmap = [System.Drawing.Bitmap]::new(200, 200)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Fill background
$graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(0, 31, 63)), 0, 0, 200, 200)

# Draw navy circle
$pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(14, 165, 233), 3)
$graphics.DrawEllipse($pen, 5, 5, 190, 190)

# Bear head - brown circle
$brownBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(139, 115, 85))
$graphics.FillEllipse($brownBrush, 75, 60, 50, 50)

# Ears
$graphics.FillEllipse($brownBrush, 60, 45, 15, 15)
$graphics.FillEllipse($brownBrush, 125, 45, 15, 15)

# Eyes - white
$whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$graphics.FillEllipse($whiteBrush, 80, 75, 8, 8)
$graphics.FillEllipse($whiteBrush, 112, 75, 8, 8)

# Eyes - black pupils
$blackBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::Black)
$graphics.FillEllipse($blackBrush, 82, 77, 5, 5)
$graphics.FillEllipse($blackBrush, 114, 77, 5, 5)

# Nose
$graphics.FillEllipse($blackBrush, 96, 90, 8, 6)

# Text "B" on badge
$font = [System.Drawing.Font]::new("Arial", 16, [System.Drawing.FontStyle]::Bold)
$stringBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$graphics.DrawString("B", \$font, \$stringBrush, 130, 120)

# Save PNG
\$bitmap.Save("logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
\$bitmap.Dispose()
\$graphics.Dispose()

Write-Host "logo.png created successfully"
"@ | Out-File -FilePath temp.ps1 -Encoding UTF8

powershell -ExecutionPolicy Bypass -File temp.ps1
del temp.ps1
