import React, { Component } from 'react';
import {
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Platform, 
    Alert
   
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import commonStyles from '../commonStyles';
import  todayImage from '../../assets/imgs/today.jpg';
import  tommorrowImage from '../../assets/imgs/tomorrow.jpg';
import  weekImage from '../../assets/imgs/week.jpg';
import  monthImage from '../../assets/imgs/month.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';

import Icon from 'react-native-vector-icons/FontAwesome';
import Tasks from '../components/Tasks';
import axios from 'axios';
import { server, showError} from '../common'

import AddTask from './AddTask';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTask:[],
    tasks: []
}
export default class TaskList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data}, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
        
    }

    filterTasks = () => {
        let visibleTask = null
        if(this.state.showDoneTasks){
            visibleTask = [...this.state.tasks]
        }else{
            const pending = task => task.done_at === null
            visibleTask = this.state.tasks.filter(pending)
            
        }

        this.setState({ visibleTask })
        AsyncStorage.setItem('tasksState',JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            this.loadTasks()
        } catch (e) {
            showError(e)   
        }
    }

    addTask = async newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos','Descrição não Informada!')
            return
        }
        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimate_at: newTask.date
            })

            this.setState({ showAddTask: false}, this.loadTasks)
            console.log()

        } catch (e) {
            showError(e)
        } 
        
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    getImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tommorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tommorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render(){
        const today = moment().locale('pt-br').format('ddd , D [de] MMMM YYYY')
        return(
        <View style={styles.container}>
            <AddTask isVisible={this.state.showAddTask}
                     onCancel={() => this.setState({ showAddTask: false})}
                     onSave={this.addTask}
                     />
            <ImageBackground style={styles.background} source={this.getImage()}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="bars"
                              size={20} 
                              color={commonStyles.colors.secundary} 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                              size={20} 
                              color={commonStyles.colors.secundary} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}> 
            <FlatList data={this.state.visibleTask} 
                      keyExtractor={item => `${item.id}`}
                      renderItem={({item}) => <Tasks {...item} 
                      onToggleTask={this.toggleTask}
                      onDelete={this.deleteTask}/>}
            />                         
            </View>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColor()}]} 
                              activeOpacity={0.7}
                              onPress={() => this.setState({ showAddTask: true})}>
                <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
            </TouchableOpacity>
            
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
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === "ios" ? 40 : 10
    },
    addButton: {
        position:'absolute',
        right: 30,      
        bottom: 30,        
        width: 50,
        height: 50,
        borderRadius: 25,        
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})