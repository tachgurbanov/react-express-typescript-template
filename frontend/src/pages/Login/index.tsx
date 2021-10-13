import React from 'react';
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { login } from "../../services/auth";
import api from '../../services/api'


const Login: React.FC = () => {

    const history = useHistory();

    const usernameRef = React.createRef<HTMLInputElement>();
    const passwordRef = React.createRef<HTMLInputElement>();

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const handleClick = () => {
        if (!username || !password) {
            showError("Empty")
            return
        }

        api.post('/login', {
            remember: remember
        }, {
            auth: {
                username: username,
                password: password
            }
        }).then((response) => {
            login(response.data.token)
            return history.push("/home")
        }).catch((response) => {
            if (response.response.status === 401) {
                showError('Username or password incorrect')
            }
            return false
        })
    }

    const showError = (message: string) => {
        usernameRef.current?.classList.add('input-error')
        passwordRef.current?.classList.add('input-error')
        setError(message)
    }

    return (
        <div className="login">
            <input
                type="text"
                className="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameRef}
            />
            <input
                type="password"
                className="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
            />


            <label className="checkbox">Remberme
                <input type="checkbox" onChange={(e) => setRemember(e.target.checked)} />
                <span className="checkmark"></span>
            </label>


            <button onClick={handleClick}>Enter</button>
            <p className="error">{error}</p>
        </div>
    )
}

export default Login;