import React, { Component, useEffect } from 'react';
import axios from 'axios';
import Header from '../imports/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Replaced useHistory with useNavigate
import './list.css';

const CheckingLogin = () => {
    const user = useSelector(state => state.isLoggedIn);
    const navigate = useNavigate(); // Using useNavigate instead of useHistory

    useEffect(() => {
        const isAuthenticated = () => {
            const token = localStorage.getItem('x-access-token');
            return token ? true : false;
        };

        if (!isAuthenticated()) {
            navigate('/login'); // Replaced history.push with navigate
        }
    }, [user, navigate]);

    return true;
}

class Leave extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            ID: 0,
            name: '',
            email: '',
            gender: '',
            phone: 0,
            list: [],
            leave: 'No'
        };
        this.approveLeave = this.approveLeave.bind(this);
    }

    componentDidMount = () => {
        this.getEmployee();
    }

    getEmployee = () => {
        axios.get('http://localhost:4000/api/users')
            .then((response) => {
                const data = response.data;
                this.setState({ employees: data });
                console.log('Data loaded');
            })
            .catch(() => {
                console.log('Data not retrieved');
            });
    }

    handleSubmit(employee, id) {
        const { name, ID, leave, gender, email, phone } = employee;

        axios.post('http://localhost:4000/api/users/' + id, {
            name,
            email,
            phone,
            gender,
            ID,
            leave,
        })
        .then((response) => {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    approveLeave(employee, id) {
        employee.leave = employee.leave === 'No' ? 'Yes' : 'No'; // Toggle leave status
        this.handleSubmit(employee, id);
    }

    render() {
        const { employees } = this.state;

        return (
            <>
                <Header />
                <main>
                    <div className='tableProp'>
                        <table responsive="true" className="table table-striped">
                            <thead className='columnProp'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">On Leave</th>
                                    <th scope="col">Leave Status</th>
                                </tr>
                            </thead>
                            <tbody className='tableBodyStyle'>
                                {
                                    employees && employees.map((employee, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.ID}</td>
                                            <td>{employee.leave}</td>
                                            <td>
                                                {employee.leave === 'Yes' ? (
                                                    <button
                                                        className='btn btn-success'
                                                        id={employee._id}
                                                        onClick={() => this.approveLeave(employee, employee._id)}
                                                    >
                                                        Back To Work
                                                    </button>
                                                ) : (
                                                    <button
                                                        className='btn btn-warning'
                                                        id={employee._id}
                                                        onClick={() => this.approveLeave(employee, employee._id)}
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <a href="/" className='dashboardStyle'>
                        <i className="fas fa-angle-double-left"></i> &nbsp; Dashboard
                    </a>
                </main>
            </>
        );
    }
}

export default Leave;
