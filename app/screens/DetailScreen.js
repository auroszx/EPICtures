import React from 'react';
import { Image, Slider } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Spinner } from 'native-base';

export class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, enhancement: 50 };
    }

    static navigationOptions = {
        title: 'Details',
        headerStyle: {
          backgroundColor: '#6b52ae',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    componentDidMount = () => {
        // fetch('https://epic.gsfc.nasa.gov/api/natural', {
        //     method: 'GET'
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     console.log(responseJson);
        //     this.setState({
        //         data: responseJson
        //     });
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        // this.state.loading = false;
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
                    <Image onLoadEnd={() => this.state.loading = false} 
                        source={{uri: 'https://epic.gsfc.nasa.gov/archive/natural/2018/11/14/jpg/epic_1b_20181114163940.jpg'}} 
                        style={{height: 200, width: null, flex: 1, opacity: 100-this.state.enhancement}}/>
                    <Text>Image from:</Text>
                    <Slider minimumValue={0} maximumValue={100} step={1} value={this.state.enhancement} 
                            onValueChange={(val) => this.setState({enhancement = val})}/>
                </Content>
            </Container>
        );
    }
}
