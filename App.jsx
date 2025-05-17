import React from 'react'
import { Text, View , StyleSheet } from 'react-native'
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp'
import Dashboard from './src/screens/Dashboard'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

 const Navigation = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
  )
}
const App = () => {
    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    )
}
export default App

const styles = StyleSheet.create({})
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './src/screens/Login';
// import SignUp from './src/screens/SignUp';
// import Dashboard from './src/screens/Dashboard';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="Dashboard" component={Dashboard} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
