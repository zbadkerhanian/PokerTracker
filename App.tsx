import * as React from 'react';
import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
//import "firebase/analytics";
import { StatusBar } from 'expo-status-bar';
import { View, Image, Dimensions, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'
import NewSessionScreen from './src/screens/NewSessionScreen'
import SessionDetailsScreen from './src/screens/SessionDetailsScreen'
import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/Signup';
import SplashScreen from './src/screens/SplashScreen';
import { AuthContext } from "./context";


var firebaseConfig = {
  apiKey: "AIzaSyDDDNnqSzXyEUUL2Kc1TH67tLovTclrZ8Q",
  authDomain: "barhop-256805.firebaseapp.com",
  databaseURL: "https://barhop-256805.firebaseio.com",
  projectId: "barhop-256805",
  storageBucket: "barhop-256805.appspot.com",
  messagingSenderId: "932994329359",
  appId: "1:932994329359:web:e1d02849f796ea4b992c7a",
  measurementId: "G-X11M63P8Y4"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//firebase.analytics();

export const Loading = () => (
  <View style={{ flex: 1, alignItems: 'center', padding: 50 }}>
    <ActivityIndicator size="large" color="#C2185B" />
  </View>
);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState("asdf");
  const [sessionList, setSessionList] = React.useState();

  React.useEffect(() => {
    console.log("in useEffect----------------")
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, sessionList, setSessionList }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {isLoading ? <Loading />
          : user ? <Drawer />
            : <AuthStack />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )

}


const DrawerNav = createDrawerNavigator();

function Drawer() {
  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'white',
      }}>
      <DrawerNav.Screen name="Home" component={HomeStack} />
    </DrawerNav.Navigator>
  )
}

const CustomDrawerContent = (props: any) => (
  <DrawerContentScrollView {...props} style={{ backgroundColor: '#282828', height: Dimensions.get('window').height }}>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 60, height: 120, width: 120, overflow: "hidden" }}>
        <Image source={require('./assets/profile-photo.jpg')} style={{ height: 160, width: 160 }} />
        {/* <Image source={{ uri: global.photoUrl }} style={{ height: 160, width: 160 }}/> */}
      </View>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
)


const HomeStackNav = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        animationEnabled: false,
        headerShown: false
      }}>
      <HomeStackNav.Screen name="Home" component={HomeScreen} />
      <HomeStackNav.Screen name="NewSession" component={NewSessionScreen} />
      <HomeStackNav.Screen name="SessionDetails" component={SessionDetailsScreen} />
    </HomeStackNav.Navigator>
  );
}

const AuthStackNav = createStackNavigator();
function AuthStack() {
  return (
    <AuthStackNav.Navigator
      initialRouteName='Login'
      screenOptions={{
        animationEnabled: false,
        headerShown: false
      }}>

      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen name="Signup" component={SignupScreen} />
    </AuthStackNav.Navigator>
  )
}




