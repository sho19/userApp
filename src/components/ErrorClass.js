import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default function ErrorClass({error}) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
});
