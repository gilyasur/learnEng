import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../utils/GlobalStyles';
import CustomScrollView from '../components/CustomScrollView';

const { width } = Dimensions.get('window');

// Category data
const categories = [
  { 
    id: 1, 
    name: 'Animals', 
    hebrewName: 'חיות',
    image: require('../assets/images/category_thumbs/animals.jpg'),
    route: '/animals',
    isLocalImage: true
  },
  { 
    id: 2, 
    name: 'Fruits', 
    hebrewName: 'פירות',
    image: 'https://cdn-icons-png.flaticon.com/512/3194/3194766.png',
    route: '/fruits',
    isLocalImage: false
  },
  { 
    id: 3, 
    name: 'Vegetables', 
    hebrewName: 'ירקות',
    image: require('../assets/images/category_thumbs/veggies.jpg'),
    route: '/vegetables',
    isLocalImage: true
  },
  { 
    id: 4, 
    name: 'Colors', 
    hebrewName: 'צבעים',
    image: require('../assets/images/category_thumbs/colors.jpg'),
    route: '/colors',
    isLocalImage: true
  },
  { 
    id: 5, 
    name: 'Family', 
    hebrewName: 'משפחה',
    image: require('../assets/images/category_thumbs/family.webp'),
    route: '/family',
    isLocalImage: true
  },
  { 
    id: 6, 
    name: 'Body Parts', 
    hebrewName: 'חלקי גוף',
    image: require('../assets/images/category_thumbs/bodyparts.jpg'),
    route: '/body',
    isLocalImage: true
  },
  { 
    id: 7, 
    name: 'Clothing', 
    hebrewName: 'בגדים',
    image: require('../assets/images/category_thumbs/clothes.jpg'),
    route: '/clothing',
    isLocalImage: true
  },
  { 
    id: 8, 
    name: 'Numbers', 
    hebrewName: 'מספרים',
    image: require('../assets/images/category_thumbs/numbers.jpeg'),
    route: '/numbers',
    isLocalImage: true
  },
  { 
    id: 9, 
    name: 'Weather', 
    hebrewName: 'מזג אוויר',
    image: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
    route: '/weather',
    isLocalImage: false
  },
  { 
    id: 10, 
    name: 'Emotions', 
    hebrewName: 'רגשות',
    image: require('../assets/images/category_thumbs/emotions.jpg'),
    route: '/emotions',
    isLocalImage: true
  },
  { 
    id: 11, 
    name: 'Transportation', 
    hebrewName: 'תחבורה',
    image: require('../assets/images/category_thumbs/transportation.jpg'),
    route: '/transportation',
    isLocalImage: true
  },
  { 
    id: 12, 
    name: 'Toys', 
    hebrewName: 'צעצועים',
    image: 'https://cdn-icons-png.flaticon.com/512/3082/3082060.png',
    route: '/toys',
    isLocalImage: false
  }
];

const VocabularyScreen = () => {
  const navigate = useNavigate();

  const handleCategoryPress = (category) => {
    navigate(category.route);
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
        <Text style={GlobalStyles.screenTitle}>Vocabulary - אוצר מילים</Text>
      </View>

      <CustomScrollView contentContainerStyle={GlobalStyles.container}>
        <View style={GlobalStyles.itemsContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={GlobalStyles.itemCard}
              onPress={() => handleCategoryPress(category)}
              delayPressIn={150}
            >
              <Image 
                source={typeof category.image === 'string' ? { uri: category.image } : category.image} 
                style={[
                  category.isLocalImage ? styles.localCategoryImage : GlobalStyles.itemImage,
                  category.id === 11 && styles.transportationImage
                ]} 
                resizeMode={category.isLocalImage ? "cover" : "contain"}
              />
              <View style={GlobalStyles.nameContainer}>
                <Text style={GlobalStyles.englishName}>{category.name}</Text>
                <Text style={GlobalStyles.hebrewName}>{category.hebrewName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Custom styles specific to VocabularyScreen
  localCategoryImage: {
    width: 130,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  transportationImage: {
    width: 150,
    height: 100,
    borderRadius: 12,
  }
});

export default VocabularyScreen; 