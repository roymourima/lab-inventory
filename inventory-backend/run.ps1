# Setup FastAPI Backend
Write-Host "Installing dependencies..." -ForegroundColor Cyan
pip install -r requirements.txt

Write-Host "Seeding database..." -ForegroundColor Cyan
python seed.py

Write-Host "Starting FastAPI server..." -ForegroundColor Cyan
python main.py
