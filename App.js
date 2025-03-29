import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { useEffect } from 'react';
import { configureAudio } from './src/utils/AudioManager';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import AnimalGameScreen from './src/screens/AnimalGameScreen';
import FruitsScreen from './src/screens/FruitsScreen';
import VegetablesScreen from './src/screens/VegetablesScreen';
import MatchGameScreen from './src/screens/MatchGameScreen';
import PronunciationScreen from './src/screens/PronunciationScreen';
import ColorsScreen from './src/screens/ColorsScreen';
import FamilyScreen from './src/screens/FamilyScreen';
import BodyPartsScreen from './src/screens/BodyPartsScreen';
import ClothingScreen from './src/screens/ClothingScreen';
import NumbersScreen from './src/screens/NumbersScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import EmotionsScreen from './src/screens/EmotionsScreen';
import TransportationScreen from './src/screens/TransportationScreen';
import ToysScreen from './src/screens/ToysScreen';

export default function App() {
  useEffect(() => {
    // Initialize audio when app starts
    configureAudio();
  }, []);

  return (
    <View style={styles.container}>
      <NativeRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/vocabulary" element={<VocabularyScreen />} />
          <Route path="/animals" element={<AnimalGameScreen />} />
          <Route path="/fruits" element={<FruitsScreen />} />
          <Route path="/vegetables" element={<VegetablesScreen />} />
          <Route path="/match" element={<MatchGameScreen />} />
          <Route path="/speak" element={<PronunciationScreen />} />
          <Route path="/colors" element={<ColorsScreen />} />
          <Route path="/family" element={<FamilyScreen />} />
          <Route path="/body" element={<BodyPartsScreen />} />
          <Route path="/clothing" element={<ClothingScreen />} />
          <Route path="/numbers" element={<NumbersScreen />} />
          <Route path="/weather" element={<WeatherScreen />} />
          <Route path="/emotions" element={<EmotionsScreen />} />
          <Route path="/transportation" element={<TransportationScreen />} />
          <Route path="/toys" element={<ToysScreen />} />
        </Routes>
      </NativeRouter>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background that kids like
  },
});
