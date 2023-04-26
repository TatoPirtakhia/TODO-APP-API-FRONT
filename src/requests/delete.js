import axios from "axios";

const deleteTodo = async (id) => {
  await axios.delete("https://todo-api-rsne.onrender.com/api/deleteTodo/" + id)
    .then((response) => {
      console.log(response);
    });
};

export default deleteTodo;
