import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './frontend/src/components/tabs';
import Conversion from './frontend/src/screens/ConversionScreen'
// import Home from './frontend/src/screens/HomeScreen'
// import Menu from './frontend/src/screens/MenuScreen'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Tabs' screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="ElibRegister" component={Home} />
          <Stack.Screen name="ElibLogin" component={Menu} /> */}
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Conversion" component={Conversion} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
