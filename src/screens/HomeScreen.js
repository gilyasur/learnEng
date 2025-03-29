import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import GameButton from '../components/GameButton';
import GlobalStyles from '../utils/GlobalStyles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Learn English!</Text>
          <Text style={styles.subtitle}>בואו נלמד אנגלית</Text>
        </View>
        
        <View style={styles.characterContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2995/2995620.png' }}
            style={styles.character}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.buttonsContainer}>
          <GameButton 
            title="Vocabulary - אוצר מילים" 
            destination="/vocabulary"
            color="#4CAF50"
            icon={<MaterialCommunityIcons name="book-open-variant" size={30} color="white" />}
          />
          
          <GameButton 
            title="Match Words - התאם מילים" 
            destination="/match"
            color="#FF5722"
            icon={<FontAwesome5 name="puzzle-piece" size={26} color="white" />}
          />
          
          <GameButton 
            title="Say It! - אמור את זה" 
            destination="/speak"
            color="#2196F3"
            icon={<Ionicons name="mic" size={28} color="white" />}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Learning is fun! - ללמוד זה כיף!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 24,
    color: '#4A6572',
    marginTop: 5,
  },
  characterContainer: {
    marginVertical: 20,
  },
  character: {
    width: 150,
    height: 150,
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  footer: {
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    color: '#4A6572',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen; 