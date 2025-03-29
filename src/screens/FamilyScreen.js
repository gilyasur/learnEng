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

// Family data with English and Hebrew names
const familyMembers = [
  { 
    id: 1, 
    name: 'Father', 
    hebrewName: 'אבא', 
    image: require('../assets/images/family/father.jpg'), 
      isLocalImage: true,
    soundFile: require('../assets/sounds/family/Father.mp3')
  },
  { 
    id: 2, 
    name: 'Mother', 
    hebrewName: 'אמא', 
    image: require('../assets/images/family/mother.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/family/Mother.mp3')
  },
  { 
    id: 3, 
    name: 'Brother', 
    hebrewName: 'אח', 
    image: require('../assets/images/family/brother.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/family/Brother.mp3')
  },
  { 
    id: 4, 
    name: 'Sister', 
    hebrewName: 'אחות', 
    image: require('../assets/images/family/sister.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/family/Sister.mp3')
  },
  { 
    id: 5, 
    name: 'Grandfather', 
    hebrewName: 'סבא', 
    image: require('../assets/images/family/grandfather.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/family/Grandfather.mp3')
  },
  { 
    id: 6, 
    name: 'Grandmother', 
    hebrewName: 'סבתא', 
    image: require('../assets/images/family/grandmother.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/family/Grandmother.mp3')
  },
  { 
    id: 7, 
    name: 'Baby', 
    hebrewName: 'תינוק', 
    image: require('../assets/images/family/baby.jpg'), 
    isLocalImage: true,
    soundFile: require('../assets/sounds/family/Baby.mp3')
  },
];

const FamilyScreen = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const navigate = useNavigate();

  const handleMemberPress = (member) => {
    setSelectedMember(member);
    playMemberSound(member);
  };

  // Function to play member sound
  const playMemberSound = async (member) => {
    if (member.soundFile) {
      // Clean up previous sound if it exists
      if (currentSound) {
        await currentSound.unloadAsync();
      }
      
      // Play the new sound
      const sound = await playSound(member.soundFile);
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
        <Text style={GlobalStyles.screenTitle}>Family - משפחה</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {familyMembers.map((member) => (
            <TouchableOpacity
              key={member.id}
              style={[
                GlobalStyles.itemCard,
                selectedMember?.id === member.id && GlobalStyles.selectedCard
              ]}
              onPress={() => handleMemberPress(member)}
            >
              <Image 
                source={typeof member.image === 'string' ? { uri: member.image } : member.image} 
                style={[
                  GlobalStyles.itemImage,
                  member.isLocalImage && GlobalStyles.localItemImage
                ]} 
                resizeMode={member.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{member.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{member.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedMember && (
        <View style={GlobalStyles.selectedItemPanel}>
          <Image 
            source={typeof selectedMember.image === 'string' ? { uri: selectedMember.image } : selectedMember.image} 
            style={[
              GlobalStyles.selectedImage,
              selectedMember.isLocalImage && GlobalStyles.localSelectedImage
            ]} 
            resizeMode={selectedMember.isLocalImage ? "cover" : "contain"}
          />
          <View>
            <Text style={GlobalStyles.selectedEnglishName}>{selectedMember.name}</Text>
            <Text style={GlobalStyles.selectedHebrewName}>{selectedMember.hebrewName}</Text>
          </View>
          <TouchableOpacity 
            style={GlobalStyles.soundButton}
            onPress={() => playMemberSound(selectedMember)}
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

export default FamilyScreen; 