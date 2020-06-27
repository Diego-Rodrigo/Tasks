import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles';

export default props => {

    const doneOrNotStyle = props.doneAt !== null ?
    {textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt

    const formatDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM YYYY')

    const getRightContent = () => {
        return(
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }

    return(
        <Swipeable renderRightActions={getRightContent}>
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            
            <View>
                <Text style={styles.desc, doneOrNotStyle}>{props.desc}</Text>
                <Text style={styles.date}>{formatDate}</Text>
            </View>
            
            
        </View>
        </Swipeable>
    )
}

function getCheckView(doneAt){
    if(doneAt !== null){
        return(
            <View style={styles.done}>
                <Icon name='check' size={15} color='#fff'/>
            </View>
        )
    }else{
        return(
            <View style={styles.pending}>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: '#aaa',
        borderWidth: 1,
        margin: 5,        
        alignItems: 'center',        
        borderRadius: 4,
        padding: 10,
    },
    checkContainer:{
        width: '8%',
        alignItems: 'center',
        marginRight: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderColor: '#ccc'
    },
    pending:{
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth:1,
        borderColor: '#555'
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth:1,
        borderColor: '#555',
        backgroundColor: '#4d7030',
        justifyContent: 'center',
        alignItems: 'center'     
        
    },
    desc:{
        fontFamily: '',
        color: commonStyles.colors.mainText,
        fontSize: 15,    
       
    },
    date:{
        fontFamily: '',
        color: commonStyles.colors.subText,
        fontSize: 12,
        
    },
    right:{
        
    }
})