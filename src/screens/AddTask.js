import React , { Component }from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity,TextInput, Platform} from 'react-native';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';


const initialState = { desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component {
    
    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initialState})
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date} 
                    onChange={(_, date) => this.setState({date, showDatePicker: false})} 
                    mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D[de] MMMM YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    render(){
        return(
            <Modal transparent={true} 
                   visible={this.props.isVisible} 
                   onRequestClose={this.props.onCancel}
                   animationType= 'slide'
                   > 
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>
                        
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.contanier}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                        <TextInput style={styles.input}
                                   placeholder= 'Informe a Descrição...'
                                   onChangeText={desc => this.setState({desc})}
                                   value={this.state.desc}/>
                        {this.getDatePicker()}
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                </View> 

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                
            </Modal>

        )
    }
}




const styles = StyleSheet.create({
    contanier:{
       
        backgroundColor: '#fff'        
    },
    background:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    header:{
        fontFamily: '',
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        borderRadius: 4,
        margin: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    input:{
        fontFamily: '',        
        height: 40,
        margin: 15,        
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
        paddingLeft: 5
        
    },
    date: {
        fontFamily: '',
        fontSize: 20,
        marginLeft: 15
    }
})
