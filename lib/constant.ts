interface Services {
  title: string;
  description: string;
  detailedDescription: string;
  leftRightComponents: {
    direction: 'right' | 'left';
    imageUrl: string;
    title: string;
    description: string;
  }[];
  endDescription: string;
}

export const providedServices: Services[] = [
  {
    title: 'Mobile_App Pentesting',
    description:
      'We test your Android/iOS apps for vulnerabilities like insecure storage, weak encryption, and exposed APIs to keep user data safe and secure.',
    detailedDescription:
      'Our mobile application penetration testing process targets common and advanced vulnerabilities in iOS and Android apps. We analyze app binaries, inspect local storage, assess communication channels, and evaluate authentication mechanisms. Our team checks for insecure data storage, improper session handling, and unsafe API interactions. We simulate attacks such as man-in-the-middle, code tampering, and reverse engineering. With deep insights into platform-specific security flaws, we help you secure sensitive user data and maintain compliance with industry standards like OWASP Mobile Top 10. Our final report includes actionable remediation guidance tailored to your development stack and business use case.',
    leftRightComponents: [
      {
        direction: 'left',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Binary & Storage Analysis',
        description:
          'We decompile mobile binaries to detect sensitive data exposure, analyze storage techniques, and identify risks like hardcoded credentials or unencrypted databases.',
      },
      {
        direction: 'right',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Secure API & Communication Testing',
        description:
          'We test how your app communicates with servers, ensuring encryption, certificate pinning, and proper token handling are enforced to block MITM attacks.',
      },
    ],
    endDescription:
      "Empower Your Application's Security. Experience measurable outcomes that elevate your application's security posture with our proven process.",
  },
  {
    title: 'Web_App Pentesting',
    description:
      'We identify and fix security flaws in your web apps, including injection attacks, authentication issues, and misconfigurations—before hackers exploit them.',
    detailedDescription:
      'Our web application penetration testing involves both manual and automated techniques to uncover security flaws that could compromise your platform. We assess the app’s front-end and back-end logic, APIs, and authentication flows for vulnerabilities such as SQL injection, XSS, CSRF, and broken access control. Each component is tested against OWASP Top 10 threats, ensuring your web application remains resilient. We also test business logic and privilege escalation paths. A thorough report is generated that includes risk rankings, technical impact, and clear remediation steps. Our goal is to strengthen your web app’s defenses before real-world attackers find the gaps.',
    leftRightComponents: [
      {
        direction: 'left',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'OWASP Top 10 Coverage',
        description:
          'We test your web app against OWASP Top 10 vulnerabilities, including SQL Injection, Cross-Site Scripting (XSS), and Security Misconfigurations.',
      },
      {
        direction: 'right',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Business Logic Testing',
        description:
          'Our team simulates real attack scenarios to identify privilege escalation, insecure workflows, and logical vulnerabilities unique to your app.',
      },
    ],
    endDescription:
      "Empower Your Application's Security. Experience measurable outcomes that elevate your application's security posture with our proven process.",
  },
  {
    title: 'Network Pentesting',
    description:
      'We simulate real-world attacks on your network to uncover weaknesses like open ports, outdated systems, and poor firewall rules.',
    detailedDescription:
      'In our network penetration testing, we simulate an attacker’s perspective to identify exploitable vulnerabilities in your internal or external infrastructure. We perform active reconnaissance, vulnerability scanning, and exploitation attempts on routers, firewalls, servers, and other network devices. The test includes identifying misconfigured services, outdated firmware, weak credentials, and improper segmentation. We evaluate your network’s ability to detect, delay, and defend against intrusions. Each issue found is documented with severity ratings and step-by-step mitigation suggestions. By mimicking real-world attack patterns, we help you proactively secure your network and avoid costly breaches or compliance violations.',
    leftRightComponents: [
      {
        direction: 'left',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Internal & External Scanning',
        description:
          'We assess your network perimeter and internal segments for outdated software, exposed services, and exploitable configurations.',
      },
      {
        direction: 'right',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Firewall & IDS Evasion Testing',
        description:
          'We simulate stealth attacks to test how well your IDS/IPS and firewall configurations can detect and respond to malicious activities.',
      },
    ],
    endDescription:
      "Empower Your Application's Security. Experience measurable outcomes that elevate your application's security posture with our proven process.",
  },
  {
    title: 'Cloud Pentesting',
    description:
      'We assess your cloud setup (AWS, Azure, GCP) for misconfigurations, weak access controls, and data exposure risks.',
    detailedDescription:
      'Our cloud penetration testing focuses on uncovering security issues unique to cloud environments like AWS, Azure, and Google Cloud Platform. We analyze IAM roles, storage buckets, APIs, network architecture, and third-party integrations for vulnerabilities. The test includes checks for excessive permissions, exposed assets, insecure keys, and poor logging practices. We also evaluate compliance with cloud-specific security benchmarks like CIS and NIST. Our team mimics attacker behavior within the cloud scope without breaching provider policies. A detailed report highlights findings, impact, and practical mitigation strategies to ensure your cloud posture is robust, scalable, and secure against internal and external threats.',
    leftRightComponents: [
      {
        direction: 'left',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'IAM & Access Review',
        description:
          'We evaluate IAM roles, privilege boundaries, and misconfigured policies that could lead to privilege escalation or unauthorized access.',
      },
      {
        direction: 'right',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Storage & API Exposure',
        description:
          'We check for open S3 buckets, public endpoints, and weak API keys that could expose sensitive data in your cloud environment.',
      },
    ],
    endDescription:
      "Empower Your Application's Security. Experience measurable outcomes that elevate your application's security posture with our proven process.",
  },
  {
    title: 'Red-Team Assessment',
    description:
      'A stealthy, real-world attack simulation that tests your organization’s detection, response, and resilience across people, processes, and technology.',
    detailedDescription:
      'Red team assessments go beyond traditional pentests by emulating full-scale attacks to evaluate your organization’s holistic security posture. Our experts operate covertly using tactics, techniques, and procedures (TTPs) similar to real-world adversaries. We test your blue team’s ability to detect lateral movement, privilege escalation, and command and control activity. The goal is not just to exploit vulnerabilities but to assess response readiness across IT, security, and executive teams. This includes physical security breaches, social engineering, and endpoint evasion. A thorough debrief and report help stakeholders understand what worked, what didn’t, and how to improve detection, containment, and response processes.',
    leftRightComponents: [
      {
        direction: 'left',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Adversary Simulation',
        description:
          'We use real-world attacker techniques to test your security operations team’s ability to detect, respond, and contain threats across endpoints and infrastructure.',
      },
      {
        direction: 'right',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Social Engineering & Physical Intrusion',
        description:
          'We attempt to breach your environment using social engineering, phishing campaigns, and physical bypasses to test human-layer resilience.',
      },
    ],
    endDescription:
      "Empower Your Application's Security. Experience measurable outcomes that elevate your application's security posture with our proven process.",
  },
  {
    title: 'Source_Code Audit',
    description:
      'Get an in-depth understanding of your enterprises security foundations. We take a magnifying glass to your source code to find undetected bugs and...',
    detailedDescription:
      'Our source code audit service offers a meticulous review of your application’s codebase to find security flaws often missed during black-box testing. We manually inspect logic flows, authentication modules, session management, input handling, and third-party dependencies. The goal is to identify vulnerabilities like hardcoded secrets, unsafe deserialization, privilege escalation bugs, and more. Our approach follows industry standards like OWASP Code Review Guide and Secure Coding Practices. Each issue found is documented with severity, exploitability, and clear remediation guidance. The result is not only better code security but also improved development practices that reduce future risks across the SDLC.',
    leftRightComponents: [
      {
        direction: 'left',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Manual Secure Code Review',
        description:
          'We manually inspect code to identify business logic flaws, insecure patterns, and vulnerable functions that automated tools might miss.',
      },
      {
        direction: 'right',
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Third-Party & Dependency Analysis',
        description:
          'We assess your use of libraries, SDKs, and APIs to detect unpatched vulnerabilities or insecure integrations with external services.',
      },
    ],
    endDescription:
      "Empower Your Application's Security. Experience measurable outcomes that elevate your application's security posture with our proven process.",
  },
];
