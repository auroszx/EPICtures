import React from 'react';
import { Image, Slider } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Spinner } from 'native-base';

export class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, enhancement: 0 };
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

    getEnhancementVal() {
        return this.state.enhancement;
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
                    <Text>https://epic.gsfc.nasa.gov/archive/natural/{this.props.navigation.state.params.dateString}/jpg/epic_1b_{this.props.navigation.state.params.identifier}.jpg</Text>
                    <Image onLoadEnd={() => this.state.loading = false} 
                        source={{uri: 'https://epic.gsfc.nasa.gov/archive/natural/'+this.props.navigation.state.params.dateString+'/jpg/epic_1b_'+this.props.navigation.state.params.identifier+'.jpg'}} 
                        style={{height: 200, width: null, flex: 1, opacity: 1-this.state.enhancement}}/>
                    <Image onLoadEnd={() => this.state.loading = false} 
                        source={{uri: 'https://epic.gsfc.nasa.gov/archive/enhanced/'+this.props.navigation.state.params.dateString+'/jpg/epic_1b_'+this.props.navigation.state.params.identifier+'.jpg'}} 
                        style={{height: 200, width: null, flex: 1, opacity: this.state.enhancement}}/>
                    <Text>Image from:</Text>
                    <Slider value={this.state.enhancement} 
                            onValueChange={enhancement => this.setState({enhancement})} />
                </Content>
            </Container>
        );
    }
}
