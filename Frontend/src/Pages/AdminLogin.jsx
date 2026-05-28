import toast from "react-hot-toast";
import Form from "../Components/Form"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import * as Yup from "yup"
export default function AdminLogin() {
    const navigate = useNavigate();
    const handelSubmit = async (values) => {
        try{
            const message = await handleAdminLogin(values)
            toast.success(message);
            navigate("/dashboard");
        }catch(e){
           toast.error(e.message);
        }
    }
    const {handleAdminLogin} = useContext(AuthContext);
    return (
        <>
            <Form
                title="Admin Login"
                fields={[
                    { name: "email", title: "Email", type: "email", placeholder: "Enter your email", validation: Yup.string().required("Email is required") },
                    { name: "password", title: "Password", type: "password", placeholder: "Enter your password", validation: Yup.string().required("Password required") },
                ]}
                buttonText="Log In"
                initialValues= {{email : "admin@gmail.com" , password : "admin123"}}
                onSubmit={handelSubmit}
            ></Form>
        </>
    )
}
