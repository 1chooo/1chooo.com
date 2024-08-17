import { MdOutlineDevices } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";

export const educations = {
  icon: IoSchoolOutline,
  title: "Education",
  items: [
    {
      company: "National Central University",
      location: "Taoyuan, Taiwan",
      role: "Bachelors of Science in Atmospheric Science",
      duration: "Sep. 2020 — Jun. 2024",
      tasksMarkdown: `
- 💻 **Minor Specialty:** Computer Science & Information Engineering
- 💻 **Relevant Courses (Graduate):** The Attack and Defense of Computers, Software Engineering, Object-Oriented Analysis and Design.
- 💻 **Relevant Courses (Undergraduate):** Linux And Edge Computing, Principles of Programming Languages, Operating System, Computer Organization, Computer Network, Algorithmics, Data Structures, Assembly Language and System Programming, Digital Design, Weather and Artificial Intelligence, Numerical Analysis.
    `,
    },
  ],
};



export const professionalExperiences = {
  icon: MdOutlineDevices,
  title: "Professional Experience",
  items: [
    {
      company: "eCloudvalley Digital Technology",
      location: "New Taipei, Taiwan",
      role: "Cloud Engineer Intern",
      duration: "Mar. 2024 - May. 2024",
      tasksMarkdown: `
- ☁️ Utilized a serverless architecture on **AWS Lambda**, performing **troubleshooting with CloudWatch**, deployed via **AWS CDK**, and integrated with **DynamoDB and Bedrock** services.
- ☁️ **Led a team of 5** to enhance the existing ticket system with Claude, boosting **cloud support engineer efficiency by 80%**. Integrated **multi-language** support and **image recognition**, achieving **95%** accuracy.
- ☁️ Identified issues in **10+** mock-cases, like **VPC entry failures, EC2 Apache Server restarts, and S3 photo access problems**. Documented solutions in a [Tech Note](https://github.com/1chooo/ecv-training-materials/tree/main/msp/aws_challenge) for sharing with interns.
      `,
    },
    {
      company: "Amazon Web Services",
      location: "Taipei, Taiwan",
      role: "Campus Ambassador",
      duration: "Aug. 2023 - Jan. 2024",
      tasksMarkdown: `
- ☁️ Educated **700+** cloud developers and achieved **96%** of user satisfaction by publishing and lecturing **2+ technical workshops, 1 UAD** on AWS cloud computing services **(Lex, Amazon S3, Lambda, API Gateway).**
- ☁️ **Developed** an **open-source** project called [AWS 101 LINE Bot](https://github.com/1chooo/aws-line-business-card-workshop) designed for integration with **AWS 101**.
      `,
    },
    {
      company: "PEGATRON Corporation",
      location: "Taipei, Taiwan",
      role: "Software Engineer Intern",
      duration: "Jul. 2023 - Aug. 2023",
      tasksMarkdown: `
- **Smart Robot, Smart World 🦾:** Prompt-based Learning for manipulating with the Visual-World Robot
- 🦾 Implementing **Prompt Engineering and \`LangChain\`** allows the [NVIDIA Ominerve visual robot](https://www.nvidia.com/en-us/omniverse/) to function through **speech or text**, leading to an **83%** improvement in scenario test support across **6 to 11** scenarios.
- 🦾 During the **Proof of Concept (POC)** phase, transform the trained model into a **Web Application** with a user interface using **\`Gradio\`**, the UI toolkit for the **\`FastAPI\`** framework.
      `,
    },
  ],
};
