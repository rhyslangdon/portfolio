# Portfolio MERN Stack

A full-stack portfolio website built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Dynamic Projects**: Manage projects through a RESTful API with MongoDB
- **Contact Form**: Functional contact form with email integration
- **Modern UI**: Built with React, Framer Motion animations, and CSS Grid/Flexbox
- **Performance Optimized**: Fast loading with optimized images and code splitting

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with Grid and Flexbox

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email sending functionality
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
portfolio-mern-stack/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── ...
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # Express routes
│   ├── middleware/       # Custom middleware
│   └── ...
└── package.json          # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio-mern-stack
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

3. **Environment Setup**
```bash
# Copy environment template
cp server/.env.example server/.env

# Edit server/.env with your settings
```

4. **Configure Environment Variables**

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development

# Email Configuration (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

CLIENT_URL=http://localhost:3000
```

### Running the Application

**Development Mode (both client and server):**
```bash
npm run dev
```

# Run separately:**
```bash
# Server only (http://localhost:8000)
npm run server

# Client only (http://localhost:3000)
npm run client
```

**Production Build:**
```bash
npm run build
```

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)

### Health
- `GET /api/health` - Health check

## 🎨 Customization

### Adding Your Information
1. Update personal details in `client/src/components/Hero.js`
2. Modify about section in `client/src/components/About.js`
3. Update contact info in `client/src/components/Contact.js`
4. Replace social media links throughout the app

### Adding Projects
You can add projects directly to MongoDB or use the API endpoints. Sample project structure:
```json
{
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "technologies": ["React", "Node.js", "MongoDB"],
  "image": "https://example.com/image.jpg",
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://project-demo.com",
  "category": "web",
  "featured": true
}
```

### Styling
- Main styles are in `client/src/index.css`
- Component-specific styles are in individual `.css` files
- Color scheme can be modified in CSS custom properties

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API base URL in `client/src/services/api.js`

### Backend (Heroku/Railway)
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is set
3. Deploy the `server` directory

### Full Stack (Heroku)
The root `package.json` includes scripts for Heroku deployment:
- `heroku-postbuild` script builds the client
- Configure `MONGODB_URI` environment variable

## 🔧 Development Tips

### Database Setup
If using MongoDB locally:
```bash
# Start MongoDB
mongod

# Connect to database
mongo
use portfolio
```

### Email Setup
For contact form functionality:
1. Enable 2-factor authentication in Gmail
2. Generate an app password
3. Use the app password in `EMAIL_PASS`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you need help with setup or customization:
- Open an issue on GitHub: https://github.com/rhyslangdon/portfolio/issues
- Email: rhyslangdon@hotmail.com

## 🙏 Acknowledgments

- React team for the amazing library
- Framer Motion for smooth animations
- MongoDB for the flexible database
- All open-source contributors

---

**Built with ❤️ and MERN Stack**