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
import { Header } from 'react-native-elements';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import Constants from 'expo-constants';
import { AuthContext } from '../../context';
import { Loading } from '../../App'
import Icon from 'react-native-vector-icons/FontAwesome';


const { height, width } = Dimensions.get('window');


export default function HomeScreen(props){
    const { user } = useContext(AuthContext);
    

    return (
        <View style={s.global}>  
            <CollapsibleHeaderScrollView
                CollapsibleHeaderComponent={
                    <Header
                        statusBarProps={{ 
                            backgroundColor: '#202020', 
                            translucent: true, 
                            barStyle: 'light-content'
                        }}

                        leftComponent={{ 
                            icon: 'menu',
                            color: '#C2185B', 
                            underlayColor: '#282828',
                            onPress: props.navigation.openDrawer
                        }}

                        centerComponent={
                            {
                                text: 'PokerTracker', 
                                style: { 
                                    color: '#C2185B', 
                                    fontSize: 25 
                                } 
                            }
                        }

                        rightComponent={
                            <Icon
                                name='user'
                                type='font-awesome'
                                color='#C2185B'
                                underlayColor= '#282828'
                                onPress={() => props.navigation.navigate('Account')} />
                        }
        
                        containerStyle={{
                            height: 80,
                            backgroundColor: '#282828',
                            borderBottomColor: '#282828', 
                            borderBottomWidth: 1 
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
                                <Text style={{fontSize: 24, fontWeight: '700', color: 'white', flex:1, marginLeft: 10}}>
                                    Hello {user.name}!
                                </Text>
                            }
                            <Text style={styles.text}>
                                This is a text view
                            </Text>                                
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
        color: 'white',
        fontSize: 20,
        margin: 20
    },
    title: { 
        fontSize: 24, 
        fontWeight: '700', 
        color: 'white'
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
