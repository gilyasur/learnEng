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

// Weather data with English and Hebrew names
const weatherTypes = [
  { 
    id: 1, 
    name: 'Sunny', 
    hebrewName: 'שמשי', 
    image: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Sunny.mp3')
  },
  { 
    id: 2, 
    name: 'Rainy', 
    hebrewName: 'גשום', 
    image: 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Rainy.mp3')
  },
  { 
    id: 3, 
    name: 'Cloudy', 
    hebrewName: 'מעונן', 
    image: 'https://cdn-icons-png.flaticon.com/512/414/414927.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Cloudy.mp3')
  },
  { 
    id: 4, 
    name: 'Windy', 
    hebrewName: 'סוער', 
    image: 'https://cdn-icons-png.flaticon.com/512/959/959711.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Windy.mp3')
  },
  { 
    id: 5, 
    name: 'Snowy', 
    hebrewName: 'מושלג', 
    image: 'https://cdn-icons-png.flaticon.com/512/2529/2529971.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Snowy.mp3')
  },
  { 
    id: 6, 
    name: 'Hot', 
    hebrewName: 'חם', 
    image: 'https://cdn-icons-png.flaticon.com/512/2480/2480626.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Hot.mp3')
  },
  { 
    id: 7, 
    name: 'Cold', 
    hebrewName: 'קר', 
    image: 'https://cdn-icons-png.flaticon.com/512/2302/2302388.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Cold.mp3')
  },
  { 
    id: 8, 
    name: 'Storm', 
    hebrewName: 'סופה', 
    image: 'https://cdn-icons-png.flaticon.com/512/1779/1779940.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/weather/Storm.mp3')
  },
];

const WeatherScreen = () => {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleWeatherPress = (weather) => {
    setSelectedWeather(weather);
    playWeatherSound(weather);
  };

  // Function to play weather sound
  const playWeatherSound = async (weather) => {
    if (weather.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(weather.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Weather - מזג אוויר</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {weatherTypes.map((weather) => (
            <TouchableOpacity
              key={weather.id}
              style={[
                GlobalStyles.itemCard,
                selectedWeather?.id === weather.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleWeatherPress(weather)}
            >
              <Image 
                source={typeof weather.image === 'string' ? { uri: weather.image } : weather.image} 
                style={[
                  GlobalStyles.itemImage,
                  weather.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={weather.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{weather.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{weather.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedWeather && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedWeather.image === 'string' ? { uri: selectedWeather.image } : selectedWeather.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedWeather.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedWeather.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedWeather.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedWeather.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playWeatherSound(selectedWeather)}
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

export default WeatherScreen; 