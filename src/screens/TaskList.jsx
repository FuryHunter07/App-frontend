// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { getTasks, deleteTask } from '../utils/api';
// import TaskItem from '../components/TaskItem';

// const TaskList = ({ navigation }) => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await getTasks();
//       setTasks(response.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to fetch tasks');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteTask(id);
//       setTasks(tasks.filter((task) => task._id !== id));
//       Alert.alert('Success', 'Task deleted');
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || 'Failed to delete task');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TaskItem task={item} onDelete={handleDelete} />
//   );

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Add New Task"
//         onPress={() => navigation.navigate('AddTask')}
//       />
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//       ) : (
//         <FlatList
//           data={tasks}
//           renderItem={renderItem}
//           keyExtractor={(item) => item._id}
//           ListEmptyComponent={<Text style={styles.empty}>No tasks found</Text>}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   loader: {
//     marginTop: 20,
//   },
//   empty: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//   },
// });

// export default TaskList;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { getTasks, deleteTask } from '../utils/api';
import TaskItem from '../components/TaskItem';

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(id);
              setTasks(tasks.filter((task) => task._id !== id));
              Alert.alert('Success', 'Task deleted successfully');
            } catch (error) {
              Alert.alert('Error', error.response?.data?.message || 'Failed to delete task');
            }
          }
        }
      ]
    );
  };

  // Handle task update (including completion status)
  const handleUpdate = (updatedTask) => {
    // Update the task in our local state
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTasks();
    
    // Set up navigation listener to refresh tasks when returning to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });
    
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TaskItem 
      task={item} 
      onDelete={handleDelete} 
      onUpdate={handleUpdate}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addButtonText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
          <Text style={styles.loaderText}>Loading tasks...</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.empty}>No tasks found</Text>
              <Text style={styles.emptySubtext}>Add your first task to get started</Text>
            </View>
          }
          contentContainerStyle={tasks.length === 0 ? { flex: 1, justifyContent: 'center' } : {}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0066cc']}
            />
          }
        />
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 10,
  },
  loaderText: {
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  emptySubtext: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  }
});

export default TaskList;