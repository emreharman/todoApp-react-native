import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ToastAndroid,
  Modal,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../utilities/colors';
import {deleteTodo, updateTodo} from '../utilities/dbOperations';

const SimpleTodo = ({todo, setRender, render, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedTodoText, setUpdatedTodoText] = useState(todo.TodoText);
  const handleDeleteButton = () => {
    deleteTodo(todo.ID);
    ToastAndroid.show(`${todo.TodoText} is deleted.`, ToastAndroid.SHORT);
    setRender(!render);
  };
  const handleCheckButton = () => {
    let newTodo = {};
    if (todo.Done === 0) newTodo = {...todo, Done: 1};
    else newTodo = {...todo, Done: 0};
    updateTodo(newTodo);
    setRender(!render);
  };
  const handleEditButton = () => {
    if (updatedTodoText === '') {
      ToastAndroid.show("Todo text can't be empty.", ToastAndroid.SHORT);
    } else {
      const newTodo = {...todo, TodoText: updatedTodoText};
      updateTodo(newTodo);
      //navigation.navigate('ListTodos');
      Keyboard.dismiss();
      setModalVisible(false);
      setRender(!render);
      navigation.navigate('ListTodos');
    }
  };
  return (
    <View style={styles.todoContainer}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.todoText,
            todo.Done === 1 ? styles.doneTodoText : null,
          ]}>
          {todo.TodoText}
        </Text>
        <Text>{todo.Date}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable>
          <FontAwesome5
            name="check-circle"
            size={30}
            color={colors.pastelGreen}
            onPress={handleCheckButton}
          />
        </Pressable>
        <Pressable>
          <FontAwesome5
            name="edit"
            size={30}
            color={colors.lightBlue}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </Pressable>
        <Pressable>
          <FontAwesome5
            name="trash-alt"
            size={30}
            color={colors.lightRed}
            onPress={handleDeleteButton}
          />
        </Pressable>
      </View>
      <Modal
        style={styles.modal}
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            value={updatedTodoText}
            onChangeText={data => setUpdatedTodoText(data)}
            placeholder="Type your todo"
          />
          <TouchableOpacity
            style={styles.customButton}
            activeOpacity={0.7}
            onPress={handleEditButton}>
            <Text style={styles.customButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    borderColor: colors.gray,
  },
  textContainer: {
    width: '60%',
  },
  todoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  doneTodoText: {
    textDecorationLine: 'line-through',
    color: colors.lightRed,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
    borderRadius: 20,
    borderColor: colors.lightRed,
    marginBottom: 20,
    backgroundColor: colors.beige,
  },
  customButton: {
    width: '50%',
    backgroundColor: colors.lightRed,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  customButtonText: {
    fontSize: 18,
    color: colors.beige,
    fontWeight: 'bold',
  },
});

export default SimpleTodo;
