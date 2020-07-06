import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { showError } from '../common';




export default class AuthOrApp extends Component{

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (e) {
            showError(e) //userData está invalido
        }
        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate("Home", userData)
        }else{
            this.props.navigation.navigate("Auth")
        }
        
    }


    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large'>

                </ActivityIndicator>
            </View>
        )
    }
}




const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})