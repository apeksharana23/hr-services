"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Policies() {
    const [Policyname, setPolicyname] = useState("");
    const [description, setDescription] = useState("");
    const [designation, setDesignation] = useState("");
    const [getDesignations, setDesignations] = useState([]);
    const [policies, setPolicies] = useState([]);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [policyToEdit, setPolicyToEdit] = useState(null);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setPolicyToEdit(null);
        setPolicyname("");
        setDescription("");
        setDesignation("");
    };

    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: Policyname,
            description: description,
            designationId: designation,
        };

        try {
            let res;
            if (editMode && policyToEdit) {
                res = await fetch('/api/policies', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...payload, id: policyToEdit._id }),
                });
            } else {
                res = await fetch('/api/policies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            const result = await res.json();

            if (res.ok) {
                alert(editMode ? "Policy updated!" : "Policy added!");
                handleClose();
                fetchPolicies(); // Refresh data
            } else {
                alert(result.error || "Failed");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("Something went wrong");
        }
    };

    const fetchPolicies = async () => {
        try {
            const res = await axios.get(`/api/policies?page=${currentPage}&limit=${rowsPerPage}`);
            setPolicies(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this policy?")) {
            try {
                const res = await fetch(`/api/policies?id=${id}`, { method: 'DELETE' });
                const result = await res.json();
                if (res.ok) {
                    alert("Policy deleted!");
                    fetchPolicies();
                } else {
                    alert(result.error || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting policy");
            }
        }
    };

    const handleEdit = (policy) => {
        setEditMode(true);
        setPolicyToEdit(policy);
        setPolicyname(policy.name);
        setDescription(policy.description);
        setDesignation(policy.designationId);
        setShow(true);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        const fetchDesignations = async () => {
            try {
                const response = await fetch(`/api/designation-list`);
                const data = await response.json();
                setDesignations(data.data);
            } catch (err) {
                console.log("Error fetching designations", err);
            }
        };

        fetchDesignations();
    }, []);

    useEffect(() => {
        fetchPolicies();
    }, [currentPage, rowsPerPage]);

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
                                    <Modal.Title>{editMode ? "Edit Policy" : "Add Policy"}</Modal.Title>
                                </Modal.Header>

                                <form onSubmit={handleSubmit}>
                                    <Modal.Body className="pb-0">
                                        <div className="mb-3">
                                            <label className="form-label">Policy Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={Policyname}
                                                onChange={(e) => setPolicyname(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input
                                                type="text"
                                                name="description"
                                                className="form-control"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Designation</label>
                                            <select
                                                type="text"
                                                className="form-control"
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                required
                                            >
                                                <option value="">Select</option>
                                                {getDesignations.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="light" onClick={handleClose}>Cancel</Button>
                                        <Button variant="primary" type="submit">
                                            {editMode ? "Update" : "Add"} Policy
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
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Designation</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.name}</td>
                                    <td>{p.description}</td>
                                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                                    <td>{p.designation}</td>
                                    <td className="text-center">
                                        <Button size="sm" className="my-3 varaint-chnge" onClick={() => handleEdit(p)}>Edit</Button>
                                        <Button size="sm" className="varaint-chnge" onClick={() => handleDelete(p._id)}>Delete</Button>
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
