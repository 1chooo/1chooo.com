**TOCs**
- [重構 Blog 結構](#重構-blog-結構)
- [文章取得方法](#文章取得方法)


### 重構 Blog 結構

```typescript
import React, {
  useState, useEffect
} from 'react';


import {
  MdExpandMore
} from "react-icons/md";

import postInitImage from "../../Assets/images/projects/react_vcard_portfolio.png";
import noAdsImage from "../../Assets/images/posts/no_ads.png";
import gitTipsImage from "../../Assets/images/posts/git_tips.png";
import nuphyUnboxingImage from "../../Assets/images/posts/nuphy_unboxing.png";

const Posts: React.FC = () => {

  // element toggle function
  const elementToggleFunc = (elem: HTMLElement) => {
    elem.classList.toggle("active");
  };

  // custom select variables
  const select: HTMLElement | null = document.querySelector("[data-select]");
  const selectItems: NodeListOf<HTMLElement> = document.querySelectorAll("[data-select-item]");
  const selectValue: HTMLElement | null = document.querySelector("[data-select-value]");
  const filterBtn: NodeListOf<HTMLElement> = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });
  }

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue: string = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      if (select) {
        elementToggleFunc(select);
      }
      filterFunc(selectedValue);
    });
  }

  // filter variables
  const filterItems: NodeListOf<HTMLElement> = document.querySelectorAll("[data-filter-item]");

  const filterFunc = (selectedValue: string) => {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  };

  // add event in all filter button items for large screen
  let lastClickedBtn: HTMLElement | null = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue: string = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }


  const [selectedValue, setSelectedValue] = useState('All');
  const [isActive, setIsActive] = useState(true); // 如果需要 isActive 的話

  useEffect(() => {
    // 在這裡可以執行初始化的邏輯
    // 例如：fetch 初始資料，或者設置預設的 selectedValue
    // 這裡只是一個範例，實際上需要依據你的需求進行修改
    // 這樣確保初始化時 'All' 有 'filter-btn active' 的樣式
    handleItemClick('All');
  }, []); // 空的 dependency array 確保只在初始化時執行

  const handleItemClick = (value: string) => {
    setIsActive(false);
    setSelectedValue(value);
  };

  return (
    <section className="blog-posts">

      <ul className="filter-list">

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'All' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('All')}
          >
            All
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'DevOps' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('DevOps')}
          >
            DevOps
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Projects' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Projects')}
          >
            Projects
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Teaching' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Teaching')}
          >
            Teaching
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Technology' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Technology
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Interview' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Interview
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Unboxing' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Unboxing
          </button>
        </li>

      </ul>

      <div className="filter-select-box">

        <button
          className={`filter-select ${isActive ? 'active' : ''}`}
          data-select
          onClick={() => setIsActive(!isActive)}
        >

          <div className="select-value" data-select-value>
            {selectedValue || 'Select category'}
          </div>

          <div className="select-icon">
            <MdExpandMore />
          </div>

        </button>

        <ul className="select-list">
          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('All')}
            >
              All
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('DevOps')}
            >
              DevOps
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Projects')}
            >
              Projects
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Teaching')}
            >
              Teaching
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Technology')}
            >
              Technology
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Interview')}
            >
              Interview
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Unboxing')}
            >
              Unboxing
            </button>
          </li>
        </ul>

      </div>

      <ul className="blog-posts-list">

        <li className="blog-post-item  active"
          data-filter-item
          data-category="unboxing"
        >
          <a
            href="https://medium.com/@1chooo/%E5%BF%98%E6%8E%89-youtube-premium-%E9%80%99%E4%BA%9B%E7%84%A1%E5%BB%A3%E5%91%8A%E7%80%8F%E8%A6%BD%E5%99%A8%E8%AE%93%E4%BD%A0%E6%84%9B%E4%B8%8D%E9%87%8B%E6%89%8B-901f7d15a59a"
            target="_blank"
            rel="noopener noreferrer"
          >

            <figure className="blog-banner-box">
              <img
                src={noAdsImage}
                alt="No ads"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Unboxing</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Feb 11, 2024</time>
              </div>

              <h3 className="h3 blog-item-title">
                忘掉 YouTube Premium！這些無廣告瀏覽器讓你愛不釋手！
              </h3>

              <p className="blog-text">
                在這個廣告橫行的 YouTube 時代，享受影片卻不被廣告干擾的感覺真是太棒了！透過 Brave 瀏覽器，我終於找到了解脫的方法，而且完全不必花錢購買 Premium。讓我們一起換個方式，享受無廣告的 YouTube 世界吧！
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item  active"
          data-filter-item
          data-category="devops"
        >
          <a
            href="https://medium.com/@1chooo/%E8%B8%8F%E5%85%A5-git-%E7%9A%84%E4%B8%96%E7%95%8C-%E4%BD%BF%E7%94%A8-ssh-%E8%88%87-github-%E9%80%A3%E7%B7%9A-7324b01349dd"
            target="_blank"
            rel="noopener noreferrer"
          >

            <figure className="blog-banner-box">
              <img
                src={gitTipsImage}
                alt="Git Tips Image"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">DevOps</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">
                踏入 Git 的世界：使用 ssh 與 GitHub 連線 👨🏻‍💻
              </h3>

              <p className="blog-text">
                兼顧安全及隱私，利用 ssh key，push 到 GitHub 再也不需要打密碼了🔑
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item  active"
          data-filter-item
          data-category="unboxing"
        >
          <a
            href="https://medium.com/@1chooo/%E8%B8%8F%E5%85%A5-git-%E7%9A%84%E4%B8%96%E7%95%8C-%E4%BD%BF%E7%94%A8-ssh-%E8%88%87-github-%E9%80%A3%E7%B7%9A-7324b01349dd"
            target="_blank"
            rel="noopener noreferrer"
          >

            <figure className="blog-banner-box">
              <img
                src={nuphyUnboxingImage}
                alt="Git Tips Image"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Unboxing</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">
                兼具顏值手感的 Nuphy 鍵盤初體驗！！！
              </h3>

              <p className="blog-text">
                對於機械鍵盤小白的我來說，每個軸體、手感、鍵帽等⋯⋯挑選鍵盤的考量對我來說都非常新奇，身為曾經買過一把機械鍵盤的我來說，正是個適合探索更多鍵盤的時機，於是決定購入觀望已久的鍵盤品牌 Nuphy — Halo 65。
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item  active"
          data-filter-item
          data-category="interview"
        >
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={postInitImage}
                alt="Design digest #80"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Interview</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">Design digest #80</h3>

              <p className="blog-text">
                Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis
                suscipit.
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item  active"
          data-filter-item
          data-category="devops"
        >
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={postInitImage}
                alt="UI interactions of the week"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">DevOps</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">UI interactions of the week</h3>

              <p className="blog-text">
                Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris
                nisi.
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item  active"
          data-filter-item
          data-category="teaching"
        >
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={postInitImage}
                alt="The forgotten art of spacing"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Teaching</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">The forgotten art of spacing</h3>

              <p className="blog-text">
                Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item  active"
          data-filter-item
          data-category="teaching"
        >
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={postInitImage}
                alt="Design digest #79"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Teaching</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">Design digest #79</h3>

              <p className="blog-text">
                Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.
              </p>

            </div>

          </a>
        </li>

      </ul>

    </section>
  );
}

export default Posts;
```

這樣檔案太長了，你會有什麼建議改寫？因為目前功能是互相關連的，我是 tsx


這個檔案確實有一些地方可以重構和改進，特別是在事件處理、元素選擇和狀態管理方面。以下是一些改進的建議：

1. **將事件處理移動到 React 狀態中管理**：目前你在 React 元件外部使用事件監聽器和DOM操作，這不符合 React 的最佳實踐。應該將事件處理移動到 React 元件中，以便更好地利用 React 的生態系統。

2. **使用 useState 和 useEffect 管理選擇狀態**：目前你使用了 useState，但是它只管理了選擇狀態的一部分。應該將選擇狀態和元素的顯示狀態整合到一個狀態中，並使用 useEffect 來處理初始狀態和事件訂閱。

3. **提取重複邏輯**：在你的代碼中有一些重複的邏輯，比如對過濾按鈕和選擇框的處理。可以考慮將這些邏輯提取到單獨的函數中，以提高代碼的可讀性和重用性。

4. **組件化**：如果可能的話，將代碼分成更小的組件，每個組件負責管理自己的狀態和渲染。這樣可以使代碼更具可維護性和可擴展性。

5. **將樣式移動到 CSS 文件中**：目前的代碼中包含了大量的樣式，最好將這些樣式移動到單獨的 CSS 文件中，以提高代碼的可讀性和可維護性。

基於上述建議，以下是一個重構後的代碼示例，仍然使用 TypeScript：

```tsx
import React, { useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import './Posts.css'; // 引入樣式文件

interface Post {
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  content: string;
  link: string;
}

const postsData: Post[] = [
  {
    title: '忘掉 YouTube Premium！這些無廣告瀏覽器讓你愛不釋手！',
    category: 'Unboxing',
    imageUrl: require('../../Assets/images/posts/no_ads.png'),
    date: 'Feb 11, 2024',
    content:
      '在這個廣告橫行的 YouTube 時代，享受影片卻不被廣告干擾的感覺真是太棒了！透過 Brave 瀏覽器，我終於找到了解脫的方法，而且完全不必花錢購買 Premium。讓我們一起換個方式，享受無廣告的 YouTube 世界吧！',
    link: 'https://medium.com/@1chooo/%E5%BF%98%E6%8E%89-youtube-premium-%E9%80%99%E4%BA%9B%E7%84%A1%E5%BB%A3%E5%91%8A%E7%80%8F%E8%A6%BD%E5%99%A8%E8%AE%93%E4%BD%A0%E6%84%9B%E4%B8%8D%E9%87%8B%E6%89%8B-901f7d15a59a',
  },
  // 其他文章資料...
];

const Posts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    handleItemClick('All');
  }, []);

  const handleItemClick = (category: string) => {
    setIsActive(false);
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory === 'All' ? postsData : postsData.filter(post => post.category === selectedCategory);

  return (
    <section className="blog-posts">
      {/* Filter buttons */}
      <ul className="filter-list">
        {/* Map through categories */}
        {['All', 'DevOps', 'Projects', 'Teaching', 'Technology', 'Interview', 'Unboxing'].map(category => (
          <li key={category} className="filter-item">
            <button
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleItemClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Filter select box */}
      <div className="filter-select-box">
        <button className={`filter-select ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
          <div className="select-value">{selectedCategory || 'Select category'}</div>
          <div className="select-icon">
            <MdExpandMore />
          </div>
        </button>
        {/* Select list */}
        <ul className="select-list">
          {['All', 'DevOps', 'Projects', 'Teaching', 'Technology', 'Interview', 'Unboxing'].map(category => (
            <li key={category} className="select-item">
              <button onClick={() => handleItemClick(category)}>{category}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Blog posts */}
      <ul className="blog-posts-list">
        {/* Map through filtered posts */}
        {filteredPosts.map(post => (
          <li key={post.title} className="blog-post-item" data-filter-item data-category={post.category.toLowerCase()}>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <figure className="blog-banner-box">
                <img src={post.imageUrl} alt={post.title} loading="lazy" />
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
    </section>
  );
};

export default Posts;
```

這個示例中，我將過濾邏輯整合到了 React 狀態中，使用了 map 函數動態生成了過濾按鈕和選擇框，並將文章數據提取到了單獨的數組中。這樣做使代碼更具可讀性和可維護性，並符合 React 的最佳實踐。

### 文章取得方法

```ts
const postsData: Post[] = [
  {
    title: '忘掉 YouTube Premium！這些無廣告瀏覽器讓你愛不釋手！',
    category: 'Unboxing',
    imageUrl: require('../../Assets/images/posts/no_ads.png'),
    date: 'Feb 11, 2024',
    content:
      '在這個廣告橫行的 YouTube 時代，享受影片卻不被廣告干擾的感覺真是太棒了！透過 Brave 瀏覽器，我終於找到了解脫的方法，而且完全不必花錢購買 Premium。讓我們一起換個方式，享受無廣告的 YouTube 世界吧！',
    link: 'https://medium.com/@1chooo/%E5%BF%98%E6%8E%89-youtube-premium-%E9%80%99%E4%BA%9B%E7%84%A1%E5%BB%A3%E5%91%8A%E7%80%8F%E8%A6%BD%E5%99%A8%E8%AE%93%E4%BD%A0%E6%84%9B%E4%B8%8D%E9%87%8B%E6%89%8B-901f7d15a59a',
  },
  {
    title: '忘掉 YouTube Premium！這些無廣告瀏覽器讓你愛不釋手！',
    category: 'Unboxing',
    imageUrl: require('../../Assets/images/posts/no_ads.png'),
    date: 'Feb 11, 2024',
    content:
      '在這個廣告橫行的 YouTube 時代，享受影片卻不被廣告干擾的感覺真是太棒了！透過 Brave 瀏覽器，我終於找到了解脫的方法，而且完全不必花錢購買 Premium。讓我們一起換個方式，享受無廣告的 YouTube 世界吧！',
    link: 'https://medium.com/@1chooo/%E5%BF%98%E6%8E%89-youtube-premium-%E9%80%99%E4%BA%9B%E7%84%A1%E5%BB%A3%E5%91%8A%E7%80%8F%E8%A6%BD%E5%99%A8%E8%AE%93%E4%BD%A0%E6%84%9B%E4%B8%8D%E9%87%8B%E6%89%8B-901f7d15a59a',
  },
  // 其他文章資料...
];
```

可以幫我寫個拿到文章資訊的方法嗎？例如變數之類的 這是 `.tsx`

您可以創建一個函數，讓它接受文章的索引作為參數，然後返回相應索引的文章信息。這是一個示例：

```typescript
interface Post {
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  content: string;
  link: string;
}

const postsData: Post[] = [
  {
    title: '忘掉 YouTube Premium！這些無廣告瀏覽器讓你愛不釋手！',
    category: 'Unboxing',
    imageUrl: require('../../Assets/images/posts/no_ads.png'),
    date: 'Feb 11, 2024',
    content:
      '在這個廣告橫行的 YouTube 時代，享受影片卻不被廣告干擾的感覺真是太棒了！透過 Brave 瀏覽器，我終於找到了解脫的方法，而且完全不必花錢購買 Premium。讓我們一起換個方式，享受無廣告的 YouTube 世界吧！',
    link: 'https://medium.com/@1chooo/%E5%BF%98%E6%8E%89-youtube-premium-%E9%80%99%E4%BA%9B%E7%84%A1%E5%BB%A3%E5%91%8A%E7%80%8F%E8%A6%BD%E5%99%A8%E8%AE%93%E4%BD%A0%E6%84%9B%E4%B8%8D%E9%87%8B%E6%89%8B-901f7d15a59a',
  },
  // 其他文章資料...
];

function getPostInfo(index: number): Post | undefined {
  return postsData[index];
}

// 使用示例
const postIndex = 0;
const postInfo = getPostInfo(postIndex);
if (postInfo) {
  console.log("文章標題:", postInfo.title);
  console.log("文章類別:", postInfo.category);
  console.log("文章日期:", postInfo.date);
  // 其他資訊類似地打印出來
} else {
  console.log("找不到索引為", postIndex, "的文章信息。");
}
```

這將返回給定索引處的文章信息，如果索引無效，則返回undefined。您可以根據需要在此基礎上擴展函數，比如添加錯誤處理或其他功能。