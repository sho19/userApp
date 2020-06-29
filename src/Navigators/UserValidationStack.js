import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SigninScreen} from '../screens/SigninScreen';

import {RegisterationScreen} from '../screens/RegisterationScreen';

const UserValidationStack = createStackNavigator();

export function UserValidationStackNavigator() {
  return (
    <NavigationContainer>
      <UserValidationStack.Navigator screenOptions={{headerShown: false}}>
        <UserValidationStack.Screen
          name={'SigninScreen'}
          component={SigninScreen}
        />
        <UserValidationStack.Screen
          name={'RegisterationScreen'}
          component={RegisterationScreen}
        />
      </UserValidationStack.Navigator>
    </NavigationContainer>
  );
}