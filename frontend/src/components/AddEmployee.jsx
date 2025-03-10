import React, { useEffect, useState } from "react";
import { CreateEmployee, UpdateEmployeeById } from "./Api";
import "./AddEmployee.css";
import { notify } from "./utils";

function AddEmployee({
  showmodal,
  setShowModal,
  fetchEmployees,
  updateEmpObj,
}) {
  const handleClose = () => {
    setShowModal(false);
    resetEmployeeState();
  };

  const [employeeDetail, setEmployeeDetail] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const [updateMode, setUpdateMode] = useState(false);

  // Runs only when updateEmpObj changes
  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployeeDetail(updateEmpObj);
    } else {
      setUpdateMode(false);
      resetEmployeeState();
    }
  }, [updateEmpObj]);

  const resetEmployeeState = () => {
    setEmployeeDetail({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEmployeeDetail((prev) => ({
      ...prev,
      profileImage: e.target.files[0], // Correctly setting the file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (updateMode) {
        response = await UpdateEmployeeById(employeeDetail, employeeDetail._id);
      } else {
        response = await CreateEmployee(employeeDetail);
      }

      if (response?.success) {
        notify(response.message, "success");
        fetchEmployees(); // Refresh the employee list
      } else {
        notify(response?.message || "Something went wrong", "error");
      }

      setShowModal(false);
      resetEmployeeState();
    } catch (err) {
      notify("Failed to save employee. Try again later.", "error");
    }
  };

  return (
    <div
      className={`modal fade ${showmodal ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ display: showmodal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {updateMode ? "Update Employee" : "Add Employee"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employeeDetail.name}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employeeDetail.email}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={employeeDetail.phone}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={employeeDetail.department}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={employeeDetail.salary}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>

              <button className="btn btn-primary">
                {updateMode ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
