import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for route parameters
import EditEmployee from '../imports/EditEmployee';
import Header from '../imports/Header.jsx';

export default function Update() {
    const { id } = useParams(); // Use useParams to get the 'id' from the route

    console.log(id); // This will log the 'id' parameter from the URL

    return (
        <>
            <Header />
            <div id="login">
                <div className="container">
                    <div className="row login-box">
                        <EditEmployee id={id} /> {/* Pass the id to EditEmployee */}
                    </div>
                </div>
            </div>
        </>
    );
}
