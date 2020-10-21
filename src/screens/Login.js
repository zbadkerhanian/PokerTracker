import s from '../styles/global';
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import * as firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from "./../../context";
import {Utilities, ScreenDimensions} from '../global_functions/Utilities';


import Logo from '../components/Logo';


export default function LoginScreen(props){
  const { setUser } = useContext(AuthContext);

  const pass=/^.{6,20}$/;
  const emailAdd=/^.+\@.+\..+$/;
  var errors=[];

  const [email, setEmail] = useState('');
  const [emailValidated, setEmailValidated] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(true);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0);


  var passTextInput;


  function handleLogin(){

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      var email = userCredentials.user.email
      var n = email.indexOf('@');
      setUser({
        email: email.substring(0, n != -1 ? n : email.length)
      });
      setError(null)
      // return userCredentials.user.updateProfile({
      //   displayName: this.state.name
      // })
    })
    .catch(error => setError(error.message))
  }

  function validate(text,type){
    switch(type){
      case 'email':
        setEmail(text);
        setEmailValidated((emailAdd.test(text)) ? true : false);
        break;
      case 'password':
        setPassword(text);
        setPasswordValidated((pass.test(text)) ? true : false)
        break;
    }
  }

  function submit(){
    let ready = true;
    if(email.length == 0){
      ready = false;
      errors.push("Email cannot be empty.")
    }
    if(!emailValidated){
      console.log(email)
      ready = false;
      errors.push("Enter a valid email address.")
    }
    if(password == 0){
      ready = false;
      errors.push("Password cannot be empty.")
    }
    if(!passwordValidated){
      ready = false;
      errors.push("Password must be at least 6 characters.")
    }
    displayErrors();
    if(ready){
      handleLogin();
    }
  }

  function displayErrors(){
    if(errors.length != 0)
      Alert.alert('', errors.join('\n'));
    errors=[];
  }

    return(
      <View style={styles.container1}>
        <ScrollView style={{height: ScreenDimensions.height}}>
                <View style={[{marginTop: 150, flex: 1} ]}>
                  <Logo/>
                  <View style={styles.container}>
                    <View style={styles.errorContainer}>
                      {error && <Text style={styles.errorText}>{error}</Text>}
                    </View>
                    <TextInput style={[styles.inputBox, !emailValidated? styles.error : null]}
                      autoCompleteType='email' 
                      textContentType='emailAddress'
                      onChangeText={(text)=>validate(text,'email')}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Email"
                      placeholderTextColor = "#ffffff"
                      errorMessages={['This field is required']}
                      returnKeyType='next'
                      keyboardType="email-address"
                      onSubmitEditing={()=> passTextInput.focus()}
                    />
                    <TextInput style={[styles.inputBox, !passwordValidated? styles.error : null]}
                      onChangeText={(text)=>validate(text,'password')}
                      textContentType='password'
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Password"
                      secureTextEntry={true}
                      placeholderTextColor = "#ffffff"
                      errorMessages={['This field is required']}
                      returnKeyType='go'
                      ref={(input) => passTextInput = input}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => submit()} >
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                      <Text style={styles.signupButton}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
          </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container1:{
    flex: 1,
    backgroundColor: "#455a64"
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#455a64",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  signupTextCont : {
    alignItems:'center',
    justifyContent :'center',
    flexDirection:'row',
    flex: 1
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    paddingVertical: 14
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  error: {
    borderWidth:3,
    borderColor: 'red'
  },
  errorContainer:{
    alignItems:'center', 
    justifyContent:'center',
    marginHorizontal:30
  },
  errorText:{
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  }
});