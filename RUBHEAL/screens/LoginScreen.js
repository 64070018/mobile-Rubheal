import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { useFonts } from 'expo-font';


import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { auth } from '../database'
import { signInWithEmailAndPassword } from 'firebase/auth';





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
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert("Gmail or Password wrong"))
    }


    const [loaded] = useFonts({
        Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
    });
    if (!loaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />

            <Text style={styles.title}> Login {'\n'}</Text>
            <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' value={email}
                onChangeText={text => setEmail(text)} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={password}
                onChangeText={text => setPassword(text)} />



            <TouchableOpacity onPress={() => navigation.replace("Forgot")}>
                <Text style={{ color: 'blue', marginTop: 20 }}>Forget Password</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.button, { margin: 10, width: '40%',backgroundColor : email == "" || password == "" ? "#666" : "#9276F2" }]} disabled={email == "" || password == ""} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', fontSize: 12, }}>

                <Text style={{ color: '#000' }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace("Register")}>
                    <Text style={{ color: 'blue' }}> Registration </Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 5,
    },
    logo: {
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        marginBottom: 40,
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
        marginVertical: 10,
        fontFamily: 'Anuphan'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Anuphan'
    },
    button: {
        // backgroundColor: '#9276F2',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Anuphan'
    },
});


export default LoginScreen;