# English Learning App for Kids

A React Native mobile application designed to help kids learn English vocabulary through interactive and engaging activities. The app focuses on various categories like animals, colors, fruits, and more, with audio support for proper pronunciation.

![App Screenshot Placeholder](screenshot_placeholder.png)

## Featuress

- **Vocabulary Learning**: Learn words across multiple categories:
  - Animals
  - Colors
  - Fruits
  - Vegetables
  - Family members
  - Body parts
  - Clothing
  - Numbers
  - Weather
  - Emotions
  - Transportation
  - Toys

- **Interactive UI**: Kid-friendly interface with colorful visuals and intuitive navigation

- **Audio Support**: Hear the correct pronunciation of each word in English

- **Bilingual Support**: Words displayed in both English and Hebrew

- **Learning Games**:
  - Matching words with images
  - Pronunciation practice

## Screenshots

*[To be added]*

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/english-learning-app.git
cd english-learning-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. **Important**: Download Assets
The image and sound assets are not included in the repository to keep it lightweight. You will need to download them separately from [this link](provide_link_to_assets_zip) and extract them to the `LearnEng/src/assets/` directory.

```bash
# After downloading the assets.zip file
unzip assets.zip -d LearnEng/src/
```

4. Run the app:
```bash
npm start
# or
yarn start
```

## Technologies Used

- React Native
- React Router Native
- Expo Audio for sound management
- React Native Vector Icons

## Project Structure

```
LearnEng/
├── App.js               # Main application entry point
├── src/
│   ├── assets/          # Images, sounds, and other assets (download separately)
│   │   ├── images/      # Categorized images
│   │   └── sounds/      # Audio files for pronunciation
│   ├── components/      # Reusable UI components
│   ├── screens/         # Application screens
│   └── utils/           # Utility functions and helpers
│       ├── AudioManager.js  # Sound playback management
│       └── GlobalStyles.js  # Shared styles across the app
```

## Asset Management

To keep the repository size small, image and sound files are excluded from the Git repository. Instead:

1. The directory structure is maintained using `.gitkeep` files
2. You'll need to download the assets separately to run the app locally
3. For team collaboration, share assets via cloud storage (Google Drive, Dropbox, etc.)

### Asset Organization

- Images are organized by category in the `src/assets/images/` directory
- Sound files are organized by category in the `src/assets/sounds/` directory
- Each category has its own subdirectory (animals, colors, etc.)

## Upcoming Features

- **Avatar System**: Kids will be able to create and customize their own avatar
- **Rewards System**: Earn credits for completing lessons to purchase items for avatars
- **Progress Tracking**: Monitor learning progress across different categories
- **Daily Challenges**: New words and challenges each day to maintain engagement
- **More Languages**: Support for additional languages beyond English and Hebrew

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

When contributing, please note that you'll need to add any new assets to our shared asset storage rather than directly to the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Flaticon](https://www.flaticon.com/)
- Sound effects from [various sources to be credited]
- Special thanks to contributors and testers 