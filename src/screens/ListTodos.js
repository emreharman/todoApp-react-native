import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {colors} from '../utilities/colors';

import {createTable, getTodos} from '../utilities/dbOperations';

import SimpleTodo from '../components/SimpleTodo';

const ListTodos = ({navigation, route, todos, setTodos, setRender, render}) => {
  useEffect(() => {
    createTable('Todos');
    getTodos(setTodos);
    //console.log(todos);
  }, []);
  //console.log(todos);

  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Todos yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {todos.map(item => {
        return (
          <SimpleTodo
            key={item.ID}
            todo={item}
            setRender={setRender}
            render={render}
            navigation={navigation}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ListTodos;
