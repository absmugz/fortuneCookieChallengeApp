import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const App = () => {
  const [fortunes, setFortunes] = useState([
    {
      text: "Today it's up to you to create the peacefulness you long for.",
      date: "2021-07-06T22:55:00.037Z"
      },
      {
      text: "If you refuse to accept anything but the best, you very often get it.",
      date: "2021-07-15T15:14:10.890Z"
      },
      {
      text: "A smile is your passport into the hearts of others.",
      date: "2021-07-24T07:33:21.743Z"
      },
      {
      text: "A good way to keep healthy is to eat more Chinese food.",
      date: "2021-08-01T23:52:32.596Z"
      },
      {
      text: "Your high-minded principles spell success.",
      date: "2021-08-10T16:11:43.449Z"
      },
      {
      text: "Hard work pays off in the future, laziness pays off now.",
      date: "2021-08-19T08:30:54.302Z"
      },
      {
      text: "Change can hurt, but it leads a path to something better.",
      date: "2021-08-28T00:50:05.155Z"
      },
      {
      text: "Enjoy the good luck a companion brings you.",
      date: "2021-09-05T17:09:16.008Z"
      },
      {
      text: "People are naturally attracted to you.",
      date: "2021-09-14T09:28:26.861Z"
      },
      {
      text: "Hidden in a valley beside an open stream- This will be the type of place where you will find your dream.",
      date: "2021-09-23T01:47:37.714Z"
      },
      {
      text: "A chance meeting opens new doors to success and friendship.",
      date: "2021-10-01T18:06:48.567Z"
      },
      {
      text: "You learn from your mistakes... You will learn a lot today.",
      date: "2021-10-10T10:25:59.420Z"
      },
      {
      text: "If you have something good in your life, don't let it go!",
      date: "2021-10-19T02:45:10.273Z"
      },
      {
      text: "What ever your goal is in life, embrace it, visualize it, and for sure, it will be yours.",
      date: "2021-10-27T19:04:21.126Z"
      },
      {
      text: "Your shoes will make you happy today.",
      date: "2021-11-05T11:23:31.979Z"
      },
      {
      text: "You cannot love life until you live the life you love.",
      date: "2021-11-14T03:42:42.832Z"
      }
  ]);

  const windowWidth = Dimensions.get('window').width;

  const renderFortuneCards = () => {
    let rows = [];
    let data = [...fortunes];

    while (data.length > 0) {
      // Add a full width item
      let fullWidthItem = data.shift();
      rows.push(
        <View style={styles.fullWidthItem}>
          <Text style={styles.date}>{new Date(fullWidthItem.date).toDateString()}</Text>
          <Text style={styles.fortune}>{fullWidthItem.text}</Text>
        </View>
      );

      // Add a row of two items, if there are still items left
      for (let i = 0; i < 2; i++) {
        if (data.length > 0) {
          let rowItems = data.splice(0, 2);
          let row = rowItems.map((item, index) => (
            <View style={styles.halfWidthItem} key={index}>
              <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
              <Text style={styles.fortune}>{item.text}</Text>
            </View>
          ));
          rows.push(<View style={styles.row}>{row}</View>);
        }
      }
    }

    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fortunes</Text>
      <View>{renderFortuneCards()}</View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fullWidthItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  halfWidthItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    width: '48%', // less than 50% to leave some space between items
  },
  date: {
    fontSize: 12,
    marginBottom: 10,
    color: 'grey',
  },
  fortune: {
    fontSize: 16,
  },
});

export default App;
