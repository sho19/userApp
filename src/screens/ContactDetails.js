import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Platform,
  Button,
  Text,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FilledButton from '../components/FilledButton';
import ErrorClass from '../components/ErrorClass';
import {Loading} from '../components/Loading';
import axios from 'axios';
import {UserContext} from '../contexts/UserConetext';
import {color} from 'react-native-reanimated';

export default function ContactDetails({route}) {
  const index = route.params.index;
  const fromTime = route.params.user.timeSlot.from;
  const toTime = route.params.user.timeSlot.to;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [error, setError] = React.useState('');
  const [isloading, setloading] = React.useState(false);
  const userData = React.useContext(UserContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
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

  const bookAppointment = (email) => {
    let [fromHr, fromMin] = fromTime.split(':');
    fromHr = parseInt(fromHr);
    fromMin = parseInt(fromMin);
    let [toHr, toMin] = toTime.split(':');
    toHr = parseInt(toHr);
    toMin = parseInt(toMin);
    let curHr = parseInt(date.getHours());
    let curMin = parseInt(date.getMinutes());

    var rs1 = fromHr <= curHr && curHr < toHr;
    var rs2 = curHr + 1 > toHr && curMin < toMin;
    var rs3 = curHr - 1 < fromHr && curMin > fromMin;

    if (rs1 || rs2 || rs3) {
      setloading(true);
      let bookingDate = `${('0' + date.getDate()).slice(-2)}-${(
        '0' + date.getMonth()
      ).slice(-2)}-${date.getFullYear()}`;
      let bookingTime = `${('0' + date.getHours()).slice(-2)}:${(
        '0' + date.getMinutes()
      ).slice(-2)}`;

      const options = {
        url: `https://myappointmentsystem.herokuapp.com/bookAppointments/${userData.data.userName}/${email}`,
        method: 'POST',
        data: {
          email: userData.data.userName,
          date: bookingDate,
          time: bookingTime,
        },
      };
      axios(options)
        .then((response) => {
          let result = response.data;
          console.log(result, 'this one');
          if (result == 'updated sucessfully') {
            console.log(response.toString());
            ToastAndroid.show('Appointment Booked', ToastAndroid.LONG);
          }
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          console.log(error, 'ee');
        });
    } else {
      ToastAndroid.show('select a different time slot', ToastAndroid.LONG);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://randomuser.me/api/portraits/med/men/${index}.jpg`,
          }}
          style={styles.image}
        />
        {isloading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color="black" />
          </View>
        ) : (
          <View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                {route.params.user.description}
              </Text>
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
                  onPress={() => bookAppointment(route.params.user.userName)}
                  title="Book Apointment"
                />
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
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
