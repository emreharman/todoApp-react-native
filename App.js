import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {getTodos} from './src/utilities/dbOperations';
import {colors} from './src/utilities/colors';
import ListTodos from './src/screens/ListTodos';
import AddTodo from './src/screens/AddTodo';

const Tab = createBottomTabNavigator();

const App = () => {
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    getTodos(setTodos);
    //console.log(todos);
  }, [render]);

  const unDoneTodos = todos.filter(item => {
    if (item.Done === 0) return true;
    else return false;
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ListTodos"
        screenOptions={({route}) => ({
          headerStyle: {
            backgroundColor: colors.lightRed,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            color: colors.beige,
          },
          title:
            route.name === 'ListTodos'
              ? 'List Todos'
              : route.name === 'AddTodo'
              ? 'Add Todo'
              : '',

          tabBarIcon: ({focused, size, color}) => {
            let iconName = '';
            if (route.name === 'ListTodos') {
              iconName = 'clipboard-list';
              size = focused ? 25 : 20;
              color = focused ? colors.lightRed : colors.gray;
            }
            if (route.name === 'AddTodo') {
              iconName = 'plus-circle';
              size = focused ? 25 : 20;
              color = focused ? colors.lightRed : colors.gray;
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.lightRed,
          tabBarInactiveBackgroundColor: colors.lightGray,
          tabBarLabelStyle: {
            fontSize: 14,
          },
        })}>
        <Tab.Screen
          name="ListTodos"
          children={props => (
            <ListTodos
              navigation={props.navigation}
              todos={todos}
              setTodos={setTodos}
              setRender={setRender}
              render={render}
            />
          )}
          options={{
            tabBarBadge: unDoneTodos.length === 0 ? null : unDoneTodos.length,
          }}
        />
        <Tab.Screen
          name="AddTodo"
          children={props => (
            <AddTodo
              navigation={props.navigation}
              todos={todos}
              setTodos={setTodos}
              setRender={setRender}
              render={render}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
