import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import type TodoItemType from './../model/TodoItem'

interface Props {
  checked: boolean
};

interface TodoItemProps {
  item: TodoItemType
  updateItem: (item:TodoItemType) => void
}

const ItemLabel = styled.div<Props>`
  ${({checked}) => {
    if (checked) return `text-decoration: line-through`;
  }}
`

const TodoItem: React.FC<TodoItemProps> = ({ item, updateItem }) => {

  const [checked, setChecked] = useState(item.status);

  const onChange: CheckboxProps['onChange'] = (e) => {
    const updatedItem = {
      ...item,
      status: e.target.checked
    }
    setChecked(e.target.checked);
    updateItem(updatedItem);
  };

  return (
    <>
      <div style={{ margin: '15px',  display: 'flex' }}>
        <Checkbox checked={checked} onChange={onChange} data-testid={`check-${item.description}`}>
          <ItemLabel checked={checked}>{item.description}</ItemLabel>
        </Checkbox>
      </div>
    </>
  )
}

export default TodoItem;