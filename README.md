# Camera E-commerce Website

A full-stack e-commerce website for selling cameras and photography equipment.

## Features

- User authentication (login/register)
- Product catalog with categories
- Product search and filtering
- Shopping cart functionality
- Order management
- Product reviews and ratings
- Admin dashboard
- Responsive design

## Tech Stack

- Frontend: React, Redux, React Router, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Deployment: Vercel (Frontend), Render/MongoDB Atlas (Backend)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sivaprakash-stackpy/Camera-Ecom-Website.git
   cd Camera-Ecom-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. Run the application:
   ```bash
   # Run backend and frontend concurrently
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Run backend only
   npm run server
   
   # Run frontend only (in a new terminal)
   cd frontend
   npm start
   ```

## Deployment

### Vercel (Frontend)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign in with GitHub
3. Click "New Project" and import your repository
4. Configure the build settings:
   - Framework: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. Add environment variables:
   - `REACT_APP_API_URL`: Your backend API URL
6. Click "Deploy"

### Backend (Render/MongoDB Atlas)

1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Configure the service:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node
4. Add environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
