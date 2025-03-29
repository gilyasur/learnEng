import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';
import { playSound } from '../utils/AudioManager';
import GlobalStyles from '../utils/GlobalStyles';
import CustomScrollView from '../components/CustomScrollView';

const { width } = Dimensions.get('window');

// Animal data with English and Hebrew names
const animals = [
  { 
    id: 1, 
    name: 'Dog', 
    hebrewName: 'כלב', 
    image: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', 
    soundFile: require('../assets/sounds/animals/dog.mp3'),
    isLocalImage: false
  },
  { 
    id: 2, 
    name: 'Cat', 
    hebrewName: 'חתול', 
    image: require('../assets/images/animals/cat.jpg'), 
    sound: 'word',
    soundFile: require('../assets/sounds/animals/Cat.mp3'),
    isLocalImage: true
  },
  { 
    id: 3, 
    name: 'Elephant', 
    hebrewName: 'פיל', 
    image: require('../assets/images/animals/elephant.jpg'), 
    sound: 'word',
    soundFile: require('../assets/sounds/animals/Elephant.mp3'),
    isLocalImage: true
  },
  { 
    id: 4, 
    name: 'Lion', 
    hebrewName: 'אריה', 
    image: 'https://cdn-icons-png.flaticon.com/512/616/616412.png', 
    sound: 'word',
    soundFile: require('../assets/sounds/animals/Lion.mp3'),
    isLocalImage: false
  },
  { 
    id: 5, 
    name: 'Monkey', 
    hebrewName: 'קוף', 
    image: require('../assets/images/animals/Monkey.jpg'), 
    sound: 'word',
    soundFile: require('../assets/sounds/animals/Monkey.mp3'),
    isLocalImage: true
  },
  { 
    id: 6, 
    name: 'Giraffe', 
    hebrewName: 'ג׳ירפה', 
    image: require('../assets/images/animals/girrafe.jpg'), 
    sound: 'word',
    soundFile: require('../assets/sounds/animals/Giraffe.mp3'),
    isLocalImage: true
  },
];

const AnimalGameScreen = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleAnimalPress = (animal) => {
    setSelectedAnimal(animal);
    playAnimalSound(animal);
  };

  const goBack = () => {
    navigate('/vocabulary');
  };

  // Function to play animal sound
  const playAnimalSound = async (animal) => {
    // If the animal has a sound file, play it
    if (animal.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(animal.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Animals - חיות</Text>
      </View>

      <CustomScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {animals.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={[
                GlobalStyles.itemCard,
                selectedAnimal?.id === animal.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleAnimalPress(animal)}
              delayPressIn={150}
            >
              <Image 
                source={typeof animal.image === 'string' ? { uri: animal.image } : animal.image} 
                style={[
                  GlobalStyles.itemImage,
                  animal.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={animal.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{animal.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{animal.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </CustomScrollView>

      {selectedAnimal && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedAnimal.image === 'string' ? { uri: selectedAnimal.image } : selectedAnimal.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedAnimal.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedAnimal.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedAnimal.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedAnimal.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playAnimalSound(selectedAnimal)}
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

export default AnimalGameScreen; 