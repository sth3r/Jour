import React from 'react';
import { View, Text } from 'react-native';

const SignIn = (props) => {
  return (
    <View>
        <Text onPress={()=>props.navigation.navigate('Home')}>SignIn</Text>
        <Text onPress={()=>props.navigation.navigate('SignUp')}>vai p SignUp</Text>
    </View>
    );
};

export default SignIn;
