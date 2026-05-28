import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "../Components/Message";
export default function AdminDashBoard() {
    const [countMsg, setCountMsg] = useState(0);
    const [countUnread, setCountUnread] = useState(0);
    const [countRead, setCountRead] = useState(0);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMsg = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "import.meta.env.VITE_API_URL/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
                setMessages(data.messages);
                const totalMessages = data.messages.length;
                const unreadMessages =
                    data.messages.filter(
                        (msg) => !msg.isRead
                    );
                const unreadCount = unreadMessages.length;
                const readCount = totalMessages - unreadCount;
                setCountMsg(totalMessages);
                setCountUnread(unreadCount);
                setCountRead(readCount);
            }
            catch (e) {
                console.log(e);
            }
        };
        fetchMsg();
    }, []);

    return (
        <>
            <div className="container-fluid bg-light min-vh-100 px-0">
                <div className="container p-0">
                    <div className="row g-4 mb-4">
                        <div className="col-4">
                            <div className="bg-white shadow rounded-4 p-4 text-center">
                                <h2 className="text-primary fw-bold">
                                    {countMsg}
                                </h2>
                                <p className="text-secondary mb-0">
                                    Total Messages
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="bg-white shadow rounded-4 p-4 text-center">
                                <h2 className="text-success fw-bold">
                                    {countRead}
                                </h2>
                                <p className="text-secondary mb-0">
                                    Read Messages
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="bg-white shadow rounded-4 p-4 text-center">
                                <h2 className="text-danger fw-bold">
                                    {countUnread}
                                </h2>
                                <p className="text-secondary mb-0">
                                    Unread Messages
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-4 p-4">
                        <h3 className="fw-bold text-primary mb-4">
                            Recent Messages
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((msg) => (
                                        <tr key={msg._id} onClick={() => { navigate(`/message/${msg._id}`); }} style={{cursor :"pointer"}}>
                                            <td>{msg.name}</td>
                                            <td>{msg.email}</td>
                                            <td>{msg.message}.</td>
                                            {msg.isRead ? <td> <span className="badge bg-success"> Read </span></td> : <td> <span className="badge bg-danger"> Unread </span></td>}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}