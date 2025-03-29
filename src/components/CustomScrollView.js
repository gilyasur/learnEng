import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

/**
 * CustomScrollView component with improved iOS scrolling behavior
 * This component adds consistent scrolling props across the app
 */
const CustomScrollView = ({ children, contentContainerStyle, ...props }) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.defaultContainer, contentContainerStyle]}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}
      directionalLockEnabled={true} // Lock to vertical scrolling only
      keyboardShouldPersistTaps="handled" // Improves scrolling when keyboard is present
      {...props}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    paddingBottom: 30, // Always ensure content at bottom is scrollable
  },
});

export default CustomScrollView; 