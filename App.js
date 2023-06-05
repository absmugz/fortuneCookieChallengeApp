import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native';
import fortunesData from './fortunesData';

const App = () => {
  const [fortunes, setFortunes] = useState(fortunesData);

  const [selectedFortune, setSelectedFortune] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const animatedValue = new Animated.Value(1);

  const windowWidth = Dimensions.get('window').width;

  const colors = [
    '#0AB5FF',
    '#9146FF',
    '#20C09F',
    '#0066FF',
    '#5A34F3',
    '#00C1CD',
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculateLighterColor = (color) => {
    let c = color.substring(1);
    let rgb = parseInt(c, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;

    let lighterColor = ((r * 0.8) << 16) | ((g * 0.8) << 8) | (b * 0.8);
    return '#' + (0x1000000 + lighterColor).toString(16).slice(1)
  }

  const renderFortuneCards = () => {
    let rows = [];
    let data = [...fortunes];

    while (data.length > 0) {
      let color = getRandomColor();

      // Add a full width item
      let fullWidthItem = data.shift();
      rows.push(
        <FortuneCard
          item={fullWidthItem}
          color={color}
          style={[styles.fullWidthItem, { backgroundColor: color }]}
          key={fullWidthItem.date}
        />
      );

      // Add a row of two items, if there are still items left
      for (let i = 0; i < 2; i++) {
        if (data.length > 0) {
          let rowItems = data.splice(0, 2);
          let row = rowItems.map((item, index) => {
            let halfWidthColor = getRandomColor();
            return (
              <FortuneCard
                item={item}
                color={halfWidthColor}
                style={[styles.halfWidthItem, { backgroundColor: halfWidthColor }]}
                key={item.date}
              />
            );
          });
          rows.push(<View style={styles.row} key={'row-' + data.length}>{row}</View>);
        }
      }
    }

    return rows;
  };


  const handlePress = (fortune) => {
    Animated.spring(animatedValue, {
      toValue: .95,
      useNativeDriver: true
    }).start(() => {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true
      }).start(() => {
        setSelectedFortune(fortune);
        setModalVisible(true);
      });
    });
  }

  const FortuneCard = ({ item, style, color }) => { // Add color to the props
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
  }

  // Update your renderFortuneCards to use FortuneCard component

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fortunes</Text>
      <ScrollView>{renderFortuneCards()}</ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedFortune?.text}</Text>
            <Text style={styles.modalDate}>{new Date(selectedFortune?.date).toDateString()}</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Add styles for modal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fullWidthItem: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    height: 200,
  },
  halfWidthItem: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    width: '48%',
    height: 200,
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
  fortune: {
    fontSize: 16,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalDate: {
    marginBottom: 15,
    textAlign: "center",
    color: 'grey'
  }
});

export default App;
