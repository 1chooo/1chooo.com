"use client";

import React, { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { ProgressBarLink } from "@/components/progress-bar";

interface FilterSelectBoxProps {
  selectedTag: string;
  blogTags: string[];
}

const FilterSelectBox: React.FC<FilterSelectBoxProps> = ({
  selectedTag,
  blogTags
}) => {
  const [isSelectActive, setIsSelectActive] = useState(false);

  return (
    <div className="filter-select-box">
      <button
        className={`filter-select ${isSelectActive ? 'active' : ''}`}
        onClick={() => setIsSelectActive(!isSelectActive)}
      >
        <div className="select-value">
          {selectedTag || 'Select category'}
        </div>
        <div className="select-icon">
          <MdExpandMore />
        </div>
      </button>
      {isSelectActive && (
        <ul className="select-list">
          {blogTags.map((tag: string) => (
            <li className="select-item" key={tag}>
              <button
                onClick={() => {
                  setIsSelectActive(false);
                }}
              >
                <ProgressBarLink href={`/portfolio?tag=${encodeURIComponent(tag)}`}>
                  {tag}
                </ProgressBarLink>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterSelectBox;
