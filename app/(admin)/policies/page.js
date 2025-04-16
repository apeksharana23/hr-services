"use client";
import Link from 'next/link';
import { IconCirclePlus , IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Designation() {
    const [policies, setPolicies] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        handleClose();
    };


    useEffect(() => {
        axios.get('/api/Employees')
            .then(res => setPolicies(res.data.data || []))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <div className="designation">
                    <div className='designation-inner'>
                        <div className="page-top">
                            <h1 className="page-title">Policies</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link href="/" className='home1'>Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link href="/Employees" className='home1'>Employees</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link href="/policies" className='home1'>Policies</Link>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="add-policy">
                            <Button onClick={handleShow} className="btn btn-chngee d-flex align-items-center" variant="primary">
                                <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                Add Policy
                            </Button>

                            <Modal show={show} onHide={handleClose} centered size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Policy</Modal.Title>
                                </Modal.Header>

                                <form onSubmit={handleSubmit}>
                                    <Modal.Body className="pb-0">
                                        <div className="mb-3">
                                            <label className="form-label">Policy Name</label>
                                            <input type="text" className="form-control" required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Appraisal Date</label>
                                            <input type="date" className="form-control" required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Department</label>
                                            <select className="form-select" required>
                                                <option value="">Select</option>
                                                <option value="all">All Department</option>
                                                <option value="finance">Finance</option>
                                                <option value="marketing">Marketing</option>
                                                <option value="development">Development</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Upload Policy</label>
                                            <div className="border rounded p-4 text-center" style={{ borderStyle: 'dashed' }}>
                                                <div className="mb-2">
                                                <IconUpload stroke={2} style={{ width: 40 }} />
                                                </div>
                                                <p className="mb-2">Drag and drop your files</p>
                                                <label class="drag-upload-btn btn btn-sm btn-primary me-2 mb-0">Upload<input class="d-none" type="file"/></label>
                                                {file && <p className="mt-2 text-muted small">{file.name}</p>}
                                            </div>
                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="light" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Add Policy
                                        </Button>
                                    </Modal.Footer>
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
                                <th>Name</th>
                                <th>Department</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.slice(0, rowsPerPage).map((p, i) => (
                                <tr key={i}>
                                    <td>{p.name}</td>
                                    <td>{p.department}</td>
                                    <td>{p.description}</td>
                                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
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
