import React from 'react';
import { render } from '@testing-library/react-native';
import { FortuneCard, renderFortuneCards } from './components/FortuneComponents';

// Test FortuneCard component
test('FortuneCard renders correctly', () => {
  const item = {
    text: 'Test Fortune',
    date: new Date().toISOString(),
    color: '#0AB5FF',
  };
  const { getByText } = render(<FortuneCard item={item} style={{}} color={item.color} />);
  
  // Assert that the text content is rendered correctly
  const fortuneText = getByText(item.text);
  expect(fortuneText).toBeTruthy();
  
  // Assert that the date is rendered correctly
  const formattedDate = new Date(item.date).toDateString();
  const dateText = getByText(formattedDate);
  expect(dateText).toBeTruthy();
});

// Test renderFortuneCards function
test('renderFortuneCards renders correct number of FortuneCards', () => {
  const fortunes = [
    {
      text: 'Fortune 1',
      date: new Date().toISOString(),
      color: '#0AB5FF',
    },
    {
      text: 'Fortune 2',
      date: new Date().toISOString(),
      color: '#9146FF',
    },
    {
      text: 'Fortune 3',
      date: new Date().toISOString(),
      color: '#20C09F',
    },
  ];
  
  const { getAllByTestId } = render(renderFortuneCards(fortunes));
  
  // Assert that the correct number of FortuneCards are rendered
  const fortuneCards = getAllByTestId('fortune-card');
  expect(fortuneCards.length).toBe(fortunes.length);
});
