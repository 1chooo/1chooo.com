import React, { useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { blogTags, postsData, Post } from '../../Config/BlogData';

const BlogPosts: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('All');
  const [isSelectActive, setIsSelectActive] = useState(false);

  useEffect(() => {
    handleItemClick('All');
  }, []);

  const handleItemClick = (value: string) => {
    setSelectedValue(value);
  };

  const filterFunc = (selectedValue: string) => {
    return selectedValue === 'All'
      ? postsData
      : postsData.filter((post) => post.category.toLowerCase() === selectedValue.toLowerCase());
  };

  const filteredPosts = filterFunc(selectedValue);

  return (
    <section className="blog-posts">
      <ul className="filter-list">
        {blogTags.map((tag, index) => (
          <li className="filter-item" key={index}>
            <button
              className={`filter-btn ${selectedValue === tag ? 'active' : ''}`}
              onClick={() => handleItemClick(tag)}
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
                  handleItemClick(tag);
                  setIsSelectActive(false);
                }}>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="blog-posts-list">
        {filteredPosts.map((post: Post, index: number) => (
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
                <img
                  src={post.imageUrl}
                  alt={post.alt}
                  loading="lazy"
                />
              </figure>
              <div className="blog-content">
                <div className="blog-meta">
                  <p className="blog-category">{post.category}</p>
                  <span className="dot"></span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-description">{post.content}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogPosts;
