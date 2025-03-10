import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import { DeleteEmployeeById, GetAllEmployees } from "./Api";
import { ToastContainer } from "react-toastify";
import { notify } from "./utils";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeObj, setEmployeeObj] = useState(null);
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const response = await GetAllEmployees(search, page, limit);
      if (response?.success) {
        setEmployeesData(response.data);
      } else {
        console.error("API Error:", response?.message);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };

  //delete and update functions

  const handleUpdateEmployee = async (emp) => {
    setEmployeeObj(emp);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (emp) => {
    try {
      const response = await DeleteEmployeeById(emp._id);
      if (response?.success) {
        // setEmployeesData(response.data);
        notify("Employee datil deleted", "success");
        fetchEmployees();
      } else {
        notify(response.message, "error");
        console.error("API Error:", response?.message);
      }
    } catch (err) {
      notify(err.message, "error");

      console.error("Error fetching employees:", err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1 className="text-center text-uppercase fw-bold my-4 p-3 bg-primary text-white shadow rounded">
        EMPLOYEE MANAGEMENT WINDOW
      </h1>

      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p-3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add
            </button>
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Employees..."
              className="form-control w-50"
            />
          </div>
          <EmployeeTable
            employees={employeesData.employees}
            pagination={employeesData.pagination}
            fetchEmployees={fetchEmployees}
            handleUpdateEmployee={handleUpdateEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
          />

          <AddEmployee
            fetchEmployees={fetchEmployees}
            showmodal={showModal} // Change showModal to showmodal
            setShowModal={setShowModal}
            updateEmpObj={employeeObj} // Change employeeObj to updateEmpObj
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
