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


export default function Designation() {
    const [designations, setDesignations] = useState([]);
    const [designationName, setDesignationName] = useState("");
    const [status, setStatus] = useState("Active");
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setIsEditMode(false);
        setEditId(null);
        setDesignationName("");
        setStatus("Active");
        setShow(true);
    };

    const fetchDesignations = async () => {
        try {
            const res = await axios.get(`/api/designation?page=${currentPage}&limit=${rowsPerPage}`);
            setDesignations(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDesignations();
    }, [currentPage, rowsPerPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { designationName, status: status.toLowerCase() };


        try {
            const res = isEditMode
                ? await axios.put(`/api/designation?id=${editId}`, payload)
                : await axios.post(`/api/designation`, payload);

            if (res.status === 200 || res.status === 201) {
                toast.success(isEditMode ? "Designation updated!" : "Designation added!");
                setShow(false);
                fetchDesignations();
            } else {
                toast.error("Operation failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    const handleEditClick = (d) => {
        setDesignationName(d.name);
        setStatus(d.status);
        setEditId(d._id);
        setIsEditMode(true);
        setShow(true);
    };

    const handleDelete = async (id) => {
        confirmAlert({
            title: '⚠️ Confirm Deletion',
            message: 'Are you sure you want to delete this Designation?',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: async () => {
                        try {
                            const res = await axios.delete(`/api/designation?id=${id}`);
                            if (res.status === 200) {
                                toast.success("✅ Designation deleted successfully!");
                                fetchDesignations();
                            } else {
                                toast.warning("⚠️ Could not delete the Designation.");
                            }
                        } catch (err) {
                            console.error("Delete Error:", err);
                            toast.error("❌ Something went wrong.");
                        }
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {}
                }
            ]
        });
    };

    return (
        <>
            <div className="outer-toster">
                <ToastContainer />
            </div>

            <div className="page-wrapper bg-colorr">
                <div className="content-wrapper">
                    <div className="designation">
                        <div className="designation-inner">
                            <div className="page-top">
                                <h1 className="page-title">Designations</h1>
                                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item"><Link href="/" className='home1'>Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page"><Link href="/designation" className='home1'>Designation</Link></li>
                                    </ol>
                                </nav>
                            </div>

                            <div className="add-policy">
                                <Button onClick={handleShow} className="btn btn-chngee d-flex align-items-center" variant="primary">
                                    <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                    Add Designation
                                </Button>

                                <Modal show={show} onHide={handleClose} centered size="md">
                                    <Modal.Header closeButton>
                                        <Modal.Title>{isEditMode ? "Edit Designation" : "Add Designation"}</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={handleSubmit}>
                                        <Modal.Body className="pb-0">
                                            <div className="mb-3">
                                                <label className="form-label">Designation Name</label>
                                                <input type="text" className="form-control" value={designationName} onChange={e => setDesignationName(e.target.value)} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Status</label>
                                                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)} required>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="light" onClick={handleClose}>Cancel</Button>
                                            <Button variant="primary" type="submit">
                                                {isEditMode ? "Update" : "Add"}
                                            </Button>
                                        </Modal.Footer>
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
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                        <span className="ms-2">Entries</span>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped  align-middle">
                            <thead className="table-dark">
                                <tr >
                                    <th>S.No</th>
                                    <th>Designation Name</th>

                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {designations.length > 0 ? designations.map((d, i) => (
                                    <tr key={d._id || i} >
                                        <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                                        <td>{d.name}</td>
                                        <td className="text-center gap-2 flex flex-col">
                                            <Button size="sm" onClick={() => handleEditClick(d)} 
                                            className="w-full text-center  py-2 text-sm no-underline  !bg-[#e2e3ed]  text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all d-flex align-items-center justify-content-center gap-4"
                                            >
                                                <IconEdit size={16} /></Button>
                                            <Button size="sm" onClick={() => handleDelete(d._id)} className="w-full text-center  py-2 text-sm bg-[#e2e3ed] text-black border border-[#cfd0da] rounded !hover:bg-[#d5d6e0] button-delete transition-all d-flex align-items-center justify-content-center gap-4"
                                            >
                                                <IconTrash size={16} /></Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center">No designations found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-end align-items-center mt-3">
                        <button className="btn btn-sm btn-secondary my-chnge" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="btn btn-sm btn-secondary my-chnge" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
