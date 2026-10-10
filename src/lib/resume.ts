export const profile = {
  first: "Nikhil",
  last: "Joshi",
  role: "Cybersecurity · TPRM · AppSec · IAM",
  location: "Atlanta, GA",
  email: "nikhiljoshi0724@gmail.com",
  phone: "469-733-5496",
  linkedin: "https://linkedin.com/in/nikhil-joshi1710",
  summary:
    "Cybersecurity analyst with seven years of technology experience, including 3+ years in enterprise cybersecurity across third-party risk management, application security, vulnerability management, IAM governance and AI-enabled application risk reviews — tracking findings through remediation, risk acceptance, validation and closure in Archer GRC.",
};

export const stats = [
  { value: "50+", label: "Third-party apps assessed" },
  { value: "6", label: "North American entities" },
  { value: "50+", label: "Vulnerabilities managed" },
  { value: "1,000+", label: "SQL databases administered" },
];

export const marqueeWords = [
  "THIRD-PARTY RISK",
  "APPSEC",
  "AI SECURITY",
  "IAM",
  "ISO 27001",
  "NIST CSF / RMF",
  "SOC 2",
  "HITRUST CSF",
  "CHECKMARX SAST",
  "ARCHER GRC",
];

export const experience = [
  {
    company: "Mercedes-Benz USA",
    context: "Atlanta, GA",
    title: "Cybersecurity Analyst | TPRM, Application Security & IAM",
    period: "Jul 2023 – Present",
    points: [
      "Conduct cybersecurity and privacy risk assessments for 50+ third-party applications supporting HR, Legal and business functions across six North American entities, evaluating questionnaires, audit reports and technical evidence against enterprise and industry control requirements.",
      "Facilitate secure application onboarding by coordinating security and threat-modeling questionnaires, reviewing application security profiles and vulnerability reports, and tracking remediation through production go-live.",
      "Perform security and governance assessments for internally developed AI chatbots, generative AI agents and other AI-enabled solutions against cybersecurity and responsible AI requirements.",
      "Govern Checkmarx SAST compliance by maintaining dashboards, monitoring adherence to the 60-day scan requirement, tracking remediation and coordinating closure with development and security teams.",
      "Support IAM governance for SSO and MFA enablement, quarterly user and privileged-access reviews, least-privilege validation and provisioning/deprovisioning controls.",
      "Track cybersecurity findings in Archer GRC from identification and evidence review through remediation, risk acceptance, validation and closure.",
      "Coordinate cybersecurity and data-protection activities for application and infrastructure decommissioning with Security, Privacy, Architecture, IT and application owners.",
    ],
  },
  {
    company: "Intel Corporation",
    context: "Austin, TX",
    title: "Network Software Validation Graduate Intern",
    period: "Sep 2022 – Jan 2023",
    points: [
      "Automated network-throughput testing and output analysis using Python, reducing manual testing effort by 90% and improving benchmark consistency.",
      "Validated SmartNIC and Infrastructure Processing Unit optimizations in data-center environments, analyzed benchmark results and documented performance findings.",
    ],
  },
  {
    company: "TikTok",
    context: "Mountain View, CA",
    title: "Vulnerability Management Intern",
    period: "May 2022 – Aug 2022",
    points: [
      "Managed 50+ vulnerabilities in Qualys from identification and triage through CVSS-based prioritization, remediation tracking, validation and closure.",
      "Reproduced and documented 10+ reported web-application vulnerabilities from HackerOne and third-party bug-bounty submissions using Burp Suite Intruder and Repeater.",
      "Created a centralized vulnerability-management repository containing procedures, responsibilities and program guidance for 80 global security professionals.",
    ],
  },
  {
    company: "Tata Consultancy Services",
    context: "Bengaluru, India",
    title: "Systems Engineer | Microsoft SQL Server DBA",
    period: "Jul 2018 – Jul 2021",
    points: [
      "Administered 1,000+ SQL Server databases across 300+ servers in a 24/7 production environment, supporting monitoring, incident resolution, high availability, disaster recovery and SLA compliance.",
      "Strengthened database security through RBAC, least-privilege enforcement and recurring access reviews.",
    ],
  },
];

export const skillGroups = [
  { title: "Cyber Risk, GRC & TPRM", items: ["Third-Party Risk Assessments", "Vendor Due Diligence", "Security Control Reviews", "Technical Evidence Review", "Risk Acceptance", "Remediation Tracking"] },
  { title: "AppSec & Vulnerability Mgmt", items: ["Secure App Onboarding", "AppSec Governance", "SAST Governance", "Secure SDLC", "Vulnerability Triage", "CVSS Prioritization", "Remediation Validation", "OWASP Top 10"] },
  { title: "Identity & Access Management", items: ["SSO", "MFA", "SAML", "OIDC", "RBAC", "Least Privilege", "User Access Reviews", "Privileged Access Reviews", "Provisioning / Deprovisioning"] },
  { title: "AI Security & Governance", items: ["AI-Enabled App Reviews", "Generative AI", "AI Chatbot Security", "Responsible AI Reviews", "Secure AI Onboarding"] },
  { title: "Data Protection & Lifecycle", items: ["Data Protection Reviews", "Data Deletion & Retention", "App & Infra Decommissioning"] },
  { title: "Frameworks", items: ["ISO 27001", "NIST CSF / RMF", "SOC 2", "SIG", "HITRUST CSF"] },
  { title: "Platforms & Tools", items: ["Archer GRC", "ServiceNow", "Checkmarx", "Qualys", "Burp Suite", "HackerOne", "Python", "SQL", "SQL Server", "Security Dashboards", "KPI Reporting", "Excel"] },
];

export const projects = [
  {
    index: "01",
    title: "Secure File Upload System",
    blurb:
      "A hardened upload workflow built on strict file validation, AES encryption and cryptographic hashing to protect confidentiality and integrity end to end.",
    tags: ["AES", "Hashing", "Validation"],
  },
  {
    index: "02",
    title: "Privacy Within Federated Learning",
    blurb:
      "Directed a six-member research team examining privacy and integrity threats in federated learning, producing mitigation guidance from observed attack patterns.",
    tags: ["Research", "Privacy", "Team Lead"],
  },
  {
    index: "03",
    title: "Web Application Security Lab",
    blurb:
      "Tested intentionally vulnerable applications for OWASP Top 10 weaknesses with Burp Suite and documented exploitation paths, impact and remediation.",
    tags: ["OWASP", "Burp Suite", "Reporting"],
  },
];

export const education = [
  {
    school: "The University of Texas at Dallas",
    place: "Richardson, TX",
    detail: "Master of Science in Computer Science, Cybersecurity Track",
    year: "May 2023",
  },
  {
    school: "Dr. Ambedkar Institute of Technology",
    place: "Bengaluru, India",
    detail: "Bachelor of Engineering in Computer Science",
    year: "May 2018",
  },
];

export const certifications = [
  "NSA Graduate Certificate in Cyber Defense",
  "CodePath Cybersecurity Certification",
  "PortSwigger Web Security Academy Training",
];

export const development = [
  "Hands-on web application security training via PortSwigger Web Security Academy.",
];
