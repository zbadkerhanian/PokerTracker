import s from '../styles/global'
import React, { useState, useContext, Component, } from 'react';
//import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Button,
    FlatList,
    SectionList,
    TextInput,
    Alert
} from 'react-native';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { Header } from 'react-native-elements';
import Constants from 'expo-constants';
import { AuthContext } from '../../context';
import { TouchableOpacityComponent } from 'react-native';
import { setTextRange } from 'typescript';
import { format } from "date-fns";

//import { Dropdown } from 'react-native-material-dropdown';

import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';


const { height, width } = Dimensions.get('window');

function useInput() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    return {
        date,
        showDatepicker,
        showTimepicker,
        show,
        mode,
        onChange
    }
}

export default function NewSessionScreen(props) {
    const { user, sessionList, setSessionList } = useContext(AuthContext);

    const [buy, setBuy] = useState('');
    const [cash, setCash] = useState('');
    let cashText;
    const input = useInput(new Date());
    const input2 = useInput(new Date());
    var formattedStartDate = format(input.date, "MM/dd/yy");
    var formattedStartTime = format(input.date, "hh:mm a");
    var formattedEndDate = format(input2.date, "MM/dd/yy");
    var formattedEndTime = format(input2.date, "hh:mm a");
    const [location, setLocation] = useState('');
    const [selectedGameValue, setSelectedGameValue] = useState("NL Texas Hold'em");
    const [stake1, setStake1] = useState('');
    const [stake2, setStake2] = useState('');
    // const [session, setSession] = useState(SessionData);

    var errors=[];

    function handleCreateNewSession(){

        let tempList = sessionList
        tempList.push({
            location: location,
            startTime: formattedStartDate + "  " + formattedStartTime,
            endTime: formattedEndDate + "  " + formattedEndTime,
            gameType: selectedGameValue,
            stakes: stake1 + "/" + stake2,
            buyIn: buy,
            cashOut: cash,
            profit: cash - buy
        })
        setSessionList(tempList);

        props.navigation.navigate('Home', {test: null}); 
      }
    

    function submit(){
        let ready = true;
        if(location.length == 0){
          ready = false;
          errors.push("Location cannot be empty.")
        }
        if(stake1.length == 0 || stake2.length == 0){
            ready = false;
            errors.push("Stakes cannot be empty.")
        }
        if(buy.length == 0)
        {
            ready = false;
            errors.push("Buy In cannot be empty.")
        }
        if(cash.length == 0)
        {
            ready = false;
            errors.push("Cash Out cannot be empty.")
        }
        displayErrors();
        if(ready)
        {
            handleCreateNewSession();
        }
    }
    
      function displayErrors(){
        if(errors.length != 0)
          Alert.alert('', errors.join('\n'));
        errors=[];
      }

    return (
        <View style={s.global}>

            <CollapsibleHeaderScrollView contentContainerStyle={styles.container}
            
                CollapsibleHeaderComponent={
                    <Header
                        statusBarProps={{
                            backgroundColor: '#202020',
                            translucent: true,
                            barStyle: 'light-content'
                        }}
                        leftComponent={{
                            icon: 'chevron-left',
                            color: 'white',
                            underlayColor: '#1A1D51',
                            onPress: () => props.navigation.goBack()
                        }}
                        containerStyle={{
                            height: 80,
                            backgroundColor: '#1A1D51',
                            borderBottomColor: '#282828',
                            borderBottomWidth: 1
                        }}
                        centerComponent={
                            {
                                text: 'New Session',
                                style: {
                                    color: 'white',
                                    fontSize: 25
                                }
                            }
                        }

                    />

                }
                headerHeight={80}
                disableHeaderSnap={true}
            >
                <SafeAreaView style={styles.container} >
                <ScrollView scrollEventThrottle={16}>
                    {user &&
                        <View style={styles.container}>
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
                                                                                          
                                    
                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0.2 }} end={{ y: 0.0, x: 1 }}>
                                
                                <View style={{flex:1}}>
                                    <Text style={styles.labelGame} >Game Type</Text>
                                </View>

                                <View style={{flex:1}}>
                                    <View 
                                    style={styles.dropdown}
                                    >
                                        <Picker
                                            selectedValue={selectedGameValue}
                                            style={styles.picker}
                                            mode={"dropdown"}
                                            onValueChange={(itemValue, itemIndex) => setSelectedGameValue(itemValue)}
                                        >
                                            <Picker.Item label="NL Texas Hold'em" value= "NL Texas Hold'em" />
                                            <Picker.Item label="Limit Texas Hold'em" value="Limit Texas Hold'em" />
                                            <Picker.Item label= "Pot Limit Omaha" value= "Pot Limit Omaha" />
                                            <Picker.Item label="Seven Card Stud" value="Seven Card Stud"/>
                                            <Picker.Item label= "Three Card Poker" value="Three Card Poker"/>
                                        </Picker>
                                    </View>
                                </View>

                            </LinearGradient>

                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.labelStakes}>Location</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <TextInput id = "1" style={styles.inputBoxLocation} maxLength={1100}
                                        onChangeText={(input) => setLocation(input)} />
                                </View>
                            </LinearGradient>

                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.labelStakes}>Stakes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection:'row'}}>
                                    <TextInput id = "1" style={styles.inputBoxStake}maxLength={4} keyboardType="decimal-pad"
                                        onChangeText={(input) => setStake1(input)} />
                                    <Text style={styles.text1}> / </Text>
                                    <TextInput id = "3" style={styles.inputBoxStake} maxLength={4} keyboardType="decimal-pad"
                                        onChangeText={(input) => setStake2(input)} />
                                </View>
                            </LinearGradient>

                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.label}>Buy In</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={styles.inputBoxBuyIn}>
                                        <Text style={styles.text2}>$</Text>
                                        <TextInput  id = "4" style={styles.inputBoxCashOut} maxLength={6} keyboardType="decimal-pad"
                                            onChangeText={input => setBuy(input)} />    
                                    </View>
                                </View> 
                                <View style={{flex: 1,left:10}}>

                                    <Text style={styles.label} >Cash Out</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={styles.inputBoxBuyIn}>
                                        <Text style={styles.text2}>$</Text>
                                        <TextInput id = "5" style={styles.inputBoxCashOut} maxLength={6} keyboardType="decimal-pad"
                                            onChangeText={input => setCash(input)}/>
                                    </View>
                                </View>
                            </LinearGradient>
                            
                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                <View style={{flex:1}}>
                                    <Text style={styles.label} >Start{'\n'}Date/Time</Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',}}>
                                    <View style={{flex:1, paddingHorizontal:5,}}>
                                        <TouchableOpacity
                                            style = {styles.dateButton}
                                            onPress={input.showDatepicker}
                                        >
                                            <Text style={styles.textBox}>{formattedStartDate}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        {input.show && (
                                            <DateTimePicker
                                                testID="startDatePicker"
                                                value={input.date}
                                                mode={input.mode}
                                                is24Hour={false}
                                                display="spinner"
                                                onChange={input.onChange}
                                            />
                                        )}
                                    </View>
                                        
                                </View>
                                <View style={{flex:1,flexDirection:'row',}}>
                                    <View style={{flex:1, paddingLeft:5}}>
                                        <TouchableOpacity
                                            style = {styles.dateButton}
                                            onPress={input.showTimepicker}
                                        >
                                            <Text style={styles.textBox}>{formattedStartTime}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        {input.show && (
                                            <DateTimePicker
                                                testID="startTimePicker"
                                                value={input.date}
                                                mode={input.mode}
                                                is24Hour={false}
                                                display="spinner"
                                                onChange={input.onChange}
                                            />
                                        )}
                                    </View>
                                </View>
                            </LinearGradient>

                                    
                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                <View style={{flex:1}}>
                                    <Text style={styles.label} >End{'\n'}Date/Time</Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',}}>
                                    <View style={{flex:1, paddingHorizontal:5,}}>
                                    
                                        <TouchableOpacity
                                            style = {styles.dateButton}
                                            onPress={input2.showDatepicker}
                                        >
                                            <Text style={styles.textBox}>{formattedEndDate}</Text>
                                        </TouchableOpacity>
                                        
                                        {input2.show && (
                                            <DateTimePicker
                                                testID="endDatePicker"
                                                value={input2.date}
                                                mode={input2.mode}
                                                is24Hour={false}
                                                display="spinner"
                                                onChange={input2.onChange}
                                            />
                                        )}
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection:'row',}}>
                                    <View style={{flex:1, paddingLeft:5}}>
                                        <TouchableOpacity
                                            style = {styles.dateButton}
                                            onPress={input2.showTimepicker}
                                        >
                                            <Text style={styles.textBox}>{formattedEndTime}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {input2.show && (
                                        <DateTimePicker
                                            testID="endTimePicker"
                                            value={input2.date}
                                            mode={input2.mode}
                                            is24Hour={false}
                                            display="spinner"
                                            onChange={input2.onChange}
                                        />
                                    )}
                                </View>
                            </LinearGradient>

                            <View style ={styles.newSessionButton}>
                                        <TouchableOpacity
                                                onPress={()=>{ submit(); 
                                                }}
                                            >
                                            <Text style={styles.saveText} >Save Session</Text>
                                        </TouchableOpacity>
                                    </View>
                        </View>
                    }
                    
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
    row: {
        flex:1,
        flexDirection: "row",
        backgroundColor: '#dddddd',
        marginTop: 40,
        alignItems: 'center',
        height: 95,
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 30,
    },
    inputBoxBuyIn: {
        flexDirection:"row",
        height: 40,
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#DDDBF5',
        borderRadius: 10,
    },
    inputBoxCashOut: {
        flex: 1,
        borderRadius: 10,
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#DDDBF5',
    },
    text1: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    text2: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 2,
    },
    inputBoxLocation: {
        backgroundColor: "#DDDBF5",
        height: 40,
        fontSize: 20,
        borderRadius: 10,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown: {
        backgroundColor: "#DDDBF5",
        borderRadius: 10,
    },
    inputBoxStake: {
        flex: 1,
        height: 40,
        backgroundColor: "#DDDBF5",
        fontSize: 20,
        borderRadius: 10,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textBox: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        fontSize:18,
        color: "black",
        paddingVertical: 12

    },
    textAlt: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        flex: 1,
        marginLeft: 10,
        marginTop: 20,
    },
    textTime: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        margin: 20,
        paddingHorizontal: 30,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: "center",
        backgroundColor: "darkgray",
        alignSelf: "flex-start"
    },
    textAmount: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        margin: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 0,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 25,
        textAlign: "center",
        backgroundColor: "darkgray"
    },
    label: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    labelStakes: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    labelGame: {
        width: 110,
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    labelAlt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        margin: 20,
        paddingVertical: 25
    },
    labelAlt2: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20,
        marginBottom: 0,
        paddingVertical: 0
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white'
    },
    placeContainer: {
        width: width - 40,
        height: width / 2,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 4,
        marginVertical: 10,
        overflow: "hidden"
    },
    dateButton: {
        height: 50,
        backgroundColor: "#DDDBF5",
        borderRadius: 10
    },
    picker: {
        color: "black",
    },
    newSessionButton: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        color: "red",
        margin: 20,
        borderRadius: 40,
        backgroundColor: 'red'
    },
    saveText: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#62FAE0',
        height: 40,
        borderRadius: 10
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

    },
    error: {
        borderWidth:3,
        borderColor: 'red'
      },
      errorContainer:{
        alignItems:'center', 
        justifyContent:'center',
        marginHorizontal:30,
        fontFamily: "normal"
        
      },
      errorText:{
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
      }
});
