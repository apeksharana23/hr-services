"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Trainees() {
    const [trainingType, setTrainingType] = useState("");
    const [trainer, setTrainer] = useState("");
    const [cost, setCost] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Active");

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
        setTrainingType("");
        setTrainer("");
        setCost("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setStatus("Active");
        setShow(true);
    };

    const fetchTrainees = async () => {
        try {
            const res = await axios.get(`/api/training-list?page=${currentPage}&limit=${rowsPerPage}`);
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
        const payload = {
            trainingType,
            trainer,
            cost,
            startDate,
            endDate,
            description,
            status
        };

        try {
            let res;
            if (isEditMode && editId) {
                res = await axios.put(`/api/training-list?id=${editId}`, payload);
            } else {
                res = await fetch('/api/trainees-list', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                res = await res.json();
            }

            if (res.status === 200 || res.ok) {
                alert(isEditMode ? "Training updated!" : "Training added!");
                setShow(false);
                fetchTrainees();
                handleShow(); // reset form
            } else {
                alert(res.error || "Operation failed");
            }
        } catch (err) {
            console.error("Submit Error:", err);
            alert("Something went wrong");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this training?")) return;
        try {
            const res = await axios.delete(`/api/trainees-list?id=${id}`);
            if (res.status === 200) {
                alert("Training deleted successfully!");
                fetchTrainees();
            } else {
                alert("Failed to delete.");
            }
        } catch (err) {
            console.error("Delete Error:", err);
            alert("Something went wrong");
        }
    };

    const handleEditClick = (trainee) => {
        setIsEditMode(true);
        setEditId(trainee._id);
        setTrainingType(trainee.trainingType);
        setTrainer(trainee.trainer);
        setCost(trainee.cost);
        setStartDate(trainee.startDate.slice(0, 10));
        setEndDate(trainee.endDate.slice(0, 10));
        setDescription(trainee.description || "");
        setStatus(trainee.status);
        setShow(true);
    };

    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <div className="designation">
                    <div className='designation-inner'>
                        <div className="page-top">
                            <h1 className="page-title">Training</h1>
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
                                Add Training
                            </Button>

                            <Modal show={show} onHide={handleClose} centered size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>{isEditMode ? "Edit Training" : "Add Training"}</Modal.Title>
                                </Modal.Header>

                                <form onSubmit={handleSubmit}>
                                    <Modal.Body className="pb-0">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Training Type</label>
                                                <select className="form-select" value={trainingType} onChange={e => setTrainingType(e.target.value)} required>
                                                    <option value="">Select</option>
                                                    <option value="Technical">Technical</option>
                                                    <option value="Soft Skills">Soft Skills</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Trainer</label>
                                                <select className="form-select" value={trainer} onChange={e => setTrainer(e.target.value)} required>
                                                    <option value="">Select</option>
                                                    <option value="Trainer A">Trainer A</option>
                                                    <option value="Trainer B">Trainer B</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Training Cost</label>
                                                <input type="number" className="form-control" value={cost} onChange={e => setCost(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Start Date</label>
                                                <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">End Date</label>
                                                <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Description</label>
                                                <textarea className="form-control" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                                            </div>
                                            <div className="col-12 mb-3">
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
                                            {isEditMode ? "Update Training" : "Add Training"}
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
                                <th>#</th>
                                <th>Training Type</th>
                                <th>Trainer</th>
                                <th>Duration</th>
                                <th>Cost</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainees.length > 0 ? trainees.map((t, i) => (
                                <tr key={t._id || i}>
                                    <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                                    <td>{t.trainingType}</td>
                                    <td>{t.trainer}</td>
                                    <td>
                                        {new Date(t.startDate).toLocaleDateString()}<br />
                                        <strong>to</strong><br />
                                        {new Date(t.endDate).toLocaleDateString()}
                                    </td>
                                    <td>₹ {t.cost}</td>
                                    <td className="text-center">
                                        <Button size="sm" className="my-3 varaint-chnge" onClick={() => handleEditClick(t)}>Edit</Button>
                                        <Button size="sm" className="varaint-chnge" onClick={() => handleDelete(t._id)}>Delete</Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No trainees found.</td>
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
    );
}
