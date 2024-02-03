const SkillSets: React.FC = () => {

  return (
    <section className="skillsets">

      <p>
        <h3><code> $ ls -al Tech Stack</code></h3>
      </p>


      <ul className="skillsets-list has-scrollbar">

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=python"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=go"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=react"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=ts"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=js"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=cpp"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=c"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=java"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=latex"
          />
        </li>

      </ul>

      <ul className="skillsets-list has-scrollbar">

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=linux"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=githubactions"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=aws"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=git"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=docker"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=fastapi"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=kubernetes"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=flask"
          />
        </li>

        <li className="skillsets-item">
          <img
            src="https://skillicons.dev/icons?i=bash"
          />
        </li>

      </ul>

    </section>
  );
}

export default SkillSets;


// .skillsets {
//   margin-bottom: 15px;
// }

// .skillsets-list {
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
//   gap: 15px;
//   margin: 0 -15px;
//   padding: 25px;
//   padding-bottom: 25px;
//   overflow-x: auto;
//   scroll-behavior: smooth;
//   overscroll-behavior-inline: contain;
//   scroll-snap-type: inline mandatory;
//   scroll-padding-inline: 25px;
// }

// .skillsets-item {
//   min-width: 50%;
//   scroll-snap-align: start;
// }

// .skillsets-item img {
//   width: 100%;
//   filter: grayscale(1);
//   transition: var(--transition-1);
// }

// .skillsets-item img:hover {
//   filter: grayscale(0);
// }