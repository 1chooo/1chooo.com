import IAbout from '../../interface/IAbout';

import writingImage from "../../assets/images/icons/writing.png";
import dumbBellImage from "../../assets/images/icons/dumbbell.png";
import developerImage from "../../assets/images/icons/developer.png";
import cameraImage from "../../assets/images/icons/camera.png";
import { ProgrammingLanguage } from '../../enum/ProgrammingLanguage';
import { DevOps } from '../../enum/DevOps';

export const abouts: IAbout = {
  "githubUsername": "1chooo",
  "header": "About Hugo 👨🏻‍💻",
  "subHeader": "$ ls -al Hugo 👨🏻‍💻",   // TODOs: Separate (He/Him) from subHeader
  "pronouns": "He/Him",
  "introductions": [
    "I'm **Hugo ChunHo Lin**, a graduate with a Bachelor's degree from [National Central University 🐿️](https://www.ncu.edu.tw/), driven by a *sincere passion* for **Software Engineering 💻.**",
    // "*I do **Web Development and Cloud Development** with a focus on **creating APIs and handling backend tasks** using `FastAPI, Gin, and AWS`. In general, I define new problems and find existing problems, transforming solutions into helpful documents or articles to assist everyone in the process, and eventually apply them to make social impacts.*",
    // "In my spare time, I do *street photography 📷* and *consistently share my findings on GitHub with Global 🌏*.",
    "**`Self-motivated, Team player, Love coding. 👨🏻‍💻`**"
  ],
  "lifestyle": [
    {
      icon: developerImage,
      title: "Open Source Contributor",
      text: "Actively contributing to open source projects on GitHub."
    },
    {
      icon: writingImage,
      title: "Content Creator",
      text: "Love to share my knowledge and experience with others."
    },
    {
      icon: dumbBellImage,
      title: "Workouts",
      text: "Basketball and weight training defines my active workout lifestyle."
    },
    {
      icon: cameraImage,
      title: "Photography",
      text: "Sky brings freedom; streets, a reminder of others' contributions."
    }
  ],
  "programmingLanguage": [
    { name: ProgrammingLanguage.PYTHON, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.PYTHON}` },
    { name: ProgrammingLanguage.GO, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.GO}` },
    { name: ProgrammingLanguage.JAVA, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.JAVA}` },
    { name: ProgrammingLanguage.CPP, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.CPP}` },
    { name: ProgrammingLanguage.C, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.C}` },
    { name: ProgrammingLanguage.REACT, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.REACT}` },
    { name: ProgrammingLanguage.TYPESCRIPT, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.TYPESCRIPT}` },
    { name: ProgrammingLanguage.JAVASCRIPT, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.JAVASCRIPT}` },
    { name: ProgrammingLanguage.FLUTTER, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.FLUTTER}` },
    { name: ProgrammingLanguage.BASH, iconUrl: `https://skillicons.dev/icons?i=${ProgrammingLanguage.BASH}` }
  ],
  "devOps": [
    { name: DevOps.LINUX, iconUrl: `https://skillicons.dev/icons?i=${DevOps.LINUX}` },
    { name: DevOps.AWS, iconUrl: `https://skillicons.dev/icons?i=${DevOps.AWS}` },
    { name: DevOps.AZURE, iconUrl: `https://skillicons.dev/icons?i=${DevOps.AZURE}` },
    { name: DevOps.GITHUBACTIONS, iconUrl: `https://skillicons.dev/icons?i=${DevOps.GITHUBACTIONS}` },
    { name: DevOps.DOCKER, iconUrl: `https://skillicons.dev/icons?i=${DevOps.DOCKER}` },
    { name: DevOps.FASTAPI, iconUrl: `https://skillicons.dev/icons?i=${DevOps.FASTAPI}` },
    { name: DevOps.KUBERNETES, iconUrl: `https://skillicons.dev/icons?i=${DevOps.KUBERNETES}` },
    { name: DevOps.FLASK, iconUrl: `https://skillicons.dev/icons?i=${DevOps.FLASK}` },
    { name: DevOps.GITLAB, iconUrl: `https://skillicons.dev/icons?i=${DevOps.GITLAB}` },
    { name: DevOps.REDIS, iconUrl: `https://skillicons.dev/icons?i=${DevOps.REDIS}` }
  ]
}
