import React, { useState } from 'react'
import BaseLogin from '../imports/BaseLogin';
import LoginForm from '../imports/LoginForm';

import { useDispatch, useStore } from 'react-redux';
import { loginAction } from '../../container/actions'
import { useNavigate } from 'react-router-dom'; // Updated import

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setError] = useState("")

    const dispatch = useDispatch()
    const store = useStore()
    const navigate = useNavigate() // Use useNavigate instead of useHistory

    // handle Submit handler function
    const handleSubmit = (event) => {
        event.preventDefault();

        const userCredential = {
            email,
            password
        }
        const login = dispatch(loginAction(userCredential))
        login
            .then((data) => {
                console.log(data);
                navigate('/home'); // Replaced history.push with navigate
            })
            .catch(error => setError(error.err))
    }

    return (
        <div id="login">
            <div className="container">
                <div className="row login-box">
                    <BaseLogin />
                    <LoginForm loginState={{ handleSubmit, setEmail, setPassword, errorMessage, setError }} />
                </div>
            </div>
        </div>
    )
}
