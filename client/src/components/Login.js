import React, { useState } from 'react'
import './css/Form.css'
import { Typography } from "@mui/material";




const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const student = {username, address}
        fetch("http://localhost:8080/users/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        })
        .then(()=>{
            console.log("Registered!")
        })
        
    }
    return (
        <>
            <div className="form-wrapper">
                <div className="header">
                    <Typography variant="overline">
                        <h1>Login</h1>
                    </Typography>
                </div>
                <form className="register-form" id="register-form" noValidate autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input type="text" name="username" id="name" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="text" name="password" value={password} id="password"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" name="login" id="login" className="form-submit" value = "Login"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;