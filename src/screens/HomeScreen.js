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
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Header } from 'react-native-elements';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import Constants from 'expo-constants';
import { AuthContext } from '../../context';
import { Loading } from '../../App'
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


const { height, width } = Dimensions.get('window');


export let SessionData = [
    {
        location: "Aria",
        startTime: "10/5/20  11:00 PM",
        endTime: "10/6/20  1:00 AM",
        gameType: "NL Texas Hold'em",
        stakes: "1/3",
        buyIn: 200,
        cashOut: 400,
        profit: 200
    },
    {
        location: "Bellagio",
        startTime: "10/7/20  8:00 PM",
        endTime: "10/7/20  10:00 PM",
        gameType: "Pot Limit Omaha",
        stakes: "2/5",
        buyIn: 300,
        cashOut: 416,
        profit: 116
    },
    {
        location: "Ceasar's Palace",
        startTime: "10/11/20  9:00 PM",
        endTime: "10/11/20  11:30 PM",
        gameType: "Seven Card Stud",
        stakes: "1/2",
        buyIn: 200,
        cashOut: 86,
        profit: -114
    }
];

var profitStrings = []

function getProfitStr(item){
    let temp = 0
    let profitStr = ''
    if(item.profit >= 0){
        profitStr = '$' + item.profit
    }
    else{
        temp = (-1) * item.profit
        profitStr = '-$' + temp;
    }

    profitStrings.push(profitStr)
}

function displayProfit(item){
    if(item)
    {
        if(item.charAt(0) == "-")
        {
            return<Text style={styles.textRed}>{'-$' + (-1) * item}</Text>
        } else if(item.charAt(0) == "0") {
            return<Text style={styles.textBlack}>{'$' + item}</Text>
        } else 
        {
            return<Text style={styles.textGreen}>{'$' + item}</Text>
        }
    }   
}

export default function HomeScreen(props) {
    const { user, setUser, sessionList, setSessionList } = useContext(AuthContext);
    setSessionList(SessionData)

    
    
    SessionData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))

    SessionData.forEach(getProfitStr)


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
                            color: 'white',
                            underlayColor: '#red',
                            onPress: props.navigation.openDrawer
                        }}

                        centerComponent={
                            {
                                text: 'PokerTracker',
                                style: {
                                    color: 'white',
                                    fontSize: 25
                                }
                            }
                        }

                        rightComponent={
                            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => {
                                    
                                    console.log("sign out")
                                    setUser()
                                }}>
                                <Text style={styles.textHeader}>Sign Out</Text>
                            </TouchableOpacity>
                        }

                        containerStyle={{
                            height: 80,
                            backgroundColor: '#1A1D51',
                            borderBottomColor: '#1A1D51',
                            borderBottomWidth: 1
                        }}

                    />
                }
                headerHeight={80}
                disableHeaderSnap={true}
            >

                <SafeAreaView>
                    <ScrollView scrollEventThrottle={16}>
                        <View style={styles.background}>
                            <LinearGradient
                                colors={['rgba(0,0,0,0.8)', 'transparent']}
                                style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: 400,
                                }}
                            />
                            {user &&
                                <View style={{flex:1,}}>
                                    <Text style={styles.textAlt}>
                                        Hello {user.name}!
                                    </Text>

                                    <TouchableOpacity style={styles.newSessionButton}
                                            onPress={() => props.navigation.navigate('NewSession')}>
                                        <Text style={styles.textNewSessionBtn} >New Session</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.textAlt} >History</Text>                

                                    <FlatList
                                        data={SessionData}
                                        renderItem={({item, index})=>

                                        
                                        <LinearGradient 
                                            colors={['#903DFC', '#62FAE0']} 
                                            style={styles.button} 
                                            start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}
                                        >
                                            <TouchableOpacity
                                                    onPress={()=>{
                                                    props.navigation.navigate('SessionDetails', 
                                                            {   
                                                                location: item.location,
                                                                gameType: item.gameType,
                                                                stakes: item.stakes,
                                                                startTime: item.startTime,
                                                                endTime: item.endTime,
                                                                buyIn: item.buyIn,
                                                                cashOut: item.cashOut,
                                                                profit: item.profit
                                                            });
                                                        }
                                                    }
                                                >   
                                                    
                                                    <View style={styles.row}>
                                                        <Text style={styles.text} >{item.location}</Text>
                                                        <Text style={styles.textRight} >{item.startTime} </Text>
                                                    </View>
                                                    
                                                    <View style={styles.row}>
                                                        <Text style={styles.text} >{item.gameType}</Text>
                                                        {displayProfit(item.profit.toString())}
                                                    </View>
                                                    
                                                </TouchableOpacity>
                                        </LinearGradient>
                                        }
                                    />                           
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
    background: {
        flex: 1,
        backgroundColor: "#1A1D51",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textHeader: {
        color: 'white',
        fontSize: 15,
    },
    text: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
        marginVertical: 20,
    },
    textRight: {
        color: 'black',
        fontSize: 20,
        marginRight: 20,
        marginVertical: 20,
    },
    textGreen: {
        color: 'green',
        fontSize: 20,
        fontWeight: "bold",
        margin: 20,
    },
    textRed: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 20,
        margin: 20,
    },
    textBlack: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        margin: 20,
    },
    textAlt: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        flex: 1,
        marginLeft: 10,
        margin: 20
    },
    textNewSessionBtn: {
        flex: 1,
        color: 'black',
        fontSize: 20,
    },
    button: {
        padding: 0,
        marginHorizontal: 20,
        marginBottom: 20,
        color: "red",
        margin: 20,
        borderRadius: 40,
    },
    newSessionButton: {
        flex: 1,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        color: "red",
        margin: 20,
        borderRadius: 40,
        backgroundColor: "#62FAE0",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black'
    },
    placeContainer: {
        width: width - 40,
        height: width / 2,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 4,
        marginVertical: 10,
        overflow: "hidden"
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
