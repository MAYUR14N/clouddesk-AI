$ErrorActionPreference = 'Stop'

Write-Host "Running static analysis..."

# 1. ESLint import and syntax check (if ESLint config exists)
if (Test-Path .\frontend\.eslintrc.js) {
  npx eslint .\frontend --ext .js,.jsx,.ts,.tsx | Tee-Object -Variable eslintOutput
}

# 2. TypeScript type check (if tsconfig exists)
if (Test-Path .\frontend\tsconfig.json) {
  npx tsc --noEmit | Tee-Object -Variable tscOutput
}

# 3. Prisma schema validation and client generation
if (Test-Path .\backend\prisma\schema.prisma) {
  npx prisma validate --schema .\backend\prisma\schema.prisma
  npx prisma generate --schema .\backend\prisma\schema.prisma
}

# 4. Try to start backend (without listening forever) to catch import errors
Write-Host "Testing backend start..."
$backendProc = Start-Process -FilePath "cmd" -ArgumentList "/c", "npm run dev" -WorkingDirectory "${PWD}\backend" -PassThru -NoNewWindow
Start-Sleep -Seconds 5
if ($backendProc.HasExited) {
  Write-Host "Backend failed to start."
} else {
  Write-Host "Backend started successfully (temporary)."
  Stop-Process $backendProc
}

Write-Host "Static analysis completed."
