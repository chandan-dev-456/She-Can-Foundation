import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
export default function Message() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [msg, setMsg] = useState([]);
    useEffect(() => {
        const singleMsg = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/message/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                const data = await response.json();
                if (data.success) {
                    setMsg(data.singleMsg);
                }
            }
            catch (e) {
                console.log(e);
                toast.error("Server Error");
            }
        };
        singleMsg();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/message/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                navigate("/dashboard");
            }
        }
        catch (e) {
            console.log(e);
            toast.error("Server Error");
        }
    };

    const handleMarkAsRead = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/message/${id}`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setMsg(data.updateMsg);;
            }
        } catch (e) {
            console.log(e);
            toast.error("Server Error");
        }
    }
    return (
        <>
            <div className="container-fluid bg-light min-vh-100 p-4">
                <div className="container">
                    <div className="bg-white shadow-lg rounded-4 p-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold text-primary">
                                Message Details
                            </h2>
                            {
                                msg?.isRead ? <span className="badge bg-success fs-6">Read</span> :
                                    <span className="badge bg-danger fs-6">
                                        Unread
                                    </span>
                            }
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="bg-light rounded-3 p-3">
                                    <h6 className="text-secondary">
                                        Sender Name
                                    </h6>
                                    <h5 className="fw-bold">
                                        {msg?.name}
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="bg-light rounded-3 p-3">
                                    <h6 className="text-secondary">
                                        Email Address
                                    </h6>
                                    <h5 className="fw-bold">
                                        {msg?.email}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light rounded-4 p-4">
                            <h5 className="fw-bold text-primary mb-3">
                                Message
                            </h5>
                            <p className="text-secondary fs-5 mb-0">
                                {msg?.message}
                            </p>
                        </div>
                        <div className="mt-4 d-flex gap-3">
                            {msg?.isRead === false ? <button className="btn btn-success px-4" onClick={handleMarkAsRead}> Mark as Read</button> : null}

                            <button className="btn btn-danger px-4" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
