import { StyleSheet } from 'react-native';

// Global styles to be used across all screen components
const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 7,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginLeft: 15,
  },
  container: {
    padding: 15,
    paddingBottom: 30,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemCard: {
    width: '44%',
    height: 180,
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
    justifyContent: 'center',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  itemImage: {
    width: 120,
    height: 100,
    marginBottom: 2,
    resizeMode: 'contain',
  },
  localItemImage: {
    width: 130,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  englishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    textAlign: 'center',
  },
  hebrewName: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  selectedItemPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF6B6B',
    padding: 15,
  },
  selectedImage: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
  },
  localSelectedImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 0,
    overflow: 'hidden',
  },
  selectedEnglishName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedHebrewName: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  soundButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalStyles; 