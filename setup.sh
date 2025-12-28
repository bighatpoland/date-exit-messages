#!/usr/bin/env bash
set -euo pipefail

echo "Running setup for Oh No, Emergency!"
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed or not in PATH. Please install Node.js (which includes npm) and re-run this script."
  exit 2
fi

echo "Installing dependencies..."
npm install

echo "Type-checking (tsc)..."
npx tsc --noEmit

echo "Running tests (vitest)..."
npm run test --silent || true

echo "Setup complete. To start the dev server run: npm run dev"

# Note: The script intentionally does not start the dev server automatically so you can review output first.
