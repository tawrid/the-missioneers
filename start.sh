#!/usr/bin/env bash
# Quick Start Script for Astraea: NASA Space Mission Design Game

cd "$(dirname "$0")"

# Locate suitable python3
if [ -x "/opt/homebrew/bin/python3" ]; then
    PYTHON_BIN="/opt/homebrew/bin/python3"
elif command -v python3 >/dev/null 2>&1; then
    PYTHON_BIN="python3"
else
    echo "❌ Error: Python 3 not found!"
    exit 1
fi

echo "============================================================"
echo "🚀 Starting Astraea // NASA Space Mission Design Game"
echo "📡 Server running at: http://localhost:8080"
echo "🤖 Connect LM Studio at: http://localhost:1234/v1"
echo "============================================================"

# Launch the server
"$PYTHON_BIN" server.py
