'use client';

import Image from 'next/image';
import SubHeader from './sub-header';


const subHeader = "$ ls -al Tech Stack";
const TechStack: React.FC = () => {

  return (
    <section className="about-text">
      <SubHeader text={subHeader} />

      <ul className="techstack-list has-scrollbar">

        <li className="techstack-item">
          <Image
            id="python"
            src="https://skillicons.dev/icons?i=python"
            alt="python"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="go"
            src="https://skillicons.dev/icons?i=go"
            alt="go"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="react"
            src="https://skillicons.dev/icons?i=react"
            alt="react"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="ts"
            src="https://skillicons.dev/icons?i=ts"
            alt="ts"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="js"
            src="https://skillicons.dev/icons?i=js"
            alt="js"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="cpp"
            src="https://skillicons.dev/icons?i=cpp"
            alt="cpp"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="c"
            src="https://skillicons.dev/icons?i=c"
            alt="c"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="java"
            src="https://skillicons.dev/icons?i=java"
            alt="java"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="latex"
            src="https://skillicons.dev/icons?i=latex"
            alt="latex"
          />
        </li>

      </ul>

      <ul className="techstack-list has-scrollbar">

        <li className="techstack-item">
          <Image
            id="linux"
            src="https://skillicons.dev/icons?i=linux"
            alt="linux"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="githubactions"
            src="https://skillicons.dev/icons?i=githubactions"
            alt="githubactions"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="aws"
            src="https://skillicons.dev/icons?i=aws"
            alt="aws"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="git"
            src="https://skillicons.dev/icons?i=git"
            alt="git"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="docker"
            src="https://skillicons.dev/icons?i=docker"
            alt="docker"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="fastapi"
            src="https://skillicons.dev/icons?i=fatapi"
            alt="fastapi"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="nextjs"
            src="https://skillicons.dev/icons?i=nextjs"
            alt="nextjs"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="flask"
            src="https://skillicons.dev/icons?i=flask"
            alt="flask"
          />
        </li>

        <li className="techstack-item">
          <Image
            id="bash"
            src="https://skillicons.dev/icons?i=bash"
            alt="bash"
          />
        </li>

      </ul>
    </section>
  );
}

export default TechStack;