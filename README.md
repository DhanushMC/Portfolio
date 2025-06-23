# Portfolio# Dhanush M C - Portfolio Website

A modern, responsive portfolio website built with React, Next.js, and Tailwind CSS. Features dynamic content management through JSON files, dark/light theme switching, and smooth animations.

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Theme**: System preference detection with manual toggle
- **Dynamic Content**: JSON-driven content management for easy updates
- **Smooth Animations**: Framer Motion and CSS animations
- **Interactive Components**: Modal systems for detailed views
- **SEO Optimized**: Meta tags and semantic HTML
- **Fast Performance**: Optimized for speed and user experience
- **Modern UI/UX**: Glass morphism, gradients, and modern design patterns

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion, CSS transitions
- **Deployment**: Vercel
- **Content Management**: JSON files

## 📁 Project Structure

```
portfolio-website/
├── public/
│   └── assets/
│       ├── certificates/     # Certificate files
│       ├── profile/         # Profile images
│       └── resume.pdf       # Resume file
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   └── data/               # JSON data files
│       ├── personal.json   # Personal information
│       ├── skills.json     # Skills data
│       ├── experience.json # Work experience
│       ├── projects.json   # Projects data
│       ├── certificates.json # Certifications
│       └── education.json  # Education data
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Content Management

### Updating Personal Information
Edit `src/data/personal.json`:
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your.email@example.com",
  "bio": "Your bio here..."
}
```

### Adding New Skills
Edit `src/data/skills.json`:
```json
{
  "categories": [
    {
      "name": "Category Name",
      "skills": [
        {"name": "Skill Name", "level": 85, "icon": "🔥"}
      ]
    }
  ]
}
```

### Adding New Projects
Edit `src/data/projects.json`:
```json
{
  "featured": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "description": "Project description",
      "technologies": ["React", "Node.js"],
      "links": {
        "github": "https://github.com/...",
        "live": "https://project-url.com"
      }
    }
  ]
}
```

### Adding Certificates
1. Place certificate files in `public/assets/certificates/`
2. Update `src/data/certificates.json`:
```json
{
  "categories": [
    {
      "provider": "Provider Name",
      "certificates": [
        {
          "id": "cert-id",
          "title": "Certificate Title",
          "image": "/assets/certificates/cert.png",
          "pdf": "/assets/certificates/cert.pdf",
          "skills": ["Skill1", "Skill2"]
        }
      ]
    }
  ]
}
```

### Updating Assets
- **Profile Picture**: Replace `public/assets/profile/Profile.jpg`
- **Resume**: Replace `public/assets/resume.pdf`
- **Certificates**: Add files to `public/assets/certificates/`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed

### Build for Production

```bash
npm run build
npm run start
```

### Static Export

```bash
npm run build
```

The static files will be in the `out/` directory.

## 🎨 Customization

### Theme Colors
Update colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      }
    }
  }
}
```

### Fonts
Update fonts in `src/app/layout.js`:
```javascript
import { YourFont } from 'next/font/google'
```

### Animations
Customize animations in `src/app/globals.css`:
```css
@keyframes yourAnimation {
  /* Your keyframes */
}
```

## 📱 Sections Overview

1. **Hero**: Introduction with profile picture and social links
2. **About**: Personal story, education, and achievements
3. **Skills**: Technical and soft skills with progress bars
4. **Experience**: Work history with detailed modal views
5. **Projects**: Portfolio projects with filtering and details
6. **Certificates**: Professional certifications with preview
7. **Contact**: Contact form and information

## 🔧 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: React.lazy for route-based splitting
- **SEO**: Meta tags, Open Graph, and structured data
- **Accessibility**: WCAG compliance and semantic HTML
- **Loading**: Skeleton screens and smooth transitions

## 📞 Support

If you have any questions or need help customizing the portfolio:

- **Email**: dhanushmc@example.com
- **LinkedIn**: [linkedin.com/in/dhanush-m-c-668055258](https://www.linkedin.com/in/dhanush-m-c-668055258)
- **GitHub**: [github.com/DhanushMC](https://github.com/DhanushMC)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vercel** - Deployment platform

---

**Built with ❤️ by Dhanush M C**
