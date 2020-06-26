import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SigninScreen} from '../screens/SigninScreen';

import {RegisterationScreen} from '../screens/RegisterationScreen';

const UserValidationStack = createStackNavigator();

export function UserValidationStackNavigator() {
  return (
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
  );
}
{
  /**/
}
{
  /*  <UserValidationStack.Screen*/
}
{
  /*    name={'SignInScreen'}*/
}
{
  /*    component={SignInScreen}*/
}
{
  /*  />*/
}
