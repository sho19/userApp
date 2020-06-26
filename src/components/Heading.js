import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const Heading = ({children, style, ...props}) => (
  <Text {...props} style={[styles.text, style]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
  },
});
