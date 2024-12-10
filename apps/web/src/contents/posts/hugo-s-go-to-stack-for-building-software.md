---
title: "Hugo's Go-To Stack for Building Software"
publishedAt: '2024-12-10'
category: Coding
tags: 
  - React
  - Web Development
summary: "Here's a quick summary of my go-to tech stack for software development. My experience comes from being highly active on GitHub, with over 5,000 contributions in 2024. Additionally, I'll share insights on writing maintainable, clean, and scalable code."
banner: /images/banner/posts/hugo-s-go-to-stack-for-building-software.webp
alt: "Hugo's Go-To Stack for Building Software"
mathjax: false
---

Hey there 👋 This is Hugo. Here's a quick summary of my go-to tech stack for software development. My experience comes from being highly active on GitHub, with over 5,000 contributions in 2024 (check it out [here](https://github.com/1chooo?tab=overview&from=2024-12-01&to=2024-12-10)). Additionally, I'll share insights on writing maintainable, clean, and scalable code.


![Hugo's Go-To Stack for Building Software](/images/banner/posts/hugo-s-go-to-stack-for-building-software.webp)

## React

### Function Components

We only use `FC` type when we need to pass and extract children from props [^1]. Otherwise, we use the function declaration. Refer [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/) for a more extensive section explaining why `React.FC` should mostly be avoided.

```tsx {5}
// Avoid
interface Props {
  text?: string;
}
const Heading: React.FC<Props> = ({ text = 'Hello, world!' }) => {
  return <h1>{text}</h1>;
};
```

```tsx {5}
// Prefer
interface Props {
  text?: string;
}
function Heading({text = 'Hello, world!'}: Props) {
  return <h1>{text}</h1>;
}
```


## Coding Patterns

### `let` vs `const`



https://overreacted.io/on-let-vs-const/ 

Copy/paste is better than the wrong abstraction [^2].


[^1]: [Why "he" does not write React.FC on each function?](https://stackoverflow.com/questions/71189879/why-he-does-not-write-react-fc-on-each-function)
[^2]: [Lee Robinson - Stack](https://leerob.com/n/stack)

