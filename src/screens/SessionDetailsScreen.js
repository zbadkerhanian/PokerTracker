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
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');


function displayBuyIn(item){
    if(item >= 0)
    {
        return<Text style={styles.textGreenIn}>{'$' + item.toString()}</Text>
    } else {
        return<Text style={styles.textRedIn}>{'-$' + ((-1) * item).toString()}</Text>
    }
}

function displayBuyOut(item){
    if(item >= 0)
    {
        return<Text style={styles.textGreenOut}>{'$' + item.toString()}</Text>
    } else {
        return<Text style={styles.textGreenIn}>{'-$' + ((-1) * item).toString()}</Text>
    }
}

function displayProfit(item){
    if(item >= 0)
    {
        return<Text style={styles.textGreenProfit}>{'$' + item.toString()}</Text>
    } else {
        return<Text style={styles.textRedProfit}>{'-$' + ((-1) * item).toString()}</Text>
    }
}


export default function SessionDetailsScreen(props){
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
                            color: 'white', 
                            underlayColor: '#1A1D51',
                            onPress: () => props.navigation.goBack()
                        }}
                        centerComponent={{ 
                            text: 'Session Details', 
                            style: { 
                                color: 'white', 
                                fontSize: 25 
                            } 
                        }}
                        containerStyle={{
                            height: 80,
                            backgroundColor: '#1A1D51',
                            borderBottomColor:'#1A1D51', 
                            borderBottomWidth:1 
                        }}
                    
                    />
                }
                headerHeight={80}
                disableHeaderSnap={true}
            >            
                <SafeAreaView style = {styles.container}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 400,
                        }}/>
                        <ScrollView scrollEventThrottle={16}>
                            <View>
                                {user && 
                                    <View>
                                        <View style={styles.container1}>
            
                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            >
                                                <Text style={styles.labelLocation} >Location</Text>
                                                <Text style={styles.textLocation}>{props.route.params.location}</Text>
                                            </LinearGradient>
                                       
                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            >
                                                <Text style={styles.labelGameType} >Game Type</Text>
                                                <Text style={styles.textGameType}>{props.route.params.gameType}</Text>
                                            </LinearGradient>
                                            
                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            >
                                                <Text style={styles.labelStakes} >Stakes</Text>
                                                <Text style={styles.textStakes}>{props.route.params.stakes}</Text>
                                            </LinearGradient>
                                           
                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            >
                                                <Text style={styles.labelTime} >Start Time</Text>
                                                <Text style={styles.textTime} >{props.route.params.startTime}</Text>
                                            </LinearGradient>
                                            
                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            >
                                                <Text style={styles.labelTime} >End Time</Text>
                                                <Text style={styles.textTime} >{props.route.params.endTime}</Text>
                                            </LinearGradient>

                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row1} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            >
                                                <LinearGradient 
                                                    colors={['#903DFC', '#62FAE0']} 
                                                    style={styles.row} 
                                                    start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                                > 
                                                    <Text style={styles.labelBuyIn} >Buy In</Text>
                                                    <Text style={styles.labelCashOut} >Cash Out</Text>
                                                </LinearGradient>
                                                
                                                <LinearGradient 
                                                    colors={['#903DFC', '#62FAE0']} 
                                                    style={styles.row} 
                                                    start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                                > 
                                                    <Text style={styles.textAmountBuyIn} >{displayBuyIn(props.route.params.buyIn)}</Text>
                                                    <Text style={styles.textAmountCashOut} >{displayBuyOut(props.route.params.cashOut)}</Text>
                                                </LinearGradient>                     
                                            </LinearGradient>

                                          
                                            <LinearGradient 
                                                colors={['#903DFC', '#62FAE0']} 
                                                style={styles.row} 
                                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                            > 
                                                <Text style={styles.labelProfit} >Profit</Text>
                                                <Text style={styles.textProfit} >{displayProfit(props.route.params.profit)}</Text>
                                            </LinearGradient>
 
                                        </View>                                 
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
        backgroundColor: "#1A1D51"
    },
    container1: {
        flex: 1,
        margin: 20,
        borderRadius: 35
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "red",
        borderRadius: 30,
        margin: 15
    },
    row1: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "red",
        borderRadius: 30,
        margin: 15
    },
    text: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        marginRight: 5,
        textAlign: "right"
    },
    textLocation: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        marginTop: 25,
        textAlign: "right",
        paddingHorizontal: 20
    },
    textGameType: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        textAlign: "right",
        paddingHorizontal: 20
    },
    textAlt: {
        fontSize: 24, 
        fontWeight: '700', 
        color: 'black', 
        flex:1, 
        textAlign: "center",
        marginTop: 20
    },
    textTime: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
        textAlign: "center",
        alignSelf: "flex-start"
    },
    textProfit: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        margin: 2,
        marginTop: 18,
        marginRight: 20,
        textAlign: "right",
        alignSelf: "flex-start"
    },
    textGreenProfit: {
        flex: 1,
        color: 'darkgreen',
        fontSize: 20,
        fontWeight: "bold",
        margin: 2,
        marginTop: 18,
        marginRight: 20,
        textAlign: "right",
        alignSelf: "flex-start"
    },
    textRedProfit: {
        flex: 1,
        color: 'red',
        fontSize: 20,
        fontWeight: "bold",
        margin: 2,
        marginTop: 18,
        marginRight: 20,
        textAlign: "right",
        alignSelf: "flex-start"
    },
    textAmount: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        textAlign: "center",
    },
    textAmountBuyIn: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        marginRight: 220,
        textAlign: "center",
    },
    textGreenIn: {
        flex: 1,
        color: 'darkgreen',
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 220,
        textAlign: "center",
    },
    textRedIn: {
        flex: 1,
        color: 'darkred',
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 220,
        textAlign: "center",
    },
    textGreenOut: {
        flex: 1,
        color: 'darkgreen',
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 220,
        textAlign: "center",
    },
    textRedOut: {
        flex: 1,
        color: 'darkred',
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 220,
        textAlign: "center",
    },
    textAmountCashOut: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        textAlign: "center"
    },
    textStakes: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        margin: 20,
        textAlign: "right",
        alignSelf: "flex-start"
    },
    label: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        margin:20
    },
    labelAlt: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        margin: 20,
    },
    labelLocation: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        margin: 20,
        paddingVertical: 5
    },
    labelGameType: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        margin:20
    },
    labelStakes: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        margin:20
    },
    labelTime: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        margin:20
    },
    labelBuyIn: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 5
    },
    labelCashOut: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600'
    },
    labelProfit: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
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
