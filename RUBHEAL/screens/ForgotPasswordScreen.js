import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import {auth} from "../database"

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const ChangePassword = () => {
        auth.sendPasswordResetEmail(email).then(() => {
            alert("Password reset email sent");
            navigation.replace("Login")

        }).catch((err) => {
            alert(err.message); // Display the error message
        });
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />
            <Text style={styles.title}> Change Password {'\n'}</Text>
            <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' value={email}
                onChangeText={text => setEmail(text)} />
            <TouchableOpacity style={[styles.button, { margin: 10, width: '40%' }]} onPress={ChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { margin: 10, width: '40%' }]} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', fontSize: 12, }}>
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
        marginVertical: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#9276F2',
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

export default ForgotPasswordScreen;
