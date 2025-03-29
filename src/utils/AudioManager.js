import { Audio } from 'expo-av';

// Configure audio for the app
export const configureAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    console.log('Audio configured successfully');
  } catch (error) {
    console.error('Failed to configure audio', error);
  }
};

// Play a sound file with proper error handling
export const playSound = async (soundFile) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(soundFile);
    await soundObject.playAsync();
    
    // Automatically unload sound when finished
    soundObject.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        soundObject.unloadAsync();
      }
    });
    
    return soundObject;
  } catch (error) {
    console.error('Error playing sound', error);
    return null;
  }
}; 