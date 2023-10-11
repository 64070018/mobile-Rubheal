import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'


import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { auth } from '../database'


const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()
    useEffect(() => {
    
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("HomePage")
          }
        })
    
        return unsubscribe
      }, [])

      const handleLogin = () => {
       
        auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }


    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />

            <Text style={styles.title}> Registration {'\n'}</Text>
            <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' value={email}
                onChangeText={text => setEmail(text)} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={password}
                onChangeText={text => setPassword(text)} />

            <Text style={{ color: 'blue', marginTop: 20 }}>Forget Password</Text>


            <TouchableOpacity style={[styles.button, { margin: 10, width: '40%' }]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', fontSize: 12, }}>

                <Text style={{ color: '#000' }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace("Register")}>
                    <Text style={{ color: 'blue' }}> register </Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBAEF5',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 5,
    },
    logo: {
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        borderRadius: 100,
    },
    input: {
        fontSize: 16,
        borderBottomColor: "#262B46",
        backgroundColor: '#fff',
        width: "80%",
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#465067',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


export default LoginScreen;