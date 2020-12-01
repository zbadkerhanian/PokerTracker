import s from '../styles/global'
import React, { useState, useContext, Component, } from 'react';
//import React, { Component } from 'react';

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
//import { Dropdown } from 'react-native-material-dropdown';


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

//let buy = this.stat;




export default function NewSessionScreen(props) {
    const { user } = useContext(AuthContext);
    const [userText, setText] = useState('$');
    let cashText;


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
                                        <Text style={styles.text}>{ }</Text>
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

                                    <View style={styles.row}>
                                        <Text style={styles.label} >Start Time</Text>
                                        <TextInput style={styles.textTime} ></TextInput>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={styles.label} >End Time</Text>
                                        <TextInput style={styles.textTime} >{ }</TextInput>
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
