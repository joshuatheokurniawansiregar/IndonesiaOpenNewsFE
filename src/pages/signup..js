import axios from 'axios';
import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//  Signup Admin
export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [message, setMessages] = useState("");
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    // console.log(formData.get('name'))
    await axios.post("http://127.0.0.1:8000/api/registeradmin", formData).then(Ress => {
      window.location.replace('/')
    })
    // if (response.status == 200) {
    //     setMessages(response.data.message);
    //     if (response.data.message) {
    //         // navigate("/");
    //         setTimeout(() => {
    //             console.log(response.data);
    //             window.localStorage.setItem("user", JSON.stringify(response.data));
    //         }, 2000);
    //     }
    // }
    // .catch(error => {
    //     if (error.response.status == 400) {
    //         setErrorName(JSON.parse(error.response.data)["name"]);
    //         setErrorEmail(JSON.parse(error.response.data)["email"]);
    //         setErrorPassword(JSON.parse(error.response.data)["password"]);
    //     }
    // });
  }
  return (
    <div className='auth-wrapper'>

      <div className='auth-inner'>
        <form onSubmit={signup}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="password " value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
