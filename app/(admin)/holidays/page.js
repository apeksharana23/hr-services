"use client";
import Link from 'next/link';
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Holidays() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const [holidays, setHolidays] = useState([]);
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
        setTitle("");
        setDescription("");
        setDate("");
        setShow(true);
    };

    const fetchHolidays = async () => {
        try {
            const res = await axios.get(`/api/holiday?page=${currentPage}&limit=${rowsPerPage}`);
            setHolidays(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchHolidays();
    }, [currentPage, rowsPerPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title, description, date };

        try {
            let res;
            if (isEditMode && editId) {
                res = await axios.put(`/api/holiday?id=${editId}`, payload);
            } else {
                res = await axios.post(`/api/holiday`, payload);
            }

            if (res.status === 200 || res.status === 201) {
                alert(isEditMode ? "Holiday updated!" : "Holiday added!");
                setShow(false);
                fetchHolidays();
            } else {
                alert("Operation failed");
            }
        } catch (err) {
            console.error("Submit Error:", err);
            alert("Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this holiday?")) return;
        try {
            const res = await axios.delete(`/api/holidays?id=${id}`);
            if (res.status === 200) {
                alert("Holiday deleted successfully!");
                fetchHolidays();
            } else {
                alert("Failed to delete.");
            }
        } catch (err) {
            console.error("Delete Error:", err);
            alert("Something went wrong");
        }
    };

    const handleEditClick = (item) => {
        setIsEditMode(true);
        setEditId(item._id);
        setTitle(item.title);
        setDescription(item.description);
        setDate(item.date);
        setShow(true);
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
                            <h1 className="page-title">Holidays</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><Link href="/" className='home1'>Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link href="/holidays" className='home1'>Holidays</Link></li>
                                </ol>
                            </nav>
                        </div>

                        {/* Button to trigger the modal */}
                        <div className="add-policy">
                            <Button onClick={handleShow} className="btn btn-chngee d-flex align-items-center" variant="primary">
                                <IconCirclePlus className="crcl-plus" stroke={2} width={15} height={15} />
                                Add Holiday
                            </Button>

                            {/* Modal for Add Holiday */}
                            <Modal show={show} onHide={handleClose} centered size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>{isEditMode ? "Edit Holiday" : "Add Holiday"}</Modal.Title>
                                </Modal.Header>

                                <form onSubmit={handleSubmit}>
                                    <Modal.Body className="pb-0">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Title</label>
                                                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Description</label>
                                                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Date</label>
                                                <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
                                            </div>
                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="light" onClick={handleClose}>Cancel</Button>
                                        <Button variant="primary" type="submit">
                                            {isEditMode ? "Update Holiday" : "Add Holiday"}
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>

                {/* Pagination for Rows */}
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

                {/* Table for Displaying Holidays */}
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holidays.length > 0 ? holidays.map((item, i) => (
                                <tr key={item._id || i}>
                                    <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <Button size="sm" className="my-3 varaint-chnge" onClick={() => handleEditClick(item)}>Edit</Button>
                                        <Button size="sm" className="varaint-chnge" onClick={() => handleDelete(item._id)}>Delete</Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No holidays found.</td>
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
