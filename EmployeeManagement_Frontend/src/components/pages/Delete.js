import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate to redirect after deletion
import axios from 'axios';

export default function Delete({ id }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            // Make a DELETE request to the backend
            console.log('Delete Inside');
            await axios.delete(`/users/${id}`);
            alert('Employee deleted successfully');
            navigate('/list'); // Redirect to the employee list or another page after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee');
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            {/* Your form fields for editing the employee */}
            <button onClick={handleDelete} className="btn btn-danger">
                Delete Employee
            </button>
        </div>
    );
}
