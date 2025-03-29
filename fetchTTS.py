import os
import json
import time
from pathlib import Path
from gtts import gTTS
import pygame.mixer

# --- Configuration ---

# Output directory for saving individual WAV files
output_dir = "tts_output"  # Name of the folder to save files in

# Path to vocabulary file
vocabulary_file = "vocabulary.json"

# TTS settings
tts_language = "en"  # Language code: en for English
tts_slow = False     # Slow audio playback

# --- Script Logic ---

def speak_and_save(text, filename):
    """Creates TTS audio file and optionally plays it."""
    print(f"Processing: {text}")
    
    try:
        # Create TTS audio
        tts = gTTS(text=text, lang=tts_language, slow=tts_slow)
        
        # Save to file (gTTS creates MP3 files)
        tts.save(filename)
        
        file_path = Path(filename)
        if file_path.exists() and file_path.stat().st_size > 0:
            print(f"  -> Successfully saved file: {filename} ({file_path.stat().st_size} bytes)")
            
            # Optional: Play the audio to verify
            try:
                pygame.mixer.init()
                pygame.mixer.music.load(filename)
                pygame.mixer.music.play()
                while pygame.mixer.music.get_busy():
                    time.sleep(0.1)
                pygame.mixer.quit()
            except Exception as play_error:
                print(f"  -> Note: Could not play audio for verification: {play_error}")
        else:
            print(f"  -> Warning: File appears empty: {filename}")
            
    except Exception as e:
        print(f"  -> Error creating TTS for '{text}': {e}")

def load_vocabulary():
    """Load vocabulary from the JSON file."""
    try:
        with open(vocabulary_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data["vocabulary"]
    except Exception as e:
        print(f"Error loading vocabulary file: {e}")
        return []

# --- Main Execution ---

# Check for required libraries
try:
    from gtts import gTTS
except ImportError:
    print("\nError: gtts library not found.")
    print("Please install it by running: pip install gtts pygame")
    exit()

try:
    import pygame.mixer
except ImportError:
    print("\nWarning: pygame library not found. Audio playback verification will be disabled.")
    print("If you want to verify audio files, install pygame: pip install pygame")

# Create output directory if saving files
if not os.path.exists(output_dir):
    try:
        os.makedirs(output_dir)
        print(f"\nCreated output directory: {output_dir}")
    except OSError as e:
        print(f"\nError creating directory {output_dir}: {e}")
        exit()
else:
    print(f"\nOutput directory already exists: {output_dir}")

# Load vocabulary from JSON file
vocabulary_categories = load_vocabulary()

# Process all vocabulary words
print("\nStarting TTS process...")
total_words = 0
processed_words = 0

# Count total words for progress tracking
for category in vocabulary_categories:
    total_words += len(category["words"])

# Process each word in each category
for category in vocabulary_categories:
    category_name = category["category"]
    print(f"\nProcessing category: {category_name}")
    
    # Create a subdirectory for this category
    category_dir = os.path.join(output_dir, category_name.lower().replace(" ", "_"))
    if not os.path.exists(category_dir):
        os.makedirs(category_dir)
    
    for word in category["words"]:
        english_word = word["english"]
        
        if not english_word.strip():  # Skip empty strings
            continue

        # Create a safe filename (replace spaces, handle basic punctuation)
        safe_filename = "".join(c if c.isalnum() else "_" for c in english_word)
        file_path = os.path.join(category_dir, f"{safe_filename}.mp3")  # gTTS creates MP3 files

        speak_and_save(english_word, file_path)
        
        # Update progress
        processed_words += 1
        print(f"Progress: {processed_words}/{total_words} words processed ({(processed_words/total_words)*100:.1f}%)")

        # Slight pause between processing
        time.sleep(0.2)

print("\nFinished processing all vocabulary words.")