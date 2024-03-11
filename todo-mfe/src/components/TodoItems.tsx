import React from 'react';
import styled from 'styled-components';
import type TodoItemType from '../model/TodoItem';
import TodoItem from './TodoItem';

interface TodoItemsProps {
  items: TodoItemType[],
  updateItem: (item:TodoItemType) => void
}

const ListContainer = styled.div`
  border-bottom: 1px solid #cbcbcb;
  padding: 0;
  margin: 0;
`

const TodoItems: React.FC<TodoItemsProps> = ({ items, updateItem }) => {
  return <>
    {items?.map(item => (
      <ListContainer key={item.id}>
        <TodoItem item={item} key={item.id} updateItem={updateItem} />
      </ListContainer>
    ))}
  </>
}

export default TodoItems;