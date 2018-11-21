import React from 'react';
import { Image, Slider, View } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Spinner } from 'native-base';

export class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, enhancement: 0, hasEnhancement: true };
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

    getEnhancementVal() {
        return this.state.enhancement;
    }

    render() {
        return (
            <Container style={{flexDirection: "row", justifyContent: "center"}}>
                <Content padder>
                    <Image
                        onLoad={() => this.setState({loading: false})}
                        source={{uri: 'https://epic.gsfc.nasa.gov/archive/natural/'+this.props.navigation.state.params.dateString+'/jpg/epic_1b_'+this.props.navigation.state.params.identifier+'.jpg'}} 
                        style={{height: 400, width: null, flex: 1, opacity: 1-this.state.enhancement}}/>
                    
                    {this.state.hasEnhancement && 
                        <View style={{top: -200}}>
                            <Image onError={() => this.state.hasEnhancement = false}
                                    source={{uri: 'https://epic.gsfc.nasa.gov/archive/enhanced/'+this.props.navigation.state.params.dateString+'/jpg/epic_RGB_'+this.props.navigation.state.params.identifier+'.jpg'}} 
                                    style={{height: 400, width: null, flex: 1, opacity: this.state.enhancement, top: -200}}/>
                            <View style={{top: -200}}>
                                <Text style={{textAlign: 'center'}}>Select enhancement</Text>
                                <Text style={{textAlign: 'left'}}>Natural</Text>
                                <Text style={{textAlign: 'right', top: -30}}>Enhanced</Text>
                                <Slider value={this.state.enhancement} 
                                    onValueChange={enhancement => this.setState({enhancement})} />
                            </View>
                        </View>
                    }

                    {!this.state.hasEnhancement &&
                        <Container>
                            <Text>This picture has no enhanced version available.</Text>
                        </Container>
                    }
                    

                    {this.state.loading &&
                        <Container style={{top: -650}}>
                            <Content>
                                <Spinner color='#6b52ae'/>
                            </Content>
                        </Container>
                    }

                    <Text>Picture center coordinates: {this.props.navigation.state.params.center}</Text>
                    <Text>Satellite space position: {this.props.navigation.state.params.satellite}</Text>
                    <Text>Moon space position: {this.props.navigation.state.params.moon}</Text>
                    <Text>Sun space position: {this.props.navigation.state.params.sun}</Text>
                </Content>
            </Container>
        );
    }
}
