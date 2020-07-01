import {Alert, Platform} from 'react-native';


const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.0.108:3000'

function showError(err){
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem:${err}`)
}

function showSucess(msg){
    Alert.alert('Conectado com Sucesso!', msg)
}

export { server, showError, showSucess}