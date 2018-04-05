import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Spinner, Input, Card, CardSection, Button } from './common';

class LoginForm extends Component {

state = { email: '', password: '', error: '', loading: false };

onButtonPress() {
  this.setState({ error: '', loading: true });
  const { email, password } = this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
    });
}

onLoginSuccess() {
  this.setState({ email: '', password: '', error: '', loading: false });
}

onLoginFail() {
  this.setState({ error: 'Authentication Failed', loading: false });
}

renderButton() {
  if (this.state.loading) {
    return <Spinner />;
  }
  return (
    <Button onPress={this.onButtonPress.bind(this)} > Log In </Button>
  );
}

  render() {
    return (
      <Card>
        <CardSection>
          <Input
          placeholder='xyz@gmail.com'
          label='Email:'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
          secureTextEntry
          placeholder='password'
          label='Password:'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
     color: 'red',
     fontSize: 20,
     alignSelf: 'center'
  }
};

export default LoginForm;