import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../screens/HomeScreen'
import History from '../screens/HistoryScreen'

export default function Tabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            className='absolute w-full h-20 bottom-6 pr-4 pl-4 bg-green-600'
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
                    left: 15,
                    right: 15,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 70,
                    padding:17,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.15,    
                    shadowRadius: 12.5,
                },
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
        
                    if (route.name === 'home') {
                      iconName = 'home';
                    } else if (route.name === 'history') {
                      iconName = 'history';
                    }
                    //   <Icon name={iconName} size={size} color={color} />
                    return <MaterialIcons name={iconName} size={size} color="#555"  style={{color: color}} />;
                },
                tabBarShowLabel:false,
                tabBarActiveTintColor: '#2bba52',
                tabBarInactiveTintColor: 'gray', 
            })}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="history" component={History} />
        </Tab.Navigator>
    );
}