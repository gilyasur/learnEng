import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  Alert,
  Dimensions
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import GlobalStyles from '../utils/GlobalStyles';

const { width } = Dimensions.get('window');

// Word matching data
const matchingPairs = [
  { id: 1, word: 'Apple', hebrewWord: 'תפוח', image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png' },
  { id: 2, word: 'Ball', hebrewWord: 'כדור', image: 'https://cdn-icons-png.flaticon.com/512/33/33736.png' },
  { id: 3, word: 'Car', hebrewWord: 'מכונית', image: 'https://cdn-icons-png.flaticon.com/512/741/741407.png' },
  { id: 4, word: 'House', hebrewWord: 'בית', image: 'https://cdn-icons-png.flaticon.com/512/619/619032.png' },
];

const MatchGameScreen = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Shuffle the words and images
    const shuffledWords = [...matchingPairs].sort(() => 0.5 - Math.random());
    const shuffledImages = [...matchingPairs].sort(() => 0.5 - Math.random());
    
    setWords(shuffledWords);
    setImages(shuffledImages);
    setSelectedWord(null);
    setSelectedImage(null);
    setMatchedPairs([]);
    setScore(0);
  };

  const goBack = () => {
    navigate('/');
  };

  const handleWordPress = (word) => {
    if (matchedPairs.includes(word.id)) return;
    
    setSelectedWord(word);
    
    // Check if there's already an image selected
    if (selectedImage) {
      checkMatch(word, selectedImage);
    }
  };

  const handleImagePress = (image) => {
    if (matchedPairs.includes(image.id)) return;
    
    setSelectedImage(image);
    
    // Check if there's already a word selected
    if (selectedWord) {
      checkMatch(selectedWord, image);
    }
  };

  const checkMatch = (word, image) => {
    if (word.id === image.id) {
      // It's a match!
      setMatchedPairs([...matchedPairs, word.id]);
      setScore(score + 1);
      
      // Check if game is complete
      if (matchedPairs.length + 1 === matchingPairs.length) {
        setTimeout(() => {
          Alert.alert(
            'Congratulations! - כל הכבוד!', 
            'You matched all the words! - התאמת את כל המילים!',
            [{ text: 'Play Again - שחק שוב', onPress: startNewGame }]
          );
        }, 1000);
      }
    }
    
    // Reset selections after checking
    setTimeout(() => {
      setSelectedWord(null);
      setSelectedImage(null);
    }, 500);
  };

  const isMatched = (id) => matchedPairs.includes(id);

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={GlobalStyles.header}>
        <TouchableOpacity 
          style={GlobalStyles.backButton} 
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={28} color="#4A6572" />
        </TouchableOpacity>
        <Text style={GlobalStyles.screenTitle}>Match Words - התאם מילים</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          Score: {score}/{matchingPairs.length}
        </Text>
      </View>
      
      <View style={styles.gameContainer}>
        <View style={styles.wordsContainer}>
          {words.map((wordItem) => (
            <TouchableOpacity
              key={`word-${wordItem.id}`}
              style={[
                styles.wordCard,
                selectedWord?.id === wordItem.id && styles.selectedCard,
                isMatched(wordItem.id) && styles.matchedCard
              ]}
              onPress={() => handleWordPress(wordItem)}
              disabled={isMatched(wordItem.id)}
            >
              <Text style={styles.englishWord}>{wordItem.word}</Text>
              <Text style={styles.hebrewWord}>{wordItem.hebrewWord}</Text>
              {isMatched(wordItem.id) && (
                <FontAwesome name="check-circle" size={20} color="#4CAF50" style={styles.matchIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.imagesContainer}>
          {images.map((imageItem) => (
            <TouchableOpacity
              key={`image-${imageItem.id}`}
              style={[
                styles.imageCard,
                selectedImage?.id === imageItem.id && styles.selectedCard,
                isMatched(imageItem.id) && styles.matchedCard
              ]}
              onPress={() => handleImagePress(imageItem)}
              disabled={isMatched(imageItem.id)}
            >
              <Image 
                source={{ uri: imageItem.image }} 
                style={styles.itemImage} 
                resizeMode="contain"
              />
              {isMatched(imageItem.id) && (
                <FontAwesome name="check-circle" size={20} color="#4CAF50" style={styles.matchIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.resetButton}
        onPress={startNewGame}
      >
        <Text style={styles.resetButtonText}>Reset Game - התחל מחדש</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    padding: 15,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A6572',
  },
  gameContainer: {
    flex: 1,
    padding: 15,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordCard: {
    width: width * 0.44,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageCard: {
    width: width * 0.44,
    height: 120,
    backgroundColor: 'white',
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
    borderColor: '#2196F3',
  },
  matchedCard: {
    borderWidth: 3,
    borderColor: '#4CAF50',
    opacity: 0.7,
  },
  englishWord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  hebrewWord: {
    fontSize: 16,
    color: '#666',
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  matchIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MatchGameScreen; 