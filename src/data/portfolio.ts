import portfolioImage from "@/assets/project-portfolio.jpg";
import portalImage from "@/assets/project-portal.jpg";
import aiImage from "@/assets/project-ai.jpg";

export const personal = {
  name: "Abdul Wahab",
  role: "Web Developer • Software Developer • AI Enthusiast",
  tagline: "Building useful digital experiences where code, creativity, and AI meet.",
  email: "wahabirfan124@gmail.com",
  phone: "+92-3254056145",
  location: "Lahore, Punjab, Pakistan",
  linkedin: "https://www.linkedin.com/in/abdul-wahab-24a6b7273/",
  github: "https://github.com/abdulwahab5269",
};

export const skillGroups = [
  { title: "Web Development", featured: true, skills: ["HTML5", "CSS3", "JavaScript", "React.js"] },
  { title: "Software Development", featured: true, skills: ["C++", "Python", "JavaScript", "Problem Solving"] },
  { title: "Artificial Intelligence", featured: true, skills: ["Generative AI", "Prompt Engineering", "AI-assisted Development"] },
  { title: "Tools & Platforms", featured: false, skills: ["Git", "GitHub", "VS Code", "Microsoft Office"] },
  { title: "Digital Skills", featured: false, skills: ["Digital Marketing", "SEO", "Social Media"] },
];

export const projects = [
  {
    title: "Modern Portfolio Website",
    eyebrow: "Web experience",
    description: "A responsive personal portfolio concept focused on clear presentation, thoughtful interaction, and accessible frontend craft.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: portfolioImage,
    github: "",
    demo: "",
  },
  {
    title: "University / Student Portal",
    eyebrow: "Academic platform",
    description: "A frontend concept for organizing student information, coursework, and essential campus interactions in one clear interface.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: portalImage,
    github: "",
    demo: "",
  },
  {
    title: "AI-Based Application",
    eyebrow: "AI exploration",
    description: "An exploratory Python application concept investigating practical ways artificial intelligence can support everyday tasks.",
    technologies: ["Python", "AI"],
    image: aiImage,
    github: "",
    demo: "",
  },
];

export const certifications = [
  {
    title: "Google Prompting Essentials",
    issuer: "Coursera / Google",
    details: ["Prompt design", "Effective prompting", "Advanced techniques", "Data analysis", "Summarization"],
  },
  { title: "Web Development", issuer: "Google", details: ["Web development coursework"] },
  {
    title: "Digital Marketing",
    issuer: "Hunarmand Punjab / Ministry of IT & Telecom",
    details: ["SEO", "SEM", "Social media marketing", "Email marketing", "Google Analytics"],
  },
  { title: "Freelancing", issuer: "DigiSkills Training Program", details: ["Freelancing fundamentals"] },
  { title: "Digital Marketing", issuer: "DigiSkills Training Program", details: ["Digital marketing fundamentals"] },
];
