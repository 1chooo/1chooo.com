import { ICON_NAMES } from "@/components/icons";

import { Config } from "@/types/config";

import { FaReact, FaAws } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiLatex, SiFastapi, SiKubernetes, SiPostman } from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";
import {
  TbBrandCpp,
  TbBrandTypescript,
  TbBrandGolang,
  TbBrandNextjs,
  TbBrandDjango,
  TbBrandDocker,
  TbBrandMysql,
  TbMarkdown,
  TbBrandAstro,
  TbBrandTerraform,
} from "react-icons/tb";

const config: Config = {
  avatar: "/images/profile.webp",
  title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
  description:
    "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
  author: "Chun-Ho (Hugo) Lin - 1chooo",
  keywords: [
    "Hugo ChunHo Lin",
    "1chooo",
    "Software Engineering",
    "Next.js",
    "React",
  ],
  status: "Dive Deep. 🤿",
  siteURL: "https://www.1chooo.com",
  openGraph: {
    url: "https://www.1chooo.com/",
    type: "website",
    siteName: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
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
    { path: "/post", label: "Post" },
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
      "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    authors: [{ name: "Chun-Ho (Hugo) Lin" }],
    creator: "Chun-Ho (Hugo) Lin",
    keywords: [
      "Chun-Ho (Hugo) Lin",
      "1chooo",
      "Software Engineering",
      "Next.js",
      "React",
    ],
    openGraph: {
      url: "https://www.1chooo.com/",
      type: "website",
      siteName: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      description:
        "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
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
        "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
      images: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/logo192.png",
          sizes: "192x192",
          type: "image/png",
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
        { name: "Python", icon: AiOutlinePython },
        { name: "TypeScript", icon: TbBrandTypescript },
        { name: "Golang", icon: TbBrandGolang },
        { name: "C++", icon: TbBrandCpp },
        { name: "Java", icon: RiJavaLine },
        { name: "JavaScript", icon: RiJavascriptLine },
        { name: "LaTeX", icon: SiLatex },
        { name: "Markdown", icon: TbMarkdown },
        { name: "Astro", icon: TbBrandAstro },
        { name: "Terraform", icon: TbBrandTerraform },
      ],
      frameworks: [
        { name: "React", icon: FaReact },
        { name: "FastAPI", icon: SiFastapi },
        { name: "Flask", icon: BiLogoFlask },
        { name: "Redis", icon: DiRedis },
        { name: "Linux Terminal", icon: VscTerminalLinux },
        { name: "AWS", icon: FaAws },
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Docker", icon: TbBrandDocker },
        { name: "MySQL", icon: TbBrandMysql },
        { name: "Django", icon: TbBrandDjango },
        { name: "Kubernetes", icon: SiKubernetes },
        { name: "Postman", icon: SiPostman },
        { name: "Azure", icon: VscAzure },
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
            { key: "school", value: "Viterbi School of Engineering", icon: ICON_NAMES.GRADUATION_CAP },
            { key: "location", value: "Los Angeles, CA 🇺🇸", icon: ICON_NAMES.MAP_PIN },
            { key: "period", value: "Aug. 2025 - Present", icon: ICON_NAMES.CALENDAR }
          ],
          details: [],
        },
        {
          institution: "National Central University",
          institutionImage: "/images/logos/ncu.png",
          title: "Bachelors of Science in Atmospheric Sciences",
          tags: [
            { key: "school", value: "College of Earth Sciences", icon: ICON_NAMES.GRADUATION_CAP },
            { key: "location", value: "Taoyuan, Taiwan 🇹🇼", icon: ICON_NAMES.MAP_PIN},
            { key: "period", value: "Sep. 2020 - Jun. 2024", icon: ICON_NAMES.CALENDAR }
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
            { key: "location", value: "New Taipei, Taiwan 🇹🇼", icon: ICON_NAMES.MAP_PIN },
            { key: "period", value: "Mar. 2024 - May. 2024", icon: ICON_NAMES.CALENDAR }
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
            { key: "location", value: "Taipei, Taiwan 🇹🇼", icon: ICON_NAMES.MAP_PIN },
            { key: "period", value: "Aug. 2023 - Feb. 2024", icon: ICON_NAMES.CALENDAR }
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
            { key: "location", value: "Taipei, Taiwan 🇹🇼", icon: ICON_NAMES.MAP_PIN },
            { key: "period", value: "Jul. 2023 - Aug. 2023", icon: ICON_NAMES.CALENDAR }
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
            { key: "location", value: "Taoyuan, Taiwan 🇹🇼", icon: ICON_NAMES.MAP_PIN },
            { key: "period", value: "Jul. 2022 - Jan. 2023", icon: ICON_NAMES.CALENDAR }
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
};

export default config;
