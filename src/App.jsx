import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import getAllTodo from "./requests/Get";
import PostTodo from "./requests/Post";
import updateTodo from "./requests/put";
import deleteTodo from "./requests/delete";
import deleteAll from "./requests/deleteAll";
function App() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [inputvalue, setinputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [check, setCheck] = useState(false);
  const [dark, setDark] = useState(false);
  const Actives = tasks.filter((element) => !element.status);
  const Completed = tasks.filter((element) => element.status);
  const All = tasks;

  const postData = async () => {
    await PostTodo(inputvalue, check);
  };
  const updateStatus = async (id, status) => {
    await updateTodo(id, status);
  };
  const deletetodo = async (id) =>{
    await deleteTodo(id)
  }
  const deleteCompleted = async () =>{
    await deleteAll(true)
  }
  useEffect(() => {
    const getdata = async () => {
      const data = await getAllTodo();
      setTasks(data);
    };
    getdata();
  }, []);

  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [all, setAll] = useState(true);
  const keyPress = (event) => {
    setinputValue(event.target.value);
  };
  const onkeyPress = async (event) => {
    if (event.key === "Enter" && inputvalue != "") {
      setTasks([
        ...tasks,
        {
          title: inputvalue,
          status: check,
          id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        },
      ]);
      setinputValue("");
      setCheck(false);
      await postData();
    }
  };

  const makeChecked = () => {
    setCheck(!check);
  };

  const changeToactive = async (event) => {
    const id = parseInt(event.target.id);
    const indx = tasks.findIndex((element) => element.id === id);
    let array = [...tasks];
    array[indx].status = !array[indx].status;
    console.log(array[indx].status)
    setTasks(array);
    await updateStatus(id, array[indx].status);
  };
  const remove = async (event) => {
  
      const id = parseInt(event.target.id);
      const indx = tasks.findIndex((element) => element.id === id);
      let array = [...tasks];
      array.splice(indx, 1);
      setTasks(array);
      console.log(id)
      await deletetodo(id);
  };
  const clearCompleted = async () => {
    let array = [];
    array = tasks.filter((element) => !element.status);
    setTasks(array);
    await deleteCompleted()
  };
  return (
    <div className="App">
      <Header
        onkeyPress={onkeyPress}
        keypress={keyPress}

        value={inputvalue}
        makeChecked={makeChecked}
        check={check}
        status={check}
        dark={dark}
        setDark={setDark}
      />
      <Main
        changeToactive={changeToactive}
        clearCompleted={clearCompleted}
        remove={remove}
        deletetodo={deletetodo}
        dark={dark}
        setDark={setDark}
        check={check}
        setCheck={setCheck}
        Tasks={tasks}
        tasks={
          all
            ? All
            : active
            ? Actives.length > 0
              ? Actives
              : All
            : completed
            ? Completed.length > 0
              ? Completed
              : All
            : ""
        }
        setTasks={setTasks}
        all={all}
        setAll={setAll}
        active={active}
        setActive={setActive}
        completed={completed}
        setCompleted={setCompleted}
      />
      <Footer
        tasks={tasks}
        dark={dark}
        all={all}
        setAll={setAll}
        active={active}
        setActive={setActive}
        completed={completed}
        setCompleted={setCompleted}
      />
    </div>
  );
}

export default App;
