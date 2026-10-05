export const profile = {
  first: "Nikhil",
  last: "Joshi",
  role: "Cybersecurity · TPRM · GRC",
  location: "Atlanta, GA",
  email: "nikhiljoshi0724@gmail.com",
  phone: "469-733-5496",
  linkedin: "https://linkedin.com/in/nikhil-joshi1710",
  authorization: "H-1B",
  summary:
    "Cybersecurity, Third-Party Risk Management and GRC professional with 3+ years of experience in vendor risk assessments, compliance reviews, IAM governance, security remediation and risk management — turning technical findings into risk-based decisions leadership can act on.",
};

export const stats = [
  { value: "80+", label: "Third-party apps assessed" },
  { value: "6", label: "North American entities" },
  { value: "50+", label: "Vulnerabilities remediated" },
  { value: "1,000+", label: "SQL databases administered" },
];

export const marqueeWords = [
  "ISO 27001",
  "NIST CSF",
  "SOC 2 TYPE II",
  "SIG LITE / FULL",
  "GDPR",
  "CCPA",
  "IAM",
  "OWASP TOP 10",
  "ARCHER GRC",
];

export const experience = [
  {
    company: "Mercedes-Benz",
    context: "Mercedes-Benz Cybersecurity Client Engagement — Atlanta, GA",
    title: "Third-Party Risk Management (TPRM) Associate, GRC",
    period: "Jul 2023 – Present",
    points: [
      "Lead risk-based cybersecurity and privacy assessments across 80+ third-party applications supporting HR, Legal and business functions across six North American entities.",
      "Evaluate vendor security controls against ISO/IEC 27001, NIST CSF, SOC 2 Type II, SIG Lite/Full, GDPR and CCPA through audit reports, questionnaires and technical evidence.",
      "Facilitate application onboarding security reviews, threat-modeling questionnaires, Security Profile reviews and remediation tracking to support go-live readiness.",
      "Manage the end-to-end risk lifecycle in Archer GRC: identification, findings documentation, remediation planning, evidence validation, risk acceptance and closure.",
      "Govern IAM controls across HR and Legal portfolios — SSO and MFA rollouts, user and privileged-access reviews, and production access validation.",
      "Led application rationalization across six entities, reducing the HR portfolio from 80 to 55 applications and reporting KPIs and portfolio risk to the CISO.",
    ],
  },
  {
    company: "Intel Corporation",
    context: "Austin, TX",
    title: "Network Software Validation Graduate Intern",
    period: "Sep 2022 – Jan 2023",
    points: [
      "Automated network-throughput testing and output analysis in Python, cutting manual testing effort by 90%.",
      "Validated SmartNIC and Infrastructure Processing Unit optimizations for data-center networking and documented performance gains.",
    ],
  },
  {
    company: "TikTok",
    context: "Mountain View, CA",
    title: "Vulnerability Management Intern",
    period: "May 2022 – Aug 2022",
    points: [
      "Managed the lifecycle of 50+ vulnerabilities from triage through remediation and validation using Qualys.",
      "Reproduced HackerOne and bug bounty submissions with Burp Suite, documenting 10+ web application vulnerabilities.",
      "Applied CVSS-based risk classification and built a central vulnerability-management repository for 80 global security professionals.",
    ],
  },
  {
    company: "Tata Consultancy Services",
    context: "Bengaluru, India",
    title: "Systems Engineer / Microsoft SQL Server DBA",
    period: "Jul 2018 – Jul 2021",
    points: [
      "Administered 1,000+ SQL Server databases across 300+ servers in a 24/7 production environment covering HA, DR and SLA compliance.",
      "Strengthened database security through RBAC, least-privilege enforcement and recurring access reviews.",
    ],
  },
];

export const skillGroups = [
  {
    title: "GRC & Third-Party Risk",
    items: [
      "Archer GRC",
      "ServiceNow",
      "LeanIX",
      "Vendor Risk Assessments",
      "Third-Party Due Diligence",
      "Risk Registers",
      "Risk Acceptance",
      "ISO/IEC 27001",
      "NIST CSF",
      "SOC 2 Type II",
      "SIG Lite/Full",
      "GDPR",
      "CCPA",
    ],
  },
  {
    title: "Identity & Access Management",
    items: ["SSO", "MFA", "SAML/OIDC", "RBAC", "PAM", "User Access Reviews", "Least Privilege"],
  },
  {
    title: "Security & AppSec",
    items: [
      "Vulnerability Assessment",
      "Qualys",
      "Checkmarx",
      "Burp Suite",
      "HackerOne",
      "CVSS",
      "OWASP Top 10",
      "XSS / SQLi / CSRF",
      "Encryption",
    ],
  },
  {
    title: "Network Security",
    items: ["TCP/IP", "TLS/SSL", "DNS", "Firewalls", "VPN", "IDS/IPS", "Nmap", "Wireshark"],
  },
  {
    title: "Programming & Data",
    items: ["Python", "SQL", "SQL Server (SSMS)", "Database Access Controls"],
  },
  {
    title: "Reporting",
    items: ["Executive Reporting", "KPI Tracking", "Risk Communication", "Excel", "Microsoft 365"],
  },
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
    detail: "M.S. Computer Science — Cybersecurity Track",
    year: "May 2023",
  },
  {
    school: "Dr. Ambedkar Institute of Technology",
    place: "Bengaluru, India",
    detail: "B.E. Computer Science",
    year: "May 2018",
  },
];

export const certifications = [
  "NSA Graduate Certificate in Cyber Defense",
  "CodePath Cybersecurity Certification",
];

export const development = [
  "Hands-on web application security training via PortSwigger Web Security Academy.",
  "Penetration testing, network forensics, cryptography and reverse engineering on TryHackMe, Hack The Box and OverTheWire.",
  "Capture the Flag competitions focused on web exploitation.",
];
