const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file?.path : null;
    console.log(body);
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { name, phone, email, salary, department } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      phone,
      email,
      salary,
      department,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee updated",
      success: true,
      data: updateEmployee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(req.query.page) || 1;
    limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;
    //page 1=> (1-1)*5 = 0 data skip in 1st page
    //page 2=> (2-1)*5 = 5 data skip in 2nd page from 6 data it will show
    //page 3 =>(3-1)*5 = 10 data skip in 3rd page

    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", //case insensitive
        },
      };
    }
    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalpages = Math.ceil(totalEmployees / limit);
    res.status(200).json({
      message: "All Employess",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalpages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });

    res.status(200).json({
      message: "Get Employee Details",
      success: true,
      data: emp,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "delete Employee Details",
      success: true,
      data: emp,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
};
