import React from 'react';
import { View } from 'react-native';
import FortuneCard from './FortuneCard';

const FortuneCards = ({ fortunes, getRandomColor, handlePress, animatedValue, calculateLighterColor, styles }) => {
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
          handlePress={handlePress}
          animatedValue={animatedValue}
          calculateLighterColor={calculateLighterColor}
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
                handlePress={handlePress}
                animatedValue={animatedValue}
                calculateLighterColor={calculateLighterColor}
              />
            );
          });
          rows.push(<View style={styles.row} key={'row-' + data.length}>{row}</View>);
        }
      }
    }

    return rows;
  };

  return (
    <View>
      {renderFortuneCards()}
    </View>
  );
};

export default FortuneCards;
