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




export default function TrainingTypes() {
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);



    const handleClose = () => {
        setShow(false);
        setEditData(null);
        setSelectedImage(null);
    };

    const handleShow = () => setShow(true);

    const fetchTrainingType = async () => {
        try {
            const res = await axios.get(`/api/training-type?page=${currentPage}&limit=${rowsPerPage}`);
            setTrainingTypes(res.data.data || []);
            setTotalPages(Math.ceil(res.data.total / rowsPerPage));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTrainingType();
    }, [currentPage, rowsPerPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value.trim();
        const description = form.description.value.trim();
        const status = form.status.value.trim();
        const cost = parseFloat(form.cost.value.trim());

        if (!type || !description || !status || isNaN(cost)) {
            toast.error("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('type', type);
        formData.append('description', description);
        formData.append('status', status);
        formData.append('cost', cost);
        if (selectedImage) formData.append('image', selectedImage);

        try {
            if (editData) {
                await axios.put(`/api/training-type?id=${editData._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success("Training type updated!");
            } else {
                await axios.post('/api/training-type', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success("Training type added!");
            }

            fetchTrainingType();
            handleClose();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        }
    };

    const handleEditClick = (data) => {
        setEditData(data);
        setShow(true);
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this training type?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const res = await axios.delete(`/api/training-type?id=${id}`);
                            if (res.data.success) {
                                toast.success("Training type deleted!");
                                fetchTrainingType();
                            } else {
                                toast.error("Failed to delete training type.");
                            }
                        } catch (err) {
                            console.error('Error deleting:', err.response?.data || err.message);
                            toast.error("Failed to delete training type.");
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    };


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

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
                                                <label className="form-label">Cost</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="cost"
                                                    defaultValue={editData?.cost || ''}
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
                                                <label className="form-label">Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                                    required={!editData?.image}
                                                />
                                            </div>

                                            {selectedImage && (
                                                <div className="mb-3">
                                                    <img
                                                        src={URL.createObjectURL(selectedImage)}
                                                        alt="Preview"
                                                        style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                                    />
                                                </div>
                                            )}


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
                                    <th>Cost</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainingTypes.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.type}</td>
                                        <td>{item.description}</td>
                                        <td>₹ {item.cost}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <img src={item.image} alt="Course" style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
                                        </td>

                                        <td className="text-center  gap-2 flex flex-col">
                                            <Button size="sm"
                                            className="w-full text-center  py-2 text-sm no-underline  !bg-[#e2e3ed]  text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all d-flex align-items-center justify-content-center gap-4" onClick={() => handleEditClick(item)}>
                                               <IconEdit size={16} /></Button>
                                            <Button size="sm" className="w-full text-center  py-2 text-sm no-underline  !bg-[#e2e3ed]  text-black border border-[#cfd0da] rounded hover:bg-[#d5d6e0] transition-all d-flex align-items-center justify-content-center gap-4" onClick={() => handleDelete(item._id)}>
                                                <IconTrash size={16} /></Button>
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
        </>
    );
}
