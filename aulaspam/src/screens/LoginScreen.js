import useState from "react";
import {Text, TextInput, View, StyleSheet, Title} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    
    <View style={styles.container}>
      <Title style={styles.titleStyle}>Login</Title>
      <TextInput
          style={styles.inputStyle}
          placeholder="Insira aqui seu e-mail"
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
      />
      <TextInput
          style={styles.inputStyle}
          placeholder="Insira aqui sua senha"
          keyboardType='text'
          onChangeText={setPassword}
          value={password}
      />
      <Text>
          ijnunuin
      </Text>
    </View>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});