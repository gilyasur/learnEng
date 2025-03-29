import os
import shutil
import json
from pathlib import Path

# Paths
tts_output_dir = "management/tts_output"
target_sounds_dir = "LearnEng/src/assets/sounds"
vocabulary_file = "vocabulary.json"

def ensure_dir_exists(directory):
    """Create directory if it doesn't exist"""
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Created directory: {directory}")

def load_vocabulary():
    """Load vocabulary from the JSON file."""
    try:
        with open(vocabulary_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data["vocabulary"]
    except Exception as e:
        print(f"Error loading vocabulary file: {e}")
        return []

def move_audio_files():
    """Move MP3 files from tts_output to assets/sounds directory"""
    # Check if tts_output exists
    if not os.path.exists(tts_output_dir):
        print(f"Error: Source directory '{tts_output_dir}' not found.")
        return False
    
    # Ensure target directory exists
    ensure_dir_exists(target_sounds_dir)
    
    # Load vocabulary to map filenames to their categories
    vocabulary = load_vocabulary()
    
    # Track what we've moved
    files_moved = 0
    categories_processed = []
    
    # Process each category
    for category in vocabulary:
        category_name = category["category"].lower().replace(" ", "_")
        category_folder = os.path.join(tts_output_dir, category_name)
        
        if not os.path.exists(category_folder):
            print(f"Warning: Category folder '{category_folder}' not found, skipping.")
            continue
        
        categories_processed.append(category_name)
        
        # Ensure category directory exists in target
        target_category_dir = os.path.join(target_sounds_dir, category_name)
        ensure_dir_exists(target_category_dir)
        
        # Move all MP3 files from this category
        for file in os.listdir(category_folder):
            if file.endswith('.mp3'):
                source_path = os.path.join(category_folder, file)
                target_path = os.path.join(target_category_dir, file)
                
                # Copy the file 
                try:
                    shutil.copy2(source_path, target_path)
                    print(f"Copied: {source_path} -> {target_path}")
                    files_moved += 1
                except Exception as e:
                    print(f"Error copying {source_path}: {e}")
    
    print(f"\nCopied {files_moved} audio files to {target_sounds_dir}")
    print(f"Processed {len(categories_processed)} categories: {', '.join(categories_processed)}")
    return True

def update_vocabulary_json():
    """Update project vocabulary.json with sound file paths"""
    source_path = vocabulary_file
    target_path = "LearnEng/src/data/vocabulary.json"
    
    try:
        # Load the vocabulary data
        with open(source_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Update each word with a sound file path
        for category in data["vocabulary"]:
            category_name = category["category"].lower().replace(" ", "_")
            
            for word in category["words"]:
                english_word = word["english"]
                safe_filename = "".join(c if c.isalnum() else "_" for c in english_word)
                sound_path = f"../assets/sounds/{category_name}/{safe_filename}.mp3"
                
                # Add sound file path to word data
                word["soundFile"] = sound_path
        
        # Save the updated vocabulary to the project
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
            
        print(f"Updated vocabulary file with sound paths: {target_path}")
        return True
    except Exception as e:
        print(f"Error updating vocabulary.json: {e}")
        return False

if __name__ == "__main__":
    print("Moving audio files to LearnEng/src/assets/sounds...")
    if move_audio_files():
        print("\nUpdating vocabulary.json with sound file paths...")
        update_vocabulary_json()
        print("\nDone! Now update your components to use the sound files.")
    else:
        print("Failed to move audio files.") 