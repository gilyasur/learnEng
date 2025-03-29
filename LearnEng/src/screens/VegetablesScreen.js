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

// Vegetables data with English and Hebrew names
const vegetables = [
  { 
    id: 1, 
    name: 'Carrot', 
    hebrewName: 'גזר', 
    image: require('../assets/images/vegetables/carrot.jpg'), 
    sound: 'carrot',
    isLocalImage: true,
    soundFile: require('../assets/sounds/vegetables/Carrot.mp3')
  },
  { 
    id: 2, 
    name: 'Tomato', 
    hebrewName: 'עגבניה', 
    image: 'https://cdn-icons-png.flaticon.com/512/1202/1202125.png', 
    sound: 'tomato',
    isLocalImage: false,
    soundFile: require('../assets/sounds/vegetables/Tomato.mp3')
  },
  { 
    id: 3, 
    name: 'Cucumber', 
    hebrewName: 'מלפפון', 
    image: require('../assets/images/vegetables/cucumber.jpg'), 
    sound: 'cucumber',
    isLocalImage: true,
    soundFile: require('../assets/sounds/vegetables/Cucumber.mp3')
  },
  { 
    id: 4, 
    name: 'Potato', 
    hebrewName: 'תפוח אדמה', 
    image: require('../assets/images/vegetables/potato.jpg'), 
    sound: 'potato',
    isLocalImage: true,
    soundFile: require('../assets/sounds/vegetables/Potato.mp3')
  },
  { 
    id: 5, 
    name: 'Broccoli', 
    hebrewName: 'ברוקולי', 
    image: require('../assets/images/vegetables/broccoli.jpg'), 
    sound: 'broccoli',
    isLocalImage: true,
    soundFile: require('../assets/sounds/vegetables/Broccoli.mp3')
  },
  { 
    id: 6, 
    name: 'Corn', 
    hebrewName: 'תירס', 
    image: require('../assets/images/vegetables/corn.jpg'), 
    sound: 'corn',
    isLocalImage: true,
    soundFile: require('../assets/sounds/vegetables/Corn.mp3')
  },
];

const VegetablesScreen = () => {
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleVegetablePress = (vegetable) => {
    setSelectedVegetable(vegetable);
    playVegetableSound(vegetable);
  };

  const goBack = () => {
    navigate('/vocabulary');
  };

  // Function to play vegetable sound
  const playVegetableSound = async (vegetable) => {
    // If the vegetable has a sound file, play it
    if (vegetable.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(vegetable.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Vegetables - ירקות</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {vegetables.map((vegetable) => (
            <TouchableOpacity
              key={vegetable.id}
              style={[
                GlobalStyles.itemCard,
                selectedVegetable?.id === vegetable.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleVegetablePress(vegetable)}
            >
              <Image 
                source={typeof vegetable.image === 'string' ? { uri: vegetable.image } : vegetable.image} 
                style={[
                  GlobalStyles.itemImage,
                  vegetable.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={vegetable.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{vegetable.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{vegetable.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedVegetable && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedVegetable.image === 'string' ? { uri: selectedVegetable.image } : selectedVegetable.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedVegetable.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedVegetable.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedVegetable.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedVegetable.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playVegetableSound(selectedVegetable)}
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

export default VegetablesScreen; 