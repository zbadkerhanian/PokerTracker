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
    SectionList,
    TextInput
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

/*class Data extends Component {
    render() {
        let data = [{
            value: 'Teaxs Hold-em',
        }, {
            value: 'Poker',
        }, {
            value: 'PLO Omaha',
        }];


    }
}*/
const DATA = [
    {
        data: ['Hold-em', 'Poker', 'PLO Omaha']
    }
];

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
    const { user } = useContext(AuthContext);
    const [buyIn, setBuyIn] = useState('$');
    const [cashOut, setCashOut] = useState('$');
    let cashText;
    const input = useInput(new Date());
    const input2 = useInput(new Date());
    var formattedStartDate = format(input.date, "MM/dd/yyyy");
    var formattedStartTime = format(input.date, "hh:mm a");
    var formattedEndDate = format(input2.date, "MM/dd/yyyy");
    var formattedEndTime = format(input2.date, "hh:mm a");
    const [stakeNum, setStakeNum] = useState('');
    const [stakeDenom, setStakeDenom] = useState('');

    const [selectedGameValue, setSelectedGameValue] = useState("NL Texas Hold'em");

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
                                style={styles.dropDownPicker} 
                                start={{ y: 0.0, x: 0.2 }} end={{ y: 0.0, x: 1 }}>
                                
                                <Text style={styles.labelGame} >Game Type</Text>

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

                            </LinearGradient>

                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                    <Text style={styles.labelStakes} >Stakes</Text>
                                    <TextInput style={[{flex: 1,justifyContent: 'center', alignItems: 'center'},styles.stakesInput1]}maxLength={4} keyboardType="decimal-pad"
                                        onChangeText={input => setStakeNum(input)} />
                                    <Text style={styles.text2}> / </Text>
                                    <TextInput style={[{flex: 1,justifyContent: 'center', alignItems: 'center'},styles.stakesInput2]} maxLength={4} keyboardType="decimal-pad"
                                        onChangeText={input => setStakeDenom(input)} />

                            </LinearGradient>

                           

                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                    <Text style={styles.label} >Buy In</Text>
                                    <Text style={styles.text2}>$</Text>
                                    <TextInput style={[{flex: 1,justifyContent: 'center', alignItems: 'center'},styles.text]} maxLength={4} keyboardType="decimal-pad"
                                        onChangeText={input => setBuyIn(input)} />
                                        
                                    <Text style={styles.label1} >Cash Out</Text>
                                    <Text style={styles.text2}>$</Text>
                                    <TextInput style={[{flex: 1,justifyContent: 'center', alignItems: 'center'},styles.text1]} maxLength={4} keyboardType="decimal-pad"
                                        onChangeText={input => setCashOut(input)}/>
                            </LinearGradient>
                            
                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                    <Text style={styles.label} >Start Date/Time</Text>
                                    
                                    <TouchableOpacity
                                        style = {styles.dateButton}
                                        onPress={input.showDatepicker}
                                    >
                                        <Text style={styles.textBox}>{formattedStartDate}</Text>
                                    </TouchableOpacity>

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

                                    <TouchableOpacity
                                        style = {styles.dateButton}
                                        onPress={input.showTimepicker}
                                    >
                                        <Text style={styles.textBox}>{formattedStartTime}</Text>
                                    </TouchableOpacity>

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
                            </LinearGradient>

                                    
                            <LinearGradient 
                                colors={['#903DFC', '#62FAE0']} 
                                style={styles.row} 
                                start={{ y: 0.0, x: 0. }} end={{ y: 0.0, x: 1.0 }}>
                                    <Text style={styles.label} >End Date/Time</Text>
                                    
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
                                    

                                    <TouchableOpacity
                                        style = {styles.dateButton}
                                        onPress={input2.showTimepicker}
                                    >
                                        <Text style={styles.textBox}>{formattedEndTime}</Text>
                                    </TouchableOpacity>
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
                            </LinearGradient>
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
        flexDirection: "row",
        backgroundColor: '#dddddd',
        marginTop: 40,
        alignItems: 'center',
        height: 95,
        padding: 0,
        marginHorizontal: 30,
        borderRadius: 30,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#DDDBF5',
        height: 40,
        borderRadius: 10
    },
    text1: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#DDDBF5',
        height: 40,
        borderRadius: 10,
        marginRight: 20
    },
    text2: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 0,
        marginRight: 10

    },
    stakesInput1: {
        backgroundColor: "#DDDBF5",
        height: 40,
        width: 10,
        marginRight: 10,
        fontSize: 20,
        marginLeft: 60,
        borderRadius: 10,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    stakesInput2: {
        alignItems: 'center', 
        backgroundColor: "#DDDBF5",
        height: 40,
        width: 50,
        marginRight: 20,
        marginLeft: 0,
        borderRadius: 10,
        fontSize: 20,
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
        flex:1,
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        // backgroundColor:"blue"
    },
    labelStakes: {
        flex:1,
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20,
        paddingRight: 0 

    },
    label1: {
        flex:1,
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 20

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
    labelGame: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 20,
        marginTop: 30
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
    dropDown: {
        flex: 1,
        height: 40,
        width: 170,
        justifyContent: 'center', 
        alignItems: 'flex-start',
        margin: 20
    },
    dateButton: {
        height: 50,
        marginTop: 2,
        marginRight: 10,
        backgroundColor: "#DDDBF5",
        borderRadius: 10
    },
    picker: {
        height: 50, 
        width: 208,
        marginTop: 20,
        color: "black"
    },
    dropDownPicker:{
        flexDirection: "row",
        backgroundColor: '#dddddd',
        marginTop: 50,
        height: 95,
        padding: 0,
        marginHorizontal: 30,
        borderRadius: 30,
    },
    stakePicker: {
        height: 50, 
        width: 100,
        marginTop: 20,
        color: "black"
    },
    stakesPickerText: {
        fontSize: 12
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
