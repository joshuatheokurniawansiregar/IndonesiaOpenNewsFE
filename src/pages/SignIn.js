import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setTimeout(function () {
                navigate("/");
            }, 1);
        }
    }, []);
    const loginHandler = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        await axios.post("http://127.0.0.1:8000/api/login/admin", formData)
            .then(response => {
                console.log(response.data)
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.replace("/");
            });
    }
    return (
        <>
            <div className="vertical-container-custom">
                <div className="width-50 title-form"><h3>Indonesia Open News</h3> <h3>Admin Login</h3></div>
                <form className="form-group-custom flex flex-justify-content-around flex-column margin-top-5" onSubmit={loginHandler}>
                    <div className="flex flex-justify-content-start flex-row align-items-baseline center-auto width-50">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" className="form-control-custom width-80 margin-left-5" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="flex flex-justify-content-start flex-row align-items-baseline center-auto width-50">
                        <label htmlFor="">Password</label>
                        <input type="password" className="form-control-custom width-80 margin-left-2" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn-custom btn-custom-sky center-auto">Signin</button>
                </form>
            </div>
        </>
    )
} 