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

// Body parts data with English and Hebrew names
const bodyParts = [
  { 
    id: 1, 
    name: 'Head', 
    hebrewName: 'ראש', 
    image: 'https://cdn-icons-png.flaticon.com/512/3043/3043918.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Head.mp3')
  },
  { 
    id: 2, 
    name: 'Eye', 
    hebrewName: 'עין', 
    image: 'https://cdn-icons-png.flaticon.com/512/5259/5259854.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Eye.mp3')
  },
  { 
    id: 3, 
    name: 'Ear', 
    hebrewName: 'אוזן', 
    image: 'https://cdn-icons-png.flaticon.com/512/2864/2864484.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Ear.mp3')
  },
  { 
    id: 4, 
    name: 'Nose', 
    hebrewName: 'אף', 
    image: 'https://cdn-icons-png.flaticon.com/512/2876/2876138.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Nose.mp3')
  },
  { 
    id: 5, 
    name: 'Mouth', 
    hebrewName: 'פה', 
    image: 'https://cdn-icons-png.flaticon.com/512/2421/2421629.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Mouth.mp3')
  },
  { 
    id: 6, 
    name: 'Hand', 
    hebrewName: 'יד', 
    image: 'https://cdn-icons-png.flaticon.com/512/1806/1806248.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Hand.mp3')
  },
  { 
    id: 7, 
    name: 'Foot', 
    hebrewName: 'רגל', 
    image: 'https://cdn-icons-png.flaticon.com/512/2694/2694997.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Foot.mp3')
  },
  { 
    id: 8, 
    name: 'Hair', 
    hebrewName: 'שיער', 
    image: 'https://cdn-icons-png.flaticon.com/512/2886/2886095.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/body_parts/Hair.mp3')
  },
];

const BodyPartsScreen = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handlePartPress = (part) => {
    setSelectedPart(part);
    playPartSound(part);
  };

  // Function to play body part sound
  const playPartSound = async (part) => {
    if (part.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(part.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Body Parts - חלקי גוף</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {bodyParts.map((part) => (
            <TouchableOpacity
              key={part.id}
              style={[
                GlobalStyles.itemCard,
                selectedPart?.id === part.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handlePartPress(part)}
            >
              <Image 
                source={typeof part.image === 'string' ? { uri: part.image } : part.image} 
                style={[
                  GlobalStyles.itemImage,
                  part.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={part.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{part.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{part.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedPart && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedPart.image === 'string' ? { uri: selectedPart.image } : selectedPart.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedPart.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedPart.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedPart.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedPart.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playPartSound(selectedPart)}
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

export default BodyPartsScreen; 