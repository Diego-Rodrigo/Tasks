import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Gravatar } from 'react-native-gravatar';
import commonStyles from '../commonStyles';

export default props => {
    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar} 
                         options={{
                             email: props.navigation.getParam('email'),
                             secure: true
                             }} />
            </View>
            <View style={styles.userInfo}>
                 <Text style={styles.name}>
                     {props.navigation.getParam('name')}
                 </Text>
                 <Text style={styles.email}>
                     {props.navigation.getParam('email')}
                </Text>
            </View>
            <DrawerItems {...props}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        borderWidth: 1,
        borderColor: '#ddd'
    },
    title:{
        color: '#000',
        fontFamily: '',
        fontSize: 30,        
        paddingTop: Platform.OS === "ios" ? 70 : 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 22,        
        borderRadius: 4       
        
    },
    avatar:{
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        paddingTop: 0,
        margin: 10,
        backgroundColor: '#222'
        
    },
    userInfo: {
        marginLeft: 10
    },
    name: {
        fontFamily: '',
        fontSize: 20,
        marginBottom: 5,
        marginTop: 5
    },
    email: {
        fontFamily: '',
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 5

    }
})