import React from 'react';
import { 
  Text, 
  StyleSheet, 
  Pressable, 
  Animated, 
  Dimensions
} from 'react-native';
import { useNavigate } from 'react-router-native';
import GlobalStyles from '../utils/GlobalStyles';

const { width } = Dimensions.get('window');

const GameButton = ({ title, destination, color, icon }) => {
  const navigate = useNavigate();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigate(destination);
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color || '#FF9D5C' },
      ]}
    >
      <Animated.View
        style={[
          styles.content,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {icon}
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.85,
    height: 100,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
});

export default GameButton; 