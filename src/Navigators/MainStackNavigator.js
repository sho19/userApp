import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactList from '../screens/ContactList';
import ContactDetails from '../screens/ContactDetails';
import {MyAppointmentsScreen} from '../screens/MyAppointmentsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const MainStack = createStackNavigator();
const AppTabs = createBottomTabNavigator();

const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name={'Contacts'}
      component={MainStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Icon name={'ios-contacts'} size={props.size} color={props.color} />
        ),
      }}
    />
    <AppTabs.Screen
      name={'Appointments'}
      component={MyAppointmentsScreen}
      options={{
        tabBarIcon: (props) => (
          <Icon name={'md-list-box'} size={props.size} color={props.color} />
        ),
      }}
    />
  </AppTabs.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={{headerShown: false}}>
    <MainStack.Screen name={'ContactList'} component={ContactList} />
    <MainStack.Screen
      name={'ContactDetails'}
      component={ContactDetails}
      // options={({route}) => {
      //   return {
      //     headerTitle: `${route.params.contact.name.first} ${route.params.contact.name.last}`,
      //   };
      // }}
    />
  </MainStack.Navigator>
);
export function MainStackNavigator() {
  return (
    <NavigationContainer>
      <AppTabsScreen />
    </NavigationContainer>
  );
}
