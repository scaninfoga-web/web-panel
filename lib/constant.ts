interface Services {
  title: string;
  description: string;
  detailedDescription: string;
}

export const providedServices: Services[] = [
  {
    title: 'Mobile_App Pentesting',
    description:
      'We test your Android/iOS apps for vulnerabilities like insecure storage, weak encryption, and exposed APIs to keep user data safe and secure.',
    detailedDescription:
      'Our mobile application penetration testing process targets common and advanced vulnerabilities in iOS and Android apps. We analyze app binaries, inspect local storage, assess communication channels, and evaluate authentication mechanisms. Our team checks for insecure data storage, improper session handling, and unsafe API interactions. We simulate attacks such as man-in-the-middle, code tampering, and reverse engineering. With deep insights into platform-specific security flaws, we help you secure sensitive user data and maintain compliance with industry standards like OWASP Mobile Top 10. Our final report includes actionable remediation guidance tailored to your development stack and business use case.',
  },
  {
    title: 'Web_App Pentesting',
    description:
      'We identify and fix security flaws in your web apps, including injection attacks, authentication issues, and misconfigurations—before hackers exploit them.',
    detailedDescription:
      'Our web application penetration testing involves both manual and automated techniques to uncover security flaws that could compromise your platform. We assess the app’s front-end and back-end logic, APIs, and authentication flows for vulnerabilities such as SQL injection, XSS, CSRF, and broken access control. Each component is tested against OWASP Top 10 threats, ensuring your web application remains resilient. We also test business logic and privilege escalation paths. A thorough report is generated that includes risk rankings, technical impact, and clear remediation steps. Our goal is to strengthen your web app’s defenses before real-world attackers find the gaps.',
  },
  {
    title: 'Network Pentesting',
    description:
      'We simulate real-world attacks on your network to uncover weaknesses like open ports, outdated systems, and poor firewall rules.',
    detailedDescription:
      'In our network penetration testing, we simulate an attacker’s perspective to identify exploitable vulnerabilities in your internal or external infrastructure. We perform active reconnaissance, vulnerability scanning, and exploitation attempts on routers, firewalls, servers, and other network devices. The test includes identifying misconfigured services, outdated firmware, weak credentials, and improper segmentation. We evaluate your network’s ability to detect, delay, and defend against intrusions. Each issue found is documented with severity ratings and step-by-step mitigation suggestions. By mimicking real-world attack patterns, we help you proactively secure your network and avoid costly breaches or compliance violations.',
  },
  {
    title: 'Cloud Pentesting',
    description:
      'We assess your cloud setup (AWS, Azure, GCP) for misconfigurations, weak access controls, and data exposure risks.',
    detailedDescription:
      'Our cloud penetration testing focuses on uncovering security issues unique to cloud environments like AWS, Azure, and Google Cloud Platform. We analyze IAM roles, storage buckets, APIs, network architecture, and third-party integrations for vulnerabilities. The test includes checks for excessive permissions, exposed assets, insecure keys, and poor logging practices. We also evaluate compliance with cloud-specific security benchmarks like CIS and NIST. Our team mimics attacker behavior within the cloud scope without breaching provider policies. A detailed report highlights findings, impact, and practical mitigation strategies to ensure your cloud posture is robust, scalable, and secure against internal and external threats.',
  },
  {
    title: 'Red-Team Assessment',
    description:
      'A stealthy, real-world attack simulation that tests your organization’s detection, response, and resilience across people, processes, and technology.',
    detailedDescription:
      'Red team assessments go beyond traditional pentests by emulating full-scale attacks to evaluate your organization’s holistic security posture. Our experts operate covertly using tactics, techniques, and procedures (TTPs) similar to real-world adversaries. We test your blue team’s ability to detect lateral movement, privilege escalation, and command and control activity. The goal is not just to exploit vulnerabilities but to assess response readiness across IT, security, and executive teams. This includes physical security breaches, social engineering, and endpoint evasion. A thorough debrief and report help stakeholders understand what worked, what didn’t, and how to improve detection, containment, and response processes.',
  },
  {
    title: 'Source_Code Audit',
    description:
      'Get an in-depth understanding of your enterprises security foundations. We take a magnifying glass to your source code to find undetected bugs and...',
    detailedDescription:
      'Our source code audit service offers a meticulous review of your application’s codebase to find security flaws often missed during black-box testing. We manually inspect logic flows, authentication modules, session management, input handling, and third-party dependencies. The goal is to identify vulnerabilities like hardcoded secrets, unsafe deserialization, privilege escalation bugs, and more. Our approach follows industry standards like OWASP Code Review Guide and Secure Coding Practices. Each issue found is documented with severity, exploitability, and clear remediation guidance. The result is not only better code security but also improved development practices that reduce future risks across the SDLC.',
  },
];
