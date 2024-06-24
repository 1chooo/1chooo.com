import React from 'react';
import { blogTags } from '../../Config/BlogData';
import { handleItemClick } from '../../utils/filterUtils';

interface FilterListProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterList: React.FC<FilterListProps> = ({ selectedValue, setSelectedValue, setCurrentPage }) => {
  return (
    <ul className="filter-list">
      {blogTags.map((tag, index) => (
        <li className="filter-item" key={index}>
          <button
            className={`filter-btn ${selectedValue === tag ? 'active' : ''}`}
            onClick={() => {
              handleItemClick(tag, setSelectedValue);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FilterList;
