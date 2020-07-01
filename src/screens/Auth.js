import React, { Component } from 'react';
import { ImageBackground, 
         Text, 
         StyleSheet, 
         View,          
         TouchableOpacity,         
         Alert
        } from 'react-native';
import AuthInput from '../components/AuthInput';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import axios from 'axios';
import { server, showError, showSucess } from '../common';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if(this.state.stageNew){
            this.signup()
        }else{
            this.signin()
        }
    }

    signup = async () => {
        try {
           await axios.post(`${server}/signup`, {
               name: this.state.name,
               email: this.state.email,
               password: this.state.password,
               confirmPassword: this.state.confirmPassword,
           })

           showSucess('Usuario Cadastrado com Sucesso!')
           this.setState({...initialState})
        } catch (e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`,{
               email: this.state.email,
               password: this.state.password,
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate("Home")
            
        } catch (e) {
            showError(e)
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)


        return(
            <ImageBackground source={backgroundImage} 
                             style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                {this.state.stageNew &&
                    <AuthInput icon='user' placeholder="Nome" 
                    value={this.props.name} 
                    style={styles.input}
                    onChangeText={name => this.setState({ name })}
                    />
                }
                    <AuthInput icon='at-sign' placeholder="E-mail" 
                               value={this.props.email} 
                               style={styles.input}
                               onChangeText={email => this.setState({ email })}
                               />
                    <AuthInput icon='lock' placeholder="Senha" 
                               value={this.props.password}
                               style={styles.input}
                               secureTextEntry={true}
                               onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon='check' placeholder="Confirmação de Senha" 
                        value={this.props.confirmPassword}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#aaa', borderColor: '#000'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} 
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Tem uma conta ? Faça seu Login' : 'Não tem uma conta ? Cadastre-se'}
                        </Text>
                        
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.resetPasswordButton}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: '',
        color: commonStyles.colors.secundary,
        fontSize: 70,
        marginBottom: 10

    },
    subTitle: {
        fontFamily: '',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        borderRadius: 6,
        borderColor: '#000',
        borderWidth: 2,
        width: '90%'
    },
    input:{
        marginTop: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#c0c0c0',
        marginBottom: 10,
        borderRadius: 6
        //padding: Platform.OS == 'ios' ? 15 : 10
        
    },
    button: {
        backgroundColor: '#050',
        marginTop: 10,
        padding: 10,
       alignItems: 'center',
       borderRadius: 6,
       borderWidth: 1,
       borderColor: '#0f0'
       
    },
    buttonText:{
        fontFamily: '',
        color: commonStyles.colors.secundary,
        fontSize: 20
    },
    resetPasswordButton:{
        fontSize: 12,
        color: '#009fff',
        textAlign: 'center',
        margin: 10

    }
})