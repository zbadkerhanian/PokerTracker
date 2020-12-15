import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';


const Splash = ({
    navigation,
}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000);
    }, [])

    return (
        <View color={['64B6FF']}>
            <Image source={require('../../assets/splash1.png')} resizeMode="cover" style={{
                flex: 1
            }} />
        </View>
    )
}
export default Splash;