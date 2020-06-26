import React, { Component } from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

import commonStyles from '../commonStyles';
import  todayImage from '../../assets/imgs/today.jpg';

import moment from 'moment';
import 'moment/locale/pt-br'

export default class TaskList extends Component {
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}> 
                <Text>Tasks List</Text>
            </View>
            
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 25
    },
    background: {
        flex: 3
    },
    taskList:{
        flex: 7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle:{
        fontFamily: '',
        fontSize: 20,
        color: commonStyles.colors.secundary,
        marginLeft: 20,
        marginBottom: 30
    }
    
})