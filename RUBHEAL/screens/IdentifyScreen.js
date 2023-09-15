import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Bu } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import DocumentPicker from 'react-native-document-picker';

const IdentifyScreen = (props) => {

    return (
        <View style={styles.container}>

            <Text style={styles.title}> อยากรวย {'\n'}</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value='Full name' />

            <Text style={styles.label}>ID Card</Text>
            <TextInput style={styles.input} value='1234567890123' keyboardType='numeric' />

            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value='Lad Krabang Bankok' keyboardType='phone-pad' />

            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder='contract' />

            <Text style={styles.label}> Document </Text>


            <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]}>
                <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
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
        marginBottom: 10,
        marginTop: 5,
    },
    label: {
        fontSize: 20,
        textAlign: 'left',
        width: '80%'

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
        letterSpacing: 3,
    },
});


export default IdentifyScreen;

