import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Bu } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import DocumentPicker from 'react-native-document-picker';

const CreateScreen = (props) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}> Create {'\n'}</Text>
      {/* <Text style={styles.label}>Name</Text> */}
      <TextInput style={styles.input} placeholder='Product Name' />

      {/* <Text style={styles.label}>ID Card</Text> */}
      <TextInput
        multiline
        numberOfLines={4}
        style={[styles.input,]}
        placeholder='Detail Product' />

      {/* <Text style={styles.label}>Address</Text> */}
      <TextInput style={styles.input} placeholder='price' keyboardType='numeric' />

      {/* <Text style={styles.label}>Name</Text> */}
      <TextInput style={styles.input} placeholder='amount' keyboardType='numeric' />

      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input}
        placeholder='policy' />

      <Text style={styles.label}> Image </Text>

      <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]}>
        <Text style={styles.buttonText}>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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


export default CreateScreen;

