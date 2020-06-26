import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';

export default function TextButton({title, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'purple',
    fontWeight: '500',
    fontSize: 13,
  },
});
