export const projectTags = [
  "All",
  "Applications",
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
    title: 'React vCard Portfolio',
    category: 'Web development',
    imageUrl: "/images/projects/react_vcard_portfolio.png",
    link: 'https://github.com/1chooo/react-vcard',
  },
  {
    title: 'AWS Educate 101',
    category: 'Line Bot',
    imageUrl: "/images/projects/aws_edu_101.png",
    link: 'https://github.com/1chooo/aws-line-business-card-workshop',
  },
  {
    title: 'Thermal Calculator',
    category: 'Applications',
    imageUrl: "/images/projects/thermal_calculator.png",
    link: 'https://github.com/1chooo/thermal-calculator',
  },
  {
    title: 'Gym Route',
    category: 'Applications',
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
    title: 'Simple AI',
    category: 'Web development',
    imageUrl: "/images/projects/portfolio_test.png",
    link: 'https://github.com/1chooo/simple-ai',
  },
  {
    title: 'Game Scope',
    category: 'Data Science',
    imageUrl: "/images/projects/game_scope.png",
    link: 'https://github.com/1chooo/game-scope',
  },
];