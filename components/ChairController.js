import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';

const ChairController = forwardRef((props, ref) => {
  const leftAnim = useRef(new Animated.Value(0)).current;
  const rightAnim = useRef(new Animated.Value(0)).current;
  const verticalAnim = useRef(new Animated.Value(0)).current;
  const [isMoving, setIsMoving] = useState(false);

  useImperativeHandle(ref, () => ({
    startAnimation(direction) {
      if (isMoving) return; // Empêche de démarrer une nouvelle animation si déjà en mouvement
      setIsMoving(true);

      let animation;

      switch (direction) {
        case 'UP':
          animation = Animated.timing(verticalAnim, { toValue: -10, duration: 500, useNativeDriver: true });
          break;
        case 'DOWN':
          animation = Animated.timing(verticalAnim, { toValue: 10, duration: 500, useNativeDriver: true });
          break;
        case 'LEFT':
          animation = Animated.timing(leftAnim, { toValue: -10, duration: 500, useNativeDriver: true });
          break;
        case 'RIGHT':
          animation = Animated.timing(rightAnim, { toValue: 10, duration: 500, useNativeDriver: true });
          break;
        default:
          return;
      }

      animation.start(() => {
        setIsMoving(false); // Permet de reprendre les mouvements après l'animation
      });
    },
    resetToCenter() {
      // Réinitialiser la chaise au centre uniquement lorsque le bouton STOP est pressé
      Animated.parallel([
        Animated.timing(verticalAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(leftAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(rightAnim, { toValue: 0, duration: 500, useNativeDriver: true })
      ]).start();
    }
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.chair,
        { 
          transform: [
            { translateX: Animated.add(leftAnim, rightAnim) },
            { translateY: verticalAnim },
            { scale: 1.5 }
          ]
        }
      ]}>
        <Image 
          source={require('../assets/chair2.png')}
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
  },
  chair: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ChairController;