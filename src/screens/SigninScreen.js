import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Heading} from '../components/Heading';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
// import {TextButton} from '../components/TextButton';
import {AuthContainer} from '../components/AuthContainer';
import ErrorClass from '../components/ErrorClass';
import TextButton from '../components/TextButton';

export function SigninScreen({navigation}) {
  const [email, setEmail] = React.useState('bithovendev@gmail.com');
  const [password, setPassword] = React.useState('abc');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Heading style={styles.title}>LOGIN</Heading>
      <ErrorClass error={error} />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Login'}
        style={styles.loginButton}
        // onPress={async () => {
        //   try {
        //     setLoading(true);
        //     await login(email, password);
        //   } catch (e) {
        //     setError(e.message);
        //     setLoading(false);
        //   }
        // }}
      />
      <TextButton
        title={'Create an account'}
        onPress={() => {
          navigation.navigate('RegisterationScreen');
        }}
      />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});
