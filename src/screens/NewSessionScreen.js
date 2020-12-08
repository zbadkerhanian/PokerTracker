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

    const state = { game: "NL Texas Hold'em" };

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
                            color: '#C2185B',
                            underlayColor: '#282828',
                            onPress: () => props.navigation.goBack()
                        }}
                        containerStyle={{
                            height: 80,
                            backgroundColor: '#282828',
                            borderBottomColor: '#282828',
                            borderBottomWidth: 1
                        }}
                        centerComponent={
                            {
                                text: 'New Session',
                                style: {
                                    color: '#C2185B',
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
                    {user &&
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <Text style={styles.label} >Game Type</Text>
                                <DropDownPicker
                                    items={[
                                        { label: "NL Texas Hold'em", value: "NL Texas Hold'em", hidden: false },
                                        { label: "Limit Texas Hold'em", value: "Limit Texas Hold'em", hidden: false },
                                        { label: "Pot Limit Omaha", value: "Pot Limit Omaha", hidden: false },
                                        { label: "Seven Card Stud", value: "Seven Card Stud", hidden: false },
                                        { label: "Three Card Poker", value: "Three Card Poker", hidden: false },
                                    ]}
                                    defaultValue={state.game}
                                    containerStyle={styles.dropDown}
                                    style={{justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor: 'darkgray' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: 'darkgray' }}
                                    onChangeItem={item => {
                                        game: item.value
                                    }}
                                />
                            </View>


                            <View style={styles.row}>
                                <Text style={styles.label} >Buy In</Text>
                                <View style={styles.textBox}>
                                    <Text style={styles.text}>$</Text>
                                    <TextInput style={[{flex: 1,justifyContent: 'center', alignItems: 'center'},styles.text]} keyboardType="decimal-pad"
                                        onChangeText={input => setBuyIn(input)} />
                                </View>


                                <Text style={styles.label} >Cash Out</Text>
                                <View style={styles.textBox}>
                                    <Text style={styles.text}>$</Text>
                                    <TextInput style={[{flex: 1,justifyContent: 'center', alignItems: 'center'},styles.text]} keyboardType="decimal-pad"
                                        onChangeText={input => setCashOut(input)}/>
                                </View>
                            </View>

                            

                            <View style={styles.row}>
                                    
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
                            </View>

                            

                            <View style={styles.row}>
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
                                    {/* <Button onPress={input2.showTimepicker} title={"End Time\t" + formattedEndTime}/> */}
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

                        </View>
                    }
                </SafeAreaView>
            </CollapsibleHeaderScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: "row",
        backgroundColor: '#dddddd',
        margin: 5,
        //justifyContent: 'center', 
        alignItems: 'center',
        height: 80
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    textBox: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        backgroundColor: "darkgray",

    },
    textAlt: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        flex: 1,
        marginLeft: 10,
        marginTop: 20,
    },
    textTime: {
        flex: 1,
        color: 'black',
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
        color: 'black',
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
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 10

    },
    labelAlt: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        margin: 20,
        paddingVertical: 25
    },
    labelAlt2: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20,
        marginBottom: 0,
        paddingVertical: 0
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
    },
    dropDown: {
        height: 40,
        width: 170,
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 20
    },
    dateButton: {
        height: 50
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
