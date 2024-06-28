import { useEffect, useState } from "react";
import Navbar from "./componants/Navbar";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState("");

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
    saveToLS();
  };

  const handleEdit = (e, id) => {
    console.log(id);

    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);

    setTodo(todos[index].todo);
    let newTodo = [...todos];
    newTodo[index].todo = todo;
    setTodos(newTodo);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    // console.log(id);
    let resp = confirm("Do you want to delete this todo");
    if (resp) {
      let newTodo = todos.filter((item) => {
        return item.id != id;
      });
      setTodos(newTodo);
    }
    saveToLS();
  };

  const handleCheckBox = (e) => {
    let id = e.target.id;
    // console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    // console.log(index);
    let newTodos = [...todos]; // making newTodos array from todos with destructuring so that it can rerender again and again
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(todos, newTodos);
    saveToLS();
  };

  const handleFinished = () => {
    setFinished(!finished);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-purple-100 min-h-[80vh] my-5 w-[80%] p-5">
        <div className="addTodo">
          <h2 className="font-bold text-3xl font-sans p-2">Add Todo</h2>
          <input
            value={todo}
            onChange={handleChange}
            className="input p-5 m-2 rounded-md w-[80%] my-2 mx-auto"
            type="text"
          /><br/>
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="disabled:bg-slate-500 bg-blue-600 text-white p-3 mx-auto w-[80%] rounded-md text-lg"
          >
            Add
          </button>
        </div>
        <input
          type="checkbox" 
          className="mx-2 my-3 text-"
          checked={finished}
          onChange={handleFinished}
        />
        show finished
        <h2 className="font-semibold text-3xl my-3 font-serif">Your Todos</h2>
        {todos.length == 0 && <div>No todos to display</div>}
        {todos.map((item) => {
          return (
            (!finished || item.isCompleted) && (
              <div
                key={item.id}
                className="todos flex items-center  w-[50%] justify-between my-2"
              >
                <div className="flex gap-7 items-center">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    id={item.id}
                    value={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-blue-600 text-white p-2 mx-2 rounded-md"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-blue-600 text-white p-2 mx-2 rounded-md"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}

export default App;
