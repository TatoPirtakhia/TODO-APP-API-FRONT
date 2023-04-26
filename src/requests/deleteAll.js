import axios from "axios";

const  deleteAll = async (status) =>{
   await axios.delete("https://todo-api-rsne.onrender.com/api/deleteCompleted")
      .then((response) => {
        console.log(response);
      });
}

export default deleteAll 