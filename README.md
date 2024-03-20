# ReportMaster

ReportMaster is a comprehensive healthcare management system designed to streamline the process of managing medical tests, parameters, and patients data.

One of the key features of the application is its ability to store and analyze parameter values against normal ranges, providing valuable insights into a patient's health status. It also includes a visual representation of the human body, allowing to pinpoint affected organs and areas diagnosed in tests. Additionally, a meter feature provides a clear indication of parameter values, aiding in quick and easy interpretation of test results.

## Installation

To install and run the app, follow these steps:

### Backend Setup

-   **Database Setup:**
    -   Ensure you have PostgreSQL installed and running.
    -   Create a new database.
-   **Clone the Repository:**
    ```bash
    git clone https://github.com/bbahd30/ReportMaster.git
    ```
-   **Navigate to the Backend Folder:**
    ```bash
    cd ReportMaster/backend
    ```
-   **Environment Variables:**
    -   Create a **`.env`** file in the **`backend`** directory.
    -   As per the database created in the previous step add the following environment variables to the **`.env`** file:
        ```makefile
            DB_HOST=localhost
            DB_PORT=5432
            DB_USER={your_user_name}
            DB_PASSWORD={your_password}
            DB_NAME=reportMaster
        ```
-   **Install Dependencies:**
    ```bash
    go mod download
    ```
-   **Run the Backend**
    ```bash
    go run main.go
    ```

This will start the backend server on **`localhost:8000`**.

### **Frontend Setup:**

-   **Navigate to the Frontend Folder:**
    ```bash
    cd ReportMaster/frontend
    ```
-   **Install Dependencies:**
    ```bash
    npm install
    ```
-   **Start the Frontend:**
    ```bash
    npm start
    ```
    This will start the frontend development server on **`localhost:3000`**.
