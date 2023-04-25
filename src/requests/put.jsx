import axios from "axios";

const  updateTodo = async (id,status) =>{
   await axios.put("https://todo-api-rsne.onrender.com/api/updateStatus", {
        status: status,
        id: id
      })
      .then((response) => {
        console.log(response);
      });
}

export default updateTodo 