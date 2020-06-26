import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SigninScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={'SignInScreen'} component={SignInScreen} />
    </AuthStack.Navigator>
  );
}
