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

const { width } = Dimensions.get('window');

// Numbers data with English and Hebrew names
const numbers = [
  { 
    id: 1, 
    name: 'One', 
    hebrewName: 'אחת', 
    image: 'https://cdn-icons-png.flaticon.com/512/3866/3866154.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/One.mp3')
  },
  { 
    id: 2, 
    name: 'Two', 
    hebrewName: 'שתיים', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158918.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Two.mp3')
  },
  { 
    id: 3, 
    name: 'Three', 
    hebrewName: 'שלוש', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158936.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Three.mp3')
  },
  { 
    id: 4, 
    name: 'Four', 
    hebrewName: 'ארבע', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158946.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Four.mp3')
  },
  { 
    id: 5, 
    name: 'Five', 
    hebrewName: 'חמש', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158955.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Five.mp3')
  },
  { 
    id: 6, 
    name: 'Six', 
    hebrewName: 'שש', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158965.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Six.mp3')
  },
  { 
    id: 7, 
    name: 'Seven', 
    hebrewName: 'שבע', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158978.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Seven.mp3')
  },
  { 
    id: 8, 
    name: 'Eight', 
    hebrewName: 'שמונה', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5158991.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Eight.mp3')
  },
  { 
    id: 9, 
    name: 'Nine', 
    hebrewName: 'תשע', 
    image: 'https://cdn-icons-png.flaticon.com/512/5158/5159002.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Nine.mp3')
  },
  { 
    id: 10, 
    name: 'Ten', 
    hebrewName: 'עשר', 
    image: 'https://cdn-icons-png.flaticon.com/512/5159/5159014.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/numbers/Ten.mp3')
  }
];

const NumbersScreen = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleNumberPress = (number) => {
    setSelectedNumber(number);
    playNumberSound(number);
  };

  // Function to play number sound
  const playNumberSound = async (number) => {
    if (number.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(number.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Numbers - מספרים</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {numbers.map((number) => (
            <TouchableOpacity
              key={number.id}
              style={[
                GlobalStyles.itemCard,
                selectedNumber?.id === number.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleNumberPress(number)}
            >
              <Image 
                source={typeof number.image === 'string' ? { uri: number.image } : number.image} 
                style={[
                  GlobalStyles.itemImage,
                  number.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={number.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{number.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{number.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedNumber && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedNumber.image === 'string' ? { uri: selectedNumber.image } : selectedNumber.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedNumber.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedNumber.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedNumber.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedNumber.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playNumberSound(selectedNumber)}
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

export default NumbersScreen; 