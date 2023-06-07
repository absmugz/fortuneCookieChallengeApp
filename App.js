import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, StyleSheet } from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      setTimeout(() => setModalVisible(true), 500);
    });
  }

  const handleClose = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      setTimeout(() => setModalVisible(false), 500);
    });
  }

  const animatedStyle = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5]
        })
      },
      {
        scaleY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5]
        })
      }
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 0]
    }),
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>Press me</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>I'm a modal</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.text}>Close me</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#0AB5FF',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default App;
