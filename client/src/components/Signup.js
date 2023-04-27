import React, { useState } from 'react'
import './css/Form.css'
import { Typography } from "@mui/material";




const Signup = () => {
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    let name, value;

    const handleInputs = (e) => { 
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }

    const postData = async (e) => { 
        e.preventDefault();
        const { name, email, password } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });
        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert("Registration failed.");
            console.log("Registration failed.");
        } else {
            window.alert("Registered successfully.");
            console.log("Registered successfully.");
        }
    }


    
    return (
        <>
            <div className="form-wrapper">
                <div className="header">
                    <Typography variant="overline">
                        <h1>Sign Up</h1>
                    </Typography>
                </div>
                <form method="POST" className="register-form" id="register-form">
                    <div className="form-group">
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input type="text" name="name" id="name" autoComplete="off" value = {user.name} onChange = {handleInputs}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input type="text" name="email" id="email" autoComplete="off" value = {user.email} onChange = {handleInputs}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="text" name="password" id="password" autoComplete="off" value = {user.password} onChange = {handleInputs}/>
                    </div>
                    <div className="form-group">
                        <input type = "submit" name =  "signup" id = "signup" className = "form-submit" value = "Sign Up" onClick = {postData}/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;