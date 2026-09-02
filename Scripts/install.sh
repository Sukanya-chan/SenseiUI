#!/usr/bin/env bash
set -e
echo "[SenseiUI] Installing prerequisites..."
sudo apt update
sudo apt install -y nodejs npm build-essential python3
echo "[SenseiUI] Installing Node dependencies..."
npm install
echo "[SenseiUI] Installation complete."
echo "Run: npm start"
