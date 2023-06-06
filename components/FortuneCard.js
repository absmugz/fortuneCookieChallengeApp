import React from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';

const FortuneCard = ({ item, style, color, handlePress, animatedValue, calculateLighterColor }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <Animated.View style={[style, { transform: [{ scale: animatedValue }] }]}>
        <Text style={styles.fortune}>{item.text}</Text>
        <View style={[styles.datePill, { backgroundColor: calculateLighterColor(color) }]}>
          <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  fortune: {
    fontSize: 16,
    color: 'white',
  },
  datePill: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: 'white',
  },
};

export default FortuneCard;
