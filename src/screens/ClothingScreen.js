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

// Clothing data with English and Hebrew names
const clothingItems = [
  { 
    id: 1, 
    name: 'T-Shirt', 
    hebrewName: 'חולצה', 
    image: 'https://cdn-icons-png.flaticon.com/512/2503/2503380.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/T_Shirt.mp3')
  },
  { 
    id: 2, 
    name: 'Pants', 
    hebrewName: 'מכנסיים', 
    image: 'https://cdn-icons-png.flaticon.com/512/4498/4498376.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Pants.mp3')
  },
  { 
    id: 3, 
    name: 'Shoes', 
    hebrewName: 'נעליים', 
    image: 'https://cdn-icons-png.flaticon.com/512/2589/2589903.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Shoes.mp3')
  },
  { 
    id: 4, 
    name: 'Hat', 
    hebrewName: 'כובע', 
    image: 'https://cdn-icons-png.flaticon.com/512/3094/3094033.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Hat.mp3')
  },
  { 
    id: 5, 
    name: 'Socks', 
    hebrewName: 'גרביים', 
    image: 'https://cdn-icons-png.flaticon.com/512/4774/4774449.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Socks.mp3')
  },
  { 
    id: 6, 
    name: 'Dress', 
    hebrewName: 'שמלה', 
    image: 'https://cdn-icons-png.flaticon.com/512/3089/3089797.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Dress.mp3')
  },
  { 
    id: 7, 
    name: 'Jacket', 
    hebrewName: 'מעיל', 
    image: 'https://cdn-icons-png.flaticon.com/512/3519/3519314.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Jacket.mp3')
  },
  { 
    id: 8, 
    name: 'Scarf', 
    hebrewName: 'צעיף', 
    image: 'https://cdn-icons-png.flaticon.com/512/2806/2806252.png', 
    isLocalImage: false,
    soundFile: require('../assets/sounds/clothing/Scarf.mp3')
  },
];

const ClothingScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleItemPress = (item) => {
    setSelectedItem(item);
    playItemSound(item);
  };

  // Function to play clothing item sound
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
        <Text style={GlobalStyles.screenTitle}>Clothing - בגדים</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {clothingItems.map((item) => (
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

export default ClothingScreen; 