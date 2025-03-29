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

// Emotions data with English and Hebrew names
const emotions = [
  { 
    id: 1, 
    name: 'Happy', 
    hebrewName: 'שמח', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356639.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Happy.mp3')
  },
  { 
    id: 2, 
    name: 'Sad', 
    hebrewName: 'עצוב', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356642.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Sad.mp3')
  },
  { 
    id: 3, 
    name: 'Angry', 
    hebrewName: 'כועס', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356635.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Angry.mp3')
  },
  { 
    id: 4, 
    name: 'Surprised', 
    hebrewName: 'מופתע', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356645.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Surprised.mp3')
  },
  { 
    id: 5, 
    name: 'Scared', 
    hebrewName: 'מפחד', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356643.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Scared.mp3')
  },
  { 
    id: 6, 
    name: 'Sleepy', 
    hebrewName: 'ישנוני', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356644.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Sleepy.mp3')
  },
  { 
    id: 7, 
    name: 'Confused', 
    hebrewName: 'מבולבל', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356638.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Confused.mp3')
  },
  { 
    id: 8, 
    name: 'Excited', 
    hebrewName: 'נרגש', 
    image: 'https://cdn-icons-png.flaticon.com/512/1356/1356640.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/emotions/Excited.mp3')
  },
];

const EmotionsScreen = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleEmotionPress = (emotion) => {
    setSelectedEmotion(emotion);
    playEmotionSound(emotion);
  };

  // Function to play emotion sound
  const playEmotionSound = async (emotion) => {
    if (emotion.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(emotion.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Emotions - רגשות</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.id}
              style={[
                GlobalStyles.itemCard,
                selectedEmotion?.id === emotion.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleEmotionPress(emotion)}
            >
              <Image 
                source={typeof emotion.image === 'string' ? { uri: emotion.image } : emotion.image} 
                style={[
                  GlobalStyles.itemImage,
                  emotion.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={emotion.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{emotion.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{emotion.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedEmotion && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedEmotion.image === 'string' ? { uri: selectedEmotion.image } : selectedEmotion.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedEmotion.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedEmotion.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedEmotion.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedEmotion.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playEmotionSound(selectedEmotion)}
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

export default EmotionsScreen; 