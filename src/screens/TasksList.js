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

import commonStyles from '../commonStyles';
import  todayImage from '../../assets/imgs/today.jpg';

import moment from 'moment';
import 'moment/locale/pt-br';

import Icon from 'react-native-vector-icons/FontAwesome';
import Tasks from '../components/Tasks';

import AddTask from './AddTask';

export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        showAddTask: false,
        visibleTask:[],
        tasks: [{
            id: Math.random(),
            desc: 'Comprar o Livre de React Native, C#',
            estimateAt: new Date(),
            doneAt: new Date(),
        },
        {
            id: Math.random(),
            desc: 'Ler o Livre de React Native',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
        
    }

    filterTasks = () => {
        let visibleTask = null
        if(this.state.showDoneTasks){
            visibleTask = [...this.state.task]
        }else{
            const pending = task => task.doneAt === null
            visibleTask = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTask })
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTasks)
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos','Descrição não Informada!')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false}, this.filterTasks)
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM YYYY')
        return(
        <View style={styles.container}>
            <AddTask isVisible={this.state.showAddTask}
                     onCancel={() => this.setState({ showAddTask: false})}
                     onSave={this.addTask}
                     />
            <ImageBackground style={styles.background} source={todayImage}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                              size={20} 
                              color={commonStyles.colors.secundary} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}> 
            <FlatList data={this.state.visibleTask} 
                      keyExtractor={item => `${item.id}`}
                      renderItem={({item}) => <Tasks {...item} 
                      toggleTask={this.toggleTask}/>}
            />                         
            </View>
            <TouchableOpacity style={styles.addButton} 
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
        justifyContent: 'flex-end',
        marginTop: Platform.OS === "ios" ? 40 : 10
    },
    addButton: {
        position:'absolute',
        right: 30,      
        bottom: 30,        
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})