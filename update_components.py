import os
import json
import glob
import re

# Paths
screen_dir = "LearnEng/src/screens"
vocabulary_file = "LearnEng/src/data/vocabulary.json"

def load_vocabulary():
    """Load vocabulary from the JSON file."""
    try:
        with open(vocabulary_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data["vocabulary"]
    except Exception as e:
        print(f"Error loading vocabulary file: {e}")
        return []

def update_screen_component(screen_file, category_name, vocabulary_words):
    """Update a screen component to use the vocabulary sound files"""
    
    try:
        with open(screen_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if this file has hardcoded animal/fruit/etc data
        data_pattern = r'const\s+(\w+)\s*=\s*\['
        data_match = re.search(data_pattern, content)
        
        if not data_match:
            print(f"No data array found in {screen_file}, skipping.")
            return False
            
        data_var_name = data_match.group(1)
        print(f"Found data array: {data_var_name}")
        
        # Find the data array section
        array_start = content.find(f"const {data_var_name} = [")
        if array_start == -1:
            print(f"Could not find data array in {screen_file}, skipping.")
            return False
            
        array_end = content.find("];", array_start)
        if array_end == -1:
            print(f"Could not find end of data array in {screen_file}, skipping.")
            return False
            
        array_content = content[array_start:array_end+2]
        
        # Create a mapping of english names to sound file paths
        sound_mapping = {}
        for word in vocabulary_words:
            english_word = word["english"]
            if "soundFile" in word:
                sound_mapping[english_word] = word["soundFile"]
        
        # For each item in the array, add or update the soundFile property
        modified_array = array_content
        items_updated = 0
        
        for english_word, sound_path in sound_mapping.items():
            # Look for the item with this English name
            item_pattern = rf'name:\s*[\'"]({re.escape(english_word)})[\'"]'
            matches = re.finditer(item_pattern, array_content, re.IGNORECASE)
            
            for match in matches:
                # Find the start and end of this item object
                item_start = array_content[:match.start()].rfind("{")
                item_end = -1
                
                # Find the matching closing brace
                brace_count = 1
                for i in range(match.start(), len(array_content)):
                    if array_content[i] == "{":
                        brace_count += 1
                    elif array_content[i] == "}":
                        brace_count -= 1
                        if brace_count == 0:
                            item_end = i + 1
                            break
                
                if item_end == -1:
                    continue  # Couldn't find the end of this item
                
                item_content = array_content[item_start:item_end]
                
                # Check if it already has a soundFile property
                has_sound_file = re.search(r'soundFile\s*:', item_content)
                has_sound = re.search(r'sound\s*:', item_content)
                
                # Prepare new item content
                new_item_content = item_content
                
                if has_sound_file:
                    # Replace existing soundFile
                    new_item_content = re.sub(
                        r'(soundFile\s*:).*?(,|\n|})',
                        f'\\1 require(\'{sound_path}\')\\2',
                        new_item_content,
                        flags=re.DOTALL
                    )
                elif has_sound:
                    # Replace sound with soundFile
                    new_item_content = re.sub(
                        r'(sound\s*:).*?(,|\n|})',
                        f'\\1 \'word\',\n    soundFile: require(\'{sound_path}\')\\2',
                        new_item_content,
                        flags=re.DOTALL
                    )
                else:
                    # Add soundFile property before the closing brace
                    new_item_content = new_item_content.rstrip('}') + ',\n    ' + \
                                      f'soundFile: require(\'{sound_path}\')' + '\n  }'
                
                # Update the array content
                modified_array = modified_array.replace(item_content, new_item_content)
                items_updated += 1
                print(f"  - Updated sound for '{english_word}'")
        
        # Only replace the array if changes were made
        if items_updated > 0:
            # Replace the array in the content
            new_content = content.replace(array_content, modified_array)
            
            # Update the file
            with open(screen_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            print(f"Updated {screen_file} with {items_updated} sound file references.")
            return True
        else:
            print(f"No items were updated in {screen_file}.")
            return False
        
    except Exception as e:
        print(f"Error updating {screen_file}: {e}")
        return False

def update_all_components():
    """Update all screen components with sound files"""
    vocabulary = load_vocabulary()
    total_updated = 0
    
    # Process each category
    for category in vocabulary:
        category_name = category["category"]
        print(f"\n===== Processing {category_name} category =====")
        
        # Try to find the corresponding screen file
        patterns = [
            f"*{category_name.replace(' ', '')}*Screen.js",
            f"*{category_name}*Screen.js",
            f"*{category_name[:-1]}*Screen.js"  # Try without trailing 's' (e.g., Animals -> Animal)
        ]
        
        found = False
        for pattern in patterns:
            matching_files = glob.glob(os.path.join(screen_dir, pattern), recursive=False)
            
            if matching_files:
                screen_path = matching_files[0]
                print(f"Found matching screen: {os.path.basename(screen_path)}")
                
                if update_screen_component(screen_path, category_name, category["words"]):
                    total_updated += 1
                
                found = True
                break
        
        if not found:
            print(f"No matching screen found for {category_name} category.")
    
    return total_updated

if __name__ == "__main__":
    print("Updating components to use sound files from vocabulary...")
    total_updated = update_all_components()
    print(f"\nDone! Updated {total_updated} components with vocabulary sound files.") 