import {  createContext } from "react"

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const handleAdminLogin = async (formdata) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formdata)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            localStorage.setItem("token", data.token);
            return data.message;
        } catch (e) {
            throw e;
        }
    }
    const data = {handleAdminLogin}
    return (
        <>
            <AuthContext.Provider value={data}>
                {children}
            </AuthContext.Provider>
        </>
    )
} 