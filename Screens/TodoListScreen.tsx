import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/native';
import { Text, View, Modal, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

import { SERVER_URL } from '../constants';

export const TodoListScreen = () => {
  const route = useRoute();
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todoName, setTodoName] = useState<string>();
  const locationId = route.params.locationId;

  useEffect(() => {
    fetch(SERVER_URL + 'todo/getByLocation/' + locationId)
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.data.todos);
      });
  }, []);

  const renderTodoList = () => {
    if (todoList.length === 0) {
      return <Text>No Todos</Text>;
    }
    return todoList.map((todo) => {
      return (
        <TodoRow key={todo._id} status={todo.status}>
          <NameText>{todo.name}</NameText>
          <StatusText>{todo.status}</StatusText>
        </TodoRow>
      );
    });
  };

  const saveTodo = async () => {
    setIsLoading(true);
    const response = await fetch(SERVER_URL + 'todo/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: todoName, locationId }),
    });
    const newTodo = await response.json();
    const newArr = [...todoList, newTodo.data.todo];
    setTodoList(newArr);
    setIsLoading(false);
    setIsModalVisible(false);
    setTodoName('');
  };

  return (
    <>
      <ScreenWrapper>
        {renderTodoList()}
        <Button mode="contained" onPress={() => setIsModalVisible(true)}>
          Add a Todo
        </Button>
      </ScreenWrapper>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <ModalBody>
          <ModalView>
            <Text>Add a new Todo</Text>
            <TextInput
              label="Todo"
              value={todoName}
              onChangeText={(value: string) => setTodoName(value)}
              style={{ width: 250, marginTop: 20 }}
            />
            <Button mode="contained" onPress={() => saveTodo()}>
              {isLoading ? <ActivityIndicator /> : <Text>Save Todo</Text>}
            </Button>
          </ModalView>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TodoListScreen;

const ScreenWrapper = styled.View``;

const ModalBody = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  height: 300px;
  width: 350px;
`;

const TodoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  ${(props: any) =>
    css`
      background-color: ${props.status === 'todo' ? 'red' : 'green'};
    `}
`;

const NameText = styled.Text``;

const StatusText = styled.Text``;
