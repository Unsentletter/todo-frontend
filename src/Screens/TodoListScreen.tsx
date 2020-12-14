import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/native';
import { Text, Modal, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

import { SERVER_URL } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import API from '../API/api';

export const TodoListScreen = () => {
  const route = useRoute();
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todoName, setTodoName] = useState<string>();
  const [isCloseTodoModalOpen, setIsCloseTodoModalOpen] = useState<boolean>(
    false
  );
  const [closeTodoName, setCloseTodoName] = useState<string>();
  const [todoId, setTodoId] = useState<string>();

  const locationId = route.params.locationId;

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    const todos = await API('get', `todo/getByLocation/${locationId}`);
    setTodoList(todos.data.data.todos);
  };

  const renderTodoList = () => {
    if (todoList.length === 0) {
      return <Text>No Todos</Text>;
    }
    return todoList.map((todo) => {
      return (
        <TodoRow
          key={todo._id}
          status={todo.status}
          onPress={() => {
            setTodoId(todo._id);
            setIsCloseTodoModalOpen(true);
          }}
        >
          <TopRow>
            <NameText>{todo.name}</NameText>
            {todo.doneBy ? <Text>{todo.doneBy}</Text> : null}
            <StatusText>{todo.status}</StatusText>
          </TopRow>
          <ScrollView>
            <Text>
              This is a description that will go for lots of lines and be really
              descriptive so ev eryone knows what the description is telling
              people what to do
            </Text>
          </ScrollView>
        </TodoRow>
      );
    });
  };

  const saveTodo = async () => {
    setIsLoading(true);
    const newTodo = await API('post', 'todo/create', {
      name: todoName,
      locationId,
    });
    const newArr = [...todoList, newTodo.data.data.todo];
    setTodoList(newArr);
    setIsLoading(false);
    setIsModalVisible(false);
    setTodoName('');
  };

  const closeTodo = async (id) => {
    const closed = await API('post', 'todo/close', {
      todoId: id,
      doneBy: closeTodoName,
    });
    if (closed.data.success === true) {
      getTodoList();
      setIsCloseTodoModalOpen(false);
    }

    // TODO - cover fail response
  };

  return (
    <>
      <ScreenWrapper>
        {renderTodoList()}
        <Button mode='contained' onPress={() => setIsModalVisible(true)}>
          Add
        </Button>
      </ScreenWrapper>
      <Modal animationType='slide' transparent={true} visible={isModalVisible}>
        <ModalBody>
          <ModalView>
            <Text>Add a new Todo</Text>
            <TextInput
              label='Todo'
              value={todoName}
              onChangeText={(value: string) => setTodoName(value)}
              style={{ width: 250, marginTop: 20 }}
            />
            <Button mode='contained' onPress={() => saveTodo()}>
              {isLoading ? <ActivityIndicator /> : <Text>Save Todo</Text>}
            </Button>
          </ModalView>
        </ModalBody>
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isCloseTodoModalOpen}
      >
        <ModalBody>
          <ModalView>
            <Text>Who is closing this</Text>
            <TextInput
              label='Staff member'
              value={closeTodoName}
              onChangeText={(value: string) => setCloseTodoName(value)}
              style={{ width: 250, marginTop: 20 }}
            />
            <Button mode='contained' onPress={() => closeTodo(todoId)}>
              {isLoading ? <ActivityIndicator /> : <Text>Done</Text>}
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

const TodoRow = styled.TouchableOpacity`
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  height: 100px;
  ${(props: any) =>
    css`
      background-color: ${props.status === 'todo' ? 'white' : 'green'};
    `}
`;

const NameText = styled.Text``;

const StatusText = styled.Text``;

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
