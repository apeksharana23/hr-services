"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';

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
                fetchPolicies();
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
        confirmAlert({
            title: '⚠️ Confirm Deletion',
            message: 'Are you sure you want to delete this policie?',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: async () => {
                        try {
                            const res = await axios.delete(`/api/policies?id=${id}`);
                            if (res.status === 200) {
                                toast.success("✅ policie deleted successfully!");
                                fetchPolicies();
                            } else {
                                toast.warning("⚠️ Could not delete the policie.");
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

    const handleEdit = (policy) => {
        setEditMode(true);
        setPolicyToEdit(policy);
        setPolicyname(policy.name);
        setDescription(policy.description);
        setDesignation(policy.designationId._id);
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

        <>
            <div className="outer-toster">
                <ToastContainer />
            </div>
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
                        <table className="table table-bordered table-striped  align-middle">
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
                                        <td>{p.designationId?.name}</td>
                                        <td className="text-center flex flex-col gap-2 items-center">
                                            <Button size="sm" onClick={() => handleEdit(p)} className="w-full text-center px-4 py-2 text-sm no-underline !bg-[#e2e3ed] text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all d-flex align-items-center justify-content-center gap-2"
                                            >
                                                <IconEdit size={16} /></Button>
                                            <Button size="sm" onClick={() => handleDelete(p._id)} className="w-full text-center px-4 py-2 text-sm bg-[#e2e3ed] text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] button-delete transition-all d-flex align-items-center justify-content-center gap-2"
                                            >
                                                <IconTrash size={16} />
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
            </div></>

    );
}
