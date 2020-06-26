import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function IconButton({name, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={name} size={30} color={'purple'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
