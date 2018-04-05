import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { CardSection, Button, Spinner, Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyCD2akpJNMKn4WBgcYCY4k22QOCqFYerRo',
    authDomain: 'authentication-df267.firebaseapp.com',
    databaseURL: 'https://authentication-df267.firebaseio.com',
    projectId: 'authentication-df267',
    storageBucket: 'authentication-df267.appspot.com',
    messagingSenderId: '478955852187'
  });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  });
  }


renderContent() {
  switch (this.state.loggedIn) {
    case true: return (
                <CardSection>
                <Button onPress={() => firebase.auth().signOut()}> Log Out </Button>
                </CardSection>
                );
    case false: return (
                  <LoginForm />
                );
    default: return (
                <View style={{ flex: 1 }}>
                <Spinner />
                </View>
                );
  }
}

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header headerText='Authentication' />
      {this.renderContent()}
      </View>
    );
  }
}

// const styles = {
//
//   textStyle: {
//       fontWeight: 'bold',
//       fontSize: 30,
//       color: 'red',
//   }
// };
//
export default App;
