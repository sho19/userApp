import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a3a3a',
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    marginTop: 2,
  },
  timeSlot: {
    color: '#666',
  },
  separator: {
    backgroundColor: '#ececec',
    height: 1,
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
  },
});

export const Row = ({image, title, subtitle, slotFrom, slotTo, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View>{image && <Image source={image} style={styles.image} />}</View>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {slotTo ? (
        <Text style={styles.timeSlot}>
          Available From:{slotFrom}:00 To: {slotTo}:00
        </Text>
      ) : (
        <Text style={styles.timeSlot}>
          Appointment:{slotFrom}
        </Text>
      )}
    </View>
    <View style={styles.right}></View>
  </TouchableOpacity>
);

export const Separator = () => <View style={styles.separator} />;
