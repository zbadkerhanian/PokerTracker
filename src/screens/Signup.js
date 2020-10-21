import s from '../styles/global';
import React, { Component, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import Logo from '../components/Logo';
import { Header, Icon } from 'react-native-elements'
import {Utilities, ScreenDimensions} from '../global_functions/Utilities';
import * as firebase from "firebase/app";
import { AuthContext } from '../../context';


export default function SignupScreen(props) {
  const { setUser } = useContext(AuthContext);

  const alph=/^[a-zA-Z].{2,50}$/
  const pass=/^.{6,20}$/;
  const emailAdd=/^.+\@.+\..+$/
  var errors=[];


  const [name, setName] = useState('');
  const [nameValidated, setNameValidated] = useState(true);
  const [username, setUsername] = useState('');
  const [usernameValidated, setUsernameValidated] = useState(true);
  const [email, setEmail] = useState('');
  const [emailValidated, setEmailValidated] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(true);
  const [error, setError] = useState(null);

  //var lastNameTextInput;
  var usernameTextInput;
  var emailTextInput;
  var passTextInput;


  function handleSignup(){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      setError(null);
      setUser({name: name, email: email})
      // return userCredentials.user.updateProfile({
      //   displayName: name
      // })
    })
    .catch(error => {console.log(error); setError(error.message)})
  }

  function validate(text,type)
  {
    switch(type){
      case 'Name':
        setName(text);
        setNameValidated((alph.test(text)) ? true : false)
        break;
      case 'username':
        setUsername(text);
        setUsernameValidated((alph.test(text)) ? true : false)
        break;
      case 'email':
        setEmail(text);
        setEmailValidated((emailAdd.test(text)) ? true : false)
        break;
      case 'password':
        setPassword(text);
        setPasswordValidated((pass.test(text)) ? true : false)
        break;
    }
  }

  function submit(){
    let ready = true;
    if(name.length == 0){
      ready = false;
      errors.push("Name cannot be empty.")
    }
    if(!nameValidated){
      ready = false;
      errors.push("Enter a valid First Name.")
    }
    if(username.length == 0){
      ready = false;
      errors.push("Username cannot be empty.")
    }
    if(!usernameValidated){
      ready = false;
      errors.push("Username must consist of letters only.")
    }
    if(email.length == 0){
      ready = false;
      errors.push("Email cannot be empty.")
    }
    if(!emailValidated){
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
      console.log("send to firebase");
      handleSignup();
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
        <View style={[{marginTop: 70, flex: 1} ]}>
          <Logo/>
          <View style={styles.errorContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.container}>
            <TextInput style={[styles.inputBox, !nameValidated? styles.error : null]}
              autoCompleteType='name' 
              textContentType='givenName'
              onChangeText={(text)=>validate(text,'Name')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Name"
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='next'
              //selectionColor="#fff"
              onSubmitEditing={()=> usernameTextInput.focus()}
            />
            <TextInput style={[styles.inputBox, !usernameValidated? styles.error : null]}
              autoCompleteType='username' 
              textContentType='username'
              onChangeText={(text)=>validate(text,'username')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Username"
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='next'
              ref={(input) => usernameTextInput = input}
              onSubmitEditing={()=> emailTextInput.focus()}
            />
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
              ref={(input) => emailTextInput = input}
              onSubmitEditing={()=> passTextInput.focus()}
            />
            <TextInput style={[styles.inputBox, !passwordValidated? styles.error : null]}
              autoCompleteType='password' 
              textContentType='newPassword'
              onChangeText={(text)=>validate(text,'password')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='go'
              ref={(input) => passTextInput = input}
            />
            <TouchableOpacity style={styles.button} onPress={() => submit()}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.signupButton}> Sign in</Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
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
    paddingVertical: 10
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
  error:{
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