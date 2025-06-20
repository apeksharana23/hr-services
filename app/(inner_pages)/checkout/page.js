"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import MasterCardImage from "@/app/img/MasterCard.svg";
import DownloadImage from "@/app/img/download.svg";
import { redirect } from "next/dist/server/api-utils";

export default function CheckoutPage() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
    });
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const traineeData = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            contactNo: form.contactNo,
        };

        try {
            const res = await axios.post('/api/traines', traineeData);
            console.log(res.data); // success response

            setForm({
                firstName: '',
                lastName: '',
                email: '',
                contactNo: '',
            });
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    const fetchCartItems = async () => {
        try {
            const traineeToken = getCookie("trainee_token") || "";
            if (!traineeToken) {
                setError("No cart items found. Please add courses to your cart.");
                redirect('/courses')
                setCartItems([]);
                setCartTotal(0);
                return;
            }
            const res = await axios.get(`/api/getCart?traineeId=${traineeToken}`);
            const responseData = res.data;
            const items = Array.isArray(responseData.data) ? responseData.data : [];
            setCartItems(items);
            const total = items.reduce((acc, item) => acc + Number(item.courseId?.cost || item.courseCost || 0), 0);
            setCartTotal(total);
            setError(null);
        } catch (error) {
            console.error("Error fetching cart items:", error.response?.data || error.message);
            setCartItems([]);
            setCartTotal(0);
            setError(
                error.response?.status === 400
                    ? error.response?.data?.message || "Invalid request. Please add courses to your cart."
                    : "Failed to load cart items."
            );
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);
    const handleDelete = async (cartItemId) => {
        try {
            const traineeToken = getCookie("trainee_token") || "";
            console.log(`Deleting cart item: ${cartItemId} with traineeToken: ${traineeToken}`);
            if (!traineeToken || !cartItemId) {
                alert("Cannot remove item. Please add courses to your cart.");
                return;
            }
            const res = await axios.delete(`/api/remove-from-cart?cartItemId=${cartItemId}&traineeId=${traineeToken}`);
            const responseData = res.data;
            if (res.status === 200) {
                const items = Array.isArray(responseData.data) ? responseData.data : [];
                setCartItems(items);
                const total = items.reduce((acc, item) => acc + Number(item.courseId?.cost || item.courseCost || 0), 0);
                setCartTotal(total);
                alert("Course removed successfully!");
            } else {
                alert(responseData.message || "Failed to remove course");
            }
        } catch (error) {
            console.error("Error removing cart item:", error.response?.data || error.message);
            alert(
                error.response?.status === 400
                    ? error.response?.data?.message || "Invalid request. Please try again."
                    : "Failed to remove course."
            );
        }
    };





    return (
        <>
            <div className="about-page-header">
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
                                        <Link href="/" className="home">
                                            <span>Home</span>
                                        </Link>
                                    </span>
                                    <span className="sep">-</span>
                                    <span>
                                        <Link href="/courses" className="home">
                                            <span>Courses</span>
                                        </Link>
                                    </span>
                                    <span className="sep">-</span>
                                    <span>
                                        <Link href="/checkout" className="home">
                                            <span>Checkout</span>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="pt-5">
                <div className="container">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="row g-4 g-sm-5">
                        <div className="col-xl-8 mb-4 mb-sm-0">
                            <div className="card card-body shadow p-4">
                                <h4 className="text-lg !font-bold !leading-[1.25] !text-[1.3125rem] text-gray-900 mb-4">Personal Details</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3 mt-0">
                                        <div className="text-left col-md-6">
                                            <label className="block mb-1 text-sm font-medium">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                className="form-control bg-gray-100 w-full rounded !h-10 px-3 py-2"
                                            />
                                        </div>
                                        <div className="text-left col-md-6">
                                            <label className="block mb-1 text-sm font-medium">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                className="form-control bg-gray-100 w-full rounded !h-10 px-3 py-2"
                                            />
                                        </div>
                                        <div className="text-left col-md-6">
                                            <label className="block mb-1 text-sm font-medium">Email address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Email"
                                                className="form-control bg-gray-100 w-full rounded !h-10 px-3 py-2"
                                            />
                                        </div>
                                        <div className="text-left col-md-6">
                                            <label className="block mb-1 text-sm font-medium">Mobile number *</label>
                                            <input
                                                type="tel"
                                                name="contactNo"
                                                value={form.contactNo}
                                                onChange={handleChange}
                                                required
                                                placeholder="Mobile number"
                                                className="form-control bg-gray-100 w-full rounded !h-10 px-3 py-2"
                                            />
                                        </div>

                                        <div className="col-12 text-left mb-4">
                                            <label className="form-label col-form-label pt-0 mb-2">Your saved cards *</label>
                                            <div className="flex gap-3 w-full">
                                                <Link href="#">
                                                    <Image src={MasterCardImage} alt="MasterCard" className="w-15 h-10 rounded border" />
                                                </Link>
                                                <Link href="#">
                                                    <Image src={DownloadImage} alt="American Express" className="w-15 h-10 rounded border" />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-12 text-right mb-4">
                                            <button
                                                type="submit"
                                                className="btn btn-md btn-primary mb-0 !w-64"
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
                                        <h4 className="text-lg !font-bold !leading-[1.25] !text-gray-900 mb-3">Order Summary</h4>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Transaction code</span>
                                                <p className="mb-0 !mr-0.5 h6 fw-bold">AB12345E</p>
                                            </div>
                                            <div className="input-group mt-3">
                                                <input
                                                    id="couponCode"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="COUPON CODE"
                                                />
                                                <button className="btn btn-primary btn-md" type="button">
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                        {Array.isArray(cartItems) && cartItems.length > 0 ? (
                                            cartItems.map((item, index) => (
                                                <div className="row g-3 mb-4" key={index}>
                                                    <div className="col-sm-4">
                                                        <Image
                                                            className="rounded"
                                                            src={item.courseId?.image || item.courseImage || '/default-image.jpg'}
                                                            alt={item.courseId?.title || item.courseType || 'Course'}
                                                            width={100}
                                                            height={80}
                                                        />
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <h6 className="mb-0 !text-base !font-bold !text-[1.3125rem] text-gray-900 text-start">
                                                            {item.courseId?.title || item.courseType || 'Unknown Course'}
                                                        </h6>
                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                            <span className="text-success">₹{Number(item.courseId?.cost).toLocaleString('en-IN')}</span>
                                                            <div className="text-primary-hover">
                                                                <button
                                                                    onClick={() => handleDelete(item._id)}
                                                                    className="text-body flex me-2 bg-transparent border-0 p-0"
                                                                    aria-label="Remove item"
                                                                >
                                                                    <svg
                                                                        width="1em"
                                                                        height="1em"
                                                                        viewBox="0 0 16 16"
                                                                        fill="currentColor"
                                                                        role="img"
                                                                        focusable="false"
                                                                        className="me-1 mt-1"
                                                                    >
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                                                    </svg>
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No items in cart</p>
                                        )}
                                        <hr />
                                        <ul className="border-0 shadow-none mb-2">
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-semibold mb-2">Total Price</span>
                                                <span className="h6 fw-bold mb-2">₹{Number(cartTotal.toFixed(2)).toLocaleString('en-IN')}</span>
                                            </li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-semibold mb-2">Coupon Discount</span>
                                                <span className="text-danger mb-0">-₹00</span>
                                            </li>
                                            <hr />
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="text-2xl font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-gray-900">₹{Number((cartTotal - 0).toFixed(1)).toLocaleString('en-IN')}</span>
                                            </li>
                                        </ul>
                                        <div className="d-grid">
                                            <Link href="#" className="btn btn-primary btn-lg !text-white text-sm">
                                                Place Order
                                            </Link>
                                        </div>
                                        <p className="small mb-0 mt-2 text-center">
                                            By completing your purchase, you agree to these{" "}
                                            <a href="#" className="text-blue-500">
                                                <strong>Terms of Service</strong>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}