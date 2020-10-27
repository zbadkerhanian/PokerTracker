import s from '../styles/global'
import React, { useState, useContext } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { Header } from 'react-native-elements';
import Constants from 'expo-constants';
import { AuthContext } from '../../context';


const { height, width } = Dimensions.get('window');


export default function NewSessionScreen(props){
    const { user } = useContext(AuthContext);
    

    return (
        <View style={s.global}>  
            <CollapsibleHeaderScrollView
                CollapsibleHeaderComponent={
                    <Header
                        statusBarProps={{ 
                            backgroundColor:'#202020', 
                            translucent:true, 
                            barStyle:'light-content'
                        }}
                        leftComponent={{ 
                            icon: 'chevron-left',
                            color: '#C2185B', 
                            underlayColor: '#282828',
                            onPress: () => props.navigation.goBack()
                        }}
                        // centerComponent={{ 
                        //     text: 'BarHop', 
                        //     style: { 
                        //         color: '#C2185B', 
                        //         fontSize: 25 
                        //     } 
                        // }}
                        containerStyle={{
                            height: 80,
                            backgroundColor: '#282828',
                            borderBottomColor:'#282828', 
                            borderBottomWidth:1 
                        }}
                    
                    />
                }
                headerHeight={80}
                disableHeaderSnap={true}
            >            
                <SafeAreaView>
                    <ScrollView scrollEventThrottle={16}>
                        <View>
                            {user && 
                                <Text style={styles.textAlt}>
                                    Welcome to Session Screen
                                </Text>
                            }                              
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </CollapsibleHeaderScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center', 
        justifyContent:'center',
        height: 500
    },
    text: {
        color: 'black',
        fontSize: 20,
        margin: 20
    },
    textAlt: {
        fontSize: 24, 
        fontWeight: '700', 
        color: 'black', 
        flex:1, 
        marginLeft: 10
    },
    title: { 
        fontSize: 24, 
        fontWeight: '700', 
        color: 'black'
    },
    placeContainer: {
        width:width-40,
        height:width/2, 
        borderWidth:0.5, 
        borderColor: '#dddddd',
        borderRadius: 4,
        marginVertical: 10,
        overflow:"hidden"
    }
});

const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
    },
    header: {
      fontSize: 25
    },
    image: {
      marginTop: 15,
      width: 150,
      height: 150,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 5
    }
});
