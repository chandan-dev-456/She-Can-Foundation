import "./Form.css";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup"
export default function Form({ title, fields, buttonText, onSubmit, initialValues }) {

    const validationObject = {}
    fields.forEach((field) => {
        validationObject[field.name] = field.validation;
    });

    const validationSchema = Yup.object(validationObject);

    const formInitialValues = initialValues || {};
    fields.forEach((field) => {
        if (!(field.name in formInitialValues)) {
            formInitialValues[field.name] = "";
        }

    });
    const formik = useFormik({
        initialValues: formInitialValues,
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        }
    });
    return (
        <>
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <form
                    onSubmit={formik.handleSubmit}
                    className="bg-white bg-opacity-75 p-4 rounded-4 shadow form-box"
                >
                    <h2
                        className="text-center mb-4 text-danger"
                        style={{ fontFamily: "fantasy" }}
                    >
                        {title}
                    </h2>
                    {fields.map((field) => (
                        field.type === "textarea" ? (
                            <div className="mb-4" key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="form-label"
                                >
                                    {field.title}
                                </label>
                                <textarea
                                    name={field.name}
                                    id={field.name}
                                    rows="5"
                                    className="form-control"
                                    placeholder={field.placeholder}
                                    value={formik.values[field.name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {
                                    formik.touched[field.name] &&
                                    formik.errors[field.name] && (
                                        <p className="text-danger mt-1">
                                            {formik.errors[field.name]}
                                        </p>
                                    )
                                }
                            </div>
                        ) : (

                            <div className="mb-3" key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="form-label"
                                >
                                    {field.title}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    className="form-control"
                                    placeholder={field.placeholder}
                                    value={formik.values[field.name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.touched[field.name] &&
                                    formik.errors[field.name] && (
                                        <p className="text-danger mt-1">
                                            {formik.errors[field.name]}
                                        </p>
                                    )
                                }
                            </div>
                        )
                    ))}
                    <button
                        type="submit"
                        className="btn btn-danger w-100"
                    >
                        {buttonText}
                    </button>

                </form>
            </div>
        </>
    );
}