import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChairController from '../components/ChairController';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const chairRef = useRef();
  const [speedCounters, setSpeedCounters] = useState({
    up: 0,
    down: 0,
    left: 0,
    right: 0,
  });

  // Exemple de fonction pour gérer les pressions de boutons
  const handlePress = (direction) => {
    chairRef.current.startAnimation(direction);
  };

  

  const handleStop = () => {
    if (chairRef.current) {
      chairRef.current.resetToCenter();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>COMMANDE CHAISE</Text>

      {/* Chaise CENTRÉE avec boutons intégrés */}
      <View style={styles.chairSection}>
        <ChairController ref={chairRef} />
        
        {/* Boutons autour de la chaise */}
        <View style={styles.controlsWrapper}>
          {/* Bouton Haut */}
          <TouchableOpacity 
            style={[styles.button, styles.topButton]} 
            onPress={() => handlePress('UP')}
          >
            <Ionicons name="arrow-up" size={24} color="white" />
          </TouchableOpacity>

          {/* Bouton Gauche */}
          <TouchableOpacity 
            style={[styles.button, styles.leftButton]} 
            onPress={() => handlePress('LEFT')}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Bouton STOP (centré) */}
          <TouchableOpacity 
            style={[styles.button, styles.stopButton]} 
            onPress={handleStop}
          >
            <Text style={styles.buttonText}>STOP</Text>
          </TouchableOpacity>

          {/* Bouton Droite */}
          <TouchableOpacity 
            style={[styles.button, styles.rightButton]} 
            onPress={() => handlePress('RIGHT')}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>

          {/* Bouton Bas */}
          <TouchableOpacity 
            style={[styles.button, styles.bottomButton]} 
            onPress={() => handlePress('DOWN')}
          >
            <Ionicons name="arrow-down" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Compteurs en bas */}
      <View style={styles.speedDisplay}>
        {/* Affichage des compteurs (ajoutez votre logique ici) */}
        <Text style={styles.counterText}>Up: {speedCounters.up}</Text>
        <Text style={styles.counterText}>Down: {speedCounters.down}</Text>
        <Text style={styles.counterText}>Left: {speedCounters.left}</Text>
        <Text style={styles.counterText}>Right: {speedCounters.right}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  title: {
    color: '#0F0',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chairSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Pour positionner les boutons absolument
  },
  controlsWrapper: {
    position: 'absolute',
    width: width * 0.7,
    aspectRatio: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  topButton: {
    top: 0,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  leftButton: {
    left: 0,
    top: '50%',
    transform: [{ translateY: -25 }],
  },
  rightButton: {
    right: 0,
    top: '50%',
    transform: [{ translateY: -25 }],
  },
  bottomButton: {
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  stopButton: {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    backgroundColor: '#F00',
    width: 60,
    height: 60,
  },
  speedDisplay: {
    marginTop: 20,
    alignItems: 'center',
  },
  counterText: {
    color: '#FFF',
    fontSize: 16,
  },
});