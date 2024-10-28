export const projectTags = [
  "All",
  "App development",
  "Web development",
  "Line Bot",
  "Data Science",
];

export interface Project {
  title     : string;
  category  : string;
  imageUrl  : string;
  link      : string;
}

export const projectsData: Project[] = [
  {
    title: 'TODAM-tw',
    category: 'Web development',
    imageUrl: "/images/projects/todam-tw.png",
    link: 'https://github.com/TODAM-tw/todam-ticket-system',
  },
  {
    title: '1chooo.com',
    category: 'Web development',
    imageUrl: "/images/projects/1chooo-com.png",
    link: 'https://github.com/1chooo/1chooo.com',
  },
  {
    title: 'UML Editor',
    category: 'App development',
    imageUrl: "/images/projects/uml-editor.png",
    link: 'https://github.com/1chooo/uml-editor',
  },
  {
    title: 'AWS Educate 101',
    category: 'Line Bot',
    imageUrl: "/images/projects/aws-edu-101.png",
    link: 'https://github.com/1chooo/aws-line-business-card-workshop',
  },
  {
    title: 'Thermal Calculator',
    category: 'App development',
    imageUrl: "/images/projects/thermal-calculator.png",
    link: 'https://github.com/1chooo/thermal-calculator',
  },
  {
    title: 'Gym Route',
    category: 'App development',
    imageUrl: "/images/projects/gym-route.png",
    link: 'https://github.com/1chooo/gym-route',
  },
  {
    title: 'Evolving Beasts',
    category: 'Line Bot',
    imageUrl: "/images/projects/evolving-beasts.png",
    link: 'https://github.com/1chooo/evolving-beasts',
  },
  {
    title: 'Refinaid',
    category: 'Web development',
    imageUrl: "/images/projects/refinaid.png",
    link: 'https://github.com/1chooo/refinaid',
  },
  {
    title: 'Game Scope',
    category: 'Data Science',
    imageUrl: "/images/projects/game-scope.png",
    link: 'https://github.com/1chooo/game-scope',
  },
];