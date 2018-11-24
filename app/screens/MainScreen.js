import React from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Body, Spinner, DatePicker } from 'native-base';

export class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, date: null };
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
                data: responseJson.reverse()
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

    returnValueFromKey(obj, key) {
        return obj[key];
    }

    convertDate(d) {
        var getMonth = function(date) {
          var month = date.getMonth() + 1;
          return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
        } 
        if(d) {
            var date = new Date(d);
            if (date.getDate() < 10) {
                return ((date.getFullYear()) + '-' + (getMonth(date)) + '-' + '0' + date.getDate());
            }
            else {

                return ((date.getFullYear()) + '-' + (getMonth(date)) + '-' + date.getDate());
            }
        }
            return '';    
    };

    async searchByDate(date) {
        //this.state.loading = true;
        await fetch('https://epic.gsfc.nasa.gov/api/natural/date/'+this.convertDate(date), {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                data: responseJson.reverse()
            });
        })
        .catch((error) => {
            console.error(error);
        });
        //this.state.loading = false;
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
                    <DatePicker
                        defaultDate={new Date()}
                        maximumDate={new Date()}
                        locale={"en"}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date to search in the EPIC archive"
                        textStyle={{ color: "#6b52ae" }}
                        placeHolderTextStyle={{ color: "#000" }}
                        onDateChange={date => this.searchByDate(date)}
                    />
                    <Card dataArray={this.state.data}
                        renderRow={(item) =>
                            <View>
                                    <Container style={{height: 200, width: null, flex: 1}}>  
                                        <CardItem header bordered>
                                            <Text style={{color: '#6b52ae'}}>{item.date}</Text>
                                        </CardItem>
                                        <CardItem cardBody button onPress={() => {
                                                this.props.navigation.navigate('Detail', 
                                                                                { 
                                                                                    dateString: this.parseDate(item.date), 
                                                                                    identifier: item.identifier,
                                                                                    center_lat: this.returnValueFromKey(this.returnValueFromKey(item, "coords").centroid_coordinates, "lat"),
                                                                                    center_lon: this.returnValueFromKey(this.returnValueFromKey(item, "coords").centroid_coordinates, "lat"),
                                                                                    satellite_lat: this.returnValueFromKey(this.returnValueFromKey(item, "coords").dscovr_j2000_position, "x"),
                                                                                    satellite_lon: this.returnValueFromKey(this.returnValueFromKey(item, "coords").dscovr_j2000_position, "y"),
                                                                                    moon_lat: this.returnValueFromKey(this.returnValueFromKey(item, "coords").lunar_j2000_position, "x"),
                                                                                    moon_lon: this.returnValueFromKey(this.returnValueFromKey(item, "coords").lunar_j2000_position, "y"),
                                                                                    sun_lat: this.returnValueFromKey(this.returnValueFromKey(item, "coords").sun_j2000_position, "x"),
                                                                                    sun_lon: this.returnValueFromKey(this.returnValueFromKey(item, "coords").sun_j2000_position, "y"),
                                                                                });
                                            }
                                        }>
                                            <Image source={{uri: 'https://epic.gsfc.nasa.gov/archive/natural/'+this.parseDate(item.date)+'/thumbs/epic_1b_'+item.identifier+'.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                                        </CardItem>
                                    </Container>
                                
                            </View>
                        }>

                    </Card>
                </Content>
            </Container>
        );
    }
}
