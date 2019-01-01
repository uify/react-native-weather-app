import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';

import IconFA from 'react-native-vector-icons/FontAwesome'
import Icon from '../../helpers/weatherIcons/weatherIcon';
import moment from 'moment'

import { forecast } from '../../helpers/api'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: null
        }
    }
    
    componentDidMount() {
        forecast('51.52', '-0.11', (d) => {
            console.log(d)
            this.setState({
                forecast: d
            })
        })
    }

    renderElement = ({item}) => {
        console.log(item)
        return (
            <View style={styles.containerForecast}>
                <View style={styles.iconForecast}>
                    <Icon 
                        name="wi-day-sunny"
                        size={50}
                    />
                </View>
                <View style={styles.tempreatureForecast}>
                    <Text>{item.day.mintemp_c}º ~ {item.day.maxtemp_c}º</Text>
                </View>
                <View style={styles.dayForecast}>
                    <Text>{moment(item.date).format('dddd')}</Text>
                </View>
            </View>
        )
    }
    
    render() {
        if (this.state.forecast !== null) {
            const { current, location, forecast} = this.state.forecast
            return (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.placeName}>
                            <IconFA 
                                name="map-marker"
                                size={18}
                                color="white"
                            />
                            <Text style={styles.placeText}>{location.name}</Text>
                        </View>
                        <View style={styles.currentContainer}>
                            <Text style={styles.temperatureNumber}>{current.temp_c}º</Text>
                            <View style={styles.conditionCurrentTemperature}>
                                <Icon 
                                    name="wi-day-sunny"
                                    size={40}
                                    color="white"
                                />
                                <Text style={styles.conditionCurrentText}>{current.condition.text.toLowerCase()}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <FlatList 
                            style={styles.listForecast}
                            horizontal
                            data={forecast.forecastday}
                            renderItem={this.renderElement}
                            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6BAFF9',
        paddingTop: 80,
        paddingBottom: 90,
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
    },
    placeName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    placeText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'white'
    },
    temperatureNumber: {
        fontSize: 100,
        color: 'white',
        fontWeight: '400'
    },
    currentContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    conditionCurrentTemperature: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    conditionCurrentText: {
        color: 'white',
        fontSize: 15
    },
    listForecast: {
        paddingLeft: 40
    },
    containerForecast: {
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: 'rgba(208, 212, 222, 0.5)'
    },
    iconForecast: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tempreatureForecast: {
        justifyContent: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center'
    },
    dayForecast: {
        paddingTop: 10,
        alignItems: 'center'
    },
    separator: {
        marginLeft: 20,
    }
})

export default Home;