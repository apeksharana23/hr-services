"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Designation() {
    const [designations, setDesignations] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        axios.get('/api/Employees')
            .then(res => setDesignations(res.data.data || []))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <div className="designation">
                    <div className='designation-inner'>
                        <div className="page-top">
                            <h1 className="page-title">Designation</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link href="/" className='home1'>Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link href="/Employees" className='home1'>Employees</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link href="/designation" className='home1'>Designation</Link>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="add-designation">
                            <Button
                                onClick={handleShow}
                                className="btn btn-chngee d-flex align-items-center"
                                variant="primary"
                            >
                                <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                Add Designation
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Designation</Modal.Title>
                                </Modal.Header>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    // You can handle form submission logic here
                                    handleClose();
                                }}>
                                    <div className="modal-body pb-0">
                                        <div className="mb-3">
                                            <label className="form-label">Designation Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Department Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select className="form-select">
                                                <option value="">Select</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <Button variant="light" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Add Designation
                                        </Button>
                                    </div>
                                </form>
                            </Modal>
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
                                <th>Designation</th>
                                <th>No. of Employees</th>
                                <th className='action-chgn'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designations.map((t, i) => (
                                <tr key={i}>

                                    <td>{t.designation}</td>
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


            </div>
        </div>
    );
}