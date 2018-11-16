import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Body, Spinner } from 'native-base';

export class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
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
        this.state.loading = false;
    }

    parseDate(date) {
        return date.split(" ")[0].split("-").join("/");
    }

    parseDateTime(date) {
        return date.replace(/ /g, "").replace(/-/g, "").replace(/:/g, "");
    }

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
                    <Card dataArray={this.state.data}
                        renderRow={(item) =>
                            <Container style={{height: 200, width: null, flex: 1}}>  
                                <CardItem header bordered>
                                    <Text style={{color: '#6b52ae'}}>{item.date}</Text>
                                </CardItem>
                                <CardItem button bordered onPress={() => {
                                        this.props.navigation.navigate('Detail');
                                    }
                                }>
                                    <Body>
                                        <Image source={{uri: 'https://epic.gsfc.nasa.gov/archive/natural/'+this.parseDate(item.date)+'/thumbs/epic_1b_'+item.identifier+'.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                                    </Body>
                                </CardItem>
                            </Container>
                        }>

                    </Card>
                </Content>
            </Container>
        );
    }
}
