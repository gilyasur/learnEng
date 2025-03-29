import os
import sys
from pathlib import Path

# Directory containing the TTS files
output_dir = "tts_output"

def delete_wav_files(directory):
    """Delete all .wav files in the specified directory and its subdirectories."""
    total_deleted = 0
    total_size_deleted = 0
    
    print(f"Scanning for WAV files in: {directory}")
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.wav'):
                file_path = os.path.join(root, file)
                file_size = os.path.getsize(file_path)
                try:
                    os.remove(file_path)
                    total_deleted += 1
                    total_size_deleted += file_size
                    print(f"Deleted: {file_path} ({file_size} bytes)")
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")
    
    return total_deleted, total_size_deleted

def main():
    # Check if the output directory exists
    if not os.path.exists(output_dir):
        print(f"Error: Directory '{output_dir}' not found.")
        return
    
    # Confirm deletion with the user
    print(f"This will delete ALL .wav files in '{output_dir}' and its subdirectories.")
    confirm = input("Are you sure you want to continue? (y/n): ")
    
    if confirm.lower() != 'y':
        print("Operation canceled.")
        return
    
    # Delete the WAV files
    total_deleted, total_size_deleted = delete_wav_files(output_dir)
    
    # Report results
    print("\nCleanup complete!")
    print(f"Deleted {total_deleted} WAV files ({total_size_deleted / 1024:.1f} KB)")
    print("Your MP3 files are preserved.")

if __name__ == "__main__":
    main() 