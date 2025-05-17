// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { updateTask } from '../utils/api';

// const TaskItem = ({ task, onDelete }) => {
//   const handleToggleComplete = async () => {
//     try {
//       await updateTask(task._id, { completed: !task.completed });
//       // Optimistic update or refetch tasks
//     } catch (error) {
//       console.error('Failed to update task:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.taskInfo}>
//         <Text style={[styles.title, task.completed && styles.completed]}>
//           {task.title}
//         </Text>
//         {task.description && <Text>{task.description}</Text>}
//         <Text style={styles.dueDate}>
//           Due: {new Date(task.dueDate).toLocaleDateString()}
//         </Text>
//       </View>
//       <View style={styles.actions}>
//         <TouchableOpacity onPress={handleToggleComplete}>
//           <Icon
//             name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
//             size={24}
//             color={task.completed ? 'green' : 'gray'}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => onDelete(task._id)}>
//           <Icon name="delete" size={24} color="red" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     elevation: 2,
//   },
//   taskInfo: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   completed: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
//   dueDate: {
//     color: 'gray',
//     marginTop: 5,
//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
// });

// export default TaskItem;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateTask } from '../utils/api';

const TaskItem = ({ task, onDelete, onUpdate, navigation }) => {
  const handleToggleComplete = async () => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      // Notify parent component about the update to refresh the task list
      if (onUpdate) {
        onUpdate({
          ...task,
          completed: !task.completed
        });
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      Alert.alert('Error', 'Failed to update task status');
    }
  };

  const handleEdit = () => {
    // Navigate to the EditTask screen with the task data
    navigation.navigate('EditTask', { task });
  };

  // Format the date properly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.completeButton} 
        onPress={handleToggleComplete}
      >
        <Icon
          name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={24}
          color={task.completed ? 'green' : '#888'}
        />
      </TouchableOpacity>
      
      <View style={styles.taskInfo}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        {task.description && (
          <Text style={[styles.description, task.completed && styles.completed]}>
            {task.description}
          </Text>
        )}
        <Text style={styles.dueDate}>
          Due: {formatDate(task.dueDate)}
        </Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleEdit}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onDelete(task._id)}
        >
          <Text style={styles.actionButtonText1}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionButtonText: {
    color: 'blue',
    fontSize: 12,
  },
  actionButtonText1: {
    color: 'red',
    fontSize: 12,
  },
  completeButton: {
    padding: 5,
  },
  taskInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  dueDate: {
    color: '#888',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
});

export default TaskItem;