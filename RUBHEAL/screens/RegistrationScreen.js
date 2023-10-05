import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const RegistrationScreen = (props) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const handleCheck1 = () => {
    setIsChecked1(!isChecked1);
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />

      <Text style={styles.title}> Registration {'\n'}</Text>
      <TextInput style={styles.input} placeholder='Full Name' />
      <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' />
      <TextInput style={styles.input} placeholder='Phone' keyboardType='phone-pad' />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
      <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} />
      <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
        <CheckBox
          isChecked={isChecked1}
          onClick={handleCheck1}
        />
        <Text style={{ color: 'red', marginStart: 10 }}>agree that our app does not
          cover money fraud. (require) </Text>

      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]}>
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', fontSize: 12, }}>
        <Text style={{ color: '#000' }}>Already have an account?</Text>
        <Text style={{ color: 'blue' }} Í> login</Text>
      </View>
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
    backgroundColor: '#F6F7F9',
    width: "80%",
    borderBottomWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#8667F2',
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


export default RegistrationScreen;