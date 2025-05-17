// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const Dashboard = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Dashboard</Text>
//       <Text style={styles.subtitle}>You have successfully logged in!</Text>
//       <Button
//         title="Go to Login"
//         onPress={() => navigation.navigate('Login')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default Dashboard;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="check-circle" size={60} color="#0066cc" />
        <Text style={styles.title}>Welcome to Task Manager</Text>
        <Text style={styles.subtitle}>Manage your tasks efficiently!</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TaskList')}
        >
          <Icon name="list" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>View Tasks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color="#0066cc" style={styles.buttonIcon} />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Icon name="info" size={24} color="#0066cc" />
          <Text style={styles.infoText}>Create and manage tasks with ease</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Icon name="notifications" size={24} color="#0066cc" />
          <Text style={styles.infoText}>Stay on top of your deadlines</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Icon name="check" size={24} color="#0066cc" />
          <Text style={styles.infoText}>Track your progress efficiently</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0066cc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#0066cc',
  },
  buttonIcon: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
});

export default Dashboard;