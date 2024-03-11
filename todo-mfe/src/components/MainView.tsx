import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Space, Input, Tabs, Empty, Alert } from "antd";
import { isEmpty } from "lodash";
import TodoItems from "./TodoItems";
import TodoItemType from "./../model/TodoItem";

interface MainViewProps {
    title?: string;
}

interface StatusMapping {
    [key: string]: boolean;
}

const data: TodoItemType[] = [
    {
        id: 1234567,
        description: "SOD - Interview",
        status: false,
    },
    {
        id: 1234562,
        description: "SOD - Interview feedback",
        status: false,
    },
];

const STATUS_MAPPING: StatusMapping = {
    active: false,
    completed: true,
};

const Container = styled.div`
    font-size: 3rem;
    font-family: system-ui;
    margin: auto;
    max-width: 800px;
    margin-top: 20px;
`;

const Wrapper = styled.div`
    margin: 2rem 1rem;
`;

const MainTitle = styled.h2`
    margin-bottom: 1rem;
`;

const MainView: React.FC<MainViewProps> = ({ title = "My TODO List" }) => {
    const [todos, setTodos] = useState<TodoItemType[]>([]);
    const [currentTab, setCurrentTab] = useState("all");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const getStoredTodos = (): TodoItemType[] => JSON.parse(localStorage.getItem("todos") as string) || [];
    const setStoredTodos = (items: TodoItemType[]) => localStorage.setItem("todos", JSON.stringify(items));

    useEffect(() => {
        try {
            const storedTodos: TodoItemType[] = getStoredTodos();
            setTodos(storedTodos);
        } catch (err) {
            setError(`A problem occurred: ${err}`);
        }
    }, []);

    useEffect(() => {
        setStoredTodos(todos);
    }, [todos.length]);

    const updateItem = (item: TodoItemType) => {
        const updateIndex = todos.map((todo) => todo.id).indexOf(item.id);
        todos[updateIndex] = item;
        setStoredTodos(todos);
    };

    const onClear = () => {
        if (isEmpty(todos)) {
            setTodos(data);
            setStoredTodos(data);
        } else {
            setTodos([]);
            setStoredTodos([]);
        }
    };

    const onAdd = () => {
        todos.push({
            id: Math.floor(Math.random() * Date.now()),
            description,
            status: false,
        });
        setDescription("");
        setStoredTodos(todos);
    };

    return (
        <Container>
            <Wrapper>
                <MainTitle>{title}</MainTitle>
                <Space.Compact style={{ width: "100%", marginBottom: "1rem" }}>
                    <Input placeholder="TODO description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Space.Compact>
                {!isEmpty(error) && <Alert message={error} type="error" />}
                <Tabs
                    tabBarExtraContent={{
                        left: (
                            <Button style={{ marginRight: "10px" }} onClick={() => onClear()}>
                                {isEmpty(todos) ? "Add mocked data" : "Clear all"}
                            </Button>
                        ),
                        right: (
                            <Button type="primary" onClick={() => onAdd()} id="add-button" name="add-button">
                                Add
                            </Button>
                        ),
                    }}
                    items={["All", "Active", "Completed"].map((tab) => ({
                        label: tab,
                        key: tab.toLowerCase(),
                    }))}
                    onChange={(e) => setCurrentTab(e)}
                />
                <TodoItems
                    items={currentTab !== "all" ? todos.filter((todo) => todo.status === STATUS_MAPPING[currentTab]) : todos}
                    updateItem={updateItem}
                />
                {isEmpty(todos) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </Wrapper>
        </Container>
    );
};

export default MainView;
