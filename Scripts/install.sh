#!/usr/bin/env bash
set -e
echo "[SenseiAI] Installing prerequisites..."
sudo apt update
sudo apt install -y nodejs npm build-essential python3
echo "[SenseiAI] Installing Node dependencies..."
npm install
echo "[SenseiAI] Installation complete."
echo "Run: npm start"
