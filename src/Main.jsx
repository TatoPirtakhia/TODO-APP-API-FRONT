import { useState } from "react";
function Main(props) {
  const ALL = () => {
    props.setAll(!props.all);
    props.setCompleted(false);
    props.setActive(false);
  };
  const Active = () => {
    props.setActive(!props.active);
    props.setCompleted(false);
    props.setAll(false);
  };
  const Completed = () => {
    props.setCompleted(!props.completed);
    props.setActive(false);
    props.setAll(false);
  };

  const changeToactive = (event) => {
    if (
      event.target.classList.contains("check") ||
      event.target.classList.contains("check_dark")
    ) {
      const id = parseInt(event.target.id);
      const indx = props.tasks.findIndex((element) => element.id === id);

      let array = [...props.tasks];
      array[indx].status = !array[indx].status;
      props.setTasks(array);
    }

    // const  filtertask = props.tasks.filter((task) => task.id === ID)
  };
  const changeToNoActive = (event) => {
    if (event.target.classList.contains("active")) {
      const id = parseInt(event.target.id);
      const indx = props.tasks.findIndex((element) => element.id === id);

      let array = [...props.tasks];
      array[indx].active = !array[indx].active;
      props.setTasks(array);
    }
  };
  const remove = (event) => {
    if (event.target.classList.contains("remove")) {
      const id = parseInt(event.target.id);
      const indx = props.tasks.findIndex((element) => element.id === id);
      let array = [...props.tasks];
      array.splice(indx, 1);
      props.setTasks(array);
    }
  };
  const clearCompleted = () => {
    let array = [];
    array = props.Tasks.filter((element) => !element.status)
    props.setTasks(array);
  };
  if (props.tasks.length > 0) {
    return (
      <div className="main_container">
        <div className={props.dark ? "dark_container" : "container"}>
          <main className={props.dark ? "dark_main" : "main"}>
            {props.tasks.map((element,indx) => {
              return (
                <div key={indx}>
                  <div className={props.dark ? "dark_box" : "box"}>
                    <div
                      className={props.dark ? "check_dark" : "check"}
                      onClick={changeToactive}
                      id={element.id}
                    >
                      <div
                        className={element.status ? "active" : "noActive"}
                        onClick={changeToNoActive}
                        id={element.id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="9"
                          id={element.id}
                          onClick={changeToNoActive}
                        >
                          <path
                            fill="none"
                            stroke="#FFF"
                            strokeWidth="2"
                            d="M1 4.304L3.696 7l6-6"
                          />
                        </svg>
                      </div>
                    </div>
                    <p
                      className={
                        element.status
                          ? props.dark
                            ? "ckecked_text_dark"
                            : "ckecked_text"
                          : props.dark
                          ? "dark_text"
                          : "text"
                      }
                    >
                      {element.title}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      className="remove"
                      id={element.id}
                      onClick={remove}
                    >
                      <path
                        fill="#494C6B"
                        fillRule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
            <div className="components">
              <p
                className={props.dark ? "items_left_dark" : "items_left"}
              >{`${props.tasks.length} items left`}</p>
              <div className="main_filter">
                <button
                  className={props.dark ? props.all ? "btn_clicked_dark": "dark_btn" : props.all ? "btn_clicked_light":"btn"}
                  onClick={ALL}
                >
                  All
                </button>
                <button
                  className={props.dark ? props.active ? "btn_clicked_dark": "dark_btn" : props.active ? "btn_clicked_light":"btn"}
                  onClick={Active}
                >
                  Active
                </button>
                <button
                  className={props.dark ? props.completed ? "btn_clicked_dark": "dark_btn" : props.completed ? "btn_clicked_light":"btn"}
                  onClick={Completed}
                >
                  Completed
                </button>
              </div>
              <button
                className={props.dark ? "button_clear_dark" : "button_clear"}
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            </div>
          </main>
        </div>

        <p
          className={
            props.dark ? "dark_drop_drak_desktop" : "drop_drag_desktop"
          }
        >
          Drag and drop to reorder list
        </p>
      </div>
    );
  }
}

export default Main;
