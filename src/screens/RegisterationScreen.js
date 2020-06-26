import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AuthContainer} from '../components/AuthContainer';
import IconButton from '../components/IconButton';
import {Heading} from '../components/Heading';
import ErrorClass from '../components/ErrorClass';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import Loading from '../components/Loading';

export function RegisterationScreen({navigation}) {
  const [email, setEmail] = React.useState('sho19@gmail.com');
  const [password, setPassword] = React.useState('abc');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Heading style={styles.title}>REGISTRATION</Heading>
      <ErrorClass error={error} />

      <IconButton
        style={styles.closeIcon}
        name={'downcircle'}
        onPress={() => {
          navigation.pop();
        }}
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
        // onPress={async () => {
        //   try {
        //     setLoading(true);
        //     await register(email, password);
        //     navigation.pop();
        //   } catch (e) {
        //     setError(e.message);
        //     setLoading(false);
        //   }
        // }}
      />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 40,
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
