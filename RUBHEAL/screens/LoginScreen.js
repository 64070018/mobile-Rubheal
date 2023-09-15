import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const LoginScreen = (props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />

            <Text style={styles.title}> Registration {'\n'}</Text>
            <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
            
            <Text style={{ color: 'blue', marginTop: 20 }}>Forget Password</Text>


            <TouchableOpacity style={[styles.button, { margin: 10, width: '40%' }]}>
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', fontSize: 12, }}>
                <Text style={{ color: '#000' }}>Already have an account?</Text>
                <Text style={{ color: 'blue' }}> register </Text>
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