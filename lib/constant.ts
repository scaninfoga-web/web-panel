interface Services {
  title: string;
  description: string;
  detailedDescription: string;
  leftRightComponents: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
  endingComponents: {
    title: string;
    serviceCard: {
      icon: string;
      iconStyle: string;
      title: string;
      description: string;
    }[];
  };
}

export const providedServices: Services[] = [
  {
    title: 'Application Security',
    description:
      'Your applications are the front door to your business and a prime target for attackers. At Scan Infoga, we provide comprehensive security testing for Web Apps, Mobile Apps, and Thick Client applications to identify and fix critical vulnerabilities before hackers exploit them. We follow industry standards like OWASP, SANS, and NIST, simulating real-world attacks to ensure your applications are secure, compliant, and resilient.',
    detailedDescription:
      'At Scan Infoga, we combine real-world attack simulation with deep technical expertise to deliver actionable and accurate applications security assessments. Our team of certified security professionals has secured over 100+ mobile applications for startups, enterprises, and fintech companies. We do not just find vulnerabilities we provide clear remediation guidance to fix them fast. With a strong focus on business logic testing, API security, and reverse engineering, we uncover what automated tools often miss. We ensure complete confidentiality through strict NDAs, and we offer free re-testing after fixes to guarantee your app’s security posture is rock solid. At Scaninfoga our goal is simple to make your mobile app unbreakable.',
    leftRightComponents: [
      {
        imageUrl: '/services-image/app-pentesting-1.svg',
        title: 'Web App Pentesting',
        description:
          'Testing is a proactive security service that simulates real-world attacks on your web applications to uncover vulnerabilities before malicious actors can exploit them. This critical assessment helps safeguard sensitive data, maintain customer trust, and ensure compliance with industry regulations.',
      },
      {
        imageUrl: '/services-image/mobile-pentesting-1.svg',
        title: 'Mobile App Pentesting',
        description:
          'Testing uncovers hidden vulnerabilities in Android, iOS, and hybrid apps by simulating real-world attacks. Our advanced testing approach includes static and dynamic analysis, reverse engineering, and backend API assessment to identify security flaws and logic issues—ensuring your app is secure against modern threat actors.',
      },
      {
        imageUrl: '/services-image//thick-client.svg',
        title: 'Thick Client',
        description:
          'Testing identifies vulnerabilities in desktop apps by analyzing traffic, data storage, and application logic. Using advanced techniques like reverse engineering and memory manipulation, we ensure your software is protected against real-world threats.',
      },
    ],
    endingComponents: {
      title: 'Comprehensive Application Penetration Testing Advantage',
      serviceCard: [
        {
          icon: 'IconRadar2',
          iconStyle: 'text-yellow-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
        {
          icon: 'IconRadar2',
          iconStyle: 'text-red-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
      ],
    },
  },
  {
    title: 'Web App Pentesting',
    description:
      'We identify and fix security flaws in your web apps, including injection attacks, authentication issues, and misconfigurations—before hackers exploit them.',
    detailedDescription:
      'Our web application penetration testing involves both manual and automated techniques to uncover security flaws that could compromise your platform. We assess the app’s front-end and back-end logic, APIs, and authentication flows for vulnerabilities such as SQL injection, XSS, CSRF, and broken access control. Each component is tested against OWASP Top 10 threats, ensuring your web application remains resilient. We also test business logic and privilege escalation paths. A thorough report is generated that includes risk rankings, technical impact, and clear remediation steps. Our goal is to strengthen your web app’s defenses before real-world attackers find the gaps.',
    leftRightComponents: [
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'OWASP Top 10 Coverage',
        description:
          'We test your web app against OWASP Top 10 vulnerabilities, including SQL Injection, Cross-Site Scripting (XSS), and Security Misconfigurations.',
      },
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Business Logic Testing',
        description:
          'Our team simulates real attack scenarios to identify privilege escalation, insecure workflows, and logical vulnerabilities unique to your app.',
      },
    ],
    endingComponents: {
      title: 'Comprehensive Application Penetration Testing Advantage',
      serviceCard: [
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
      ],
    },
  },
  {
    title: 'Network Pentesting',
    description:
      'We simulate real-world attacks on your network to uncover weaknesses like open ports, outdated systems, and poor firewall rules.',
    detailedDescription:
      'In our network penetration testing, we simulate an attacker’s perspective to identify exploitable vulnerabilities in your internal or external infrastructure. We perform active reconnaissance, vulnerability scanning, and exploitation attempts on routers, firewalls, servers, and other network devices. The test includes identifying misconfigured services, outdated firmware, weak credentials, and improper segmentation. We evaluate your network’s ability to detect, delay, and defend against intrusions. Each issue found is documented with severity ratings and step-by-step mitigation suggestions. By mimicking real-world attack patterns, we help you proactively secure your network and avoid costly breaches or compliance violations.',
    leftRightComponents: [
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Internal & External Scanning',
        description:
          'We assess your network perimeter and internal segments for outdated software, exposed services, and exploitable configurations.',
      },
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Firewall & IDS Evasion Testing',
        description:
          'We simulate stealth attacks to test how well your IDS/IPS and firewall configurations can detect and respond to malicious activities.',
      },
    ],
    endingComponents: {
      title: 'Comprehensive Application Penetration Testing Advantage',
      serviceCard: [
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
      ],
    },
  },
  {
    title: 'Cloud Pentesting',
    description:
      'We assess your cloud setup (AWS, Azure, GCP) for misconfigurations, weak access controls, and data exposure risks.',
    detailedDescription:
      'Our cloud penetration testing focuses on uncovering security issues unique to cloud environments like AWS, Azure, and Google Cloud Platform. We analyze IAM roles, storage buckets, APIs, network architecture, and third-party integrations for vulnerabilities. The test includes checks for excessive permissions, exposed assets, insecure keys, and poor logging practices. We also evaluate compliance with cloud-specific security benchmarks like CIS and NIST. Our team mimics attacker behavior within the cloud scope without breaching provider policies. A detailed report highlights findings, impact, and practical mitigation strategies to ensure your cloud posture is robust, scalable, and secure against internal and external threats.',
    leftRightComponents: [
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'IAM & Access Review',
        description:
          'We evaluate IAM roles, privilege boundaries, and misconfigured policies that could lead to privilege escalation or unauthorized access.',
      },
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Storage & API Exposure',
        description:
          'We check for open S3 buckets, public endpoints, and weak API keys that could expose sensitive data in your cloud environment.',
      },
    ],
    endingComponents: {
      title: 'Comprehensive Application Penetration Testing Advantage',
      serviceCard: [
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
      ],
    },
  },
  {
    title: 'Red-Team Assessment',
    description:
      'A stealthy, real-world attack simulation that tests your organization’s detection, response, and resilience across people, processes, and technology.',
    detailedDescription:
      'Red team assessments go beyond traditional pentests by emulating full-scale attacks to evaluate your organization’s holistic security posture. Our experts operate covertly using tactics, techniques, and procedures (TTPs) similar to real-world adversaries. We test your blue team’s ability to detect lateral movement, privilege escalation, and command and control activity. The goal is not just to exploit vulnerabilities but to assess response readiness across IT, security, and executive teams. This includes physical security breaches, social engineering, and endpoint evasion. A thorough debrief and report help stakeholders understand what worked, what didn’t, and how to improve detection, containment, and response processes.',
    leftRightComponents: [
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Adversary Simulation',
        description:
          'We use real-world attacker techniques to test your security operations team’s ability to detect, respond, and contain threats across endpoints and infrastructure.',
      },
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Social Engineering & Physical Intrusion',
        description:
          'We attempt to breach your environment using social engineering, phishing campaigns, and physical bypasses to test human-layer resilience.',
      },
    ],
    endingComponents: {
      title: 'Comprehensive Application Penetration Testing Advantage',
      serviceCard: [
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
      ],
    },
  },
  {
    title: 'Source Code Audit',
    description:
      'Get an in-depth understanding of your enterprises security foundations. We take a magnifying glass to your source code to find undetected bugs and...',
    detailedDescription:
      'Our source code audit service offers a meticulous review of your application’s codebase to find security flaws often missed during black-box testing. We manually inspect logic flows, authentication modules, session management, input handling, and third-party dependencies. The goal is to identify vulnerabilities like hardcoded secrets, unsafe deserialization, privilege escalation bugs, and more. Our approach follows industry standards like OWASP Code Review Guide and Secure Coding Practices. Each issue found is documented with severity, exploitability, and clear remediation guidance. The result is not only better code security but also improved development practices that reduce future risks across the SDLC.',
    leftRightComponents: [
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Manual Secure Code Review',
        description:
          'We manually inspect code to identify business logic flaws, insecure patterns, and vulnerable functions that automated tools might miss.',
      },
      {
        imageUrl:
          'https://securelayer7.net/new/assets/image/services-page/frame1-new.png',
        title: 'Third-Party & Dependency Analysis',
        description:
          'We assess your use of libraries, SDKs, and APIs to detect unpatched vulnerabilities or insecure integrations with external services.',
      },
    ],
    endingComponents: {
      title: 'Comprehensive Application Penetration Testing Advantage',
      serviceCard: [
        {
          icon: 'IconRadar2',
          iconStyle: 'text-green-500',
          title: 'Find Every Vulnerability',
          description:
            'pentesting process goes beyond checklists and scanners, ensuring every undetected vulnerability is found and exposed.',
        },
      ],
    },
  },
];
