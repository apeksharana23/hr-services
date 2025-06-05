
"use client";
import react from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from 'react';
import AmericanImage from '@/app/img/American.svg';
import MasterCardImage from '@/app/img/MasterCard.svg';
import DownloadImage from '@/app/img/download.svg';
import ReactImage from '@/app/img/React.jpg';




export default function CheckoutPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [trainees, setTrainees] = useState([]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const traineeData = {
            firstName,
            lastName,
            email,
            contactNo
        };
        try {
            const res = await axios.post('/api/traines', traineeData);
            console.log(res.data);
            // Reset form fields after successful submission
            setFirstName('');
            setLastName('');
            setEmail('');
            setContactNo('');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <> <div className="about-page-header">
            <div className="container">
                <div className="about-page-header-content">
                    <div className="about-page-header-inner">
                        <div className="about-page-header-text">
                            <div className="about-page-header-text-inner">
                                <h1 className="about-page-header-text-heading">Checkout</h1>
                            </div>

                        </div>
                        <div className="about-page-breadcrumbs">
                            <div className="about-page-breadcrumbs-inner">
                                <span>
                                    <Link href="/" className="home"><span>Home</span></Link>
                                </span>
                                <span className="sep">-</span>
                                <span>
                                    <Link href="/courses" className="home"><span>Courses</span></Link>
                                </span>
                                <span className="sep">-</span>
                                <span>
                                    <Link href="/checkout" className="home"><span>Checkout</span></Link>
                                </span>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
            <section className="pt-5">
                <div className="container">
                    <div className="row g-4 g-sm-5">
                        <div className="col-xl-8 mb-4 mb-sm-0">
                            <div className="card card-body shadow p-4">
                                <h4 className="text-lg !font-bold !leading-[1.25] !text-[1.3125rem]text-gray-900">Personal Details</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3 mt-0 ">
                                        <div className="text-left col-md-6 bg-light-input">
                                            <label className="col-md-6 bg-light-input">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                defaultValue={form.firstName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                className="form-control bg-gray-100 w-full rounded !h-10 px-3 py-2"
                                            />
                                        </div>
                                        <div className="text-left col-md-6 bg-light-input" >
                                            <label className="block mb-1 text-sm font-medium">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                defaultValue={form.lastName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                className="form-control bg-gray-100 w-full rounded  !h-10 px-3 py-2"
                                            />
                                        </div>

                                        <div className="text-left col-md-6 bg-light-input">
                                            <label className="block mb-1 text-sm font-medium">Email address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                defaultValue={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Email"
                                                className="form-control bg-gray-100 w-full rounded !h-10 px-3 py-2"
                                            />
                                        </div>

                                        <div className="text-left col-md-6 bg-light-input">
                                            <label className="block mb-1 text-sm font-medium">Mobile number *</label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                defaultValue={form.contactNo}
                                                onChange={handleChange}
                                                required
                                                placeholder="Mobile number"
                                                className="form-control bg-gray-100 w-full rounded  !h-10 px-3 py-2"
                                            />
                                        </div>

                                        <div className="col-12 text-left mb-4  ">
                                            <label className="form-label bv-no-focus-ring col-form-label pt-0 mb-2 ">Your saved cards *</label>
                                            <div className="flex space-x-3 gap-3 w-full">
                                                <Link href="#"><Image src={AmericanImage} alt="MasterCard" className="w-15 h-15 rounded shadow" /></Link>
                                                <Link href="#"><Image src={MasterCardImage} alt="Visa" className="w-15 h-15 rounded shadow" /></Link>
                                                <Link href="#"><Image src={DownloadImage} alt="Amex" className="w-15 h-15 rounded shadow" /></Link>
                                            </div>
                                        </div>


                                        <div className="col-12 text-right mb-4 ">
                                            <button
                                                type="submit"
                                                className="btn btn-md btn-primary disabled mb-0 !w-64"
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="row mb-0">
                                <div className="col-md-6 col-xl-12">
                                    <div className="card card-body shadow p-4 mb-4">
                                        <h4 className="text-lg !font-bold !leading-[1.25] !text-[1.3125rem]text-gray-900">Order Summary</h4>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Transaction code</span>
                                                <p className="mb-0 !mr-0.5 h6 fw-bold ">AB12365E</p>
                                            </div>
                                            <div className="input-group mt-2 ">
                                                <input id="__BVID__624009___BV_input__" className="form-control" type="text" placeholder="COUPON CODE" value=""></input>
                                                <button className="btn btn-md btn-primary" type="button">Apply</button>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row g-3">
                                            <div className="col-sm-4">
                                                <Image className="rounded" src={ReactImage} alt=""></Image>
                                            </div>
                                            <div className="col-sm-8">
                                                <h6 className="mb-0 !text-base !font-bold !leading-[1.25] !text-[1.3125rem]text-gray-900 text-start ">Sketch from A to Z: for an app designer</h6>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <span className="text-success">₹150</span>
                                                    <div className="text-primary-hover">
                                                        <Link href="#" className="text-body flex me-2">
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false" className="me-1 mt-1">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                                            </svg>Remove
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row g-3 ">
                                            <div className="col-sm-4">
                                                <Image className="rounded" src={ReactImage} alt=""></Image>
                                            </div>
                                            <div className="col-sm-8">
                                                <h6 className="mb-0 !text-base !font-bold !leading-[1.25] !text-[1.3125rem]text-gray-900 text-start ">Sketch from A to Z: for an app designer</h6>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <span className="text-success">₹350</span>
                                                    <div className="text-primary-hover">
                                                        <Link href="#" className="text-body flex me-2">
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false" className="me-1 mt-1">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                                            </svg>Remove
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul className=" !border-0 !shadow-none mb-2">
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-2 !text-base">Original Price</span>
                                                <span className="h6 fw-light mb-2 fw-bold">₹500</span></li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-2 !text-base">Coupon Discount</span>
                                                <span className="text-danger">-₹20</span></li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className=" mb-2 !text-2xl !font-bold !text-gray-900 ">Total</span>
                                                <span className="!text-2xl !font-bold !text-gray-900 mb-2">₹480</span>
                                            </li>
                                        </ul>
                                        <div className="d-grid">
                                            <Link href="#" className="btn btn-lg btn-success !text-base">Place Order</Link>
                                        </div>
                                        <p className="small mb-0 mt-2 text-center">By completing your purchase, you agree to these
                                            <a href="#"><strong>Terms of Service</strong></a>
                                        </p>

                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-12"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>


    );
}