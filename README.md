# RandomImage Generator

This project is a random image generator using the Lorem Picsum API. It includes a frontend built with React and a backend using Node.js with Express.

## Project Structure

- **Frontend**: Located in the `frontend` folder, the frontend is responsible for the user interface and image generation features. It uses React with Tailwind CSS for styling.
- **Backend**: Located in the `backend` folder, the backend handles the API requests and serves data to the frontend.

## Features

- Generate random images with options to apply grayscale and blur filters.
- Dynamic, animated image slider with five random images on the homepage.
- Copyable link of the generated image.
- Responsive design using Tailwind CSS.
- Dark theme with a modern, professional look.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/randomimage-generator.git
2. Navigate to the backend folder and install dependencies:

    ```bash
    cd backend
    npm install

3. Navigate to the frontend folder and install dependencies:
    ```bash
    cd ../frontend
    npm install

### Running the Project

1. Start the backend:
    ##### In the backend folder, run:
    ```bash
        node index.js
2. Starting the frontend:
    #### In the frontend folder, run:
    ``` bash
        npm start
3. Open the application in your browser:
    ``` bash 
        http://localhost:3000
4. Folder Structure
    ``` bash
        root/
        │
        ├── backend/               # Node.js backend
        │   ├── index.js           # Entry point for the backend server
        │   └── package.json       # Backend dependencies
        │
        ├── frontend/              # React frontend
        │   ├── public/            # Public assets like the favicon
        │   ├── src/               # Main React components
        │   ├── App.js             # Main App component
        │   └── package.json       # Frontend dependencies
        │
        └── README.md              # Project documentation

### API usage
This project uses the Lorem Picsum API to fetch random images. You can apply filters like grayscale and blur by adding query parameters to the image URLs:

Grayscale: ?grayscale
Blur: ?blur=1 (values range from 1 to 10)
for example:
        https://picsum.photos/200/300?grayscale
        https://picsum.photos/200/300?blur=2

### Technologies used
1. Frontend: React, Tailwind CSS
2. Backend: Node.js, Express
3. API: Lorem Picsum

### Instructions:
1. Copy the contents into a `README.md` file located in the root of your project.
2. Replace the repository URL with your actual GitHub repository link in the "Clone the repository" section.

This README provides a clean and professional overview of the project.
