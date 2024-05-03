import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureStore from './redux/configureStore';
import { addTodo,dltTodo,checked } from './redux/actions/actions';


const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});

const App = () => {
  const [todo, setTodo] = useState('');
  const myDispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const Card = (item) => {
    return (
      <View style={styles.card}>
        <CheckBox
          value={item.check}
          onValueChange={() => myDispatch(checked(item.id))}
          style={styles.checkbox}
        />

        <Text style={[styles.cardText, item.check && styles.strikeText]}>
          {item.text}
        </Text>

        <TouchableOpacity
          style={styles.dltbutton}
          onPress={() => myDispatch(dltTodo(item.id))}>
          <Text style={styles.dltbuttonText}>Dlt</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Joel's Todo</Text>

      <Text style={styles.subHeading}>Todo List:</Text>

      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return Card(item);
        }}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.column}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTodo(text)}
          value={todo}
          placeholder="Enter Todo"
          placeholderTextColor="#095fe8"></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (todo.trim().length > 0) {
              myDispatch(addTodo(todo.trim()));
              setTodo('');
            }
          }}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const todoApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
const styles = StyleSheet.create({
  heading: {
    color:'black',

    padding: 15,
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f2dac2',
    borderRadius: 13,
    margin: 15,
    borderColor: 'gray',
    borderWidth: 3,
  },
  column: {
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    color:'black',

    padding: 10,
    width:200,
    borderRadius: 13,
    borderColor: 'gray',
    borderWidth: 3,
    marginRight: 20,
    backgroundColor: '#ede695',
  },
  button: {
    padding: 12,
    backgroundColor: '#e68388',
    borderRadius: 13,
    borderWidth: 2.3,
    borderColor: 'black',
    shadowColor: 'gray',
  },
  buttonText: {
    color:'black',
    fontWeight: '500',
    fontSize: 15,
  },
  cardText: {
    color:'black',

    fontWeight: '400',
    fontSize: 15,
    marginTop: 2.5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    padding: 9,
    margin: 5,
    borderRadius: 13,
    borderColor: 'gray',
    backgroundColor: '#c7e3ed',
    width: 267,
  },
  checkbox: {
    marginRight: 10,
    marginTop: 6,
  },
  dltbutton: {
    padding: 3.5,
    backgroundColor: '#c4d3f5',
    borderRadius: 8,
    borderWidth: 2.3,
    borderColor: 'black',
    shadowColor: 'gray',
  },
  dltbuttonText: {
    color:'black',
    fontWeight: '500',
    fontSize: 13,
  },
  subHeading: {
    fontWeight: '500',
    marginBottom: 7,
  },
  strikeText: {
    color:'black',

    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export default todoApp;