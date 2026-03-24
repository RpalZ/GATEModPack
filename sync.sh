#!/bin/bash

# --- CONFIGURATION ---
# The "Live" folder where you are playing/modding
GAME_DIR="$HOME/.var/app/org.prismlauncher.PrismLauncher/data/PrismLauncher/instances/GATE-1.1/minecraft/"

# Your GitHub Repo folder
REPO_DIR="$HOME/Desktop/GATEModPack/"

# --- THE CAPTURE ---
echo "Capturing changes from CurseForge into GitHub repo..."

# Syncing from Game -> Repo
# We use --update so it only copies files that are NEWER in the game folder
rsync -av --update "$GAME_DIR/kubejs/" "$REPO_DIR/kubejs/"
rsync -av --update "$GAME_DIR/config/" "$REPO_DIR/config/"
rsync -av --update "$GAME_DIR/defaultconfigs/" "$REPO_DIR/defaultconfigs/"

echo "Sync complete. Check 'git status' to see what changed!"
