import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChairController from '../components/ChairController'; // Chemin relatif corrigé
export default function HomeScreen() {
  const chairRef = useRef();

  const handlePress = (direction) => {
    chairRef.current?.moveChair(direction);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONTROLE DE LA CHAISE</Text>
      
      <ChairController ref={chairRef} />

      <View style={styles.controls}>
        {/* Bouton Haut */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handlePress('UP')}
        >
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>

        {/* Boutons Gauche/Droite */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handlePress('LEFT')}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.centerButton]} 
            onPress={() => handlePress('FRONT')}
          >
            <Text style={styles.buttonText}>AVANT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handlePress('RIGHT')}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bouton Bas */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handlePress('DOWN')}
        >
          <Ionicons name="arrow-down" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  controls: {
    marginTop: 30,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#333',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  centerButton: {
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});