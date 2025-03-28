import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

const ChairController = forwardRef((props, ref) => {
  // Animations
  const leftAnim = useRef(new Animated.Value(0)).current;
  const rightAnim = useRef(new Animated.Value(0)).current;
  const verticalAnim = useRef(new Animated.Value(0)).current;

  // Vitesses
  const speed = useRef({
    up: 0,
    down: 0,
    left: 0,
    right: 0
  }).current;

  const stopAll = () => {
    leftAnim.setValue(0);
    rightAnim.setValue(0);
    verticalAnim.setValue(0);
    Object.keys(speed).forEach(k => speed[k] = 0);
  };

  useImperativeHandle(ref, () => ({
    moveChair: (direction) => {
      stopAll();
      
      switch(direction) {
        case 'UP':
          speed.up = 50;
          Animated.timing(verticalAnim, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
        case 'DOWN':
          speed.down = 50;
          Animated.timing(verticalAnim, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
        case 'LEFT':
          speed.left = 30;
          Animated.timing(leftAnim, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
        case 'RIGHT':
          speed.right = 30;
          Animated.timing(rightAnim, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
      }
    },
    stopChair: stopAll,
    getSpeed: () => ({ ...speed })
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.chair,
        { 
          transform: [
            { translateX: Animated.add(leftAnim, rightAnim) },
            { translateY: verticalAnim }
          ]
        }
      ]}>
        <Image 
          source={require('../assets/chair.png')} 
          style={styles.image}
        />
      </Animated.View>
      
      <View style={styles.speedContainer}>
        <Text style={styles.speedText}>↑: {speed.up} | ↓: {speed.down}</Text>
        <Text style={styles.speedText}>←: {speed.left} | →: {speed.right}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30
  },
  chair: {
    width: 150,
    height: 150
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  speedContainer: {
    marginTop: 20
  },
  speedText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default ChairController;