import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

const ChairController = forwardRef((props, ref) => {
  const verticalAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useImperativeHandle(ref, () => ({
    moveChair: (direction) => {
      verticalAnim.setValue(0);
      scaleAnim.setValue(1);

      switch(direction) {
        case 'UP':
          Animated.timing(verticalAnim, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
        case 'DOWN':
          Animated.timing(verticalAnim, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
        case 'FRONT':
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
        case 'BACK':
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true
          }).start();
          break;
      }
    }
  }));

  return (
    <Animated.View style={[
      styles.container,
      { 
        transform: [
          { translateY: verticalAnim },
          { scale: scaleAnim }
        ]
      }
    ]}>
      <Image 
        source={require('../assets/chair.png')} 
        style={styles.image}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    marginBottom: 40
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default ChairController;