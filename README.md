# live demo [rakeshgowda123/EmployeeManagementSystem]
# Employee Management System

## Description
The **Employee Management System** is a full-stack web application that allows users to manage employee records efficiently. It includes functionalities for adding, updating, deleting, and retrieving employee details. The project is built with **React.js** for the frontend and **Node.js (Express.js) with MongoDB** for the backend.

## Features
- **User Authentication** (Signup, Login, Logout)
- **CRUD Operations** for Employee Management (Create, Read, Update, Delete)
- **Cloudinary Integration** for Image Uploads
- **RESTful API** for seamless communication between frontend and backend
- **Responsive UI** with Dark Mode/Light Mode toggle
- **Secure API** with Environment Variables

## Tech Stack
### Frontend
- **React.js** (JSX-based structure)
- **Bootstrap** for styling
- **Axios** for API calls

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **Cloudinary** for image storage
- **Multer** for file uploads
- **CORS & dotenv** for security and configuration

## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (latest version)
- MongoDB (local or Atlas)
- Git
- A Cloudinary account (for storing profile images)

### 1. Clone the Repository
```sh
 git clone https://github.com/rakeshgowda123/EmployeeManagementSystem.git
 cd EmployeeManagementSystem
```

### 2. Setup Backend
```sh
 cd backend
 npm install
```

#### Create a `.env` file inside the `backend` folder and add:
```
PORT=8080
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Start Backend Server
```sh
 npm start
```

### 3. Setup Frontend
```sh
 cd ../frontend
 npm install
```

#### Start Frontend Server
```sh
 npm start
```

## Deployment
### Deploy Backend on Render
1. Push your backend code to GitHub.
2. Create a **new Web Service** in Render.
3. Connect your GitHub repository.
4. Set the **build command**: `npm install`
5. Set the **start command**: `npm start`
6. Add Environment Variables in Render settings.
7. Deploy.

### Deploy Frontend on Vercel
1. Push your frontend code to GitHub.
2. Run:
```sh
 vercel
```
3. Follow the setup prompts to deploy.

## API Endpoints
### **Employee Routes** (`/api/employees`)
- `GET /` → Fetch all employees
- `GET /:id` → Fetch employee by ID
- `POST /` → Create new employee
- `PUT /:id` → Update employee
- `DELETE /:id` → Delete employee

## Screenshots
*(Add images showcasing UI features)*

## Contributors
- **Rakesh Gowda** ([GitHub](https://github.com/rakeshgowda123))

![Screenshot 2025-03-10 223156](https://github.com/user-attachments/assets/47f3fc65-4ef8-4bef-b799-6710d17e9b4f)
![Screenshot 2025-03-10 223210](https://github.com/user-attachments/assets/c84beb8a-aa0c-492e-9de8-82c0827a82d9)
![Screenshot 2025-03-10 223241](https://github.com/user-attachments/assets/f33b8643-07fa-40d0-8724-e34929c52c32)




## License
This project is licensed under the MIT License.

---
Feel free to contribute and improve this project! 🚀
