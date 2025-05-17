import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import TaskList from '../screens/TaskList';
import AddTask from '../screens/AddTask';
import EditTask from '../screens/EditTask';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="TaskList" component={TaskList} options={{ title: 'Your Tasks' }} />
      <Stack.Screen name="AddTask" component={AddTask} options={{ title: 'Add Task' }} />
      <Stack.Screen name="EditTask" component={EditTask} options={{ title: 'Edit Task' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;