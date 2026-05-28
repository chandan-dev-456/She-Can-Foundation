import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div className="content">
                <h1 style={{ fontSize: "5rem", fontFamily: "fantasy", color: "firebrick" }}>Your voice deserves to be heard.</h1>
                <button
                    onClick={() => navigate('/form')}
                    type="button" className="btn btn-outline-light px-5"
                    style={{ fontSize: "2rem", fontFamily: "fantasy", marginTop: "3rem", }}>
                    Reach Out
                </button>
            </div>
        </>
    );
}

export default Home;