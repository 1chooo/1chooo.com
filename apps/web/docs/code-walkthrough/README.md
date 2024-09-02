# Code Walkthrough

[1chooo.com](https://1chooo.com) is a web application that allows users to showcase their projects and portfolios. This document provides a high-level overview of the codebase and the architecture of the application.

## The Complete Project Folder Structure

```
.
├── .github/
├── docs/
│   ├── code-walkthrough/
│   │   └── README.md
│   ├── imgs/
│   │   └── jwt_auth_middleware.go
│   ├── user-guides/
│   │   ├── login_route.go
│   │   ├── profile_route.go
│   │   ├── refresh_token_route.go
│   │   ├── route.go
│   │   ├── signup_route.go
│   │   └── task_route.go
│   ├── CONTRIBUTING.md
│   └── README.md
├── public/
├── src/
├── .eslintrc.json
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── next.env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Code Counter with Complexity Calculations by [`scc`](https://github.com/boyter/scc) 

Last updated: August, 28, 2024 in [`a2614ed`](https://github.com/1chooo/1chooo.com/commit/a2614ed29c7608fffa651f98b02e7eff82704377)

```py
───────────────────────────────────────────────────────────────────────────────
Language                 Files     Lines   Blanks  Comments     Code Complexity
───────────────────────────────────────────────────────────────────────────────
TypeScript                  62      2516      281        31     2204        159
CSS                         11      2434      458       241     1735          0
Markdown                     5       471      145         0      326          0
JSON                         4       120        0         0      120          0
JavaScript                   3        42        4         3       35          0
License                      1        21        4         0       17          0
TypeScript Typings           1         5        1         4        0          0
YAML                         1        14        1         4        9          0
───────────────────────────────────────────────────────────────────────────────
Total                       88      5623      894       283     4446        159
───────────────────────────────────────────────────────────────────────────────
Estimated Cost to Develop (organic) $129,408
Estimated Schedule Effort (organic) 6.32 months
Estimated People Required (organic) 1.82
───────────────────────────────────────────────────────────────────────────────
Processed 144774 bytes, 0.145 megabytes (SI)
───────────────────────────────────────────────────────────────────────────────
```
