import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {AuthContainer} from '../components/AuthContainer';
import IconButton from '../components/IconButton';
import {Heading} from '../components/Heading';
import ErrorClass from '../components/ErrorClass';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../contexts/AuthContext';

export function RegisterationScreen({navigation}) {
  const {signUp} = React.useContext(AuthContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Heading style={styles.title}>REGISTRATION</Heading>
      <ErrorClass error={error} />

      <Icon
        style={styles.closeIcon}
        name={'md-close-circle'}
        size={26}
        color={'#009688'}
        onPress={() => {
          navigation.pop();
        }}
      />

      <Input
        style={styles.input}
        placeholder={'Name'}
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <FilledButton
        title={'Register'}
        style={styles.loginButton}
        onPress={() => {
          if (name != '' && email != '' && password != '')
            signUp({name, email, password});
          else ToastAndroid.show('Please fill all details', ToastAndroid.LONG);
        }}
      />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
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
});
