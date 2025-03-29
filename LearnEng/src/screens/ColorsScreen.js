import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';
import { playSound } from '../utils/AudioManager';
import GlobalStyles from '../utils/GlobalStyles';
import CustomScrollView from '../components/CustomScrollView';

const { width } = Dimensions.get('window');

// Colors data with English and Hebrew names
const colors = [
  { 
    id: 1, 
    name: 'Red', 
    hebrewName: 'אדום', 
    image: require('../assets/images/colors/red.jpg'), 
    sound: 'red',
    isLocalImage: true,
    colorCode: '#FF0000',
    soundFile: require('../assets/sounds/colors/Red.mp3')
  },
  { 
    id: 2, 
    name: 'Blue', 
    hebrewName: 'כחול', 
    image: require('../assets/images/colors/blue.jpg'), 
    sound: 'blue',
    isLocalImage: true,
    colorCode: '#0000FF',
    soundFile: require('../assets/sounds/colors/Blue.mp3')
  },
  { 
    id: 3, 
    name: 'Green', 
    hebrewName: 'ירוק', 
    image: require('../assets/images/colors/green.jpg'), 
    sound: 'green',
    isLocalImage: true,
    colorCode: '#00FF00',
    soundFile: require('../assets/sounds/colors/Green.mp3')
  },
  { 
    id: 4, 
    name: 'Yellow', 
    hebrewName: 'צהוב', 
    image: require('../assets/images/colors/yellow.jpg'), 
    sound: 'yellow',
    isLocalImage: true,
    colorCode: '#FFFF00',
    soundFile: require('../assets/sounds/colors/Yellow.mp3')
  },
  { 
    id: 5, 
    name: 'Purple', 
    hebrewName: 'סגול', 
    image: require('../assets/images/colors/purple.jpg'), 
    sound: 'purple',
    isLocalImage: true,
    colorCode: '#800080',
    soundFile: require('../assets/sounds/colors/Purple.mp3')
  },
  { 
    id: 6, 
    name: 'Orange', 
    hebrewName: 'כתום', 
    image: require('../assets/images/colors/orange.jpg'), 
    sound: 'orange',
    isLocalImage: true,
    colorCode: '#FFA500',
    soundFile: require('../assets/sounds/colors/Orange.mp3')
  },
  { 
    id: 7, 
    name: 'Black', 
    hebrewName: 'שחור', 
    image: require('../assets/images/colors/black.jpg'), 
    sound: 'black',
    isLocalImage: true,
    colorCode: '#000000',
    soundFile: require('../assets/sounds/colors/Black.mp3')
  },
  { 
    id: 8, 
    name: 'White', 
    hebrewName: 'לבן', 
    image: require('../assets/images/colors/white.jpg'), 
    sound: 'white',
    isLocalImage: true,
    colorCode: '#FFFFFF',
    soundFile: require('../assets/sounds/colors/White.mp3')
  }
];

const ColorsScreen = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);

  const handleColorPress = (color) => {
    setSelectedColor(color);
    playColorSound(color);
  };

  // Function to play color sound
  const playColorSound = async (color) => {
    if (color.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(color.soundFile);
      setCurrentSound(sound);
    }
  };

  // Clean up sounds when component unmounts
  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, [currentSound]);

  const goBack = () => {
    navigate('/vocabulary');
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <TouchableOpacity 
          style={GlobalStyles.backButton} 
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={28} color="#4A6572" />
        </TouchableOpacity>
        <Text style={GlobalStyles.screenTitle}>Colors - צבעים</Text>
      </View>

      <CustomScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.id}
              style={[
                styles.colorCard, 
                { borderColor: color.colorCode },
                selectedColor?.id === color.id && styles.selectedCard
              ]}
              onPress={() => handleColorPress(color)}
              delayPressIn={150}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={typeof color.image === 'string' ? { uri: color.image } : color.image} 
                  style={[
                    styles.colorImage,
                    color.isLocalImage && styles.localColorImage
                  ]} 
                  resizeMode={color.isLocalImage ? "cover" : "contain"}
                />
              </View>
              <View style={[styles.colorSample, { backgroundColor: color.colorCode }]} />
              <Text style={styles.colorName}>{color.name}</Text>
              <Text style={styles.hebrewName}>{color.hebrewName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </CustomScrollView>

      {selectedColor && (
        <View style={[GlobalStyles.selectedItemPanel, { backgroundColor: selectedColor.colorCode }]}>
          <Image 
            source={typeof selectedColor.image === 'string' ? { uri: selectedColor.image } : selectedColor.image} 
            style={[
              styles.selectedImage,
              selectedColor.isLocalImage && styles.localSelectedImage
            ]} 
            resizeMode={selectedColor.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedColor.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedColor.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playColorSound(selectedColor)}
          >
            <Ionicons name="volume-high" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  colorCard: {
    width: width / 2 - 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 3,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorImage: {
    width: 70,
    height: 70,
  },
  colorSample: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hebrewName: {
    fontSize: 14,
    color: '#666',
  },
  selectedImage: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
  },
  localColorImage: {
    width: 130,
    height: 80,
    borderRadius: 10,
  },
  localSelectedImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 0,
    overflow: 'hidden',
  },
});

export default ColorsScreen;
