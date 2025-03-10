import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

function EmployeeTable({
  pagination,
  employees,
  fetchEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
}) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Department",
    "salary",
    "UpdatedAt",
    "Actions",
  ];
  const { currentPage = 1, totalpages = 1 } = pagination || {};

  const TableRow = ({ employee }) => {
    return (
      <tr>
        <td data-label="Name">
          <Link
            to={`/employee/${employee._id}`}
            className="text-decoration-none"
          >
            {employee.name}
          </Link>
        </td>
        <td data-label="Email">{employee.email}</td>
        <td data-label="Phone">{employee.phone}</td>
        <td data-label="Department">{employee.department}</td>
        <td data-label="Salary">{employee.salary}</td>
        <td data-label="UpdatedAt">{employee.updatedAt}</td>
        <td data-label="Actions">
          <i
            className="bi bi-pencil-fill me-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => handleUpdateEmployee(employee)}
          ></i>

          <i
            className="bi bi-trash-fill"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => {
              handleDeleteEmployee(employee);
            }}
          ></i>
        </td>
      </tr>
    );
  };

  const pageNumbers = Array.from(
    { length: totalpages },
    (_, index) => index + 1
  );

  const handleNextPage = () => {
    if (currentPage < totalpages) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handlePagination = (currPage) => {
    fetchEmployees("", currPage, 5);
  };

  return (
    <div className="table-responsive-container">
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((head, index) => {
              return <th key={index}>{head}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {(employees || []).map((empl, i) => {
            return <TableRow key={i} employee={empl} />;
          })}
        </tbody>
      </table>

      <div className="pagination-container">
        <span className="badge bg-primary">
          Page {currentPage} of {totalpages}
        </span>
        <div className="pagination-buttons">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => handlePrevPage()}
          >
            Prev
          </button>

          {pageNumbers.map((page, i) => (
            <button
              onClick={() => handlePagination(page)}
              className={`btn btn-outline-primary pagination-number-button ${
                currentPage === page ? "active" : ""
              }`}
              key={i}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-outline-primary"
            disabled={totalpages === currentPage}
            onClick={() => handleNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default EmployeeTable;
