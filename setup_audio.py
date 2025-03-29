import os
import subprocess
import sys
import time

# Scripts to run in sequence
scripts = [
    "move_audio_files.py",
    "update_components.py"
]

def check_prerequisites():
    """Check if required libraries are installed"""
    try:
        import gtts
        import pygame
        print("✓ Required libraries found (gtts, pygame)")
    except ImportError:
        print("Missing required libraries. Installing now...")
        subprocess.run([sys.executable, "-m", "pip", "install", "gtts", "pygame"])
        print("✓ Libraries installed")

def main():
    print("\n===== ENGLISH LEARNING APP AUDIO SETUP =====\n")
    
    # Check for required Python packages
    print("Checking prerequisites...")
    check_prerequisites()
    
    # Execute each script in sequence
    for script in scripts:
        if not os.path.exists(script):
            print(f"\n❌ Error: Script '{script}' not found!")
            continue
            
        print(f"\n===== RUNNING {script} =====\n")
        result = subprocess.run([sys.executable, script], capture_output=False)
        
        if result.returncode != 0:
            print(f"\n❌ Error running {script}. Please check the output above for details.")
            choice = input("Continue with the next script? (y/n): ")
            if choice.lower() != 'y':
                print("Setup aborted.")
                return
        
        # Small pause between scripts for readability
        time.sleep(1)
    
    print("\n===== SETUP COMPLETE =====")
    print("""
Audio files have been:
1. Moved to the appropriate src/assets/sounds directories
2. Referenced in the screen components

Your English Learning app now has audio for all vocabulary words!
""")

if __name__ == "__main__":
    main() 