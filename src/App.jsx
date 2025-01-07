import { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);

  function addToDo(toDoData) {
    const toDo = toDoData.get('todo');
    if (toDo == '') {
      alert('Please enter a to do');
      return;
    }
    const updatedToDos = [...toDos];
    updatedToDos.push({ text: toDo, isEdit: false, checkedOff: false });
    setToDos(updatedToDos);
  }
  function EditButton(props) {
    const [editedToDo, setEditedToDo] = useState(props.toDo.text);
    const handleChange = (e) => {
      setEditedToDo(e.target.value);
    };
    function submitEdit(toDoToEdit) {
      const editedToDos = [...toDos];
      const editIndex = editedToDos.indexOf(toDoToEdit);
      editedToDos[editIndex].text = editedToDo;
      editedToDos[editIndex].isEdit = false;
      setToDos(editedToDos);
    }

    if (props.toDo.isEdit) {
      return (
        <div>
          <input value={editedToDo} type="text" onChange={handleChange}></input>
          <button className="edit-button" onClick={() => submitEdit(props.toDo)}>
            submit
          </button>
        </div>
      );
    } else {
      return (
        <button className="edit-button" onClick={() => editToDo(props.toDo)}>
          edit
        </button>
      );
    }
  }

  function deleteToDo(toDoToDelete) {
    const updatedToDos = toDos.filter((toDo) => toDo.text !== toDoToDelete.text);
    setToDos(updatedToDos);
  }
  function editToDo(toDoToEdit) {
    const editedToDos = [...toDos];
    const editIndex = editedToDos.indexOf(toDoToEdit);
    editedToDos[editIndex].isEdit = true;
    setToDos(editedToDos);
  }
  function strikeThrough(toDo) {
    const strikeThroughToDos = [...toDos];
    const strikeThroughIndex = strikeThroughToDos.indexOf(toDo);
    strikeThroughToDos[strikeThroughIndex].checkedOff = !strikeThroughToDos[strikeThroughIndex].checkedOff;
    setToDos(strikeThroughToDos);
  }
  function ToDoList(props) {
    let toDoDisplay = '';
    let classes = '';
    let isChecked = false;

    const toDosJsx = props.toDos.map((toDo) => {
      if (toDo.isEdit) {
        toDoDisplay = '';
      } else {
        toDoDisplay = toDo.text;
      }
      if (toDo.checkedOff) {
        classes = 'strike-through';
        isChecked = true;
      } else {
        classes = '';
        isChecked = false;
      }
      return (
        <li key={toDo.text} className="todo">
          <input type="checkbox" onClick={() => strikeThrough(toDo)} checked={isChecked}></input>
          <div id={toDo.text} className={classes}>
            {toDoDisplay}
          </div>
          <EditButton toDo={toDo} />
          <button className="delete-button" onClick={() => deleteToDo(toDo)}>
            delete
          </button>
        </li>
      );
    });
    return <ul className="todo-list">{toDosJsx}</ul>;
  }
  return (
    <div className="App">
      <h1>To Do App</h1>
      <form action={addToDo}>
        <input name="todo"></input>
        <button type="submit">Add To Do</button>
      </form>
      <div className="todo-div">
        <ToDoList toDos={toDos} />
      </div>
    </div>
  );
}

export default App;

//TODO or think about: persisting data using local storage
//todo tutorial: https://www.freecodecamp.org/news/build-a-todo-app-from-scratch-with-reactjs/
