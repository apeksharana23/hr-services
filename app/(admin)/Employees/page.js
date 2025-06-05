"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconCirclePlus } from '@tabler/icons-react';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';


export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`/api/Employees?page=${currentPage}&limit=${rowsPerPage}`);
            setEmployees(res.data.data || []);
            setTotalPages(Math.ceil(res.data.total / rowsPerPage));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDesignations = async () => {
        try {
            const res = await axios.get(`/api/designation`);
            setDesignations(res.data || []);
        } catch (err) {
            console.error("Failed to fetch designations:", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, rowsPerPage]);

    useEffect(() => {
        fetchDesignations();
    }, []);



    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (id) => {
        confirmAlert({
            title: '⚠️ Confirm Deletion',
            message: 'Are you sure you want to delete this Employee?',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: async () => {
                        try {
                            const res = await axios.delete(`/api/Employees?id=${id}`);
                            if (res.status === 200) {
                                toast.success("✅ Employee deleted successfully!");
                                fetchEmployees();
                            } else {
                                toast.warning("⚠️ Could not delete the Employee.");
                            }
                        } catch (err) {
                            console.error("Delete Error:", err);
                            toast.error("❌ Something went wrong.");
                        }
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => { }
                }
            ]
        });
    };

    return (


        <>
            <div className="outer-toster">
                <ToastContainer />
            </div>

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
                                        <li className="breadcrumb-item">Employees</li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <Link href="/Employees" className='home1'>Employees List</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="add-designation">
                                <Link href="/add-employee" className="btn btn-chngee d-flex align-items-center">
                                    <IconCirclePlus className='crcl-plus' stroke={2} width={15} height={15} />
                                    Add Employees
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <label className="me-2 mb-0">Rows Per Page</label>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '80px' }}
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
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
                                    <th>Registered Date</th>
                                    <th>Designation</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((t, i) =>

                                (
                                    <tr key={t._id}>

                                        <td>Emp{(currentPage - 1) * rowsPerPage + i + 1}</td>
                                        <td>{t.name}</td>
                                        <td>{t.email}</td>
                                        <td>{t.phone}</td>
                                        <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                        <td>{t.designation || "N/A"}</td>
                                        <td className="flex flex-col gap-2 items-center">
                                            <Link
                                                href={`/Employees/${t._id}`}
                                                className="w-full text-center  py-2 text-sm no-underline  !bg-[#e2e3ed]  text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all d-flex align-items-center justify-content-center gap-4"                                            >
                                                <IconEdit size={16} />
                                            </Link>
                                            <Button
                                                onClick={() => handleDelete(t._id)}
                                                className="w-full text-center  py-2 text-sm no-underline  !bg-[#e2e3ed]  text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all d-flex align-items-center justify-content-center gap-4"                                            >
                                                <IconTrash size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-end align-items-center mt-3">
                        <button
                            className="btn btn-sm btn-secondary my-chnge"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button
                            className="btn btn-sm btn-secondary my-chnge"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </>

    );
}
