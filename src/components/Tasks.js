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

    const doneOrNotStyle = props.done_at !== null ?
    {textDecorationLine: 'line-through'} : {}

    const date = props.done_at ? props.done_at : props.estimate_at

    const formatDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM YYYY')

    const getRightContent = () => {
        return(
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return(
            <View style={styles.left}>
                <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon} />
                <Text style={styles.exludeText}>Excluir</Text>
            </View>
        )
    }

    return(
        <Swipeable renderRightActions={getRightContent}
                   renderLeftActions={getLeftContent}
                   onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.done_at)}
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

function getCheckView(done_at){
    if(done_at !== null){
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
        backgroundColor: '#fff'
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
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        margin: 5,
        borderRadius: 4
    },
    left:{
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        borderRadius: 4
        
    },
    exludeText:{
        fontFamily: '',
        color: '#fff',
        fontSize: 20,
        margin: 10,
    },
    excludeIcon: {
        marginLeft: 10
    }
})