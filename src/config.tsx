module.exports = {
    avatar: 'avatar.png',
    pathPrefix: '',
    tocMaxDepth: 2,
    excerptMaxLength: 500,
    postsForArchivePage: 3,
    siteUrl: 'https://vcard.1chooo.com/',
    title: 'Hugo ChunHo Lin',
    description: 'Hugo ChunHo Lin\'s website.',
    author: 'Hugo ChunHo Lin',
    authorAlternative: 'Day 1 ⚡️',
    professions: [
        '"𝘿𝙧𝙚𝙖𝙢𝙨 𝙘𝙤𝙢𝙚 𝙩𝙧𝙪𝙚, 𝙬𝙝𝙚𝙣 🫵🏻 𝙙𝙤𝙣’𝙩 𝙨𝙡𝙚𝙚𝙥…"'
    ],
    introduction: [
        'I am Hugo ChunHo Lin, a 4th-year student at [*National Central University (NCU)*](https://www.ncu.edu.tw/), driven by a ***genuine passion*** for the field of **Software Engineering 💻**.',
        'I am currently preparing my application for a Master\'s Degree, while simultaneously serving as a **2023 Amazon Web Services (AWS) Educate Cloud Ambassador** and an **Ex Software Engineering (SWE) Intern at PEGATROON**.',
        'As part of my preparations, I am focusing on enhancing my programming skills in languages such as `GO`, `Flutter`, and `JavaScript`. Additionally, I am actively studying **Data structures** and **Algorithms** to further strengthen my technical expertise.',
        '🔔 **I\'m looking for 2024 Summer research internships!**',
    ],
    education: [
        {
            date: 'Present - ',
            icon: 'university',
            title: 'To be continued...',
            location: 'Utopia',
        }, {
            date: 'Sep. 2020 - Present',
            icon: 'university',
            title: 'Bachelor\'s degree, Atmospheric Sciences and Meteorology & minor in Computer Science',
            location: 'Zhongli District, Taoyuan City, Taiwan',
        },
        // }, {
        //   date: 'Sep. 2021 - Apr. 2023',
        //   icon: 'university',
        //   title: 'B.Sc. in Computer Science (Summa Cum Laude) & minor in Mathematics',
        //   location: 'College of Engineering & Literature, Science, and the Arts, University of Michigan',
        // }, {
        //   date: 'Sep. 2019 - Aug. 2023',
        //   icon: 'university',
        //   title: 'B.Eng. in Electrical and Computer Engineering & minor in Computer Science',
        //   location: 'UM-SJTU Joint Institute, Shanghai Jiao Tong University',
        // }
    ],
    social: [
        {
            url: '/cv.pdf',
            icon: ['ai', 'cv'],
        },
        // {
        //   url: 'https://scholar.google.com/citations?user=lPlQpqoAAAAJ&hl=en',
        //   icon: ['fa', 'graduation-cap'],
        // }, 
        {
            url: 'https://github.com/1chooo',
            icon: ['fab', 'github'],
        }, {
            url: 'https://www.linkedin.com/in/1chooo/',
            icon: ['fab', 'linkedin'],
        }, {
            url: 'https://X.com/1chooo___',
            icon: ['fab', 'twitter'],
        },
    ],
    birthday: 'Jan. 27, 2002 📲',
    location: 'Taipei, Taiwan 🇹🇼',
    email: 'hugo970217@gmail.com',
    pages: {
        home: '/',
        posts: 'posts',
        contact: 'contact',
        resume: 'resume',
        tags: 'tags',
        research: 'research',
        projects: 'projects',
    },
    interests: [
        // {
        //   icon: 'chart-network',
        //   title: 'Graph Neural Network',
        // }, 
        {
            icon: 'laptop-code',
            title: 'Open Source Contributor',
        },
        {
            icon: 'brain',
            title: 'LLM',
        },
        // {
        //   icon: `laptop-code`,
        //   title: `Computational Complexity`,
        // }, 
        // {
        //   icon: `hands-usd`,
        //   title: `Game Theory`,
        // }, 
        // {
        //   icon: 'chart-line',
        //   title: 'High Dimensional Statistics',
        // }, 
        // {
        //   icon: 'shapes',
        //   title: 'Geometry \& Topology',
        // }, 
        // {
        //   icon: 'function',
        //   title: 'Analysis',
        // }
    ],
    experience: [
        {
            title: 'Professional Experience',
            position: 'right',
            data: [
                {
                    date: 'Oct. 2020 - Jun. 2021',
                    title: 'Backend Developer',
                    description: '**' +
                        'foodall' +
                        '**: ' +
                        'A food order platform in Taiwan, built with *Golang* and *Gin*, *MongoDB*, with RESTful API design.',
                    location: 'Virtual, Shanghai',
                },
            ],
        },
        {
            title: 'Teaching',
            position: 'right',
            data: [
                {
                    date: 'Jan. 2023 - May 2023',
                    title: 'Instructional Aide',
                    description: '**' +
                        '[EECS475 (Introduction to Cryptography)](https://mahdi.ch/eecs475/)' +
                        '**: ' +
                        'An upper-level 100+ student course on the B.Sc. CS track. [Notes](../posts/Notes#introduction-to-cryptography-eecs475-university-of-michigan-ta) are available.',
                    location: 'University of Michigan',
                },
                {
                    date: 'Sep. 2022 - Dec. 2022',
                    title: 'Instructional Aide',
                    description: '**' +
                        '[EECS572 (Randomness and Computation)](https://mahdi.ch/eecs572/)' +
                        '**: ' +
                        'A graduate-level 70+ student course on the M.S. theory CS track. [Notes](../posts/Notes#randomness-and-computation-eecs572-university-of-michigan-ta) are available.',
                    location: 'University of Michigan',
                }, {
                    date: 'May 2021 - Aug. 2021',
                    title: 'Teaching Assistant',
                    description: '**' +
                        '[VV285 (Honor Mathematics III)](https://umji.sjtu.edu.cn/~horst/teaching/vv285.html)' +
                        '**: ' +
                        'A 200+ student rigorous analysis course on the B.Eng. ECE track. We also holds the first [*JIntegration Bee* competition](https://github.com/sleepymalc/JIntegrationBee)!',
                    location: 'Shanghai Jiao Tong University',
                }, {
                    date: 'Sep. 2020 - Dec. 2020',
                    title: 'Teaching Assistant',
                    description: '**' +
                        '[VV186 (Honor Mathematics II)](https://umji.sjtu.edu.cn/~horst/teaching/vv186.html)' +
                        '**: ' +
                        'A 200+ student rigorous analysis course on the B.Eng. ECE track.',
                    location: 'Shanghai Jiao Tong University',
                },
            ],
        },
        {
            title: 'Selected Projects',
            position: 'left',
            data: [
                {
                    date: 'Mar. 2022 - Dec. 2022',
                    title: 'SIMPLE AI',
                    description: '**' +
                        '[Finding Minimal Balanced Separators with Detection Sets](../research/minimal-balanced-separator)' +
                        '**: ' +
                        'Design the first almost linear time algorithm on finding minimal balanced separators advised by [Thatchaphol Saranurak](https://sites.google.com/site/thsaranurak/)',
                    location: 'University of Michigan',
                },
                {
                    date: 'May 2022 - Apr. 2023',
                    title: 'Undergraduate Researcher',
                    description: '**' +
                        'Deep Learning Foundation' +
                        '**: ' +
                        'Develop various techniques to understand deep neural networks advised by [Wei Hu](https://weihu.me/) under the [SURE Program](https://sure.engin.umich.edu/).',
                    location: 'University of Michigan',
                },
            ],
        },
    ],
    awards: [
        {
            date: 'Oct. 2021',
            title: 'Hong Kong, Macao and Taiwan Overseas Chinese Student Scholarship',
        },
        {
            date: 'Nov. 2020',
            title: 'Undergraduate Excellent Scholarship',
        },
        {
            date: 'Jun. 2020',
            title: 'Bao Gang Excellent Scholarship',
        },
        {
            date: 'Dec. 2019',
            title: 'Hong Kong, Macao and Taiwan Overseas Chinese Student Scholarship',
        },
    ],
    tagColors: [
        'magenta', 'red', 'volcano', 'orange', 'gold',
        'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
    ],
    tags: [
        {
            id: 'javascript',
            name: 'javascript',
            description: 'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
            color: '#f0da50',
        },
        {
            id: 'nodejs',
            name: 'Node.js',
            description: 'Node.js is a tool for executing JavaScript in a variety of environments.',
            color: '#90c53f',
        },
        {
            id: 'rxjs',
            name: 'RxJS',
            description: 'RxJS is a library for reactive programming using Observables, for asynchronous operations.',
            color: '#eb428e',
        },
        {
            id: 'typescript',
            name: 'typescript',
            description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
            color: '#257acc',
        },
        {
            id: 'reactjs',
            name: 'reactjs',
            description: 'React is an open source JavaScript library used for designing user interfaces.',
            color: '#61dbfa',
        },
        {
            id: 'gatsby',
            name: 'Gatsby.js',
            description: 'A framework built over ReactJS to generate static page web application.  ',
            color: '#6f309f',
        },
        {
            id: 'html',
            name: 'HTML',
            description: 'A markup language that powers the web. All websites use HTML for structuring the content.',
            color: '#dd3431',
        },
        {
            id: 'css',
            name: 'css',
            description: 'CSS is used to style the HTML element and to give a very fancy look for the web application.',
            color: '#43ace0',
        },
        {
            id: 'python',
            name: 'python',
            description: 'A general purpose programming language that is widely used for developing various applications.',
            color: '#f9c646',
        },

    ],
    defaultLanguage: 'en',
    contactFormUrl: process.env.CONTACT_FORM_ENDPOINT
        || 'https://getform.io/',
    googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',
    disqusScript: process.env.DISQUS_SCRIPT
        || 'https://tc-imba.disqus.com/embed.js',
    wakatime: {
        username: '1chooo',
        activity: 'de962691-c66a-4501-860f-eb122ac6ea13',
        language: 'cccb943f-2bfc-47e5-b218-c56b858c1a90',
    },
};

export {}