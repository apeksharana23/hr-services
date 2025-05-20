"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Designation() {
    const [designations, setDesignations] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchDesignations();
    }, [rowsPerPage, currentPage]);

    const fetchDesignations = async () => {
        try {
            const res = await axios.get(`/api/designation?limit=${rowsPerPage}&page=${currentPage}`);
            setDesignations(res.data.data || []);
            setTotalPages(Math.ceil(res.data.total / rowsPerPage));
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddDesignation = async (e) => {
        e.preventDefault();

        const form = e.target;
        const designationName = form.designationName.value.trim();
        const status = form.status.value;

        if (!designationName || !status) {
            console.error("Designation name and status are required");
            return;
        }

        try {
            const response = await axios.post('/api/designation', {
                designationName,
                status,
            });

            if (response.status === 200) {
                fetchDesignations();
                handleClose();
            }
        } catch (err) {
            console.error("Failed to add designation:", err.response?.data || err.message);
        }
    };







    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <div className="designation">
                    <div className='designation-inner'>
                        <div className="page-top">
                            <h1 className="page-title">Designation</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><Link href="/" className='home1'>Home</Link></li>
                                    <li className="breadcrumb-item"><Link href="/Employees" className='home1'>Employees</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link href="/designation" className='home1'>Designation</Link></li>
                                </ol>
                            </nav>
                        </div>

                        <div className="add-designation">
                            <Button onClick={handleShow} className="btn btn-chngee d-flex align-items-center" variant="primary">
                                <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                Add Designation
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Designation</Modal.Title>
                                </Modal.Header>
                                <form onSubmit={handleAddDesignation}>
                                    <div className="modal-body pb-0">
                                        <div className="mb-3">
                                            <label className="form-label">Designation Name</label>
                                            <input type="text" className="form-control" name="designationName" required="" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select className="form-select" name="status" required="">
                                                <option value="">Select</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <Button variant="light" onClick={handleClose}>Cancel</Button>
                                        <Button variant="primary" type="submit">Add Designation</Button>
                                    </div>
                                </form>


                            </Modal>
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
                            setCurrentPage(1);
                            setRowsPerPage(Number(e.target.value));
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
                                <th>Designation</th>
                                <th>No. of Employees</th>
                                <th className='action-chgn'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designations.map((t, i) => (
                                <tr key={i}>
                                    <td>{t.name}</td>
                                    <td>{t.count}</td>
                                    <td className="actions change-in">
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button
                        className="btn btn-sm btn-secondary my-chnge"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span className="mx-3">Page {currentPage} of {totalPages}</span>

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
