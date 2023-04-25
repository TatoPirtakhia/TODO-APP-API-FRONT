import axios from "axios";

const  getAllTodo = async () =>{
    try {
        const response = await axios.get('https://todo-api-rsne.onrender.com/api/all')
        return response.data
    } catch (error) {
        console.log(error)
        return ''
    }
}

export default getAllTodo 