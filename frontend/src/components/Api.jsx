const BASE_URL = "https://employee-management-system-d7ti.onrender.com";

export const GetAllEmployees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
  try {
    console.log("Fetching employees from:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (err) {
    console.error("Error fetching employees:", err);
    return { employees: [], pagination: { currentPage: 1, totalPages: 0 } };
  }
};

export const CreateEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employees`;
  try {
    const formData = new FormData();
    Object.keys(empObj).forEach((key) => {
      if (empObj[key]) {
        formData.append(key, empObj[key]);
      }
    });

    const response = await fetch(url, {
      method: "POST",
      body: formData, // No need to set Content-Type for FormData
    });

    return await response.json();
  } catch (err) {
    console.error("Error creating employee:", err);
    return null;
  }
};

export const UpdateEmployeeById = async (empObj, id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const formData = new FormData();
    Object.keys(empObj).forEach((key) => {
      if (empObj[key]) {
        formData.append(key, empObj[key]);
      }
    });

    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.error("Error updating employee:", err);
    return null;
  }
};

// Add DeleteEmployee API function in Api.jsx

export const DeleteEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      "content-Type": "appplication/json",
    });

    return await response.json();
  } catch (err) {
    console.error("Error updating employee:", err);
    return null;
  }
};
// Then implement handleDeleteEmployee in EmployeeManagementApp.jsx
// and pass it to EmployeeTable
export const GetEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      "content-Type": "appplication/json",
    });

    return await response.json();
  } catch (err) {
    console.error("Error updating employee:", err);
    return null;
  }
};
