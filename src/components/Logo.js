import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				{/* <Image  style={{width:200, height: 110}} source={require('../../assets/iconNew.png')}/> */}
          		<Text style={styles.logoText}>PokerTracker</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
	marginBottom: 25,
  	//marginVertical: 5,
  	fontSize:35,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});