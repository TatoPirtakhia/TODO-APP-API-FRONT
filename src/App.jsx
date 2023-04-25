import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import getAllTodo from "./Get";
import PostTodo from "./Post";
function App() {
  const [inputvalue, setinputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [check, setCheck] = useState(false);
  const [dark, setDark] = useState(false);
  const Actives = tasks.filter((element) => !element.status);
  const Completed = tasks.filter((element) => element.status);
  const All = tasks;

  const getdata = async () => {
    const data = await getAllTodo();
    setTasks(data);
    console.log(tasks);
    console.log(All);
  };
  const postData = async () =>{
     await PostTodo(inputvalue,check)
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
      await postData()
      getdata();
      setinputValue("");
      setCheck(false);
    }
  };

  const makeChecked = () => {
    setCheck(!check);
  };

  return (
    <div className="App">
      <Header
        onkeyPress={onkeyPress}
        keypress={keyPress}
        value={inputvalue}
        makeChecked={makeChecked}
        check={check}
        dark={dark}
        setDark={setDark}
      />
      <Main
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
