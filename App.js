import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, Animated, TouchableOpacity, TextInput } from 'react-native';
import fortunesData from './fortunesData';

const App = () => {
  const [fortunes, setFortunes] = useState(fortunesData);

  const [selectedFortune, setSelectedFortune] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddFortuneModalVisible, setIsAddFortuneModalVisible] = useState(false);
  const [newFortuneText, setNewFortuneText] = useState("");
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

      let fullWidthItem = data.shift();
      rows.push(
        <FortuneCard
          item={fullWidthItem}
          color={color}
          style={[styles.fullWidthItem, { backgroundColor: color }]}
          key={fullWidthItem.date}
        />
      );

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

  const addFortune = () => {
    if (newFortuneText) {
      const newFortune = {
        text: newFortuneText,
        date: new Date().toISOString(),
        color: getRandomColor(),
      };
      setFortunes([...fortunes, newFortune]);
      setNewFortuneText('');
      setModalVisible(false);
    }
  };


  const FortuneCard = ({ item, style, color }) => {
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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fortunes</Text>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsAddFortuneModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity></View>
      <ScrollView>{renderFortuneCards()}</ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <View style={styles.closeButton}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>x</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>{selectedFortune?.text}</Text>
              <View style={styles.modalDatePill}>
                <Text style={styles.modalDate}>
                  {new Date(selectedFortune?.date).toDateString()}
                </Text>
              </View>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => setModalVisible(!isModalVisible)}
              >
                {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddFortuneModalVisible}
        onRequestClose={() => setIsAddFortuneModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContentAdd}>
              <Text style={styles.modalTitle}>Add Fortune</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Enter your fortune..."
                value={newFortuneText}
                onChangeText={setNewFortuneText}
              />
              <TouchableOpacity style={styles.modalButton} onPress={addFortune}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsAddFortuneModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



    </View>
  );
};

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
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: '#0AB5FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTextInput: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#0AB5FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
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
  modalView: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: "100%"
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalContentAdd: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  modalContentWrapper: {
    position: 'relative',
    backgroundColor: '#0AB5FF',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalDatePill: {
    backgroundColor: '#0AB5FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  modalDate: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#0AB5FF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});



export default App;
