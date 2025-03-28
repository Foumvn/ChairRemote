import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Vibration, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import ChairController from '../components/ChairController';

export default function HomeScreen() {
  const chairRef = useRef();
  const soundRef = useRef();
  const [speedCounters, setSpeedCounters] = useState({
    up: 0,
    down: 0,
    left: 0,
    right: 0
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Charger le son
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/click.mp3')
      );
      soundRef.current = sound;
    };
    loadSound();
    return () => soundRef.current?.unloadAsync();
  }, []);

  const handlePress = async (direction) => {
    Vibration.vibrate(50);
    await soundRef.current?.replayAsync();
    chairRef.current?.moveChair(direction);
    
    // Animation apparition compteur
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleStop = async () => {
    Vibration.vibrate(100);
    await soundRef.current?.replayAsync();
    chairRef.current?.stopChair();
    
    // Reset compteurs
    setSpeedCounters({
      up: 0,
      down: 0,
      left: 0,
      right: 0
    });
  };

  // Mise à jour des compteurs
  useEffect(() => {
    const interval = setInterval(() => {
      if (chairRef.current) {
        const speeds = chairRef.current.getSpeed();
        setSpeedCounters(prev => ({
          up: speeds.up > 0 ? prev.up + 1 : prev.up,
          down: speeds.down > 0 ? prev.down + 1 : prev.down,
          left: speeds.left > 0 ? prev.left + 1 : prev.left,
          right: speeds.right > 0 ? prev.right + 1 : prev.right
        }));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Titre */}
      
      {/* Chaise + Compteurs */}
      <View style={styles.chairContainer}>
        <ChairController ref={chairRef} />
        
        <Animated.View style={[styles.speedDisplay, { opacity: fadeAnim }]}>
          <View style={styles.speedRow}>
            <Text style={styles.speedLabel}>↑</Text>
            <Text style={styles.speedValue}>{speedCounters.up}</Text>
          </View>
          <View style={styles.speedRow}>
            <Text style={styles.speedLabel}>↓</Text>
            <Text style={styles.speedValue}>{speedCounters.down}</Text>
          </View>
          <View style={styles.speedRow}>
            <Text style={styles.speedLabel}>←</Text>
            <Text style={styles.speedValue}>{speedCounters.left}</Text>
          </View>
          <View style={styles.speedRow}>
            <Text style={styles.speedLabel}>→</Text>
            <Text style={styles.speedValue}>{speedCounters.right}</Text>
          </View>
        </Animated.View>
      </View>

      {/* Contrôles directionnels */}
      <View style={styles.controls}>
        {/* Bouton Haut */}
        <TouchableOpacity 
          style={[styles.button, styles.topButton]} 
          onPress={() => handlePress('UP')}
        >
          <Ionicons name="arrow-up" size={32} color="white" />
        </TouchableOpacity>

        {/* Ligne centrale */}
        <View style={styles.middleRow}>
          <TouchableOpacity 
            style={[styles.button, styles.sideButton]} 
            onPress={() => handlePress('LEFT')}
          >
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.stopButton]} 
            onPress={handleStop}
          >
            <Text style={styles.buttonText}>STOP</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.sideButton]} 
            onPress={() => handlePress('RIGHT')}
          >
            <Ionicons name="arrow-forward" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bouton Bas */}
        <TouchableOpacity 
          style={[styles.button, styles.bottomButton]} 
          onPress={() => handlePress('DOWN')}
        >
          <Ionicons name="arrow-down" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Noir pur
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    color: '#00FF00', // Vert télécommande
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  chairContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  controls: {
    marginBottom: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#555555',
  },
  topButton: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sideButton: {
    width: 70,
    height: 70,
    marginHorizontal: 15,
  },
  stopButton: {
    width: 100,
    height: 70,
    backgroundColor: '#FF0000',
  },
  bottomButton: {
    width: 70,
    height: 70,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  speedDisplay: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  speedRow: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  speedLabel: {
    color: '#00FF00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  speedValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
});