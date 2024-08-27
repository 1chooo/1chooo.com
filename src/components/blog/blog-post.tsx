import React, { useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { blogTags, postsData } from '@/config/blog';
import Image from 'next/image';


export const handleItemClick = (
  value: string,
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>) => {
  setSelectedValue(value);
};

export const filterFunc = (selectedValue: string, data: any[]) => {
  return selectedValue === 'All'
    ? data
    : data.filter((item) => item.category.toLowerCase() === selectedValue.toLowerCase());
};

const BlogPosts: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('All');
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    handleItemClick('All', setSelectedValue);
  }, []);

  const filteredPosts = filterFunc(selectedValue, postsData);

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="blog-posts">
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

      <div className="filter-select-box">
        <button
          className={`filter-select ${isSelectActive ? 'active' : ''}`}
          onClick={() => setIsSelectActive(!isSelectActive)}
        >
          <div className="select-value">
            {selectedValue || 'Select category'}
          </div>
          <div className="select-icon">
            <MdExpandMore />
          </div>
        </button>
        {isSelectActive && (
          <ul className="select-list">
            {blogTags.map((tag, index) => (
              <li className="select-item" key={index}>
                <button onClick={() => {
                  handleItemClick(tag, setSelectedValue);
                  setIsSelectActive(false);
                  setCurrentPage(1); // Reset to first page on filter change
                }}>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="blog-posts-list">
        {currentPosts.map((post, index: number) => (
          <li
            key={index}
            className="blog-post-item active"
            data-category={post.category.toLowerCase()}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="blog-banner-box">
                <Image
                  src={post.imageUrl}
                  alt={post.alt}
                  loading="lazy"
                  width={1600} 
                  height={900}
                />
              </figure>
              <div className="blog-content">
                <div className="blog-meta">
                  <p className="blog-category">{post.category}</p>
                  <span className="dot"></span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <h3 className="h3 blog-item-title">{post.title}</h3>
                <p className="blog-text">{post.content}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;
