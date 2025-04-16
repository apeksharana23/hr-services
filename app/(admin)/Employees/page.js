"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconCirclePlus } from '@tabler/icons-react';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState([]);


    useEffect(() => {
        axios.get('/api/Employees')
            .then(res => setEmployees(res.data.data || []))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='page-wrapper bg-colorr'>
            <div className="container">
                <div className="employee">
                    <div className='employee-inner'>
                        <div className="page-top">
                            <h1 className="page-title">Employees List</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link href="/" className='home1'>Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        Employess
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link href="/Employees" className='home1'>Employees List</Link>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="add-designation">
                            <Link href="/add-employee" data-bs-toggle="modal" data-bs-target="#add_designation" className="btn btn-chngee d-flex align-items-center">
                                <IconCirclePlus className='crcl-plus' stroke={2} width={15} height={15} />Add Employees</Link>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                    <label className="me-2 mb-0">Row Per Page</label>
                    <select
                        className="form-select form-select-sm"
                        style={{ width: '80px' }}
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="ms-2">Entries</span>
                </div>


                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Emp-Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Registred Date</th>
                                <th className='action-chgn'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((t, i) => (
                                <tr key={i}>
                                    <td>Emp{i + 1}</td>
                                    <td>{t.name}</td>
                                    <td>{t.email}</td>
                                    <td>{t.phone}</td>
                                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                    <td className="actions">
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
