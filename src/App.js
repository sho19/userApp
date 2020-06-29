import React from 'react';
import {View, ActivityIndicator, ToastAndroid} from 'react-native';
import {MainStackNavigator} from './Navigators/MainStackNavigator';
import {UserValidationStackNavigator} from './Navigators/UserValidationStack';
import {AuthContext} from './contexts/AuthContext';
import axios from 'axios';
import {UserContext} from './contexts/UserConetext';
import AsyncStorage from '@react-native-community/async-storage';

export default function () {
  const [isLogged, setIsLogged] = React.useState(false);
  const [isloading, setloading] = React.useState(true);
  const [usercontext, setUserContext] = React.useState({});

  React.useEffect(() => {
    _retrieveData();
  }, []);
  const _retrieveData = async () => {
    console.log('called');
    try {
      let value = await AsyncStorage.getItem('@login');
      value = JSON.parse(value);
      console.log('retrie value', value);
      if (value !== null) {
        // We have data!!
        if (value.login == 'true') {
          let data = value.data;
          setUserContext(data);
          setIsLogged(true);
        }
      }
      setloading(false);
    } catch (error) {
      console.log(error, 'callled');
      setloading(false);
      // Error retrieving data
    }
  };
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const options = {
          url:
            'https://myappointmentsystem.herokuapp.com/login?category=customer',
          method: 'POST',
          data: {
            userName: data.email,
            password: data.password,
          },
        };
        setloading(true);
        axios(options)
          .then((response) => {
            let result = response.data;
            console.log(result, 'ee');
            if (result.status == 200) {
              if (
                data.email == result.data.userName &&
                data.password == result.data.password
              ) {
                let newObj = {
                  login: 'true',
                  data: result,
                };
                setUserContext(data);
                AsyncStorage.setItem('@login', JSON.stringify(newObj));
                setIsLogged(true);
              }
            } else if (result.status == 400) {
              ToastAndroid.show(
                response.data.result.toString(),
                ToastAndroid.LONG,
              );
            }
            setloading(false);
          })
          .catch((e) => {
            setloading(false);
            console.log(e, 'ee');
          });
      },
      signUp: (data) => {
        const options = {
          url: 'https://myappointmentsystem.herokuapp.com/signUp',
          method: 'POST',
          data: {
            name: data.name,
            category: 'customer',
            userName: data.email,
            password: data.password,
          },
        };
        setloading(true);
        axios(options)
          .then((response) => {
            let result = response.data;
            console.log(result, 'signup');
            if (result) {
              if (result == 'customercreated succesfully') {
                ToastAndroid.show(
                  'Account created succesfully',
                  ToastAndroid.LONG,
                );
              }
            }
            setloading(false);
          })
          .catch((e) => {
            setloading(false);
            console.log(e, 'ee');
          });
      },
      logout: async (data) => {
        console.log('logout');
        setloading(true);
        try {
          AsyncStorage.removeItem('@login');
          setloading(false);
          setIsLogged(false);
        } catch (exception) {
          setloading(false);
        }
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={usercontext}>
        {isloading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color="black" />
          </View>
        ) : (
          <View style={{flex: 1}}>
            {isLogged ? (
              <MainStackNavigator />
            ) : (
              <UserValidationStackNavigator />
            )}
          </View>
        )}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
