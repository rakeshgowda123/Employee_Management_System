import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetEmployeeById } from "./Api";
import "./EmployeeDetails.css"; // Import CSS file

function EmployeeDetails() {
  const { id } = useParams();
  const [empDetails, setEmpDetails] = useState({});
  const navigate = useNavigate();

  const fetchEmpById = async () => {
    try {
      const { data } = await GetEmployeeById(id);
      setEmpDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmpById();
  }, [id]);

  return (
    <div className="container ">
      <div className="employee-card">
        <div className="employee-card-header w-100 ">Employee Details</div>
        {/* //body  */}
      </div>
      <div>
        <div className="employee-card-body h- 100">
          {/* Profile Image */}
          <img
            src={empDetails.profileImage}
            alt={empDetails.name}
            className="employee-img"
          />
        </div>

        {/* Employee Details */}
        <div className="employee-details">
          <h2>{empDetails.name}</h2>
          <p>
            <strong>Email:</strong> {empDetails.email}
          </p>
          <p>
            <strong>Department:</strong> {empDetails.department}
          </p>
          <p>
            <strong>Phone:</strong> {empDetails.phone}
          </p>
          <p>
            <strong>Salary:</strong> {empDetails.salary}
          </p>

          <button
            className="btn btn-primary back-button"
            onClick={() => navigate("/employee")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
