import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {colors} from '../utilities/colors';
import {addTodo} from '../utilities/dbOperations';

const AddTodo = ({navigation, setRender, render}) => {
  const [TodoText, setTodoText] = useState('');
  const handleAddButtonPress = () => {
    if (TodoText === '') {
      ToastAndroid.show("Todo text can't be empty.", ToastAndroid.SHORT);
    } else {
      const date = new Date();
      const todo = {
        TodoText,
        Done: 0,
        Date: date.toLocaleDateString(),
      };
      addTodo(todo);
      //navigation.navigate('ListTodos');
      setTodoText('');
      Keyboard.dismiss();
      ToastAndroid.show('Todo has added.', ToastAndroid.SHORT);
      setRender(!render);
      navigation.navigate('ListTodos');
    }
  };
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <TextInput
        style={styles.textInput}
        placeholder="Type your todo"
        value={TodoText}
        onChangeText={data => setTodoText(data)}
      />
      <TouchableOpacity
        style={styles.customButton}
        activeOpacity={0.7}
        onPress={handleAddButtonPress}>
        <Text style={styles.customButtonText}>Add</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    position: 'absolute',
    top: 100,
    borderWidth: 1,
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
    borderRadius: 20,
    borderColor: colors.gray,
  },
  customButton: {
    position: 'absolute',
    top: 200,
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
export default AddTodo;
