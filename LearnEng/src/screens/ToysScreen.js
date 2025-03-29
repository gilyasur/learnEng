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

// Toys data with English and Hebrew names
const toys = [
  { 
    id: 1, 
    name: 'Ball', 
    hebrewName: 'כדור', 
    image: 'https://cdn-icons-png.flaticon.com/512/3073/3073665.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Ball.mp3')
  },
  { 
    id: 2, 
    name: 'Doll', 
    hebrewName: 'בובה', 
    image: 'https://cdn-icons-png.flaticon.com/512/3418/3418588.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Doll.mp3')
  },
  { 
    id: 3, 
    name: 'Teddy Bear', 
    hebrewName: 'דובי', 
    image: 'https://cdn-icons-png.flaticon.com/512/3082/3082060.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Teddy_Bear.mp3')
  },
  { 
    id: 4, 
    name: 'Blocks', 
    hebrewName: 'קוביות', 
    image: 'https://cdn-icons-png.flaticon.com/512/3468/3468377.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Blocks.mp3')
  },
  { 
    id: 5, 
    name: 'Car Toy', 
    hebrewName: 'מכונית צעצוע', 
    image: 'https://cdn-icons-png.flaticon.com/512/3134/3134813.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Car_Toy.mp3')
  },
  { 
    id: 6, 
    name: 'Puzzle', 
    hebrewName: 'פאזל', 
    image: 'https://cdn-icons-png.flaticon.com/512/2535/2535342.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Puzzle.mp3')
  },
  { 
    id: 7, 
    name: 'Robot', 
    hebrewName: 'רובוט', 
    image: require('../assets/images/toys/robot.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/toys/Robot.mp3')
  },
  { 
    id: 8, 
    name: 'Crayons', 
    hebrewName: 'צבעים', 
    image: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/toys/Crayons.mp3')
  },
];

const ToysScreen = () => {
  const [selectedToy, setSelectedToy] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleToyPress = (toy) => {
    setSelectedToy(toy);
    playToySound(toy);
  };

  // Function to play toy sound
  const playToySound = async (toy) => {
    if (toy.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(toy.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Toys - צעצועים</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {toys.map((toy) => (
            <TouchableOpacity
              key={toy.id}
              style={[
                GlobalStyles.itemCard,
                selectedToy?.id === toy.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleToyPress(toy)}
            >
              <Image 
                source={typeof toy.image === 'string' ? { uri: toy.image } : toy.image} 
                style={[
                  GlobalStyles.itemImage,
                  toy.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={toy.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{toy.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{toy.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedToy && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedToy.image === 'string' ? { uri: selectedToy.image } : selectedToy.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedToy.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedToy.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedToy.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedToy.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playToySound(selectedToy)}
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

export default ToysScreen; 