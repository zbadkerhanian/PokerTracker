import s from '../styles/global'
import React, { useState, useContext } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TouchableOpacity
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
                                onPress={() => console.log("do nothing")} />
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
                                <View>
                                   <Text style={styles.textAlt}>
                                        Hello {user.name}!
                                    </Text> 
                            

                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => props.navigation.navigate('NewSession')}
                                    >
                                        <Text style={styles.text} >New Session</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.text} >History</Text>

                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=>{
                                           props.navigation.navigate('SessionDetails', 
                                                {   
                                                    gameType: 'No Limit Hold\'em',
                                                    startTime: '10/15/20  11:00 AM',
                                                    endTime: '10/15/20  1:00 PM',
                                                    buyIn: '- $100',
                                                    cashOut: '+ $200'
                                                    });
                                            }
                                       }
                                    >   
                                        
                                        <View style={styles.row}>
                                            <Text style={styles.text} >Aria</Text>
                                            <Text style={styles.textLeft} >10/5/20</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.text} >No Limit Hold'em</Text>
                                            <Text style={styles.textLeft} >+ $200</Text>
                                        </View>
                                         
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=>{
                                            props.navigation.navigate('SessionDetails', 
                                                 {   
                                                     gameType: 'PLO Omaha',
                                                     startTime: '9/27/20  11:35 PM',
                                                     endTime: '9/28/20  1:00 AM',
                                                     buyIn: '- $100',
                                                     cashOut: '- $150'
                                                     });
                                             }
                                        }
                                    >   
                                        <View style={styles.row}>
                                            <Text style={styles.text} >Bellagio</Text>
                                            <Text style={styles.textLeft} >9/27/20</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.text} >PLO Omaha</Text>
                                            <Text style={styles.textLeft} >- $150</Text>
                                        </View>
                                         
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=>{
                                            props.navigation.navigate('SessionDetails', 
                                                 {   
                                                     gameType: 'Limit Hold\'em',
                                                     startTime: '9/10/20  5:00 PM',
                                                     endTime: '9/10/20  8:00 PM',
                                                     buyIn: '- $50',
                                                     cashOut: '- $150'
                                                     });
                                             }
                                        }
                                        
                                    >   
                                        <View style={styles.row}>
                                            <Text style={styles.text} >Caesar's Palace</Text>
                                            <Text style={styles.textLeft} >9/10/20</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.text} >Limit Hold'em</Text>
                                            <Text style={styles.textLeft} >+ $67</Text>
                                        </View>
                                 
                                    </TouchableOpacity>
                                    
                                </View>
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
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        margin: 20, 
    },
    textLeft: {
        color: 'black',
        fontSize: 20,
        margin: 20,
    },
    textAlt: {
        fontSize: 24, 
        fontWeight: '700', 
        color: 'black', 
        flex:1, 
        marginLeft: 10,
        margin: 20
    },
    button: {
        alignItems: "flex-start",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        color: "red",
        margin: 20
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
