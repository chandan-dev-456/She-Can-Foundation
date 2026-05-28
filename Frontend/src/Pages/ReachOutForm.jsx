import { validateYupSchema } from "formik"
import Form from "../Components/Form"
import * as Yup from "yup"
import toast from "react-hot-toast";
import { data } from "react-router-dom";
export default function ReachOutForm() {

    const handleReachOut = async (values) => {
        try {
            const response = await fetch(
                "import.meta.env.VITE_API_URL/form",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                }
            );
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }
        } catch (e) {
            console.log(e);
            toast.error("Server Error");
        }
    };
    return (
        <>
            <Form
                title="Reach Out"
                fields={[
                    {
                        name: "name",
                        title: "Name",
                        type: "text",
                        placeholder: "Enter your name",
                        validation: Yup.string()
                            .required("Name is required")
                    },
                    {
                        name: "email",
                        title: "Email",
                        type: "email",
                        placeholder: "Enter your email",
                        validation: Yup.string()
                            .required("Email is required")
                    },
                    {
                        name: "message",
                        title: "Message",
                        type: "textarea",
                        placeholder: "Write your message",
                        validation: Yup.string()
                            .required("Message is required")
                    }
                ]}
                buttonText="Submit"
                initialValues={{name: "",email: "",message: ""}}
                onSubmit={handleReachOut}
            />
        </>
    )
}