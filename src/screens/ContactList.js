import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Row, Separator} from '../components/Row';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../contexts/AuthContext';
import {UserContext} from '../contexts/UserConetext';

export default function ContactList({navigation}) {
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
  const [clients, setclients] = useState([]);
  const [filteredclients, setFilteredclients] = useState([]);
  const {logout} = React.useContext(AuthContext);
  useEffect(() => {
    console.log('read');
    axios
      .get(`https://myappointmentsystem.herokuapp.com/getAllServiceProvider`)
      .then((res) => {
        let data = res.data.filter(function (item) {
          return item.hasOwnProperty('timeSlot');
        });
        setclients(data);
        setFilteredclients(data);
        console.log(data);
        setisLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setFilteredclients(
      clients.filter((user) =>
        user.name.toLowerCase().includes(searchField.toLowerCase()),
      ),
    );
  }, [searchField]);

  return (
    <View style={styles.viewStyle}>
      {isloading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.textInputStyle}
                value={searchField}
                onChangeText={(text) => setSearchField(text)}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
              />
            </View>
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
            data={filteredclients}
            keyExtractor={(item) => {
              return `${item._id}`;
            }}
            renderItem={({item, index}) => {
              const name = `${item.name}`;

              return (
                <Row
                  image={{
                    uri: `https://randomuser.me/api/portraits/thumb/men/${index}.jpg`,
                  }}
                  title={name}
                  subtitle={item.userName}
                  slotFrom={item.timeSlot.from}
                  slotTo={item.timeSlot.to}
                  onPress={() =>
                    navigation.push('ContactDetails', {
                      user: item,
                      index: index,
                    })
                  }
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
