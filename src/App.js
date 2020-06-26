import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackNavigator} from './Navigators/MainStackNavigator';
import axios from 'axios';
import {UserValidationStackNavigator} from './Navigators/UserValidationStack';

const RootStack = createStackNavigator();

export default function () {
  // const auth = React.useMemo(() => ({
  //   login: (email, password) => {
  //     console.log('login', email, password);
  //   },
  //   logout: () => {
  //     console.log('logout');
  //   },
  //   register: async (email, password) => {
  //
  //     await axios.post(`http://localhost:1s337/auth/local/register`, {
  //       username: email,
  //       email: email,
  //       password: password,
  //     });
  //     console.log('register', email, password);
  //   },
  // }));
  /*<NavigationContainer>*/
  /*<MainStackNavigator />*/
  /*</NavigationContainer>*/
  return (
      <MainStackNavigator />
  );
}
