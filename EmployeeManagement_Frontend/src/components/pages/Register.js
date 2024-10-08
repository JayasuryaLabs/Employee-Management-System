import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../container/actions';
import BaseLogin from '../imports/BaseLogin';
import RegisterForm from '../imports/RegisterForm';

import { useNavigate } from 'react-router-dom'; // Updated to useNavigate instead of useHistory

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    
    const [errorMessage, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Updated useHistory to useNavigate

    // on form submit click handler
    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            username,
            email,
            password,
            passwordCheck
        };
        const validate = dispatch(registerAction(newUser));
        validate
            .then(data => {
                navigate('/login'); // Updated history.push to navigate
            })
            .catch(error => setError(error.data.err));
    };

    let registerData = {
        handleSubmit,
        setUsername,
        setEmail,
        setPassword,
        setPasswordCheck,
        errorMessage,
        setError
    };

    return (
        <div id="login">
            <div className="container">
                <div className="row login-box">
                    <BaseLogin />
                    <RegisterForm registerState={registerData} />
                </div>
            </div>
        </div>
    );
}
