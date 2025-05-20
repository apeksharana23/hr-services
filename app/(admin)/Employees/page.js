"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconCirclePlus } from '@tabler/icons-react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`/api/Employees?page=${currentPage}&limit=${rowsPerPage}`);
            setEmployees(res.data.data || []);
            setTotalPages(Math.ceil(res.data.total / rowsPerPage)); // total from backend
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`/api/Employees?id=${id}`);
                    if (res.status === 200) {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                        fetchEmployees();
                    } else {
                        Swal.fire("Failed!", "Failed to delete user.", "error");
                    }
                } catch (err) {
                    console.error("Delete Error:", err);
                    Swal.fire("Error!", "Something went wrong.", "error");
                }
            }
        });

    };

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
                            setCurrentPage(1); // Reset to first page
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
                            {employees.map((t, i) => (
                                <tr key={i}>
                                    <td>Emp{(currentPage - 1) * rowsPerPage + i + 1}</td>
                                    <td>{t.name}</td>
                                    <td>{t.email}</td>
                                    <td>{t.phone}</td>
                                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                    <td>{t.designation}</td>
                                    <td className="flex flex-col gap-2 items-center">
                                        <Link
                                            href={`/Employees/${t._id}`}
                                            className="w-full text-center px-4 py-2 text-sm no-underline bg-[#e2e3ed] text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(t._id)}
                                            className="w-full text-center px-4 py-2 text-sm bg-[#e2e3ed] text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] button-delete transition-all"
                                        >
                                            Delete
                                        </Button>
                                    </td>

                                </tr>
                            ))}
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
    );
}
