import { CVTemplate } from '../types/cv';

export const templates: CVTemplate[] = [
  // Modern Category
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Modern',
    description: 'Clean, modern design perfect for tech and business professionals',
    previewImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Technology', 'Business', 'Finance', 'Consulting'],
    difficulty: 'Beginner',
    features: ['ATS-Friendly', 'Clean Layout', 'Professional'],
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    category: 'Modern',
    description: 'Ultra-clean design with focus on typography and white space',
    previewImage: 'https://images.pexels.com/photos/7688113/pexels-photo-7688113.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Design', 'Architecture', 'Consulting', 'Startups'],
    difficulty: 'Beginner',
    features: ['Minimalist', 'Typography Focus', 'Clean'],
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#f59e0b',
      text: '#111827',
      background: '#ffffff',
      muted: '#f9fafb'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'spacious'
    }
  },
  {
    id: 'modern-geometric',
    name: 'Modern Geometric',
    category: 'Modern',
    description: 'Contemporary design with geometric elements and bold typography',
    previewImage: 'https://images.pexels.com/photos/7688330/pexels-photo-7688330.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Design', 'Marketing', 'Media', 'Technology'],
    difficulty: 'Intermediate',
    features: ['Geometric Design', 'Bold Typography', 'Visual Impact'],
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#06b6d4',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f1f5f9'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'Modern',
    description: 'Stylish design with gradient accents and modern layout',
    previewImage: 'https://images.pexels.com/photos/7688328/pexels-photo-7688328.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Technology', 'Startups', 'Digital Marketing', 'Design'],
    difficulty: 'Intermediate',
    features: ['Gradient Elements', 'Modern Layout', 'Eye-catching'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#faf5ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },

  // Creative Category
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Creative',
    description: 'Bold, creative layout ideal for designers and creative professionals',
    previewImage: 'https://images.pexels.com/photos/7688125/pexels-photo-7688125.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Design', 'Marketing', 'Media', 'Arts'],
    difficulty: 'Intermediate',
    features: ['Visual Impact', 'Portfolio Section', 'Creative Layout'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#faf5ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter',
      accent: 'Playfair Display'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'spacious'
    }
  },
  {
    id: 'creative-artistic',
    name: 'Creative Artistic',
    category: 'Creative',
    description: 'Artistic design with unique layout for creative professionals',
    previewImage: 'https://images.pexels.com/photos/7688320/pexels-photo-7688320.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Arts', 'Photography', 'Film', 'Music'],
    difficulty: 'Advanced',
    features: ['Artistic Layout', 'Portfolio Focus', 'Unique Design'],
    colors: {
      primary: '#be185d',
      secondary: '#ec4899',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#fdf2f8'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    category: 'Creative',
    description: 'Portfolio-focused design for showcasing creative work',
    previewImage: 'https://images.pexels.com/photos/7688318/pexels-photo-7688318.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Design', 'Photography', 'Architecture', 'Fashion'],
    difficulty: 'Advanced',
    features: ['Portfolio Showcase', 'Visual Elements', 'Project Focus'],
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#f0fdf4'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'centered',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'creative-colorful',
    name: 'Creative Colorful',
    category: 'Creative',
    description: 'Vibrant, colorful design that stands out from the crowd',
    previewImage: 'https://images.pexels.com/photos/7688316/pexels-photo-7688316.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Marketing', 'Events', 'Entertainment', 'Social Media'],
    difficulty: 'Intermediate',
    features: ['Colorful Design', 'Eye-catching', 'Vibrant'],
    colors: {
      primary: '#dc2626',
      secondary: '#f87171',
      accent: '#fbbf24',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#fef2f2'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    }
  },

  // Corporate Category
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'Corporate',
    description: 'Professional corporate design with traditional blue color scheme',
    previewImage: 'https://images.pexels.com/photos/7688111/pexels-photo-7688111.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Corporate', 'Banking', 'Insurance', 'Government'],
    difficulty: 'Beginner',
    features: ['Corporate Standard', 'Professional', 'Traditional'],
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    category: 'Corporate',
    description: 'Timeless corporate design with elegant typography',
    previewImage: 'https://images.pexels.com/photos/7688310/pexels-photo-7688310.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Banking', 'Law', 'Consulting', 'Finance'],
    difficulty: 'Beginner',
    features: ['Classic Design', 'Elegant', 'Timeless'],
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#059669',
      text: '#111827',
      background: '#ffffff',
      muted: '#f9fafb'
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    category: 'Corporate',
    description: 'Premium executive design for senior leadership positions',
    previewImage: 'https://images.pexels.com/photos/7688308/pexels-photo-7688308.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Executive', 'C-Suite', 'Board', 'Senior Management'],
    difficulty: 'Advanced',
    features: ['Executive Focus', 'Premium Look', 'Leadership'],
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#b91c1c',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'corporate-modern',
    name: 'Corporate Modern',
    category: 'Corporate',
    description: 'Modern corporate design blending tradition with innovation',
    previewImage: 'https://images.pexels.com/photos/7688306/pexels-photo-7688306.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Corporate', 'Technology', 'Finance', 'Consulting'],
    difficulty: 'Intermediate',
    features: ['Modern Corporate', 'Professional', 'Innovative'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#0ea5e9',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f1f5f9'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    }
  },

  // Tech Category
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    category: 'Tech',
    description: 'Modern tech-focused design with clean lines and data visualization',
    previewImage: 'https://images.pexels.com/photos/7688114/pexels-photo-7688114.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Technology', 'Software', 'Data Science', 'Engineering'],
    difficulty: 'Intermediate',
    features: ['Tech Skills Focus', 'Project Showcase', 'GitHub Integration'],
    colors: {
      primary: '#0f172a',
      secondary: '#64748b',
      accent: '#06b6d4',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f1f5f9'
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'centered',
      sectionSpacing: 'compact'
    }
  },
  {
    id: 'tech-developer',
    name: 'Tech Developer',
    category: 'Tech',
    description: 'Developer-focused template with code-friendly design',
    previewImage: 'https://images.pexels.com/photos/7688300/pexels-photo-7688300.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Software Development', 'Web Development', 'Mobile Development'],
    difficulty: 'Intermediate',
    features: ['Code Focus', 'Project Showcase', 'Technical Skills'],
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#f0fdf4'
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'left',
      sectionSpacing: 'compact'
    }
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    category: 'Tech',
    description: 'Dynamic design perfect for startup environments',
    previewImage: 'https://images.pexels.com/photos/7688298/pexels-photo-7688298.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Startups', 'Technology', 'Innovation', 'Entrepreneurship'],
    difficulty: 'Intermediate',
    features: ['Startup Focus', 'Innovation', 'Dynamic'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#faf5ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'tech-data-science',
    name: 'Tech Data Science',
    category: 'Tech',
    description: 'Specialized template for data scientists and analysts',
    previewImage: 'https://images.pexels.com/photos/7688296/pexels-photo-7688296.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Data Science', 'Analytics', 'Machine Learning', 'AI'],
    difficulty: 'Advanced',
    features: ['Data Focus', 'Analytics', 'Research'],
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    },
    premium: true
  },

  // Executive Category
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    category: 'Executive',
    description: 'Sophisticated design for senior executives and C-level professionals',
    previewImage: 'https://images.pexels.com/photos/7688120/pexels-photo-7688120.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Executive', 'Management', 'Finance', 'Legal'],
    difficulty: 'Advanced',
    features: ['Executive Focus', 'Achievement Highlights', 'Premium Look'],
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#059669',
      text: '#111827',
      background: '#ffffff',
      muted: '#f9fafb'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'executive-luxury',
    name: 'Executive Luxury',
    category: 'Executive',
    description: 'Luxury design for high-level executives and board members',
    previewImage: 'https://images.pexels.com/photos/7688290/pexels-photo-7688290.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['C-Suite', 'Board Members', 'Senior Leadership'],
    difficulty: 'Advanced',
    features: ['Luxury Design', 'Premium', 'Sophisticated'],
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#b91c1c',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Crimson Text'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'executive-modern',
    name: 'Executive Modern',
    category: 'Executive',
    description: 'Modern executive template for progressive leaders',
    previewImage: 'https://images.pexels.com/photos/7688288/pexels-photo-7688288.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Technology Leadership', 'Innovation', 'Modern Business'],
    difficulty: 'Advanced',
    features: ['Modern Leadership', 'Progressive', 'Innovation Focus'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#0ea5e9',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f1f5f9'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    },
    premium: true
  },

  // Academic Category
  {
    id: 'academic-scholar',
    name: 'Academic Scholar',
    category: 'Academic',
    description: 'Comprehensive academic CV template for researchers and educators',
    previewImage: 'https://images.pexels.com/photos/7688109/pexels-photo-7688109.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Academia', 'Research', 'Education', 'Science'],
    difficulty: 'Advanced',
    features: ['Publication Focus', 'Research Highlights', 'Academic Format'],
    colors: {
      primary: '#7c2d12',
      secondary: '#a3a3a3',
      accent: '#dc2626',
      text: '#1c1917',
      background: '#ffffff',
      muted: '#fef7f0'
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Source Serif Pro'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'compact'
    }
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    category: 'Academic',
    description: 'Research-focused template for PhD candidates and researchers',
    previewImage: 'https://images.pexels.com/photos/7688280/pexels-photo-7688280.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Research', 'PhD', 'PostDoc', 'Science'],
    difficulty: 'Advanced',
    features: ['Research Focus', 'Publications', 'Academic'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#059669',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'compact'
    }
  },
  {
    id: 'academic-professor',
    name: 'Academic Professor',
    category: 'Academic',
    description: 'Professional template for professors and senior academics',
    previewImage: 'https://images.pexels.com/photos/7688278/pexels-photo-7688278.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Professor', 'Senior Academic', 'Department Head'],
    difficulty: 'Advanced',
    features: ['Teaching Focus', 'Academic Leadership', 'Comprehensive'],
    colors: {
      primary: '#7c2d12',
      secondary: '#a78bfa',
      accent: '#f59e0b',
      text: '#1c1917',
      background: '#ffffff',
      muted: '#fef7f0'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Crimson Text'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'spacious'
    },
    premium: true
  },

  // Healthcare Category
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    category: 'Healthcare',
    description: 'Clean, trustworthy design for medical and healthcare professionals',
    previewImage: 'https://images.pexels.com/photos/7688107/pexels-photo-7688107.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Healthcare', 'Medical', 'Nursing', 'Pharmacy'],
    difficulty: 'Intermediate',
    features: ['Certification Focus', 'Clean Design', 'Professional'],
    colors: {
      primary: '#065f46',
      secondary: '#6b7280',
      accent: '#10b981',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#f0fdf4'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'healthcare-medical',
    name: 'Healthcare Medical',
    category: 'Healthcare',
    description: 'Specialized template for doctors and medical professionals',
    previewImage: 'https://images.pexels.com/photos/7688270/pexels-photo-7688270.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Doctor', 'Physician', 'Specialist', 'Medical'],
    difficulty: 'Advanced',
    features: ['Medical Focus', 'Credentials', 'Professional'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#10b981',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    },
    premium: true
  },
  {
    id: 'healthcare-nursing',
    name: 'Healthcare Nursing',
    category: 'Healthcare',
    description: 'Caring design template for nursing professionals',
    previewImage: 'https://images.pexels.com/photos/7688268/pexels-photo-7688268.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Nursing', 'Healthcare', 'Patient Care'],
    difficulty: 'Intermediate',
    features: ['Nursing Focus', 'Care Emphasis', 'Professional'],
    colors: {
      primary: '#be185d',
      secondary: '#ec4899',
      accent: '#10b981',
      text: '#374151',
      background: '#ffffff',
      muted: '#fdf2f8'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },

  // Legal Category
  {
    id: 'legal-counsel',
    name: 'Legal Counsel',
    category: 'Legal',
    description: 'Professional legal template emphasizing experience and credentials',
    previewImage: 'https://images.pexels.com/photos/7688105/pexels-photo-7688105.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Legal', 'Law', 'Compliance', 'Government'],
    difficulty: 'Advanced',
    features: ['Bar Admissions', 'Case Highlights', 'Professional'],
    colors: {
      primary: '#1e1b4b',
      secondary: '#64748b',
      accent: '#b91c1c',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'legal-attorney',
    name: 'Legal Attorney',
    category: 'Legal',
    description: 'Distinguished template for attorneys and legal professionals',
    previewImage: 'https://images.pexels.com/photos/7688260/pexels-photo-7688260.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Attorney', 'Law Firm', 'Legal Services'],
    difficulty: 'Advanced',
    features: ['Legal Focus', 'Distinguished', 'Professional'],
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#b91c1c',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Crimson Text'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'legal-corporate',
    name: 'Legal Corporate',
    category: 'Legal',
    description: 'Corporate legal template for in-house counsel',
    previewImage: 'https://images.pexels.com/photos/7688258/pexels-photo-7688258.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Corporate Law', 'In-house Counsel', 'Compliance'],
    difficulty: 'Advanced',
    features: ['Corporate Focus', 'Compliance', 'Business Law'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#059669',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    }
  },

  // Marketing Category
  {
    id: 'marketing-creative',
    name: 'Marketing Creative',
    category: 'Marketing',
    description: 'Dynamic design perfect for marketing and communications professionals',
    previewImage: 'https://images.pexels.com/photos/7688103/pexels-photo-7688103.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Marketing', 'Communications', 'PR', 'Social Media'],
    difficulty: 'Intermediate',
    features: ['Campaign Highlights', 'Visual Elements', 'Results Focus'],
    colors: {
      primary: '#be185d',
      secondary: '#ec4899',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#fdf2f8'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'marketing-digital',
    name: 'Marketing Digital',
    category: 'Marketing',
    description: 'Modern template for digital marketing professionals',
    previewImage: 'https://images.pexels.com/photos/7688250/pexels-photo-7688250.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Digital Marketing', 'SEO', 'SEM', 'Social Media'],
    difficulty: 'Intermediate',
    features: ['Digital Focus', 'Analytics', 'Campaign Results'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#faf5ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'marketing-brand',
    name: 'Marketing Brand',
    category: 'Marketing',
    description: 'Brand-focused template for brand managers and strategists',
    previewImage: 'https://images.pexels.com/photos/7688248/pexels-photo-7688248.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Brand Management', 'Strategy', 'Product Marketing'],
    difficulty: 'Advanced',
    features: ['Brand Focus', 'Strategy', 'Creative'],
    colors: {
      primary: '#dc2626',
      secondary: '#f87171',
      accent: '#fbbf24',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#fef2f2'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    },
    premium: true
  },

  // Finance Category
  {
    id: 'finance-analyst',
    name: 'Finance Analyst',
    category: 'Finance',
    description: 'Professional template for financial analysts and advisors',
    previewImage: 'https://images.pexels.com/photos/7688240/pexels-photo-7688240.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Finance', 'Banking', 'Investment', 'Analysis'],
    difficulty: 'Intermediate',
    features: ['Financial Focus', 'Analysis', 'Professional'],
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#059669',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'finance-investment',
    name: 'Finance Investment',
    category: 'Finance',
    description: 'Sophisticated template for investment professionals',
    previewImage: 'https://images.pexels.com/photos/7688238/pexels-photo-7688238.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Investment Banking', 'Private Equity', 'Hedge Funds'],
    difficulty: 'Advanced',
    features: ['Investment Focus', 'Sophisticated', 'Premium'],
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#059669',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'finance-banking',
    name: 'Finance Banking',
    category: 'Finance',
    description: 'Traditional banking template with conservative design',
    previewImage: 'https://images.pexels.com/photos/7688236/pexels-photo-7688236.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Banking', 'Commercial Banking', 'Credit'],
    difficulty: 'Intermediate',
    features: ['Banking Focus', 'Conservative', 'Traditional'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#f59e0b',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'normal'
    }
  },

  // Education Category
  {
    id: 'education-teacher',
    name: 'Education Teacher',
    category: 'Education',
    description: 'Warm, approachable template for teachers and educators',
    previewImage: 'https://images.pexels.com/photos/7688230/pexels-photo-7688230.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Teaching', 'Education', 'K-12', 'Training'],
    difficulty: 'Beginner',
    features: ['Teaching Focus', 'Approachable', 'Educational'],
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#f0fdf4'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'education-administrator',
    name: 'Education Administrator',
    category: 'Education',
    description: 'Professional template for education administrators',
    previewImage: 'https://images.pexels.com/photos/7688228/pexels-photo-7688228.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Education Administration', 'Principal', 'Superintendent'],
    difficulty: 'Advanced',
    features: ['Leadership Focus', 'Administrative', 'Professional'],
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#059669',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    },
    premium: true
  },
  {
    id: 'education-counselor',
    name: 'Education Counselor',
    category: 'Education',
    description: 'Supportive template for counselors and student services',
    previewImage: 'https://images.pexels.com/photos/7688226/pexels-photo-7688226.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Counseling', 'Student Services', 'Psychology'],
    difficulty: 'Intermediate',
    features: ['Counseling Focus', 'Supportive', 'Professional'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#10b981',
      text: '#374151',
      background: '#ffffff',
      muted: '#faf5ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  },

  // Sales Category
  {
    id: 'sales-executive',
    name: 'Sales Executive',
    category: 'Sales',
    description: 'Results-driven template for sales professionals',
    previewImage: 'https://images.pexels.com/photos/7688220/pexels-photo-7688220.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Sales', 'Business Development', 'Account Management'],
    difficulty: 'Intermediate',
    features: ['Results Focus', 'Achievement Highlights', 'Professional'],
    colors: {
      primary: '#dc2626',
      secondary: '#f87171',
      accent: '#fbbf24',
      text: '#1f2937',
      background: '#ffffff',
      muted: '#fef2f2'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    }
  },
  {
    id: 'sales-manager',
    name: 'Sales Manager',
    category: 'Sales',
    description: 'Leadership-focused template for sales managers',
    previewImage: 'https://images.pexels.com/photos/7688218/pexels-photo-7688218.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Sales Management', 'Team Leadership', 'Revenue'],
    difficulty: 'Advanced',
    features: ['Leadership Focus', 'Team Management', 'Results'],
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#dc2626',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#eff6ff'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'split',
      sectionSpacing: 'normal'
    },
    premium: true
  },

  // Consulting Category
  {
    id: 'consulting-strategy',
    name: 'Consulting Strategy',
    category: 'Consulting',
    description: 'Strategic template for management consultants',
    previewImage: 'https://images.pexels.com/photos/7688210/pexels-photo-7688210.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Management Consulting', 'Strategy', 'Business Analysis'],
    difficulty: 'Advanced',
    features: ['Strategy Focus', 'Analytical', 'Professional'],
    colors: {
      primary: '#0f172a',
      secondary: '#475569',
      accent: '#059669',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#f8fafc'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      columns: 1,
      headerStyle: 'left',
      sectionSpacing: 'spacious'
    },
    premium: true
  },
  {
    id: 'consulting-freelance',
    name: 'Consulting Freelance',
    category: 'Consulting',
    description: 'Flexible template for independent consultants',
    previewImage: 'https://images.pexels.com/photos/7688208/pexels-photo-7688208.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: ['Freelance Consulting', 'Independent', 'Specialized'],
    difficulty: 'Intermediate',
    features: ['Freelance Focus', 'Flexible', 'Specialized'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#f59e0b',
      text: '#374151',
      background: '#ffffff',
      muted: '#faf5ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: {
      columns: 2,
      headerStyle: 'centered',
      sectionSpacing: 'normal'
    }
  }
];

export const getTemplatesByCategory = (category: string) => {
  return templates.filter(template => template.category === category);
};

export const getTemplatesByIndustry = (industry: string) => {
  return templates.filter(template => template.industry.includes(industry));
};

export const getFreeTemplates = () => {
  return templates.filter(template => !template.premium);
};

export const getPremiumTemplates = () => {
  return templates.filter(template => template.premium);
};

export const getTemplatesByDifficulty = (difficulty: string) => {
  return templates.filter(template => template.difficulty === difficulty);
};

export const searchTemplates = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return templates.filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.category.toLowerCase().includes(lowercaseQuery) ||
    template.industry.some(ind => ind.toLowerCase().includes(lowercaseQuery)) ||
    template.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRandomTemplates = (count: number = 6) => {
  const shuffled = [...templates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getFeaturedTemplates = () => {
  return templates.filter(template => 
    template.features.includes('ATS-Friendly') || 
    template.features.includes('Premium Look') ||
    template.premium
  );
};