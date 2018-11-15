import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Button, Text, Card, CardItem, List } from 'native-base';

export class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'textico' };
    }

    static navigationOptions = {
        title: 'EPICtures',
        headerStyle: {
          backgroundColor: '#6b52ae',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    componentDidMount = () => {
        fetch('https://epic.gsfc.nasa.gov/api/natural', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                data: responseJson
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <Container style={{flexDirection: "row", justifyContent: "center"}}>
                <Content>
                    <Card dataArray={this.state.data}
                        renderRow={(item) =>
                            <CardItem header>
                                <Text>{item.date}</Text>
                            </CardItem>
                        }>
                            <CardItem cardBody>
                                <Image source={{uri: 'https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/thumbs/epic_1b_20151031074844.png'}}/>
                            </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
