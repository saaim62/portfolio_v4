// All content mirrors the master résumé (v20) — verified facts only.

export const profile = {
  name: 'Saim Asif',
  title: 'Senior Full Stack Engineer | Technical Team Lead | DevOps',
  tagline:
    'Software engineering since 2019 · React · Next.js · TypeScript · NestJS · React Native · Native Android (Kotlin) · AWS (EC2, S3) · GitHub Actions CI/CD',
  summary:
    'Led three engineers to build and operate Case Management Hub, a HIPAA-compliant healthcare SaaS used by 70+ paying organizations — owned its architecture, production releases and patient-record safeguards. Founded DropRoute; built mobile products in React Native and Kotlin.',
  location: 'Lahore, Pakistan',
  email: 'saaim62@gmail.com',
  github: 'https://github.com/saaim62',
  linkedin: 'https://www.linkedin.com/in/senior-software-engineer2/',
  resume: '/Saim-Asif-Resume.pdf',
};

export const stats = [
  { value: '70+', label: 'paying client organizations on Case Management Hub' },
  { value: '10,000+', label: 'authenticated sessions a day, secured end to end' },
  { value: '40,000+', label: 'active users on the Seated Android app' },
  { value: '124', label: 'passing tests across 21 Jest suites on DropRoute' },
  { value: '10,000+', label: 'warehouse scans a day across FORTNA client apps' },
  { value: '−35%', label: 'picking errors after the FORTNA WMS rebuild' },
];

export const droproute = {
  name: 'DropRoute',
  badge: 'My own SaaS · Live',
  role: 'Founder & Full Stack Engineer',
  dates: 'May 2026 – Present',
  intro:
    'WhatsApp broadcasts in, publish-ready posts out. A multi-tenant SaaS (Next.js, NestJS, PostgreSQL, Redis / BullMQ, Docker on AWS) that turns WhatsApp supplier broadcasts into publish-ready Instagram and Facebook posts via the Meta Graph API.',
  bullets: [
    'LLM extraction pulls product names, prices, and attributes from mixed Hinglish, Urdu, and English messages; sellers review in a bulk-action queue with margin-engine pricing, and posts publish in one click.',
    'Full product surface: review queue, margin and caption settings, media-masking canvas, public demo mode, and an admin console with owner / admin roles and audit log.',
    'Security-hardened to production standard — encrypted Meta tokens at rest, signed media URLs, session revocation, strict input validation — 124 tests across 21 suites, all passing, lint at zero errors in both apps.',
  ],
  metrics: [
    { value: '124', label: 'passing tests, all green' },
    { value: '21', label: 'Jest suites — pricing, publishing, security' },
    { value: 'Multilingual', label: 'extraction from supplier messages' },
    { value: 'IG + FB', label: 'publishing channels' },
  ],
  images: [
    { src: '/images/droproute/dashboard.webp', alt: 'DropRoute Command Center — review queue with supplier and selling prices' },
    { src: '/images/droproute/products.webp', alt: 'DropRoute Product Matrix — searchable product archive' },
    { src: '/images/droproute/product-detail.webp', alt: 'DropRoute product page — raw WhatsApp message, extracted product, Instagram caption' },
    { src: '/images/droproute/dashboard-mobile.webp', alt: 'DropRoute dashboard on mobile' },
  ],
  live: 'https://droproute.duckdns.org/',
  liveLabel: 'View the live product',
  repo: 'https://github.com/saaim62/whatsapp-social-bridge',
};

export const cmh = {
  name: 'Case Management Hub',
  badge: 'HIPAA-compliant · ePHI safeguards · BAA requirements',
  role: 'Technical Team Lead & Senior Full Stack Engineer — Airiodion Group',
  dates: 'Aug 2024 – Apr 2026 · US remote',
  intro:
    'A healthcare SaaS used by 70+ paying organizations for case notes, forms, referrals and reporting. I led three engineers and owned the platform architecture and production delivery.',
  bullets: [
    'Restricted access to case records by organization and staff role, with designed safeguards for electronic protected health information (ePHI).',
    'Secured 10,000+ authenticated sessions daily (role-based access control, JWT, OAuth 2.0) and protected 10,000+ monthly document uploads with presigned S3 URLs and encryption at rest.',
    'Designed the React / Next.js frontend, NestJS and FastAPI services and MySQL / MongoDB schemas; integrated Stripe billing and the Linode staging / production pipelines.',
    'Kept the production hosts uncompromised through the November 2025 npm supply-chain attack — custom watchdogs (process monitoring every 8 seconds, malware / cryptominer detection, automatic threat elimination), email threat alerts, daily off-site backups.',
  ],
  metrics: [
    { value: '70+', label: 'paying client organizations' },
    { value: '10,000+', label: 'authenticated sessions a day' },
    { value: '10,000+', label: 'document uploads a month, encrypted' },
  ],
  images: [
    { src: '/images/cmh/dashboard.webp', alt: 'Case Management Hub main dashboard — quick actions, notes, sent-form status' },
    { src: '/images/cmh/form-builder.webp', alt: 'Case Management Hub drag-and-drop form builder' },
    { src: '/images/cmh/calendar.webp', alt: 'Case Management Hub appointments calendar, week view' },
    { src: '/images/cmh/messaging.webp', alt: 'Case Management Hub secure messaging' },
  ],
  live: 'https://app.casemanagementhub.org/',
  liveLabel: 'View the live platform',
};

export const experience = [
  {
    company: 'DropRoute',
    role: 'Founder & Full Stack Engineer',
    dates: 'May 2026 – Present',
    place: 'Independent SaaS',
    points: [
      'Designed, built, and deployed a multi-tenant SaaS that turns WhatsApp supplier broadcasts into publish-ready Instagram and Facebook posts.',
      'Security-hardened to production standard; 124 tests across 21 suites, all passing.',
    ],
    link: { href: 'https://droproute.duckdns.org/', label: 'droproute.duckdns.org' },
  },
  {
    company: 'Airiodion Group',
    role: 'Technical Team Lead & Senior Full Stack Engineer',
    dates: 'Aug 2024 – Apr 2026',
    place: 'US remote',
    points: [
      'Led three engineers to launch Case Management Hub, a HIPAA-compliant healthcare SaaS used by 70+ paying organizations.',
      'Owned architecture, production releases, ePHI safeguards, Stripe billing, and the server-security setup that held through the November 2025 npm supply-chain attack.',
    ],
    link: { href: 'https://app.casemanagementhub.org/', label: 'app.casemanagementhub.org' },
  },
  {
    company: 'FORTNA',
    role: 'Senior Software Engineer · Warehouse Management Systems',
    dates: 'May 2023 – Aug 2024',
    place: 'US remote',
    points: [
      'Built native Android warehouse apps for Mr. Price, Carter\u2019s and Target on Zebra handhelds; for Target, also a React-based WMS website for browser barcode scanning.',
      'Supported 10,000+ inventory scans daily across 50+ operators — picking errors fell 35%, API latency cut 45%, crashes reduced 60%.',
    ],
  },
  {
    company: 'Seated',
    role: 'Android & Mobile Engineer',
    dates: 'Mar 2022 – Mar 2023',
    place: 'United States',
    points: [
      'Built Seated\u2019s native Android app from scratch, replacing its React Native app — a seat-booking and rewards app serving 40,000+ active users at 99% crash-free sessions, with downtime discounting and referral rewards.',
    ],
    link: { href: 'https://play.google.com/store/apps/details?id=com.vc.voco&hl=en', label: 'View the live app' },
  },
  {
    company: 'WAFIOS',
    role: 'Android Developer',
    dates: 'Dec 2019 – Feb 2022',
    place: 'Germany',
    points: [
      'Built and maintained Connectavo (my first native Android app, over 2 years) — WAFIOS\u2019s machinery monitoring, maintenance and automation product; helped secure clients including Baxter.',
      'Engineered high-concurrency, offline-first real-time sync at 99.9% uptime and sub-100ms sync latency; raised development and release velocity by 90%.',
    ],
    link: { href: 'https://play.google.com/store/search?q=connectavo&c=apps&hl=en', label: 'View on Google Play' },
  },
];

export const projects = [
  {
    name: 'Seated',
    kind: 'Android & Mobile Engineer · Mar 2022 – Mar 2023',
    blurb:
      'Restaurant seat-booking and rewards app. Rebuilt from React Native to native Android — 40,000+ active users, 99% crash-free sessions, downtime discounting in slow hours and referral rewards.',
    images: [
      { src: '/images/seated/seated-1.webp', alt: 'Seated — Explore. Eat. Earn.' },
      { src: '/images/seated/seated-2.webp', alt: 'Seated — find a spot, enjoy a meal, earn rewards' },
      { src: '/images/seated/seated-3.webp', alt: 'Seated — brand rewards' },
    ],
    link: { href: 'https://play.google.com/store/apps/details?id=com.vc.voco&hl=en', label: 'Google Play' },
    tags: ['Kotlin', 'Native Android', '40,000+ users'],
  },
  {
    name: 'Connectavo',
    kind: 'WAFIOS · Android Developer · Dec 2019 – Feb 2022',
    blurb:
      'Industrial machinery monitoring, maintenance and work orders for WAFIOS. Real-time, offline-first sync at 99.9% uptime and sub-100ms latency — my first native Android app, run for over 2 years.',
    images: [
      { src: '/images/connectavo/connectavo-1.webp', alt: 'Connectavo — work orders' },
      { src: '/images/connectavo/connectavo-2.webp', alt: 'Connectavo — work order detail' },
      { src: '/images/connectavo/connectavo-3.webp', alt: 'Connectavo — completing an order with signature' },
    ],
    link: { href: 'https://play.google.com/store/search?q=connectavo&c=apps&hl=en', label: 'Google Play' },
    tags: ['Kotlin', 'Offline-first', 'Industrial IoT'],
  },
  {
    name: 'Harvest Yard',
    kind: 'Freelance · React Native · 2024',
    blurb:
      'Food distribution and donation platform — food-center discovery, reservations with QR-code pickup, donation campaigns with goal tracking, coupons, role-based accounts and admin tools.',
    images: [
      { src: '/images/harvest-yard/harvest-yard-1.webp', alt: 'Harvest Yard — splash' },
      { src: '/images/harvest-yard/harvest-yard-2.webp', alt: 'Harvest Yard — app screens' },
      { src: '/images/harvest-yard/harvest-yard-3.webp', alt: 'Harvest Yard — app screens' },
    ],
    link: { href: 'https://play.google.com/store/apps/details?id=com.harvestyard&hl=en', label: 'Google Play' },
    tags: ['React Native', 'Google Places API', 'QR pickup'],
  },
  {
    name: 'FORTNA WMS Apps',
    kind: 'Senior Software Engineer · May 2023 – Aug 2024',
    blurb:
      'Native Android warehouse apps for Mr. Price, Carter\u2019s and Target on Zebra handhelds — 10,000+ scans a day across 50+ operators, picking errors down 35%, crashes down 60%. Internal enterprise software, not public.',
    tags: ['Kotlin / Java', 'MVVM · Koin', 'Zebra handhelds', 'Firebase'],
  },
  {
    name: 'Degen App',
    kind: 'Freelance · Native Android · 2024 – 2025',
    blurb:
      'Cryptocurrency trading platform delivered end-to-end in a 3-month engagement — Jetpack Compose trading interface with live-price charts, MoonPay and TransFi fiat-to-crypto, biometric wallet access with encrypted local storage, Firebase trade alerts with deep links.',
    tags: ['Kotlin', 'Jetpack Compose', 'MoonPay · TransFi'],
  },
  {
    name: 'Hemlock',
    kind: 'Freelance · React Native · 2024',
    blurb:
      'Instagram-style social networking app in React Native. Published on the Apple App Store and Google Play.',
    tags: ['React Native', 'Social', 'App Store + Play'],
  },
  {
    name: 'FairTerms',
    kind: 'Freelance · Mar – Apr 2026',
    blurb:
      'Consumer Contract Guardian — a browser extension with a FastAPI backend that scans Terms of Service for risky clauses and flags them with traffic-light risk signals and evidence quotes.',
    link: { href: 'https://github.com/saaim62/fairterms', label: 'GitHub' },
    tags: ['FastAPI', 'React', 'TypeScript'],
  },
];

export const skillGroups = [
  {
    title: 'Frontend & Mobile',
    items: 'React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Redux, React Native, Android (Native), Jetpack Compose, responsive mobile-first design, modular UI component systems',
  },
  {
    title: 'Backend & APIs',
    items: 'Node.js, NestJS, FastAPI, RESTful APIs, GraphQL, Microservices, Async Processing, OpenAPI / Swagger, background jobs and queues (BullMQ / Redis)',
  },
  {
    title: 'AI & LLMs',
    items: 'Agentic Workflows, LLM Integration (OpenAI, Anthropic), Tool Calling, Prompt Engineering, Vector Databases',
  },
  {
    title: 'Databases & Caching',
    items: 'PostgreSQL, MongoDB, MySQL, Redis, DynamoDB, Firebase (Firestore, Auth, FCM)',
  },
  {
    title: 'Cloud, DevOps & Security',
    items: 'AWS (EC2, S3, RDS, IAM), Docker, CI/CD (GitHub Actions), Nginx, Linode, Kubernetes, Terraform, Linux hardening, UFW, Fail2Ban, SSL/TLS, SSH, HIPAA Compliance, OAuth 2.0 / JWT, RBAC',
  },
  {
    title: 'Architecture & Delivery',
    items: 'Offline-First Architecture, MVVM, Automated Mobile Testing, Crash Monitoring, Git, Agile / Scrum, Koin (DI), Zebra handheld device integration',
  },
];

export const devops = [
  'Provisioned and hardened production Linux servers (AWS EC2, Linode): UFW deny-by-default firewall, SSH key-only on a custom port, root login disabled, Fail2Ban, localhost-only databases, Nginx reverse proxying, SSL/TLS certificate lifecycles.',
  'Dockerized deployments and GitHub Actions CI/CD pipelines with zero-downtime releases, cutting deployment friction by 80%; Terraform and Kubernetes infrastructure.',
  'Self-hosts DropRoute\u2019s full production stack on one AWS server: Docker Compose (NestJS API, Next.js web, PostgreSQL, Redis) behind Caddy with automatic HTTPS.',
];

export const education = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'Superior University, Lahore, Pakistan',
  detail: 'Batch 2016 – 2020 · English (professional) · Urdu (native)',
};

export const seoNote = {
  role: 'Freelance SEO Specialist · Jul 2009 – Jun 2012',
  text: 'Ranked target keywords to Google\u2019s first page, top 3, and the #1 position through on-site and off-site SEO, link building and social media marketing.',
};
