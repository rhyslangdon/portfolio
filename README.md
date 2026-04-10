# Portfolio Site

A static portfolio site built with React, with an optional lightweight Express server for hosting the production build.

## 🚀 Features

- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Static Projects**: Project data is loaded from a JSON file in the frontend
- **Static Contact Flow**: The contact form uses EmailJS when configured, or falls back to opening the visitor's email app
- **Modern UI**: Built with React, Framer Motion animations, and CSS Grid/Flexbox
- **Performance Optimized**: Fast loading with optimized images and code splitting

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library
- **EmailJS** - Optional client-side email delivery
- **CSS3** - Modern styling with Grid and Flexbox

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Helmet** - Security headers

## 📁 Project Structure

```
portfolio-mern-stack/
├── client/                 # React frontend
│   ├── public/            # Static files
│   │   ├── projects/      # Project data JSON and images
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── ...
├── server/                # Optional Express static host
│   └── ...
└── package.json          # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
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
NODE_ENV=development
```

Optional frontend EmailJS variables in `client/.env`:
```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
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

### Health
- `GET /api/health` - Health check

## 🎨 Customization

### Adding Your Information
1. Update personal details in `client/src/components/Hero.js`
2. Modify about section in `client/src/components/About.js`
3. Update contact info in `client/src/components/Contact.js`
4. Replace social media links throughout the app

### Adding Projects
Edit `client/public/projects/projects.json`. Sample project structure:
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

### Node Hosting (Render/Railway/Heroku)
1. Build the client during deploy
2. Start the app with `node server/server.js`
3. No database configuration is required

### Render
MongoDB is no longer required. Render only needs the normal Node build and start commands.

### Full Stack (Heroku)
The root `package.json` includes scripts for Heroku deployment:
- `heroku-postbuild` script builds the client
- Configure `MONGODB_URI` environment variable

## 🔧 Development Tips

### Email Setup
For the contact form on a static deployment:
1. Create an EmailJS account
2. Configure a service and template
3. Set the `REACT_APP_EMAILJS_*` variables in the frontend environment
4. If EmailJS is not configured, the form falls back to opening the visitor's email app

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
- All open-source contributors

---

**Built with React and Express**