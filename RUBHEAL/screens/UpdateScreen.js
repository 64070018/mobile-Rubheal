import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import DocumentPicker from 'react-native-document-picker';

const UpdateScreen = (props) => {
    return (
        <View style={styles.container}>

            <ScrollView scrollVerticalIndicatorInsets={false}>
                <View style={styles.content}>
                    <Text style={styles.title}> Update {'\n'}</Text>

                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value='Product Name' />

                    <Text style={styles.label}>Detail Product</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={[styles.input,]}
                        placeholder='Detail Product' />

                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value='1000' keyboardType='numeric' />

                    <Text style={styles.label}>Amount</Text>
                    <TextInput style={styles.input} value='5' keyboardType='numeric' />

                    <Text style={styles.label}>Policy</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                    />

                    <Text style={styles.label}> Image </Text>

                    <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]}>
                        <Text style={styles.buttonText}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: '15%',
    },
    content: {
        marginVertical: '20%'
    },
    logo: {
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        borderRadius: 100,
    },
    input: {
        fontSize: 16,
        borderBottomColor: "#262B46",
        backgroundColor: '#eee',
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
        width: '80%',
        marginTop: 10

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '20%'
    },
    button: {
        backgroundColor: '#465067',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '20%'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 3,
    },
});


export default UpdateScreen;

