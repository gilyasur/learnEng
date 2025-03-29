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

// Fruits data with English and Hebrew names
const fruits = [
  { 
    id: 1, 
    name: 'Apple', 
    hebrewName: 'תפוח', 
    image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png', 
    sound: 'apple',
    isLocalImage: false,
    soundFile: require('../assets/sounds/fruits/Apple.mp3')
  },
  { 
    id: 2, 
    name: 'Banana', 
    hebrewName: 'בננה', 
    image: 'https://cdn-icons-png.flaticon.com/512/3143/3143645.png', 
    sound: 'banana',
    isLocalImage: false,
    soundFile: require('../assets/sounds/fruits/Banana.mp3')
  },
  { 
    id: 3, 
    name: 'Orange', 
    hebrewName: 'תפוז', 
    image: require('../assets/images/fruits/orange.jpg'), 
    sound: 'orange',
    isLocalImage: true,
    soundFile: require('../assets/sounds/fruits/Orange.mp3')
  },
  { 
    id: 4, 
    name: 'Grapes', 
    hebrewName: 'ענבים', 
    image: require('../assets/images/fruits/grapes.jpg'), 
    sound: 'grapes',
    isLocalImage: true,
    soundFile: require('../assets/sounds/fruits/Grapes.mp3')
  },
  { 
    id: 5, 
    name: 'Strawberry', 
    hebrewName: 'תות', 
    image: 'https://cdn-icons-png.flaticon.com/512/590/590685.png', 
    sound: 'strawberry',
    isLocalImage: false,
    soundFile: require('../assets/sounds/fruits/Strawberry.mp3')
  },
  { 
    id: 6, 
    name: 'Watermelon', 
    hebrewName: 'אבטיח', 
    image: 'https://cdn-icons-png.flaticon.com/512/874/874997.png', 
    sound: 'watermelon',
    isLocalImage: false,
    soundFile: require('../assets/sounds/fruits/Watermelon.mp3')
  },
];

const FruitsScreen = () => {
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleFruitPress = (fruit) => {
    setSelectedFruit(fruit);
    playFruitSound(fruit);
  };

  const goBack = () => {
    navigate('/vocabulary');
  };

  // Function to play fruit sound
  const playFruitSound = async (fruit) => {
    // If the fruit has a sound file, play it
    if (fruit.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(fruit.soundFile);
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

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <TouchableOpacity 
          style={GlobalStyles.backButton} 
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={28} color="#4A6572" />
        </TouchableOpacity>
        <Text style={GlobalStyles.screenTitle}>Fruits - פירות</Text>
      </View>

      <CustomScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {fruits.map((fruit) => (
            <TouchableOpacity
              key={fruit.id}
              style={[
                GlobalStyles.itemCard,
                selectedFruit?.id === fruit.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleFruitPress(fruit)}
              delayPressIn={150}
            >
              <Image 
                source={typeof fruit.image === 'string' ? { uri: fruit.image } : fruit.image} 
                style={[
                  GlobalStyles.itemImage,
                  fruit.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={fruit.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{fruit.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{fruit.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </CustomScrollView>

      {selectedFruit && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedFruit.image === 'string' ? { uri: selectedFruit.image } : selectedFruit.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedFruit.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedFruit.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedFruit.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedFruit.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playFruitSound(selectedFruit)}
          >
            <Ionicons name="volume-high" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Any custom styles specific to this component would go here, 
  // but we're now using all GlobalStyles
});

export default FruitsScreen; 