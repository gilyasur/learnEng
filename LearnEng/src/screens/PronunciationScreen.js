import React, { useState } from 'react';
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
import GlobalStyles from '../utils/GlobalStyles';

const { width } = Dimensions.get('window');

// Words to practice pronouncing
const words = [
  { 
    id: 1, 
    word: 'Hello', 
    hebrewWord: 'שלום', 
    image: 'https://cdn-icons-png.flaticon.com/512/1791/1791330.png',
    color: '#4CAF50'
  },
  { 
    id: 2, 
    word: 'Thank You', 
    hebrewWord: 'תודה', 
    image: 'https://cdn-icons-png.flaticon.com/512/3093/3093290.png',
    color: '#2196F3'
  },
  { 
    id: 3, 
    word: 'Please', 
    hebrewWord: 'בבקשה', 
    image: 'https://cdn-icons-png.flaticon.com/512/4222/4222189.png',
    color: '#FF9800'
  },
  { 
    id: 4, 
    word: 'Yes', 
    hebrewWord: 'כן', 
    image: 'https://cdn-icons-png.flaticon.com/512/463/463574.png',
    color: '#9C27B0'
  },
  { 
    id: 5, 
    word: 'No', 
    hebrewWord: 'לא', 
    image: 'https://cdn-icons-png.flaticon.com/512/594/594598.png',
    color: '#F44336'
  },
  { 
    id: 6, 
    word: 'Water', 
    hebrewWord: 'מים', 
    image: 'https://cdn-icons-png.flaticon.com/512/824/824239.png',
    color: '#00BCD4'
  },
];

const PronunciationScreen = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const navigate = useNavigate();

  const handleWordPress = (word) => {
    setSelectedWord(word);
    setIsPracticing(false);
  };

  const handlePracticePress = () => {
    setIsPracticing(true);
    // In a real app, you would implement sound playback here
  };

  const goBack = () => {
    navigate('/');
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
        <Text style={GlobalStyles.screenTitle}>Say It! - אמור את זה</Text>
      </View>

      <ScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Tap a word to practice saying it!
          </Text>
          <Text style={styles.instructionTextHebrew}>
            הקש על מילה כדי לתרגל אמירתה!
          </Text>
        </View>
        
        <View style={styles.wordsContainer}>
          {words.map((wordItem) => (
            <TouchableOpacity
              key={wordItem.id}
              style={[
                styles.wordCard,
                { backgroundColor: wordItem.color },
                selectedWord?.id === wordItem.id && styles.selectedCard
              ]}
              onPress={() => handleWordPress(wordItem)}
            >
              <Image 
                source={{ uri: wordItem.image }} 
                style={styles.wordImage} 
                resizeMode="contain"
              />
              <Text style={styles.englishWord}>{wordItem.word}</Text>
              <Text style={styles.hebrewWord}>{wordItem.hebrewWord}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedWord && (
        <View style={styles.practicePanel}>
          <View style={styles.practiceWordContainer}>
            <Text style={styles.practiceEnglishWord}>{selectedWord.word}</Text>
            <Text style={styles.practiceHebrewWord}>{selectedWord.hebrewWord}</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.practiceButton,
              isPracticing && styles.practicingButton
            ]}
            onPress={handlePracticePress}
          >
            <Ionicons 
              name={isPracticing ? "volume-high" : "play"} 
              size={30} 
              color="white" 
            />
            <Text style={styles.practiceButtonText}>
              {isPracticing ? "Listening... - מקשיב..." : "Listen - הקשב"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.repeatButton}
            onPress={() => setIsPracticing(false)}
          >
            <Ionicons name="repeat" size={24} color="white" />
            <Text style={styles.repeatButtonText}>Try Again - נסה שוב</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  instructionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#4A6572',
    fontWeight: 'bold',
  },
  instructionTextHebrew: {
    fontSize: 16,
    color: '#4A6572',
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  wordCard: {
    width: width * 0.44,
    height: 140,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  wordImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  englishWord: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
  },
  hebrewWord: {
    fontSize: 14,
    color: 'white',
  },
  practicePanel: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  practiceWordContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  practiceEnglishWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  practiceHebrewWord: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  practicingButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  practiceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  repeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 8,
    borderRadius: 15,
  },
  repeatButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default PronunciationScreen; 