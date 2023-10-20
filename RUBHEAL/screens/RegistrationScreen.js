import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import {auth, firebase} from '../database'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../database';
import { Formik } from 'formik';
import * as Yup from 'yup'

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


  const handleSignUp = (email, password, name, phone, values) => {

    // const {name} = values
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

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please Enter your name'),
    email: Yup.string().email('Invalid email').required('Please Enter your email address'),
    password : Yup.string().min(6).required('Please enter your password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Must contain minimum 8 char"),
    ConfirmPassword : Yup.string().min(8).oneOf([Yup.ref('password')], "Your Password do not match").required("Confrim Password is required"),
    phone : Yup.string().min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits").matches(/^[0-9]+$/, "Must be only digits").required("Please Enter your phone number")
  });
  return (

    <Formik 
    initialValues={{
      email : '',
      name : '',
      phone : '',
      password : '',
      ConfirmPassword : ''
    }}
    validationSchema={SignupSchema}>

    

      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit})=>(

    
    <View style={styles.container}>
      <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} style={styles.logo} />

      <Text style={styles.title}> Registration {'\n'}</Text>

      
      
      <TextInput style={styles.input} placeholder='Full Name'  value={values.name}  onChangeText={handleChange('name')}  onBlur={() => setFieldTouched('name')}/>
      {touched.name && errors.name && (
        <Text style={{color : 'red'}}>{errors.name}</Text>
      )}


      <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address'value={values.email}  onChangeText={handleChange('email')}  onBlur={() => setFieldTouched('email')} /> 
      {touched.email && errors.email && (
        <Text style={{color : 'red'}}>{errors.email}</Text>
      )}
      <TextInput style={styles.input} placeholder='Phone' keyboardType='phone-pad' value={values.phone} onChangeText={handleChange('phone')}  onBlur={() => setFieldTouched('phone')} />
      {touched.phone && errors.phone && (
        <Text style={{color : 'red'}}>{errors.phone}</Text>
      )}
      
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={values.password}  onChangeText={handleChange('password')}  onBlur={() => setFieldTouched('password')} />
      {touched.password && errors.password && (
        <Text style={{color : 'red'}}>{errors.password}</Text>
      )}
      <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} value={values.ConfirmPassword}  onChangeText={handleChange('ConfirmPassword')}  onBlur={() => setFieldTouched('ConfirmPassword')} />

      {touched.ConfirmPassword && errors.ConfirmPassword && (
        <Text style={{color : 'red'}}>{errors.ConfirmPassword}</Text>
      )}
      <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
        <CheckBox
          isChecked={isChecked1}
          onClick={handleCheck1}
        />

   
        <Text style={{ color: 'red', marginStart: 10 }}>agree that our app does not
          cover money fraud. (require) </Text>

      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%',  backgroundColor: !isValid || isChecked1 == false || values.name == "" || values.password == "" || values.ConfirmPassword == "" || values.phone == "" || values.email == "" ? '#a5c9ca' : '#8667F2', }]} disabled={!isValid || isChecked1 == false || values.name == "" || values.password == "" || values.ConfirmPassword == "" || values.phone == "" || values.email == ""} onPress={() => handleSignUp(values.email, values.password, values.name, values.phone)}>
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', fontSize: 12, }}>
        <Text style={{ color: '#000' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={{ color: 'blue' }} Í> login</Text>

        </TouchableOpacity>
      </View>
    </View>
      )}

    </Formik>
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