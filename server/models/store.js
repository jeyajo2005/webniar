// In-Memory Persistent Store fallback when MongoDB isn't running
import { v4 as uuidv4 } from 'uuid';

export const memoryStore = {
  webinars: [
    {
      _id: 'webinar_live_01',
      title: 'Full-Stack AI & Autonomous Agents Masterclass',
      subtitle: 'Build, Deploy & Monetize Production Autonomous AI Agents with Real-Time Streaming & Payments',
      speaker: {
        name: 'Dr. Elena Vance',
        title: 'Principal AI Systems Architect & Founder, AI Innovations Lab',
        avatar: '/assets/female_presenter_blazer.jpg',
        bio: 'Over 12 years of enterprise engineering experience. Former AI Lead, trained 45,000+ engineers worldwide in LLM pipelines, autonomous multi-agent coordination, and scalable cloud monetization.',
        rating: '4.98 / 5.0 (3,800+ reviews)'
      },
      date: 'November 4, 2026',
      time: '07:00 PM IST',
      timezone: 'IST (UTC+5:30)',
      duration: '180 Minutes (Live Interactive Class + Live Q&A)',
      price: 499,
      vipPrice: 499,
      originalPrice: 2999,
      currency: 'INR',
      maxSeats: 500,
      seatsBooked: 462,
      videoPreviewUrl: '/assets/female_presenter_blazer.jpg',
      webinarAccessLink: 'https://live.webinarflow.io/room/ai-masterclass-nov4',
      whatsappCommunityUrl: 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
      status: 'active',
      tags: ['Autonomous Agents', 'Tool Calling', 'Razorpay Payments', 'Live Masterclass', 'GST Invoicing'],
      companySettings: {
        businessName: 'WebinarFlow Automation Pvt. Ltd.',
        address: 'Tech Innovation Tower, Cyber City, Bangalore, KA 560100',
        contactEmail: 'support@webinarflow.io',
        contactPhone: '+91 80 4920 1200',
        gstin: '29AABCU9603R1ZM',
        taxRate: 0.18,
        invoicePrefix: 'INV-2026'
      },
      bonuses: [
        { title: 'Production Multi-Agent SaaS Starter Repo (GitHub)', value: '₹4,999', icon: 'Code' },
        { title: '100+ Enterprise System Prompts & Tool Calling Blueprints', value: '₹2,499', icon: 'Sparkles' },
        { title: 'Official VIP WhatsApp Mastermind & Networking Group', value: '₹1,999', icon: 'MessageCircle' },
        { title: 'Authorized Certificate of Completion & CPD Credit', value: '₹1,499', icon: 'Award' }
      ],
      agenda: [
        { time: '07:00 PM', topic: 'Architecture of Production Autonomous Agent Swarms', desc: 'Understanding LLM tool calling, multi-agent arbitration, memory stores, and zero-shot reasoning.' },
        { time: '07:45 PM', topic: 'Live Coding: Full-Stack React + Streaming AI Backend', desc: 'Constructing token-streaming UI, dynamic agent delegation, and fast asynchronous execution pipelines.' },
        { time: '08:30 PM', topic: 'Monetization Engine: Razorpay Checkout & Automated GST Invoices', desc: 'Implementing webhook handlers, idempotency checks, PDF invoices, and automated WhatsApp/email triggers.' },
        { time: '09:15 PM', topic: 'Grand Live Mastermind, Deployment & Hot-Seat Q&A', desc: 'Live cloud publishing, attendee architecture evaluations, and 1-on-1 career direction with Dr. Elena Vance.' }
      ],
      testimonials: [
        {
          name: 'Vikramaditya Sengupta',
          role: 'Staff Engineer at Razorpay',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          quote: 'Dr. Elena Vance breaks down complex multi-agent swarms into clean, production-ready code. The Razorpay monetization workflow alone saved our team weeks of development.',
          rating: 5
        },
        {
          name: 'Meera Nambiar',
          role: 'Lead Architect at CloudScale',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
          quote: 'The automation funnel is mind-blowing. Immediate WhatsApp confirmation, instant GST invoice download, and clear calendar synchronization made this the smoothest webinar experience ever.',
          rating: 5
        },
        {
          name: 'David Anderson',
          role: 'AI Product Specialist, Global Tech',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          quote: 'The live class presentation format is unmatched. Elena teaches what actually matters in 2026: autonomous agent resilience, security, and profitable billing.',
          rating: 5
        }
      ],
      faqs: [
        {
          question: 'When is the actual webinar class taking place?',
          answer: 'The live masterclass takes place on November 4, 2026 at 07:00 PM IST. If you register today, your seat is reserved immediately, and you will receive instant confirmation via email and WhatsApp with your unique registration ID and tax invoice.'
        },
        {
          question: 'Will I get the recorded session if I cannot attend live on Nov 4, 2026?',
          answer: 'Yes! All confirmed VIP registrants receive lifetime access to the full 4K recorded masterclass, presentation slides, and complete GitHub repository.'
        },
        {
          question: 'How do I receive my tax invoice and receipt?',
          answer: 'Immediately upon verified payment, your official GST-compliant tax invoice is generated with a unique invoice number. You can download the PDF right on the Thank You page and it will also be sent to your registered email.'
        },
        {
          question: 'How do I join the WhatsApp Mastermind community?',
          answer: 'After payment verification, you will see a prominent "Join WhatsApp Community" button on your Thank You page, and our automation service will also dispatch the secure invitation link directly to your WhatsApp number.'
        },
        {
          question: 'How will I join the live class on November 4, 2026?',
          answer: 'You will receive secure joining links and calendar invitations via email and WhatsApp. We also trigger automated reminder alerts (24h before, 1h before, and when the class goes live) so you never miss a minute.'
        }
      ]
    }
  ],
  registrations: [
    {
      _id: 'reg_demo_101',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+919876543210',
      webinarId: 'webinar_live_01',
      ticketType: 'VIP',
      amountPaid: 499,
      paymentStatus: 'completed',
      paymentId: 'pay_demo_test_9981',
      orderId: 'order_demo_12345',
      invoiceNumber: 'INV-2026-0001',
      attendanceStatus: 'registered',
      calendarAdded: true,
      whatsappNotified: true,
      emailNotified: true,
      createdAt: '2026-10-18T10:30:00.000Z'
    },
    {
      _id: 'reg_demo_102',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+919812345678',
      webinarId: 'webinar_live_01',
      ticketType: 'VIP',
      amountPaid: 499,
      paymentStatus: 'completed',
      paymentId: 'pay_demo_test_9982',
      orderId: 'order_demo_12346',
      invoiceNumber: 'INV-2026-0002',
      attendanceStatus: 'registered',
      calendarAdded: true,
      whatsappNotified: true,
      emailNotified: true,
      createdAt: '2026-10-19T14:15:00.000Z'
    }
  ],
  payments: [
    {
      _id: 'pay_record_001',
      registrationId: 'reg_demo_101',
      orderId: 'order_demo_12345',
      paymentId: 'pay_demo_test_9981',
      signature: 'simulated_valid_sig',
      amount: 499,
      currency: 'INR',
      status: 'captured',
      method: 'UPI',
      invoiceNumber: 'INV-2026-0001',
      createdAt: '2026-10-18T10:30:00.000Z'
    },
    {
      _id: 'pay_record_002',
      registrationId: 'reg_demo_102',
      orderId: 'order_demo_12346',
      paymentId: 'pay_demo_test_9982',
      signature: 'simulated_valid_sig',
      amount: 499,
      currency: 'INR',
      status: 'captured',
      method: 'CARD',
      invoiceNumber: 'INV-2026-0002',
      createdAt: '2026-10-19T14:15:00.000Z'
    }
  ],
  invoices: [
    {
      _id: 'inv_record_001',
      invoiceNumber: 'INV-2026-0001',
      registrationId: 'reg_demo_101',
      paymentId: 'pay_demo_test_9981',
      customer: {
        name: 'Rohan Sharma',
        email: 'rohan.sharma@example.com',
        phone: '+919876543210'
      },
      items: [
        { description: 'Full-Stack AI & Autonomous Agents Masterclass (Nov 4, 2026)', amount: 499 }
      ],
      subtotal: 422.88,
      tax: 76.12,
      total: 499.00,
      currency: 'INR',
      status: 'paid',
      pdfUrl: '/api/invoices/INV-2026-0001/pdf',
      downloadUrl: '/api/invoices/INV-2026-0001/download',
      createdAt: '2026-10-18T10:30:00.000Z'
    },
    {
      _id: 'inv_record_002',
      invoiceNumber: 'INV-2026-0002',
      registrationId: 'reg_demo_102',
      paymentId: 'pay_demo_test_9982',
      customer: {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        phone: '+919812345678'
      },
      items: [
        { description: 'Full-Stack AI & Autonomous Agents Masterclass (Nov 4, 2026)', amount: 499 }
      ],
      subtotal: 422.88,
      tax: 76.12,
      total: 499.00,
      currency: 'INR',
      status: 'paid',
      pdfUrl: '/api/invoices/INV-2026-0002/pdf',
      downloadUrl: '/api/invoices/INV-2026-0002/download',
      createdAt: '2026-10-19T14:15:00.000Z'
    }
  ],
  messageLogs: [
    {
      _id: 'msg_001',
      recipient: 'rohan.sharma@example.com',
      channel: 'email',
      templateName: 'REGISTRATION_CONFIRMATION_NOV4',
      status: 'delivered',
      sentAt: '2026-10-18T10:30:05.000Z'
    },
    {
      _id: 'msg_002',
      recipient: '+919876543210',
      channel: 'whatsapp',
      templateName: 'WHATSAPP_CONFIRMATION_NOV4',
      status: 'delivered',
      sentAt: '2026-10-18T10:30:06.000Z'
    }
  ],
  webhookEvents: [],
  users: [
    {
      _id: 'user_student_01',
      name: 'Arun Kumar',
      email: 'student@kaira.io',
      password: '$2b$10$YxVTil.KqH0okXsQo.kgeeNSr8KvTeKj4ZmvmYnfPPIdtO55gzF3u', // password123
      phone: '+919876543210',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      bio: 'Full stack learner passionate about AI Agents and Cloud Engineering.',
      createdAt: '2026-10-18T10:00:00.000Z'
    },
    {
      _id: 'user_admin_01',
      name: 'Dr. Elena Vance (Admin)',
      email: 'admin@kaira.io',
      password: '$2b$10$JfggnERezYg2Kkt1l5rN9eh2CbRnc/r3zkFuWYGGyf8UesXW/N4hi', // admin123
      phone: '+919812345678',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      bio: 'Principal AI Architect & Course Director at Kaira Academy.',
      createdAt: '2026-10-10T10:00:00.000Z'
    }
  ],
  courses: [
    {
      _id: 'course_ai_agents',
      slug: 'full-stack-ai-autonomous-agents',
      title: 'Full-Stack AI & Autonomous Agent Architecture',
      subtitle: 'Build, deploy, and monetize production-grade autonomous agent swarms with streaming tools, memory, and Razorpay',
      description: 'Master the next era of software engineering. Learn to design multi-agent swarms using LLM function calling, vector memory retrieval, background execution loops, and automated payment gateways.',
      category: 'AI & Agents',
      level: 'All Levels',
      language: 'English',
      price: 499,
      originalPrice: 2999,
      currency: 'INR',
      thumbnail: '/images/course_ai.png',
      previewVideoUrl: '/videos/gemini_generated_video_323b2790.mp4',
      badge: 'Bestseller',
      rating: 4.95,
      reviewsCount: 3820,
      studentsCount: 18450,
      durationHours: 24,
      lecturesCount: 18,
      certificateAvailable: true,
      published: true,
      instructor: {
        name: 'Dr. Elena Vance',
        title: 'Principal AI Architect & Founder, AI Innovations Lab',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        bio: 'Over 12 years of enterprise engineering experience. Former AI Lead at major tech hubs, trained 45,000+ engineers worldwide.',
        rating: '4.98 Instructor Rating',
        studentsCount: 45000
      },
      whatYouWillLearn: [
        'Build autonomous agent swarms with tool calling and dynamic task delegation',
        'Implement real-time token streaming with React, Server-Sent Events & WebSockets',
        'Integrate Razorpay payment checkouts with HMAC verification and GST invoicing',
        'Store and query semantic memories using vector embeddings & hybrid indexes',
        'Deploy enterprise agents to Docker, Kubernetes, and serverless clusters'
      ],
      requirements: [
        'Basic familiarity with JavaScript or Python',
        'Fundamental knowledge of web applications and REST APIs',
        'No prior deep learning or machine learning background required'
      ],
      faqs: [
        {
          question: 'Are project source codes included in this course?',
          answer: 'Yes! You receive full access to production-ready GitHub repositories with complete test coverage, CI/CD pipelines, and configuration templates.'
        },
        {
          question: 'Will I receive a verifiable certificate upon completion?',
          answer: 'Yes! Upon finishing 100% of the lessons, an official, verifiable Certificate of Completion with a unique ID and verification link is generated instantly.'
        },
        {
          question: 'Is lifetime access included?',
          answer: 'Yes, all enrolled students receive lifetime access to all course modules, updates, and community Q&A.'
        }
      ],
      modules: [
        {
          _id: 'mod_01',
          title: 'Module 1: Foundations of Agentic AI & Tool Calling',
          lessons: [
            {
              _id: 'les_01_01',
              title: '01. Welcome & Architecture Blueprint of Autonomous Systems',
              duration: '14 min',
              durationSec: 840,
              videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
              isFreePreview: true,
              summary: 'Comprehensive overview of multi-agent paradigms, memory hierarchies, and the real-world roadmap.'
            },
            {
              _id: 'les_01_02',
              title: '02. LLM Function Calling & JSON Schema Definitions',
              duration: '18 min',
              durationSec: 1080,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              isFreePreview: true,
              summary: 'How LLMs safely invoke external functions with strict type guarantees.'
            },
            {
              _id: 'les_01_03',
              title: '03. ReAct Loops & Self-Correction Techniques',
              duration: '22 min',
              durationSec: 1320,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              isFreePreview: false,
              summary: 'Implementing observation-thought-action feedback loops for error resilience.'
            }
          ]
        },
        {
          _id: 'mod_02',
          title: 'Module 2: Building Full-Stack Agentic SaaS with React & Express',
          lessons: [
            {
              _id: 'les_02_01',
              title: '04. Real-time Streaming UI & Token Rendering in React',
              duration: '26 min',
              durationSec: 1560,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              isFreePreview: false,
              summary: 'Building ultra-responsive token streaming interfaces using modern React hooks.'
            },
            {
              _id: 'les_02_02',
              title: '05. Asynchronous Background Execution & Task Management',
              duration: '20 min',
              durationSec: 1200,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              isFreePreview: false,
              summary: 'Managing long-running agent threads with Node.js worker pools and Redis queues.'
            }
          ]
        },
        {
          _id: 'mod_03',
          title: 'Module 3: Monetization Engine: Razorpay Checkout & Webhooks',
          lessons: [
            {
              _id: 'les_03_01',
              title: '06. Secure Razorpay Checkout & Server Signature Verification',
              duration: '25 min',
              durationSec: 1500,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
              isFreePreview: false,
              summary: 'Implementing HMAC-SHA256 signature verification and order idempotency.'
            },
            {
              _id: 'les_03_02',
              title: '07. Automated GST Tax Invoicing & PDF Generation',
              duration: '19 min',
              durationSec: 1140,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
              isFreePreview: false,
              summary: 'Generating legal GST PDF invoices and sending automated confirmation emails.'
            }
          ]
        }
      ]
    },
    {
      _id: 'course_mern_saas',
      slug: 'modern-mern-stack-saas-payments',
      title: 'Modern MERN Stack 2026: Next-Gen SaaS & Payments',
      subtitle: 'Build and deploy enterprise full-stack web applications with React, Express, MongoDB, and Tailwind CSS',
      description: 'Go from frontend fundamentals to high-scale production MERN architecture. Master JWT authentication, role-based access control, Razorpay payments, and clean microservice structure.',
      category: 'Full-Stack Development',
      level: 'Intermediate',
      language: 'English',
      price: 599,
      originalPrice: 3499,
      currency: 'INR',
      thumbnail: '/images/course_mern.png',
      previewVideoUrl: '/videos/gemini_generated_video_323b2790.mp4',
      badge: 'Hot & New',
      rating: 4.88,
      reviewsCount: 2150,
      studentsCount: 12100,
      durationHours: 32,
      lecturesCount: 22,
      certificateAvailable: true,
      published: true,
      instructor: {
        name: 'Alex Rivera',
        title: 'Senior Staff Engineer & Tech Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        bio: 'Full-stack engineering veteran with 10+ years at high-growth startups.',
        rating: '4.91 Instructor Rating',
        studentsCount: 28000
      },
      whatYouWillLearn: [
        'Modern React 18 with hooks, state machines, and performant memoization',
        'Secure Node.js & Express REST APIs with rate limiting and helmet',
        'MongoDB schema modeling, indexing strategies, and aggregation pipelines',
        'End-to-end payment gateway workflows with webhook reconciliation'
      ],
      requirements: ['Basic JavaScript knowledge'],
      faqs: [{ question: 'Does this cover deployment?', answer: 'Yes, we cover VPS and cloud deployment.' }],
      modules: [
        {
          _id: 'mod_m1',
          title: 'Module 1: Production Architecture & Setup',
          lessons: [
            {
              _id: 'les_m1_1',
              title: '01. High-Performance MERN Architecture Overview',
              duration: '16 min',
              durationSec: 960,
              videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
              isFreePreview: true,
              summary: 'Architecture diagram, folder structure, and best conventions.'
            },
            {
              _id: 'les_m1_2',
              title: '02. Robust Auth with JWT & HttpOnly Cookies',
              duration: '24 min',
              durationSec: 1440,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              isFreePreview: false,
              summary: 'Bulletproof authentication design.'
            }
          ]
        }
      ]
    },
    {
      _id: 'course_cloud_k8s',
      slug: 'cloud-native-kubernetes-microservices',
      title: 'Cloud Native Kubernetes & Microservices at Scale',
      subtitle: 'Zero to hero with Docker containers, Helm charts, CI/CD pipelines, and AWS/GCP orchestration',
      description: 'Master enterprise cloud infrastructure. Learn how to containerize distributed apps, manage Kubernetes clusters, set up zero-downtime canary deployments, and monitor with Prometheus & Grafana.',
      category: 'Cloud & DevOps',
      level: 'Advanced',
      language: 'English',
      price: 699,
      originalPrice: 3999,
      currency: 'INR',
      thumbnail: '/images/course_cloud_fullstack.png',
      previewVideoUrl: '/videos/gemini_generated_video_323b2790.mp4',
      badge: 'Highest Rated',
      rating: 4.96,
      reviewsCount: 1680,
      studentsCount: 9400,
      durationHours: 28,
      lecturesCount: 20,
      certificateAvailable: true,
      published: true,
      instructor: {
        name: 'Marcus Vance',
        title: 'Principal Cloud Architect',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        bio: 'Ex-Google Cloud Solutions Architect, specializing in high-resilience systems.',
        rating: '4.95 Instructor Rating',
        studentsCount: 31000
      },
      whatYouWillLearn: [
        'Dockerize complex multi-service apps with multi-stage builds',
        'Configure Kubernetes Pods, Deployments, Services, and Ingress controllers',
        'Automate CI/CD pipelines with GitHub Actions and GitOps ArgoCD'
      ],
      requirements: ['Basic Linux terminal commands and networking principles.'],
      faqs: [{ question: 'Are cloud credits needed?', answer: 'We use Minikube and local k3s for free practice.' }],
      modules: [
        {
          _id: 'mod_k1',
          title: 'Module 1: Containerization with Docker & Podman',
          lessons: [
            {
              _id: 'les_k1_1',
              title: '01. Container Internals & Kernel Namespaces',
              duration: '18 min',
              durationSec: 1080,
              videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
              isFreePreview: true,
              summary: 'Understand cgroups, namespaces, and union file systems.'
            }
          ]
        }
      ]
    },
    {
      _id: 'course_ui_ux',
      slug: 'enterprise-ui-ux-design-systems',
      title: 'Enterprise UI/UX Design System & Micro-Interactions',
      subtitle: 'Design stunning user experiences, responsive layouts, Figma token libraries, and motion design',
      description: 'Transform your design capability. Learn typography hierarchies, harmonious color palettes, micro-animations, accessible contrast ratios, and design-to-code component systems.',
      category: 'UI/UX Design',
      level: 'All Levels',
      language: 'English',
      price: 449,
      originalPrice: 2499,
      currency: 'INR',
      thumbnail: '/images/course_uiux_agency.png',
      previewVideoUrl: '/videos/gemini_generated_video_323b2790.mp4',
      badge: 'Bestseller',
      rating: 4.89,
      reviewsCount: 2450,
      studentsCount: 16300,
      durationHours: 18,
      lecturesCount: 16,
      certificateAvailable: true,
      published: true,
      instructor: {
        name: 'Sophia Laurent',
        title: 'Design Director & UX Strategist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        bio: 'Award-winning UX director with designs powering over 20 million daily users.',
        rating: '4.92 Instructor Rating',
        studentsCount: 35000
      },
      whatYouWillLearn: [
        'Master Figma variables, auto-layout 5.0, and design token pipelines',
        'Create interactive prototypes with fluid easing and physics-based motion',
        'Conduct usability testing and data-driven UX audits'
      ],
      requirements: ['No prior design tools required; free Figma account is sufficient.'],
      faqs: [{ question: 'Are Figma UI kits included?', answer: 'Yes, 5 complete commercial UI kits are included.' }],
      modules: [
        {
          _id: 'mod_u1',
          title: 'Module 1: Visual Hierarchy & Design Psychology',
          lessons: [
            {
              _id: 'les_u1_1',
              title: '01. The Anatomy of Modern High-Converting Web Pages',
              duration: '15 min',
              durationSec: 900,
              videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
              isFreePreview: true,
              summary: 'Color theory, spacing rhythm, and F-pattern eye scanning.'
            }
          ]
        }
      ]
    },
    {
      _id: 'course_rag_llm',
      slug: 'production-llm-engineering-rag',
      title: 'Production LLM Engineering & Advanced RAG Pipelines',
      subtitle: 'Build high-accuracy AI search and reasoning engines with vector embeddings, rerankers, and LangChain',
      description: 'Master advanced Retrieval-Augmented Generation (RAG). Learn chunking strategies, hybrid vector & keyword retrieval, cross-encoder reranking, and evaluation with Ragas.',
      category: 'AI & Agents',
      level: 'Intermediate',
      language: 'English',
      price: 649,
      originalPrice: 3799,
      currency: 'INR',
      thumbnail: '/images/course_rag_uiux.png',
      previewVideoUrl: '/videos/gemini_generated_video_323b2790.mp4',
      badge: 'Hot & New',
      rating: 4.93,
      reviewsCount: 1890,
      studentsCount: 11200,
      durationHours: 22,
      lecturesCount: 18,
      certificateAvailable: true,
      published: true,
      instructor: {
        name: 'Dr. Elena Vance',
        title: 'Principal AI Architect',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        bio: 'Leading AI systems researcher and enterprise trainer.',
        rating: '4.98 Instructor Rating',
        studentsCount: 45000
      },
      whatYouWillLearn: [
        'Design semantic search pipelines with chunking and metadata filtering',
        'Implement BM25 + Dense vector reciprocal rank fusion (RRF)',
        'Guardrails for hallucinations, prompt injections, and data security'
      ],
      requirements: ['Basic Python or JavaScript API understanding.'],
      faqs: [{ question: 'Are API credits needed?', answer: 'We include local open-source models with Ollama too.' }],
      modules: [
        {
          _id: 'mod_r1',
          title: 'Module 1: Vector Embeddings & Similarity Math',
          lessons: [
            {
              _id: 'les_r1_1',
              title: '01. Cosine Distance, Dot Products & Index Types',
              duration: '16 min',
              durationSec: 960,
              videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
              isFreePreview: true,
              summary: 'How embedding spaces work and vector distance comparisons.'
            }
          ]
        }
      ]
    },
    {
      _id: 'course_cyber_sec',
      slug: 'cybersecurity-defenses-zero-trust',
      title: 'Cybersecurity Defenses: Zero Trust Architecture',
      subtitle: 'Defend web applications against OWASP Top 10, ransomware, API attacks, and credential stuffing',
      description: 'Protect modern cloud and web platforms. Learn identity federation, OAuth2/OIDC, mTLS, JWT token signing security, SQL injection defense, and enterprise threat auditing.',
      category: 'Cyber Security',
      level: 'All Levels',
      language: 'English',
      price: 549,
      originalPrice: 2999,
      currency: 'INR',
      thumbnail: '/images/course_cybersecurity.png',
      previewVideoUrl: '/videos/gemini_generated_video_323b2790.mp4',
      badge: 'Featured',
      rating: 4.87,
      reviewsCount: 1420,
      studentsCount: 8900,
      durationHours: 20,
      lecturesCount: 15,
      certificateAvailable: true,
      published: true,
      instructor: {
        name: 'David Thorne',
        title: 'Chief Information Security Officer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        bio: '15+ years managing security operations centers and cloud defense.',
        rating: '4.89 Instructor Rating',
        studentsCount: 19000
      },
      whatYouWillLearn: [
        'Secure APIs against OWASP Top 10 vulnerabilities',
        'Implement multi-factor authentication (MFA) and OAuth2 security',
        'Configure network firewalls, rate limits, and DDoS mitigation'
      ],
      requirements: ['Basic understanding of web protocols (HTTP, TCP, DNS).'],
      faqs: [{ question: 'Does this prepare for security certifications?', answer: 'Yes, covers CompTIA Security+ concepts.' }],
      modules: [
        {
          _id: 'mod_s1',
          title: 'Module 1: Web Application Threat Vectors',
          lessons: [
            {
              _id: 'les_s1_1',
              title: '01. OWASP Top 10 Analysis & Hands-on Exploitation Defense',
              duration: '19 min',
              durationSec: 1140,
              videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
              isFreePreview: true,
              summary: 'Preventing XSS, CSRF, and broken access controls.'
            }
          ]
        }
      ]
    }
  ],
  enrollments: [
    {
      _id: 'enr_demo_01',
      userId: 'user_student_01',
      courseId: 'course_ai_agents',
      paymentId: 'pay_demo_test_9981',
      orderId: 'order_demo_12345',
      amountPaid: 499,
      invoiceNumber: 'INV-2026-0001',
      status: 'active',
      progress: {
        completedLessons: ['les_01_01', 'les_01_02'],
        lastWatchedLessonId: 'les_01_02',
        percent: 28
      },
      certificate: {
        certificateId: 'CERT-KF-2026-8841',
        issuedAt: null,
        eligible: false
      },
      enrolledAt: '2026-10-18T10:30:00.000Z'
    }
  ]
};
