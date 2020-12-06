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
    const [userText, setText] = useState('$');
    let cashText;
    const input = useInput(new Date());
    const input2 = useInput(new Date());
    var formattedStartDate = format(input.date, "MM/dd/yyyy");
    var formattedStartTime = format(input.date, "hh:mm a");
    var formattedEndDate = format(input2.date, "MM/dd/yyyy");
    var formattedEndTime = format(input2.date, "hh:mm a");

    const state = { game: 'Texas Hold\'em' };

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
                <SafeAreaView>
                    <ScrollView scrollEventThrottle={16}>
                        <View>
                            {user &&
                                <View style={styles.container1}>
                                    <View style={styles.row}>
                                        <Text style={styles.label} >Game Type</Text>
                                        {/* <Text style={styles.text}>{ }</Text> */}
                                        <DropDownPicker
                                            items={[
                                                { label: 'Texas Hold\'em', value: 'Texas Hold\'em', hidden: false },
                                                { label: 'Limit Hold\'em', value: 'Limit Hold\'em', hidden: false },
                                                { label: 'No Limit Hold\'em', value: 'No Limit Hold\'em', hidden: false },
                                                { label: 'Poker', value: 'Poker', hidden: false },
                                                { label: 'PLO Omaha', value: 'PLO Omaha', hidden: false },
                                            ]}
                                            defaultValue={state.game}
                                            containerStyle={styles.dropDown}
                                            style={{ backgroundColor: 'darkgray' }}
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
                                        <Text style={{ fontSize: 30 }} >{userText.split(' ').map((word) => word && '').join(' ')}</Text>

                                        <TextInput style={styles.text} keyboardType="decimal-pad"
                                            onChangeText={userText => setText(userText)}
                                            defaultValue={userText}>


                                        </TextInput>

                                        <Text style={styles.label} >Cash Out</Text>
                                        <Text style={{ fontSize: 30 }} >{userText.split(' ').map((word) => word && '').join(' ')}</Text>
                                        <TextInput style={styles.text} placeholder="Cash Out" keyboardType="decimal-pad"
                                            onChangeText={userText => setText(userText)}
                                            defaultValue={userText}>

                                        </TextInput>
                                    </View>

                                    <View>
                                        <Text style={styles.labelAlt2} >Start Date/Time</Text>
                                        {/* <Text style={styles.text}>{formattedStartDate + " " + formattedStartTime}</Text> */}
                                    </View>

                                    <View style={styles.row}>
                                        <View>
                                            <TouchableOpacity
                                                // style = {styles.button1}
                                                onPress={input.showDatepicker}
                                            >
                                                <Text style={styles.text}>{formattedStartDate}</Text>
                                            </TouchableOpacity>

                                            {/* <Button onPress={input.showDatepicker} title={"Start Date\t" + formattedStartDate}/> */}
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

                                        <View>
                                            <TouchableOpacity
                                                // style = {styles.button2}
                                                onPress={input.showTimepicker}
                                            >
                                                <Text style={styles.text}>{formattedStartTime}</Text>
                                            </TouchableOpacity>

                                            {/* <Button onPress={input.showTimepicker} title={"Start Time\t" + formattedStartTime}/> */}
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
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={styles.labelAlt2} >End Date/Time</Text>
                                        {/* <Text style={styles.text}>{formattedEndDate + "  " + formattedEndTime}</Text> */}
                                    </View>

                                    <View style={styles.row}>
                                        <View>
                                            <TouchableOpacity
                                                // style = {styles.button1}
                                                onPress={input2.showDatepicker}
                                            >
                                                <Text style={styles.text}>{formattedEndDate}</Text>
                                            </TouchableOpacity>
                                            {/* <Button onPress={input2.showDatepicker} title={"End Date\t" + formattedEndDate}/> */}
                                            <View>
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

                                        <View>
                                            <TouchableOpacity
                                                style={styles.button2}
                                                onPress={input2.showTimepicker}
                                            >
                                                <Text style={styles.text}>{formattedEndTime}</Text>
                                            </TouchableOpacity>
                                            {/* <Button onPress={input2.showTimepicker} title={"End Time\t" + formattedEndTime}/> */}
                                            <View>
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
        alignItems: 'center',
        justifyContent: 'center',
        height: 500
    },
    container1: {
        flex: 1,
        backgroundColor: "#DDDDDD",
        margin: 20
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
        textAlign: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: "darkgray",
        alignSelf: "flex-start"

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
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        margin: 20,
        paddingVertical: 20

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
        marginRight: 20,
        marginTop: 33
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
