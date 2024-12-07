import React from 'react';
import { ProgressBarLink } from "@/components/progress-bar";

interface FilterListProps {
  selectedTag: string;
  blogTags: string[];
}

const FilterList: React.FC<FilterListProps> = ({ 
  selectedTag,
  blogTags
}) => {
  return (
    <ul className="filter-list">
      {blogTags.map((tag, index) => (
        <li className="filter-item" key={index}>
          <ProgressBarLink
            href={`/portfolio?tag=${encodeURIComponent(tag)}`}
            className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
          >
            {tag}
          </ProgressBarLink>
        </li>
      ))}
    </ul>
  );
};

export default FilterList;
