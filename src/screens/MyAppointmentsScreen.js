import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Row, Separator} from '../components/Row';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../contexts/AuthContext';
import {UserContext} from '../contexts/UserConetext';
import {AuthContainer} from '../components/AuthContainer';
import IconButton from '../components/IconButton';
import {Heading} from '../components/Heading';
import ErrorClass from '../components/ErrorClass';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import Loading from '../components/Loading';

export function MyAppointmentsScreen({navigation}) {
  const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      padding: 10,
      paddingBottom: 0,
      height: '100%',
    },
    textStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 10,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
  });

  const [searchField, setSearchField] = useState('');
  const [isloading, setisLoading] = useState(true);
  const [filteredclients, setFilteredclients] = useState([]);
  const userData = React.useContext(UserContext);
  const {logout} = React.useContext(AuthContext);

  useEffect(() => {
    console.log('read');
    axios
      .get(
        `https://myappointmentsystem.herokuapp.com/appointments/${userData.data.userName}?category=customer`,
      )
      .then((res) => {
        setFilteredclients(res.data);
        console.log(res.data);
        setisLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <View style={styles.viewStyle}>
      {isloading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
                style={{
                  marginHorizontal: 4,
                  marginVertical: 4,
                }}>
                <MaterialCommunityIcons
                  name={'logout'}
                  size={30}
                  color="#009688"
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={filteredclients[0].myBookings}
            keyExtractor={(item) => {
              return `${item.date}-${item.time}}`;
            }}
            renderItem={({item, index}) => {
              const name = `${item.name}`;

              return (
                <Row
                  title={item.clientName}
                  subtitle={item.date}
                  slotFrom={item.time}
                />
              );
            }}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={() => <Separator />}
            ListFooterComponent={() => <Separator />}
            contentContainerStyle={{paddingVertical: 20}}
          />
        </View>
      )}
    </View>
  );
}
