import React from 'react'
import Header from '../imports/Header';

export default function Holiday2024() {
    const columnProp = {
        fontSize: "20px",
        fontWeight: "bold"
    }
    const tableStyle = {
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "20px"
    }
    const dashboardStyle = {
        fontSize: "22px",
        marginLeft: "30px",
        textDecoration: "none"
    }

    const holidays = [
        { id: 1, date: "14th January", name: "Makara Sankranti", type: "Regional Holiday" },
        { id: 2, date: "26th January", name: "Republic Day", type: "National Holiday" },
        { id: 3, date: "25th March", name: "Holi Festival", type: "Restricted Holiday" },
        { id: 4, date: "1st May", name: "Labour Day", type: "Restricted Holiday" },
        { id: 5, date: "10th April", name: "Eid-ul-Fitr", type: "Public Holiday" },
        { id: 6, date: "15th August", name: "Independence Day", type: "National Holiday" },
        { id: 7, date: "26th August", name: "Janmashtami", type: "Restricted Holiday" },
        { id: 8, date: "7th September", name: "Ganesh Chaturthi", type: "Public Holiday" },
        { id: 9, date: "2nd October", name: "Gandhi Jayanti", type: "National Holiday" },
        { id: 10, date: "12th October", name: "Durga Puja / Dussehra", type: "Public Holiday" },
        { id: 11, date: "16th September", name: "Eid Milad", type: "Restricted Holiday" },
        { id: 12, date: "1st November", name: "Diwali", type: "Public Holiday" },
        { id: 13, date: "25th December", name: "Christmas", type: "Public Holiday" }
    ];

    return (
        <div>
            <Header />
            <main>
                <table className="table table-striped" style={tableStyle}>
                    <thead style={columnProp}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date and Month</th>
                            <th scope="col">Holiday Name</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holidays.map(holiday => (
                            <tr key={holiday.id}>
                                <td>{holiday.id}</td>
                                <td>{holiday.date}</td>
                                <td>{holiday.name}</td>
                                <td>{holiday.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <a href="/" style={dashboardStyle}>
                    <i className="fas fa-angle-double-left"></i>
                    &nbsp; Dashboard
                </a>
            </main>
        </div>
    )
}