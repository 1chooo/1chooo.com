import { IoCloudDownloadOutline } from "react-icons/io5";
import IconBox from "../icon-box";


const DownloadCV = () => {
  return (
    <section className="timeline">
      <div className="title-wrapper">
        <IconBox icon={IoCloudDownloadOutline} />

        {/* TODO: divide into the individual class */}
        <a href="./cv.pdf" target="_blank" className="code-highlight-yellow" style={{ fontWeight: 'bold' }}>
          <u>Download Hugo&apos;s full CV/Resume (March 2024)</u>
        </a>
      </div>
    </section>
  );
}

export default DownloadCV;
