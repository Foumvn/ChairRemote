import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Remplace l'écran (pas de retour possible)
    }, 3000); // 3 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Fond violet
  },
  logo: {
    width: 200,
    height: 200,
  },
});