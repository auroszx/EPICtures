import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { MainScreen } from './app/screens/MainScreen';
import { DetailScreen } from './app/screens/DetailScreen';
import { WelcomeScreen } from './app/screens/WelcomeScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    else {
      return <RootStack />;
    }
    
  }
}

const RootStack = createStackNavigator({
  Main: MainScreen,
  Detail: DetailScreen,
  Welcome: WelcomeScreen
},
  {
    initialRouteName: 'Welcome',
  }
);
