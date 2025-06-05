"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IconPhoto } from '@tabler/icons-react';
import { useRouter } from "next/navigation";

export default function EmployeeDetails({ params }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [username, setUsername] = useState("");
  const [getDesignations, setDesignations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notifySettings = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    async function fetchDesignations() {
      try {
        const response = await fetch("/api/designation-list");
        const data = await response.json();
        setDesignations(data.data || []);
      } catch (err) {
        console.error("Error fetching designations", err);
      }
    }
    fetchDesignations();
  }, []);

  useEffect(() => {
    async function fetchEmployeeData() {
      const { slug } = params; 
      try {
        const res = await fetch(`/api/getEmployee/${slug}`);
        const employee = await res.json();
        if (!employee || employee.status === false) {
          router.push("/Employees");
          return;
        }
        const user = employee.user;
        setFullname(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setCompany(user.company || "");
        setDesignation(user.designation || "");
        setJoiningDate(user.joiningDate || "");
        setUsername(user.username || "");
      } catch (err) {
        console.error("Error fetching employee:", err);
        router.push("/Employees");
      }
    }
    fetchEmployeeData();
  }, [params, router]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("company", company);
    formData.append("designation", designation);
    formData.append("joiningDate", joiningDate);
    formData.append("username", username);
    if (file) {
      formData.append("fileName", file); // append actual file object
    }

    try {
      const response = await fetch("/api/addEmployee", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Unexpected response:", text);
        throw new Error("Server did not return JSON.");
      }

      const data = await response.json();

      if (data.status === true) {
        toast.success(data.message, notifySettings);
        // Clear form only if you want to reset after success
        setFullname("");
        setEmail("");
        setPhone("");
        setCompany("");
        setDesignation("");
        setJoiningDate("");
        setUsername("");
        setFile(null);
        setFileName("");
      } else {
        toast.error(data.message, notifySettings);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Something went wrong!", notifySettings);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="tab-content bg-colorr" id="myTabContent">
        <div className="tab-pane fade active show" id="basic-info">
          <div className="modal-body pb-0">
            <div className="row">
              {/* Image Upload */}
              <div className="col-md-12 width-chnge">
                <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                  <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                    <IconPhoto stroke={2} width={15} height={15} />
                  </div>
                  <div className="profile-upload">
                    <div className="mb-2">
                      <h6 className="mb-1">Upload Profile Image</h6>
                      <p className="fs-12">Image should be below 4 MB</p>
                    </div>
                    <div className="profile-uploader d-flex align-items-center">
                      <label className="drag-upload-btn btn btn-sm btn-primary me-2 mb-0">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                              setFile(selectedFile);
                              setFileName(selectedFile.name);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        onClick={() => {
                          setFile(null);
                          setFileName("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    {fileName && (
                      <small className="text-muted ms-1 mt-1 d-block">
                        Selected File: {fileName}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Joining Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Username *</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Company *</label>
                <input
                  type="text"
                  className="form-control"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Designation</label>
                <select
                  className="form-control"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {getDesignations.length > 0 &&
                    getDesignations.map((item, index) => (
                      <option key={`designation-index-${index}`} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer footer-chng">
            <button type="submit" className="btn btn-chnge" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
