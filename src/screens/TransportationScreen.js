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

// Transportation data with English and Hebrew names
const transportationItems = [
  { 
    id: 1, 
    name: 'Car', 
    hebrewName: 'מכונית', 
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774278.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Car.mp3')
  },
  { 
    id: 2, 
    name: 'Bus', 
    hebrewName: 'אוטובוס', 
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774259.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Bus.mp3')
  },
  { 
    id: 3, 
    name: 'Train', 
    hebrewName: 'רכבת', 
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Train.mp3')
  },
  { 
    id: 4, 
    name: 'Airplane', 
    hebrewName: 'מטוס', 
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774250.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Airplane.mp3')
  },
  { 
    id: 5, 
    name: 'Boat', 
    hebrewName: 'סירה', 
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774255.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Boat.mp3')
  },
  { 
    id: 6, 
    name: 'Bicycle', 
    hebrewName: 'אופניים', 
    image: 'https://cdn-icons-png.flaticon.com/512/3774/3774254.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Bicycle.mp3')
  },
  { 
    id: 7, 
    name: 'Motorcycle', 
    hebrewName: 'אופנוע', 
    image: 'https://cdn-icons-png.flaticon.com/512/741/741407.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Motorcycle.mp3')
  },
  { 
    id: 8, 
    name: 'Helicopter', 
    hebrewName: 'מסוק', 
    image: 'https://cdn-icons-png.flaticon.com/512/921/921347.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/transportation/Helicopter.mp3')
  },
];

const TransportationScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleItemPress = (item) => {
    setSelectedItem(item);
    playItemSound(item);
  };

  // Function to play transportation item sound
  const playItemSound = async (item) => {
    if (item.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(item.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Transportation - תחבורה</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {transportationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                GlobalStyles.itemCard,
                selectedItem?.id === item.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Image 
                source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                style={[
                  GlobalStyles.itemImage,
                  item.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={item.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{item.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{item.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedItem && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedItem.image === 'string' ? { uri: selectedItem.image } : selectedItem.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedItem.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedItem.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedItem.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedItem.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playItemSound(selectedItem)}
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

export default TransportationScreen; 