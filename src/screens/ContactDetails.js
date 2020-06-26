import React, {useState} from 'react';
import {Image, StyleSheet, View, Platform, Button} from 'react-native';
import {AuthContainer} from '../components/AuthContainer';
import DateTimePicker from '@react-native-community/datetimepicker';
import FilledButton from '../components/FilledButton';
import ErrorClass from '../components/ErrorClass';

export default function ContactDetails({route}) {
  const user = route.params.user ? route.params.user : 'bhbjk';
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [error, setError] = React.useState('');
  {
    /*<Text>{JSON.stringify(user, null, 2)}</Text>*/
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log(date);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://randomuser.me/api/portraits/med/women/77.jpg'}}
        style={styles.image}
      />
      <View>
        <ErrorClass error={error} />
        <FilledButton
          style={styles.button}
          onPress={showDatepicker}
          title="Pick date"
        />
        <FilledButton
          style={styles.button}
          onPress={showTimepicker}
          title="Pick time"
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        {date > new Date() && (
          <FilledButton
            style={styles.button}
            onPress={showTimepicker}
            title="Book Apointment"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 30,
  },
  title: {
    marginBottom: 40,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
  },
});
