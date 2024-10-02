import React,  { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreen'
import Menu from '../screens/HistoryScreen'

export default function Stacks(){
    const Stack = createNativeStackNavigator();
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: false}}>
                    <Stack.Screen name="home" component={Home}/>
                    <Stack.Screen name="Menu" component={Menu}/>
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}