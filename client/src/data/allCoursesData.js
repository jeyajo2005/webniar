export const ALL_COURSES = [
  // 1. AI & Autonomous Agents
  {
    _id: 'course_ai_agents',
    title: 'Full-Stack AI & Autonomous Agent Architecture',
    subtitle: 'Build, deploy, and monetize production-grade autonomous agent swarms with streaming tools, memory, and Razorpay',
    description: 'Master the next era of software engineering. Learn to design multi-agent swarms using LLM function calling, vector memory retrieval, background execution loops, and automated payment gateways.',
    category: 'AI & Agents',
    level: 'All Levels',
    price: 499,
    originalPrice: 2999,
    thumbnail: '/images/course_ai.png',
    badge: 'Bestseller',
    rating: 4.95,
    reviewsCount: 3820,
    studentsCount: 18450,
    durationHours: 24,
    lecturesCount: 18,
    partner: 'DeepLearning.AI',
    instructor: {
      name: 'Dr. Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      title: 'Principal AI Architect'
    }
  },
  // 2. Full-Stack Modern MERN
  {
    _id: 'course_mern_saas',
    title: 'Modern MERN Stack 2026: Next-Gen SaaS & Payments',
    subtitle: 'Build and deploy enterprise full-stack web applications with React, Express, MongoDB, and Tailwind CSS',
    description: 'Master enterprise full-stack development. Build production SaaS apps with authenticated JWT, PhonePe/Razorpay integration, multi-tenant databases, and server-side optimization.',
    category: 'Full-Stack Development',
    level: 'All Levels',
    price: 599,
    originalPrice: 3499,
    thumbnail: '/images/course_mern.png',
    badge: 'Hot & New',
    rating: 4.88,
    reviewsCount: 2150,
    studentsCount: 12100,
    durationHours: 32,
    lecturesCount: 24,
    partner: 'Kaira Academy',
    instructor: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      title: 'Senior Full-Stack Lead'
    }
  },
  // 3. Cloud Native Kubernetes
  {
    _id: 'course_cloud_k8s',
    title: 'Cloud Native Kubernetes & Microservices at Scale',
    subtitle: 'Zero to hero with Docker containers, Helm charts, CI/CD pipelines, and AWS/GCP orchestration',
    description: 'Learn containerization, Kubernetes orchestration, zero-downtime canary deployments, Prometheus monitoring, and cloud-native resilience.',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    price: 699,
    originalPrice: 3999,
    thumbnail: '/images/course_cloud_fullstack.png',
    badge: 'Highest Rated',
    rating: 4.96,
    reviewsCount: 1680,
    studentsCount: 9400,
    durationHours: 28,
    lecturesCount: 20,
    partner: 'Cloud Native Org',
    instructor: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      title: 'Principal Cloud Architect'
    }
  },
  // 4. Enterprise UI/UX Design System
  {
    _id: 'course_ui_ux',
    title: 'Enterprise UI/UX Design System & Micro-Interactions',
    subtitle: 'Design stunning user experiences, responsive layouts, Figma token libraries, and motion design',
    description: 'Master Figma variables, auto-layout 5.0, dark mode color harmonies, responsive grids, and design-to-code component libraries.',
    category: 'UI/UX Design',
    level: 'All Levels',
    price: 449,
    originalPrice: 2499,
    thumbnail: '/images/course_uiux_agency.png',
    badge: 'Bestseller',
    rating: 4.89,
    reviewsCount: 2450,
    studentsCount: 16300,
    durationHours: 18,
    lecturesCount: 16,
    partner: 'Design Guild',
    instructor: {
      name: 'Sophia Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: 'Design Director & UX Strategist'
    }
  },
  // 5. Production LLM & RAG
  {
    _id: 'course_rag_llm',
    title: 'Production LLM Engineering & Advanced RAG Pipelines',
    subtitle: 'Build high-accuracy AI search and reasoning engines with vector embeddings, rerankers, and LangChain',
    description: 'Build production-ready retrieval-augmented generation systems. Master chunking strategies, hybrid vector & keyword retrieval, and cross-encoder rerankers.',
    category: 'AI & Agents',
    level: 'Intermediate',
    price: 649,
    originalPrice: 3799,
    thumbnail: '/images/course_rag_uiux.png',
    badge: 'Hot & New',
    rating: 4.93,
    reviewsCount: 1890,
    studentsCount: 11200,
    durationHours: 22,
    lecturesCount: 18,
    partner: 'DeepLearning.AI',
    instructor: {
      name: 'Dr. Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      title: 'Principal AI Architect'
    }
  },
  // 6. Cybersecurity Defenses
  {
    _id: 'course_cyber_sec',
    title: 'Cybersecurity Defenses: Zero Trust Architecture',
    subtitle: 'Defend web applications against OWASP Top 10, ransomware, API attacks, and credential stuffing',
    description: 'Protect modern cloud and web platforms. Learn identity federation, OAuth2/OIDC, mTLS, JWT signing security, and threat auditing.',
    category: 'Cyber Security',
    level: 'All Levels',
    price: 549,
    originalPrice: 2999,
    thumbnail: '/images/course_cybersecurity.png',
    badge: 'Featured',
    rating: 4.87,
    reviewsCount: 1420,
    studentsCount: 8900,
    durationHours: 20,
    lecturesCount: 15,
    partner: 'Cyber Defense Alliance',
    instructor: {
      name: 'David Thorne',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      title: 'Lead Security Auditor'
    }
  },
  // 7. Next.js 15 & React Server Components
  {
    _id: 'course_nextjs_15',
    title: 'Next.js 15 & React Server Components Enterprise Playbook',
    subtitle: 'Build ultra-fast full-stack applications with Server Actions, Turbopack, App Router, and Edge middleware',
    description: 'Master Next.js 15. Learn streaming SSR, incremental static regeneration (ISR), parallel routes, intercepting modals, and Prisma ORM integration.',
    category: 'Full-Stack Development',
    level: 'Intermediate',
    price: 599,
    originalPrice: 3499,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Bestseller',
    rating: 4.94,
    reviewsCount: 3120,
    studentsCount: 15400,
    durationHours: 26,
    lecturesCount: 22,
    partner: 'React Open Standards',
    instructor: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      title: 'Staff Frontend Engineer'
    }
  },
  // 8. Python Data Science & ML
  {
    _id: 'course_python_data_science',
    title: 'Python for Data Science, Pandas & Machine Learning Mastery',
    subtitle: 'End-to-end data pipelines with NumPy, Pandas, Scikit-Learn, Matplotlib, and predictive models',
    description: 'Master data analysis and predictive modeling. Clean dirty enterprise datasets, create automated EDA dashboards, and deploy production Scikit-Learn models.',
    category: 'Data & Systems',
    level: 'All Levels',
    price: 499,
    originalPrice: 2899,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular',
    rating: 4.91,
    reviewsCount: 2900,
    studentsCount: 19800,
    durationHours: 30,
    lecturesCount: 25,
    partner: 'Data Insights Lab',
    instructor: {
      name: 'Karthik Ramanathan',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      title: 'Principal Data Scientist'
    }
  },
  // 9. DevOps & GitOps Automation
  {
    _id: 'course_devops_gitops',
    title: 'DevOps & GitOps Automation with GitHub Actions & ArgoCD',
    subtitle: 'Automate build, test, scan, and deploy pipelines with Terraform, Helm, and declarative Kubernetes',
    description: 'Learn modern GitOps practices. Automate infrastructure with Terraform, orchestrate container deployments with ArgoCD, and secure pipelines with Trivy scans.',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    price: 649,
    originalPrice: 3699,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hot & New',
    rating: 4.92,
    reviewsCount: 1450,
    studentsCount: 7800,
    durationHours: 24,
    lecturesCount: 19,
    partner: 'DevOps Institute',
    instructor: {
      name: 'Liam O’Connor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      title: 'DevOps Lead at CloudWorks'
    }
  },
  // 10. System Design & Distributed Systems
  {
    _id: 'course_system_design',
    title: 'System Design & High-Scalability Distributed Architecture',
    subtitle: 'Design scalable microservices, sharded databases, cache hierarchies, and fault-tolerant backends',
    description: 'Ace FAANG-grade system design interviews. Learn CAP theorem tradeoffs, consistent hashing, message queues (Kafka/RabbitMQ), and disaster recovery.',
    category: 'Data & Systems',
    level: 'Advanced',
    price: 799,
    originalPrice: 4999,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Highest Rated',
    rating: 4.98,
    reviewsCount: 4200,
    studentsCount: 22100,
    durationHours: 35,
    lecturesCount: 28,
    partner: 'ScaleArch Labs',
    instructor: {
      name: 'Vikram Sundaram',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      title: 'Distinguished Systems Architect'
    }
  },
  // 11. Flutter & React Native Mobile
  {
    _id: 'course_mobile_apps',
    title: 'Cross-Platform Mobile Apps with React Native & Flutter',
    subtitle: 'Ship 60FPS iOS and Android applications with offline-first SQLite, animations, and push notifications',
    description: 'Build native mobile apps with one codebase. Master React Native Reanimated 3, native module bridges, Expo SDK 52, and biometric authentication.',
    category: 'Full-Stack Development',
    level: 'Intermediate',
    price: 549,
    originalPrice: 3199,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular',
    rating: 4.86,
    reviewsCount: 1780,
    studentsCount: 9900,
    durationHours: 25,
    lecturesCount: 21,
    partner: 'Mobile Craft',
    instructor: {
      name: 'Meera Nambiar',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
      title: 'Mobile Tech Lead'
    }
  },
  // 12. Golang for High-Performance Microservices
  {
    _id: 'course_golang_microservices',
    title: 'Golang 1.24 for High-Throughput Concurrent Microservices',
    subtitle: 'Master Go goroutines, channels, gRPC, Protobuf, and memory-efficient distributed backends',
    description: 'Harness Go for millions of requests per second. Build concurrent microservices with gRPC, database connection pooling, and sub-millisecond API endpoints.',
    category: 'Full-Stack Development',
    level: 'Intermediate',
    price: 649,
    originalPrice: 3599,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    badge: 'Trending',
    rating: 4.93,
    reviewsCount: 1620,
    studentsCount: 8400,
    durationHours: 22,
    lecturesCount: 17,
    partner: 'Go Gophers Org',
    instructor: {
      name: 'Ryan Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      title: 'Backend Systems Engineer'
    }
  },
  // 13. Deep Learning & Computer Vision
  {
    _id: 'course_deep_learning_cv',
    title: 'Deep Learning & Computer Vision with PyTorch & YOLOv11',
    subtitle: 'Object detection, image segmentation, neural style transfer, and real-time edge AI inference',
    description: 'Train and fine-tune convolutional neural networks and vision transformers with PyTorch. Deploy real-time object detection pipelines on edge hardware.',
    category: 'AI & Agents',
    level: 'Advanced',
    price: 699,
    originalPrice: 3999,
    thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Specialization',
    rating: 4.91,
    reviewsCount: 1390,
    studentsCount: 7100,
    durationHours: 27,
    lecturesCount: 20,
    partner: 'DeepLearning.AI',
    instructor: {
      name: 'Dr. Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      title: 'Principal AI Architect'
    }
  },
  // 14. Ethical Hacking & PenTesting
  {
    _id: 'course_ethical_hacking',
    title: 'Ethical Hacking & Penetration Testing Professional',
    subtitle: 'Kali Linux, Metasploit, Burp Suite, Network Sniffing, and Vulnerability Assessment in live labs',
    description: 'Learn offensive security techniques safely. Conduct penetration tests, exploit web vulnerabilities, bypass firewalls, and write actionable remediation reports.',
    category: 'Cyber Security',
    level: 'All Levels',
    price: 599,
    originalPrice: 3299,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular',
    rating: 4.89,
    reviewsCount: 2600,
    studentsCount: 13800,
    durationHours: 26,
    lecturesCount: 22,
    partner: 'Cyber Defense Alliance',
    instructor: {
      name: 'David Thorne',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      title: 'Lead Security Auditor'
    }
  },
  // 15. AWS Solutions Architect Professional
  {
    _id: 'course_aws_solutions_arch',
    title: 'AWS Certified Solutions Architect & Multi-Region Cloud',
    subtitle: 'VPC peering, IAM security, Auto Scaling, DynamoDB, S3, and disaster recovery architectures',
    description: 'Prepare and pass the AWS certification while learning real-world multi-tier architecture design, serverless Lambda backends, and cost optimization.',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    price: 699,
    originalPrice: 3899,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Bestseller',
    rating: 4.95,
    reviewsCount: 3400,
    studentsCount: 17200,
    durationHours: 31,
    lecturesCount: 24,
    partner: 'Cloud Academy Partner',
    instructor: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      title: 'Principal Cloud Architect'
    }
  },
  // 16. Prompt Engineering & GenAI Swarms
  {
    _id: 'course_prompt_engineering',
    title: 'Generative AI Prompt Engineering & Autonomous Workflows',
    subtitle: 'Chain-of-thought, tree-of-thought, DSPy optimization, and automated autonomous agent swarms',
    description: 'Master advanced prompt architecture. Use structured outputs, DSPy compilation, few-shot reasoning, and autonomous multi-agent pipelines for enterprise workflows.',
    category: 'AI & Agents',
    level: 'All Levels',
    price: 449,
    originalPrice: 2299,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hot & New',
    rating: 4.88,
    reviewsCount: 1540,
    studentsCount: 10400,
    durationHours: 16,
    lecturesCount: 14,
    partner: 'Kaira Academy',
    instructor: {
      name: 'Dr. Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      title: 'Principal AI Architect'
    }
  },
  // 17. Frontend System Architecture & Micro-frontends
  {
    _id: 'course_frontend_architecture',
    title: 'Frontend System Architecture & Enterprise Micro-Frontends',
    subtitle: 'Module Federation, Webpack/Vite plugins, state management at scale, and Core Web Vitals 100/100',
    description: 'Design massive enterprise frontend web applications. Decouple monorepos with Module Federation, enforce strict TypeScript boundaries, and optimize rendering speed.',
    category: 'Full-Stack Development',
    level: 'Advanced',
    price: 649,
    originalPrice: 3499,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Staff Engineer',
    rating: 4.96,
    reviewsCount: 1980,
    studentsCount: 8900,
    durationHours: 23,
    lecturesCount: 18,
    partner: 'Frontend Masters Group',
    instructor: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      title: 'Staff Frontend Engineer'
    }
  },
  // 18. Database Engineering: PostgreSQL & Redis
  {
    _id: 'course_database_engineering',
    title: 'Database Engineering: PostgreSQL, Redis & Vector Indexing',
    subtitle: 'Query plans, B-trees, connection pooling, write-ahead logs, and HNSW vector similarity indexes',
    description: 'Deep dive into database internals. Optimize slow queries with EXPLAIN ANALYZE, configure logical replication, tune pgvector, and build Redis caching layers.',
    category: 'Data & Systems',
    level: 'Intermediate',
    price: 599,
    originalPrice: 3299,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular',
    rating: 4.92,
    reviewsCount: 1870,
    studentsCount: 9200,
    durationHours: 24,
    lecturesCount: 19,
    partner: 'Data Insights Lab',
    instructor: {
      name: 'Vikram Sundaram',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      title: 'Distinguished Systems Architect'
    }
  },
  // 19. Advanced Figma UI/UX Prototyping
  {
    _id: 'course_figma_prototyping',
    title: 'Advanced Figma Design Systems & Motion Prototyping',
    subtitle: 'Component properties, interactive component states, variables, responsive breakpoints, and handoff',
    description: 'Transform into a top 1% product designer. Master complex component variants, nested auto-layout algorithms, responsive web frames, and motion prototypes.',
    category: 'UI/UX Design',
    level: 'All Levels',
    price: 499,
    originalPrice: 2699,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hot & New',
    rating: 4.87,
    reviewsCount: 2100,
    studentsCount: 11500,
    durationHours: 19,
    lecturesCount: 16,
    partner: 'Design Guild',
    instructor: {
      name: 'Sophia Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: 'Design Director & UX Strategist'
    }
  },
  // 20. SRE & Chaos Engineering
  {
    _id: 'course_sre_chaos',
    title: 'Site Reliability Engineering (SRE) & Chaos Testing',
    subtitle: 'SLIs/SLOs, distributed tracing with OpenTelemetry, incident response, and resilience testing',
    description: 'Keep enterprise platforms up with 99.999% availability. Implement automated error budgets, configure Grafana alerting, and run chaos experiments.',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    price: 699,
    originalPrice: 3999,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    badge: 'Enterprise',
    rating: 4.94,
    reviewsCount: 1150,
    studentsCount: 6400,
    durationHours: 21,
    lecturesCount: 17,
    partner: 'DevOps Institute',
    instructor: {
      name: 'Liam O’Connor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      title: 'DevOps Lead at CloudWorks'
    }
  },
  // 21. Rust for Systems & High Performance
  {
    _id: 'course_rust_systems',
    title: 'Rust Programming for Systems, WebAssembly & Cloud',
    subtitle: 'Borrow checker, memory safety, async Tokio runtime, multithreading, and WebAssembly modules',
    description: 'Learn the most loved programming language. Master ownership and borrowing rules, safe concurrency, zero-cost abstractions, and blazingly fast WebAssembly.',
    category: 'Data & Systems',
    level: 'Intermediate',
    price: 649,
    originalPrice: 3699,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Trending',
    rating: 4.97,
    reviewsCount: 2240,
    studentsCount: 10100,
    durationHours: 28,
    lecturesCount: 23,
    partner: 'Systems Research Lab',
    instructor: {
      name: 'Ryan Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      title: 'Backend Systems Engineer'
    }
  },
  // 22. Generative AI Video, Voice & Multimodal
  {
    _id: 'course_multimodal_ai',
    title: 'Multimodal AI Engineering: Vision, Speech & Real-Time Audio',
    subtitle: 'Whisper speech-to-text, ElevenLabs voice cloning, Gemini Vision, and WebSocket streaming',
    description: 'Build apps that can see, hear, and talk in real time. Integrate multimodal LLMs, audio streaming protocols, and low-latency voice bots with WebRTC.',
    category: 'AI & Agents',
    level: 'Intermediate',
    price: 699,
    originalPrice: 3899,
    thumbnail: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=1200&q=80',
    badge: 'Cutting Edge',
    rating: 4.95,
    reviewsCount: 1820,
    studentsCount: 9600,
    durationHours: 23,
    lecturesCount: 18,
    partner: 'DeepLearning.AI',
    instructor: {
      name: 'Dr. Elena Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      title: 'Principal AI Architect'
    }
  },
  // 23. AppSec & DevSecOps Security
  {
    _id: 'course_appsec_devsecops',
    title: 'AppSec & DevSecOps: Security in Continuous Delivery',
    subtitle: 'SAST, DAST, SCA dependency scanning, container vulnerability patching, and secret management',
    description: 'Shift security left in your engineering teams. Automate SonarQube, Snyk, and GitHub secret scanning to eliminate vulnerabilities before deployment.',
    category: 'Cyber Security',
    level: 'Intermediate',
    price: 549,
    originalPrice: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Enterprise',
    rating: 4.88,
    reviewsCount: 1190,
    studentsCount: 6100,
    durationHours: 20,
    lecturesCount: 16,
    partner: 'Cyber Defense Alliance',
    instructor: {
      name: 'David Thorne',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      title: 'Lead Security Auditor'
    }
  },
  // 24. Product Design & Micro-Interactions
  {
    _id: 'course_product_design_motion',
    title: 'Micro-Interactions & Motion Design for Web Applications',
    subtitle: 'Framer Motion, CSS cubic-bezier transitions, 3D Canvas Spline, and Delightful UX Details',
    description: 'Transform boring web apps into delightful, award-winning digital experiences. Master layout animations, page transitions, gesture interactions, and scroll physics.',
    category: 'UI/UX Design',
    level: 'All Levels',
    price: 449,
    originalPrice: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Design Award',
    rating: 4.92,
    reviewsCount: 1670,
    studentsCount: 8800,
    durationHours: 17,
    lecturesCount: 15,
    partner: 'Design Guild',
    instructor: {
      name: 'Sophia Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: 'Design Director & UX Strategist'
    }
  },
  // 25. Kafka & Event-Driven Architecture
  {
    _id: 'course_kafka_event_driven',
    title: 'Apache Kafka & Real-Time Event-Driven Architecture',
    subtitle: 'Event streaming, topic partitions, consumer groups, schema registry, and event sourcing in Node/Go',
    description: 'Architect decoupled, real-time message streaming backends. Learn Kafka broker clustering, idempotency, dead letter queues (DLQs), and CQRS design patterns.',
    category: 'Data & Systems',
    level: 'Advanced',
    price: 699,
    originalPrice: 3899,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    badge: 'Enterprise',
    rating: 4.96,
    reviewsCount: 1950,
    studentsCount: 9700,
    durationHours: 25,
    lecturesCount: 20,
    partner: 'ScaleArch Labs',
    instructor: {
      name: 'Vikram Sundaram',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      title: 'Distinguished Systems Architect'
    }
  }
];
