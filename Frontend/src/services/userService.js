import axiosInstance from "../axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HandleLoginApi = async (email, password) => {
    //const history = useHistory();
    try {

        const res = await axiosInstance.post("/api/login", { email, password })

    } catch (e) {
        console.log(e)
    }

}

export { HandleLoginApi };