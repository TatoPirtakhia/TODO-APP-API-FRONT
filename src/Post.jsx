import axios from "axios";

const  PostTodo = async (title,status) =>{
   await axios.post("https://todo-api-rsne.onrender.com/api/title", {
        status: status,
        title: title
      })
      .then((response) => {
        console.log(response);
      });
}

export default PostTodo 