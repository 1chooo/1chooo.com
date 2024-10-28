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
    imageUrl: "https://github.com/TODAM-tw/todam-ticket-system/raw/main/docs/imgs/cover.png",
    link: 'https://github.com/TODAM-tw/todam-ticket-system',
  },
  {
    title: 'React vCard Portfolio',
    category: 'Web development',
    imageUrl: "/images/projects/react_vcard_portfolio.png",
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
    imageUrl: "/images/projects/aws_edu_101.png",
    link: 'https://github.com/1chooo/aws-line-business-card-workshop',
  },
  {
    title: 'Thermal Calculator',
    category: 'App development',
    imageUrl: "/images/projects/thermal_calculator.png",
    link: 'https://github.com/1chooo/thermal-calculator',
  },
  {
    title: 'Gym Route',
    category: 'App development',
    imageUrl: "/images/projects/gym_route.png",
    link: 'https://github.com/1chooo/gym-route',
  },
  {
    title: 'Evolving Beasts',
    category: 'Line Bot',
    imageUrl: "/images/projects/evolving_beasts.png",
    link: 'https://github.com/1chooo/evolving-beasts',
  },
  {
    title: 'Refinaid',
    category: 'Web development',
    imageUrl: "/images/projects/portfolio_test.png",
    link: 'https://github.com/1chooo/refinaid',
  },
  {
    title: 'Game Scope',
    category: 'Data Science',
    imageUrl: "/images/projects/game_scope.png",
    link: 'https://github.com/1chooo/game-scope',
  },
];