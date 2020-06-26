import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, FlatList} from 'react-native';

import {Row, Separator} from '../components/Row';
import users from '../data/users';

export default function ContactList({navigation}) {
  const styles = StyleSheet.create({
    viewStyle: {
      justifyContent: 'center',
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
  const [clients, setclients] = useState(users);
  const [filteredclients, setFilteredclients] = useState(users);
  const getSystemInfo = () => {
    // fetch('/cpu')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (percent.length >= 10) percent.shift();
    //     percent.push({
    //       second: percent[percent.length - 1].second + 1,
    //       utilization: data.cpuUtilization.percent,
    //     });
    //
    //     data.cpuUtilization.procInfo = data.cpuUtilization.procInfo.brand;
    //     tempData = data.cpuUtilization;
    //     tempData.percent = percent;
    //     setCurrentStats(tempData);
    //   });
  };

  useEffect(() => {
    setFilteredclients(
      clients.filter((user) =>
        user.name.first.toLowerCase().includes(searchField.toLowerCase()),
      ),
    );
  }, [searchField]);

  return (
    <View style={styles.viewStyle}>
      <TextInput
        style={styles.textInputStyle}
        value={searchField}
        onChangeText={(text) => setSearchField(text)}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      <FlatList
        data={filteredclients}
        keyExtractor={(item) => {
          return `${item.id.value}-${item.phone}`;
        }}
        renderItem={({item}) => {
          const name = `${item.name.first} ${item.name.last}`;

          return (
            <Row
              image={{
                uri: 'https://randomuser.me/api/portraits/thumb/women/77.jpg',
              }}
              title={name}
              subtitle={item.email}
              onPress={() => navigation.push('ContactDetails', {user: item})}
            />
          );
        }}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={() => <Separator />}
        ListFooterComponent={() => <Separator />}
        contentContainerStyle={{paddingVertical: 20}}
      />
    </View>
  );
}
