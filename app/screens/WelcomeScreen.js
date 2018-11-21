import React from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Body, Spinner, DatePicker } from 'native-base';

export class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    static navigationOptions = {
        title: 'Welcome to EPICtures!',
        headerStyle: {
          backgroundColor: '#6b52ae',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    render() {
        if (this.state.loading) {
            return (
                <Container>
                    <Content>
                        <Spinner color='#6b52ae' />
                    </Content>
                </Container>
            );
        }
        return (
            <Container style={{flexDirection: "row", justifyContent: "center"}}>
                <Content padder>
                    <Text style={{textAlign: 'center'}}>
                        Welcome! EPICtures is an app that displays pictures taken from NASA/DSCOVR's
                        Earth Polychromatic Imaging Camera (EPIC) instrument, a fancy camera sensor
                        way up on a satellite. The app is powered by EPICv2 API from NASA's Open APIs.{"\n"}
                    </Text>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Button onPress={() => this.props.navigation.replace('Main')}>
                            <Text>Show me EPICtures!</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
