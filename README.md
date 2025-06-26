# 3D Interactive Portfolio - Pranav Gauttam

A comprehensive 3D portfolio website built with React Three Fiber, featuring immersive WebGL experiences and interactive 3D elements that meet all specified requirements.

## 🚀 Features Overview

### **Full-Screen Hero Canvas**
- **Auto-rotating 3D models** of top three projects (Inventory Management, Microsoft Chapter Website, Mudra Society Events)
- **Camera presets** (front/side/top/diagonal) with on-screen controls
- **Wireframe toggle** functionality with real-time switching
- **Mouse-drag rotation** controls with touch support
- **GLTFLoader lazy-loading** for performance optimization

### **Project Carousel**
- **Horizontal scroll of 2D cards** positioned under the hero section
- **Click to update 3D canvas** - cards dynamically load project models
- **Detailed project information** with exact experience data
- **Keyboard navigation** support with ARIA labels

### **Interactive Avatar**
- **Low-poly 3D head** that follows mouse movements in real-time
- **Split-screen layout** with text content and 3D avatar
- **Wireframe aesthetic** with neon glow effects
- **Responsive design** with touch-drag support

### **Experience Timeline**
- **Interactive 3D timeline ribbon** with vertical layout
- **3D hover-card previews** showing key responsibilities
- **Company logos and dates** with color-coded experiences
- **Scroll-triggered camera fly-throughs** into sections

### **Tech Stack Cloud**
- **Floating 3D tag-cloud** of all technologies from resume
- **Gentle pulsing and rotation** animations
- **Hover effects** with subtle scale/lighting changes
- **Complete tech stack** organized by categories

## 📋 Experience Details (Exact Data)

### **Engineering Intern - Serviz** (Dec 2024 – Jan 2025)
- **Project**: Inventory Management System
- **Technologies**: AngularJS, Bootstrap, Next.js, MongoDB
- **Focus**: Responsive frontend; CRUD APIs in MongoDB

### **Joint Secretary - Microsoft Learn Student Chapter, TIET** (Jun 2023 – Aug 2023)
- **Project**: Frontend & server for chapter website
- **Focus**: HR & event coordination

### **Management Head - Mudra Society, TIET** (Jan 2023 – Jun 2024)
- **Project**: Event management & performances
- **Focus**: Largest campus society operations

## 🛠️ Complete Tech Stack

### **Languages**
JavaScript, C, C++, HTML/CSS, Python

### **Frameworks & Libraries**
React.js, React Three Fiber/three.js, Node.js, Express.js, Next.js, Angular, Bootstrap, Tailwind CSS, TypeScript, Go, Postgres

### **Developer Tools & Platforms**
Git, Docker, Firebase Auth & Realtime DB, AWS (Deployment), VS Code, Chrome DevTools, SQL

### **Other Skills**
Data Structures, Software Systems, Software Engineering, Problem Solving, Teamwork, Management

## 🎮 3D Interactions & Animations

### **Mouse Controls**
- **Drag to rotate** 3D models in hero and avatar sections
- **Hover effects** with subtle scale/lighting changes on 3D objects
- **Timeline nodes** with interactive hover states
- **Tech tags** with glow and scale animations

### **Scroll-Triggered Effects**
- **Camera fly-throughs** into Experience & Tech sections
- **Progressive loading** of 3D elements
- **Smooth transitions** between sections

## 🎛️ Controls & UI

### **On-Screen Controls**
- **Camera presets** (front/side/top/diagonal)
- **Wireframe Toggle** button with real-time switching
- **High-contrast mode** for accessibility
- **Responsive resizing** for all screen sizes

### **Keyboard Navigation**
- **1-3**: Select specific projects
- **0**: Enable auto-rotation
- **W**: Toggle wireframe mode
- **C**: Toggle high contrast
- **Tab**: Navigate interactive elements
- **ARIA labels** for all controls

## 🚀 Performance & Accessibility

### **Performance Optimizations**
- **GLTFLoader lazy-loads** 3D models on demand
- **Efficient rendering** with optimized Three.js settings
- **Code splitting** with dynamic imports
- **Responsive canvas sizing** for mobile devices

### **Accessibility Features**
- **Canvas fallback images** if WebGL unsupported
- **High-contrast mode toggle** for better visibility
- **Keyboard navigation** for all interactive elements
- **ARIA labels** and screen reader support
- **Focus management** with clear indicators

## 🎨 Styling Details

### **Color Scheme**
- **Dark background** (#111) with neon accent glows
- **Neon cyan** (#0ff) and **neon magenta** (#f0f) accents
- **Soft drop-shadows** under 3D canvases

### **Typography**
- **Sans-serif** Inter font family
- **Weights**: 400 & 700
- **Responsive sizing** across all devices

## 📦 Installation & Setup

### **1. Clone Repository**
\`\`\`bash
git clone <repository-url>
cd 3d-portfolio-complete
\`\`\`

### **2. Install Dependencies**
\`\`\`bash
npm install
\`\`\`

### **3. Run Development Server**
\`\`\`bash
npm run dev
\`\`\`

### **4. Open in Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Customization Guide

### **Swapping in Your Own 3D Models**

1. **Place Models**: Add your `.glb` or `.gltf` files to `public/models/`

2. **Update HeroCanvas Component**:
\`\`\`tsx
// In components/HeroCanvas.tsx
import { useGLTF } from '@react-three/drei'

function ProjectModel({ modelPath, wireframe, color }) {
  const { scene } = useGLTF(modelPath)
  
  // Apply wireframe and color modifications
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = child.material.clone()
          child.material.wireframe = wireframe
          if (wireframe) {
            child.material.color.setHex(color)
          }
        }
      })
    }
  }, [scene, wireframe, color])

  return <primitive object={scene} />
}
\`\`\`

3. **Update Project Data**:
\`\`\`tsx
const projects = [
  {
    id: "your-project",
    name: "Your Project Name",
    type: "your-model-path", // Path to your model
    color: "#your-color",
    description: "Project description"
  }
]
\`\`\`

### **Customizing Experience Data**
Update the `experiences` array in `components/ExperienceTimeline.tsx` with your own career details.

### **Modifying Tech Stack**
Update the `technologies` array in `components/TechStackCloud.tsx` with your own skills and tools.

## 🚀 Deployment Instructions

### **Vercel (Recommended)**
1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect to Vercel**: Link your repository to Vercel
3. **Deploy**: Automatic deployment with optimized settings

### **Netlify**
1. **Build Project**:
\`\`\`bash
npm run build
\`\`\`

2. **Deploy**: Upload the build folder to Netlify

### **Manual Deployment**
1. **Build for Production**:
\`\`\`bash
npm run build
\`\`\`

2. **Serve Files**: Use any static hosting service to serve the built files

## 🌐 Browser Support

- **Modern Browsers**: Full 3D experience with WebGL 2.0 support
- **Legacy Browsers**: Graceful fallback with static content
- **Mobile Devices**: Touch-optimized controls and responsive design
- **Screen Readers**: Full accessibility support with ARIA labels

## 📱 Responsive Design

- **Desktop**: Full 3D experience with all interactive features
- **Tablet**: Optimized touch controls and canvas sizing
- **Mobile**: Simplified interactions and responsive layout
- **Canvas Fallback**: Static images for unsupported devices

## 🐛 Troubleshooting

### **WebGL Issues**
- Ensure browser supports WebGL 2.0
- Update graphics drivers
- Try disabling browser extensions

### **Performance Issues**
- Reduce 3D model complexity for mobile devices
- Lower canvas resolution on low-end devices
- Disable shadows and complex lighting effects

### **Model Loading Issues**
- Ensure models are in `.glb` or `.gltf` format
- Check file paths are correct
- Verify models are optimized for web use

## 📄 License

MIT License - feel free to use this code for your own portfolio projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with improvements or bug fixes.

## 📞 Support & Contact

If you need help customizing this portfolio:
- **Email**: pranavgauttam04@gmail.com
- **LinkedIn**: [Pranav Gauttam](https://linkedin.com/in/pranav-gauttam-540b562b4)
- **GitHub**: [pranavgauttam08](https://github.com/pranavgauttam08)

---

**Built with ❤️ by Pranav Gauttam using React Three Fiber, Next.js, and Tailwind CSS**

*Crafted with passion for immersive web experiences that push the boundaries of what's possible on the web.*
