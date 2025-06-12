import { ICON_NAMES } from "@/components/icons";

import { Config } from "@/types/config";

const config: Config = {
  avatar: "/images/profile.webp",
  title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
  description:
    "I'm Chun-Ho (Hugo) Lin, an incoming student at University of Southern California (USC) ✌️. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🐿️.",
  author: "Chun-Ho (Hugo) Lin - 1chooo",
  keywords: [
    "Chun-Ho (Hugo) Lin",
    "1chooo",
    "Software Engineering",
    "University of Southern California",
    "National Central University",
  ],
  status: "Dive Deep. 🤿",
  siteURL: "https://www.1chooo.com",
  openGraph: {
    url: "https://www.1chooo.com/",
    type: "website",
    siteName: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, an incoming student at University of Southern California (USC) ✌️. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🐿️.",
    images: [
      {
        url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
        width: 1200,
        height: 630,
        alt: "Chun-Ho (Hugo) Lin - 1chooo Cover Image",
      },
    ],
  },
  navigationLinks: [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
  ],
  contacts: [
    {
      icon: ICON_NAMES.MAP_PIN_LU,
      title: "Location",
      content: "Los Angeles, CA 🇺🇸",
    },
    {
      icon: ICON_NAMES.MAIL_LU,
      title: "Email",
      link: "mailto:hugo970217@gmail.com",
      content: "hugo970217@gmail.com",
    },
    {
      icon: ICON_NAMES.GITHUB_LU,
      title: "GitHub",
      link: "https://github.com/1chooo",
      content: "@1chooo",
    },
    {
      icon: ICON_NAMES.LINKEDIN_LU,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/1chooo/",
      content: "in/1chooo",
    },
  ],
  socialLinks: [
    {
      url: "https://github.com/1chooo",
      icon: ICON_NAMES.GITHUB_LU,
    },
    {
      url: "https://www.linkedin.com/in/1chooo/",
      icon: ICON_NAMES.LINKEDIN_LU,
    },
    {
      url: "https://medium.com/@1chooo",
      icon: ICON_NAMES.MEDIUM_PI,
    },
    {
      url: "https://twitter.com/1chooo___",
      icon: ICON_NAMES.TWITTER_FA,
    },
    {
      url: `/rss.xml`,
      icon: ICON_NAMES.RSS_LU,
    },
    {
      url: `/cv`,
      icon: ICON_NAMES.ATTACHMENT_MD,
    },
  ],
  homeMetaData: {
    metadataBase: new URL("https://www.1chooo.com"),
    title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, an incoming student at University of Southern California (USC) ✌️. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🐿️.",
    authors: [{ name: "Chun-Ho (Hugo) Lin" }],
    creator: "Chun-Ho (Hugo) Lin",
    keywords: [
      "Chun-Ho (Hugo) Lin",
      "1chooo",
      "Software Engineering",
      "University of Southern California",
      "National Central University",
    ],
    openGraph: {
      url: "https://www.1chooo.com/",
      type: "website",
      siteName: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      description:
        "I'm Chun-Ho (Hugo) Lin, an incoming student at University of Southern California (USC) ✌️. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🐿️.",
      images: [
        {
          url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
          width: 1200,
          height: 630,
          alt: "Chun-Ho (Hugo) Lin - 1chooo Cover Image",
        },
      ],
    },
    manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      description:
        "I'm Chun-Ho (Hugo) Lin, an incoming student at University of Southern California (USC) ✌️. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🐿️.",
      images: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/favicon.ico",
          sizes: "192x192",
          type: "image/x-icon",
        },
      ],
    },
  },
  about: {
    firstName: "Chun-Ho",
    lastName: "Lin",
    middleName: "",
    preferredName: "Hugo",
    additionalName: "Hugo",
    pronouns: "He/Him",
    githubUsername: "1chooo",
    introduction: `
I'm an incoming student at [University of Southern California](https://usc.edu) ✌️. Previously, I obtained my Bachelor's degree from [National Central University](https://www.ncu.edu.tw/) 🐿️.
    `,
    lifestyles: [
      {
        icon: ICON_NAMES.GITHUB_LU,
        title: "Open Source",
        text: "Actively contributing to open source projects on GitHub.",
      },
      {
        icon: ICON_NAMES.PENCIL_LU,
        title: "Storytelling",
        text: "Love to share my knowledge and experience with others.",
      },
      {
        icon: ICON_NAMES.GOAL,
        title: "Workouts",
        text: "Basketball and weight training defines my active workout lifestyle.",
      },
      {
        icon: ICON_NAMES.PHOTO,
        title: "Photography",
        text: "Sky brings freedom; streets, a reminder of others' contributions.",
      },
    ],
    techStacks: {
      programmingLanguages: [
        { name: "Python", icon: ICON_NAMES.PYTHON },
        { name: "TypeScript", icon: ICON_NAMES.TYPESCRIPT },
        { name: "Golang", icon: ICON_NAMES.GOLANG },
        { name: "C++", icon: ICON_NAMES.CPP },
        { name: "Java", icon: ICON_NAMES.JAVA },
        { name: "JavaScript", icon: ICON_NAMES.JAVASCRIPT },
        { name: "LaTeX", icon: ICON_NAMES.LATEX },
        { name: "Markdown", icon: ICON_NAMES.MARKDOWN },
        { name: "Astro", icon: ICON_NAMES.ASTRO },
        { name: "Terraform", icon: ICON_NAMES.TERRAFORM },
      ],
      frameworks: [
        { name: "React", icon: ICON_NAMES.REACT },
        { name: "FastAPI", icon: ICON_NAMES.FASTAPI },
        { name: "Flask", icon: ICON_NAMES.FLASK },
        { name: "Redis", icon: ICON_NAMES.REDIS },
        { name: "Linux Terminal", icon: ICON_NAMES.TERMINAL_LINUX },
        { name: "AWS", icon: ICON_NAMES.AWS },
        { name: "Next.js", icon: ICON_NAMES.NEXTJS },
        { name: "Docker", icon: ICON_NAMES.DOCKER },
        { name: "MySQL", icon: ICON_NAMES.MYSQL },
        { name: "Django", icon: ICON_NAMES.DJANGO },
        { name: "Kubernetes", icon: ICON_NAMES.KUBERNETES },
        { name: "Postman", icon: ICON_NAMES.POSTMAN },
        { name: "Azure", icon: ICON_NAMES.AZURE },
      ],
    },
  },
  resumes: {
    educations: {
      icon: ICON_NAMES.GRADUATION_CAP,
      title: "Education",
      iconName: ICON_NAMES.GRADUATION_CAP,
      resumeCards: [
        {
          institution: "University of Southern California",
          institutionImage: "/images/logos/usc.jpg",
          title: "Master of Science in Computer Science",
          tags: [
            {
              key: "school",
              value: "Viterbi School of Engineering",
              icon: ICON_NAMES.GRADUATION_CAP,
            },
            {
              key: "location",
              value: "Los Angeles, CA 🇺🇸",
              icon: ICON_NAMES.MAP_PIN,
            },
            {
              key: "period",
              value: "Aug. 2025 - Present",
              icon: ICON_NAMES.CALENDAR,
            },
          ],
          details: [],
        },
        {
          institution: "National Central University",
          institutionImage: "/images/logos/ncu.png",
          title: "Bachelors of Science in Atmospheric Sciences",
          tags: [
            {
              key: "school",
              value: "College of Earth Sciences",
              icon: ICON_NAMES.GRADUATION_CAP,
            },
            {
              key: "location",
              value: "Taoyuan, Taiwan 🇹🇼",
              icon: ICON_NAMES.MAP_PIN,
            },
            {
              key: "period",
              value: "Sep. 2020 - Jun. 2024",
              icon: ICON_NAMES.CALENDAR,
            },
          ],
          details: [],
        },
      ],
    },
    experiences: {
      icon: ICON_NAMES.BRIEFCASE,
      iconName: ICON_NAMES.BRIEFCASE,
      title: "Professional Experiences",
      resumeCards: [
        {
          institution: "eCloudvalley Digital Technology",
          institutionImage: "/images/logos/ecv.png",
          title: "Cloud Engineer",
          tags: [
            { key: "type", value: "Intern", icon: ICON_NAMES.BRIEFCASE },
            {
              key: "location",
              value: "New Taipei, Taiwan 🇹🇼",
              icon: ICON_NAMES.MAP_PIN,
            },
            {
              key: "period",
              value: "Mar. 2024 - May. 2024",
              icon: ICON_NAMES.CALENDAR,
            },
          ],
          details: [
            "Led a team of 5 to enhance issue pools with AWS Bedrock, boosting cloud support efficiency by 80% through multi-language support and 95% accurate image recognition. Honored as the top-achieving internship team.",
            "Utilized a serverless architecture on AWS Lambda, performing troubleshooting with CloudWatch, deployed via AWS CDK, and integrated with DynamoDB and Bedrock services.",
            "Documented issues in 10+ mock cases, such as VPC entry failures, EC2 Apache server restarts, and S3 photo access problems, and provided detailed solutions for interns. Refer [here](https://github.com/1chooo/ecv-training-materials/tree/main/msp/aws_challenge) for a comprehensive list.",
          ],
        },
        {
          institution: "Amazon Web Services",
          institutionImage: "/images/logos/aws.svg",
          title: "Campus Ambassador",
          tags: [
            { key: "type", value: "Contract", icon: ICON_NAMES.BRIEFCASE },
            {
              key: "location",
              value: "Taipei, Taiwan 🇹🇼",
              icon: ICON_NAMES.MAP_PIN,
            },
            {
              key: "period",
              value: "Aug. 2023 - Feb. 2024",
              icon: ICON_NAMES.CALENDAR,
            },
          ],
          details: [
            "Educated 700+ cloud developers and achieved 96% user satisfaction by conducting 2 technical workshops, developing an open-source project, and 1 UAD with AWS cloud services. Refer [here](https://github.com/aws-educate-tw/aws-line-business-card-workshop) for the source code.",
            "Conducted a comprehensive 35+ page market research study on cloud suppliers as part of an 11-member team.",
          ],
        },
        {
          institution: "PEGATRON",
          institutionImage: "/images/logos/pegatron.png",
          title: "AI Engineer",
          tags: [
            { key: "type", value: "Intern", icon: ICON_NAMES.BRIEFCASE },
            {
              key: "location",
              value: "Taipei, Taiwan 🇹🇼",
              icon: ICON_NAMES.MAP_PIN,
            },
            {
              key: "period",
              value: "Jul. 2023 - Aug. 2023",
              icon: ICON_NAMES.CALENDAR,
            },
          ],
          details: [
            "Executed a POC, adapting an LLM model for Smart Manufacturing, and was awarded Silver internship team.",
            "Collaborated with a team of 5, utilized Git, a CI/CD pipeline, and followed an agile Scrum workflow.",
            "Implemented Prompt Engineering and LangChain for the NVIDIA Ominerve visual robot, enabling seamless speech/text operation, boosting test support by 83% across 6-11 scenarios with 85% stability.",
          ],
        },
        {
          institution: "National Central University",
          institutionImage: "/images/logos/ncu.png",
          title: "Website Developer",
          tags: [
            { key: "type", value: "Part-time", icon: ICON_NAMES.BRIEFCASE },
            {
              key: "location",
              value: "Taoyuan, Taiwan 🇹🇼",
              icon: ICON_NAMES.MAP_PIN,
            },
            {
              key: "period",
              value: "Jul. 2022 - Jan. 2023",
              icon: ICON_NAMES.CALENDAR,
            },
          ],
          details: [
            "Partnered with a team of 2 to develop a multi-user score management system for the Center for Teacher Education, reducing credit exemption processing time by 80% and remotely maintaining the server via SSH.",
          ],
        },
      ],
    },
  },
  jsonLdPerson: {
    "@context": "http://schema.org",
    "@type": "Person",
    "@id": "https://www.1chooo.com/#person",
    givenName: "Chun-Ho",
    familyName: "Lin",
    additionalName: "Hugo",
    gender: "male",
    birthPlace: "New Taipei, TW",
    nationality: "Taiwan",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Southern California",
        sameAs: "https://usc.edu",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "National Central University",
        sameAs: "https://www.ncu.edu.tw/",
      },
    ],
    jobTitle: "Software Engineer",
    skills: "Software Engineering, Web Development, Open Source",
    image: "https://www.1chooo.com/images/profile.webp",
    url: "https://www.1chooo.com",
    sameAs: [
      "https://www.linkedin.com/in/1chooo/",
      "http://github.com/1chooo",
      "https://medium.com/@1chooo",
    ],
  },
  giscusConfig: {
    id: "comments",
    repo: "1chooo/1chooo.com",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
    category: "General",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CONFIG_CATEGORY_ID || "",
    mapping: "pathname",
    term: "Welcome to @giscus/react component!",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "bottom",
    theme: "dark_tritanopia",
    lang: "en",
    loading: "lazy",
  },
  googleAnalyticId: process.env.NEXT_PUBLIC_GA_ID || "",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || "",
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
};

export default config;
