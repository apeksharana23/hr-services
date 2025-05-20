"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function TrainingTypes() {
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState(null);


    const handleClose = () => {
        setShow(false);
        setEditData(null);
    };
    const handleShow = () => setShow(true);

    const fetchTrainingTypes = async () => {
        try {
            const res = await axios.get(`/api/training-type?page=${currentPage}&limit=${rowsPerPage}`);
            setTrainingTypes(res.data.data || []);
            setTotalPages(Math.ceil(res.data.total / rowsPerPage));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTrainingTypes();
    }, [currentPage, rowsPerPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value.trim();
        const description = form.description.value.trim();
        const status = form.status.value.trim();

        if (!type || !description || !status) {
            console.error("All fields are required");
            return;
        }

        try {
            if (editData) {
                // Edit Mode - use PUT with id
                await axios.put(`/api/training-type?id=${editData._id}`, { type, description, status });
            } else {
                // Add Mode
                await axios.post('/api/training-type', { type, description, status });
            }

            fetchTrainingTypes();
            handleClose();
            setEditData(null);
        } catch (err) {
            console.error('Error saving:', err.response?.data || err.message);
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
        setShow(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this training type?')) return;
        try {
            const res = await axios.delete(`/api/training-type?id=${id}`);
            if (res.data.success) {
                fetchTrainingTypes();
            }
        } catch (err) {
            console.error('Error deleting:', err.response?.data || err.message);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    return (
        <div className="page-wrapper bg-colorr">
            <div className="content-wrapper">
                <div className="designation">
                    <div className='designation-inner'>
                        <div className="page-top">
                            <h1 className="page-title">Training Types</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><Link href="/" className='home1'>Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link href="/training-types" className='home1'>Training Types</Link></li>
                                </ol>
                            </nav>
                        </div>

                        <div className="add-designation">
                            <Button onClick={handleShow} className="btn btn-chngee d-flex align-items-center" variant="primary">
                                <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                Add Training Type
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{editData ? 'Edit' : 'Add'} Training Type</Modal.Title>
                                </Modal.Header>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body pb-0">
                                        <div className="mb-3">
                                            <label className="form-label">Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="type"
                                                defaultValue={editData?.type || ''}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                defaultValue={editData?.description || ''}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-select"
                                                name="status"
                                                defaultValue={editData?.status || ''}
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <Button variant="light" onClick={handleClose}>Cancel</Button>
                                        <Button variant="primary" type="submit">{editData ? 'Save Changes' : 'Add Type'}</Button>
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
                                <th>Type</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingTypes.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.type}</td>
                                    <td>{item.description}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
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
