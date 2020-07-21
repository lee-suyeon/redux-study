import React, { useState, memo } from 'react';

// 컴포넌트 최적화를 위하여 memo 사용
const TodoItem = memo(function TodoItem({ todo, onToggle }){
    return (
        <li
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
            onClick={() => onToggle(todo.id)}
        >
            {todo.text}
        </li>
    );
});

const TodoList = memo(function TodoList({ todos, onToggle }){
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
            ))}
        </ul>
    );
});

function Todos({ todos, onCreate, onToggle }) {
    // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야하는 것은 아니다. 
    const [text, setText] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        onCreate(text);
        setText('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={text}
                    placeholder="할 일을 입력하세요"
                    onChange={onChange}
                />
                <button type="submit">등록</button>
            </form>
            <TodoList todos={todos} onToggle={onToggle} />
        </div>
    )
}

export default Todos;

