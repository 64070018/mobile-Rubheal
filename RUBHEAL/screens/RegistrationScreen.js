import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import {auth, firebase} from '../database'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../database';

const RegistrationScreen = () => {

  // console.log(firebase.firestore().collection("users"))
  
  const navigation = useNavigation()
  const [isChecked1, setIsChecked1] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const handleCheck1 = () => {
    setIsChecked1(!isChecked1);
    console.log(isChecked1)
  };

  useEffect(() => {
  
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace("HomePage")
         
        }
      })
  
      return unsubscribe
    }, [])


  const handleSignUp = (email, password, name, phone) => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user.email);

      // Now, let's add user data to Firestore
      const userData = {
        email: user.email,
        name : name,
        phone : phone,
        position : "user"

        // Add other user data fields as needed
      };

      // Add the user data to Firestore
      addDoc(collection(firestore, 'users'), userData)
        .then(() => {
          console.log('User data added to Firestore');

          // alert("Correct")
        })
        .catch(error => {
          console.error('Error adding user data to Firestore:', error);
        });
    })
    .catch(error => {
      alert(error.message);
    });
    
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />

      <Text style={styles.title}> Registration {'\n'}</Text>
      <TextInput style={styles.input} placeholder='Full Name'  value={name}  onChangeText={text => setName(text)}/>
      <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' value={email}  onChangeText={text => setEmail(text)} /> 
      <TextInput style={styles.input} placeholder='Phone' keyboardType='phone-pad' value={phone}  onChangeText={text => setPhone(text)} />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={password}  onChangeText={text => setPassword(text)} />
      <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} value={ConfirmPassword}  onChangeText={text => setConfirmPassword(text)} />
      <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
        <CheckBox
          isChecked={isChecked1}
          onClick={handleCheck1}
        />
        <Text style={{ color: 'red', marginStart: 10 }}>agree that our app does not
          cover money fraud. (require) </Text>

      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]} onPress={() => handleSignUp(email, password, name, phone)}>
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', fontSize: 12, }}>
        <Text style={{ color: '#000' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={{ color: 'blue' }} Í> login</Text>

        </TouchableOpacity>
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