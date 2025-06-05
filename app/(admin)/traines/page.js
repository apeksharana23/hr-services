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

export default function Trainees() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [trainingType, setTrainingType] = useState("");
    const [status, setStatus] = useState("Active");
    const [getTrainingTypes, setTrainingTypes] = useState([]);


    const [trainees, setTrainees] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setIsEditMode(false);
        setEditId(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setContactNo("");
        setTrainingType("");
        setStatus("Active");
        setShow(true);

    };

    useEffect(() => {
        const fetchTrainingTypes = async () => {
            try {
                const response = await fetch(`/api/list-training`);
                const data = await response.json();
                setTrainingTypes(data.data);
            } catch (err) {
                console.log("Error fetching trainings", err);
            }
        }

        fetchTrainingTypes();
    }, []);

    const fetchTrainees = async () => {
        try {
            const res = await axios.get(`/api/traines?page=${currentPage}&limit=${rowsPerPage}`);
            setTrainees(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTrainees();
    }, [currentPage, rowsPerPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { firstName, lastName, email, contactNo, trainingType, status };

        try {
            let res;
            if (isEditMode && editId) {
                res = await axios.put(`/api/traines?id=${editId}`, payload);
            } else {
                res = await axios.post(`/api/traines`, payload);
            }

            if (res.status === 200 || res.status === 201) {
                toast.success(isEditMode ? "Trainee updated!" : "Trainee added!");
                setShow(false);
                fetchTrainees();
            } else {
                toast.error("Operation failed");
            }
        } catch (err) {
            console.error("Submit Error:", err);
            if (err.response?.status === 409) {
                toast.error("Email already exists. Please use a different email.");
            } else if (err.response?.status === 400) {
                toast.error("Missing required fields. Please fill all inputs.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    const handleDelete = async (id) => {
        confirmAlert({
            title: '⚠️ Confirm Deletion',
            message: 'Are you sure you want to delete this trainee?',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: async () => {
                        try {
                            const res = await axios.delete(`/api/traines?id=${id}`);
                            if (res.status === 200) {
                                toast.success("✅ Trainee deleted successfully!");
                                fetchTrainees();
                            } else {
                                toast.warning("⚠️ Could not delete the trainee.");
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
    
    const handleEditClick = (trainee) => {
        setFirstName(trainee.firstName);
        setLastName(trainee.lastName);
        setEmail(trainee.email);
        setContactNo(trainee.contactNo);
        setTrainingType(trainee.trainingType);
        setStatus(trainee.status);
        setEditId(trainee._id);
        setIsEditMode(true);
        setShow(true);

    };

    return (
        <>     <div className="outer-toster">
            <ToastContainer />
        </div>

            <div className="page-wrapper bg-colorr">
                <div className="content-wrapper">
                    <div className="designation">
                        <div className='designation-inner'>
                            <div className="page-top">
                                <h1 className="page-title">Trainees</h1>
                                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item"><Link href="/" className='home1'>Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page"><Link href="/trainees" className='home1'>Trainees</Link></li>
                                    </ol>
                                </nav>
                            </div>

                            <div className="add-policy">
                                <Button onClick={handleShow} className="btn btn-chngee d-flex align-items-center" variant="primary">
                                    <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                    Add Trainee
                                </Button>

                                <Modal show={show} onHide={handleClose} centered size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>{isEditMode ? "Edit Trainee" : "Add Trainee"}</Modal.Title>
                                    </Modal.Header>

                                    <form onSubmit={handleSubmit}>
                                        <Modal.Body className="pb-0">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">First Name</label>
                                                    <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Contact No</label>
                                                    <input type="text" className="form-control" value={contactNo} onChange={e => setContactNo(e.target.value)} required pattern="[6-9]\d{9}"
                                                        title="Enter a valid 10-digit Indian mobile number" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Training Type</label>
                                                    <select
                                                        className="form-control"
                                                        value={trainingType}
                                                        onChange={e => setTrainingType(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Training Type</option>
                                                        {
                                                            getTrainingTypes.map((type) => (
                                                                <option key={type._id} value={type}>{type.type}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>


                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select className="form-select" value={status} onChange={e => setStatus(e.target.value)} required>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="light" onClick={handleClose}>Cancel</Button>
                                            <Button variant="primary" type="submit">
                                                {isEditMode ? "Update Trainee" : "Add Trainee"}
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
                            <option value={50}>50</option>
                        </select>
                        <span className="ms-2">Entries</span>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Contact No</th>
                                    <th>Training Type</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {trainees.length > 0 ? trainees.map((t, i) => (
                                    <tr key={t._id || i}>
                                        <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                                        <td>{t.firstName}</td>
                                        <td>{t.lastName}</td>
                                        <td>{t.email}</td>
                                        <td>{t.contactNo}</td>
                                        <td>{t.trainingType?.type || 'N/A'}</td>
                                        <td>{t.status}</td>
                                        <td className="text-center">
                                            <Button size="sm" className="my-3 varaint-chnge" onClick={() => handleEditClick(t)}>Edit</Button>
                                            <Button size="sm" className="varaint-chnge" onClick={() => handleDelete(t._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">No trainees found.</td>
                                    </tr>
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
