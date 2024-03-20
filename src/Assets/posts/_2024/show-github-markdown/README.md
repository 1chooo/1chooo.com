# 怎麼讓 GitHub Repo 成功顯示 Markdown 語言

Gtihub 充分地支援 Markdown 語法，讓我們可以快速地記錄想法，加上最近都會將實習或是學校學習到的內容，撰寫成筆記的方式保存，不過當我們的筆記越來越多，我們還是看到 GitHub 都不會顯示使用的語言，不向其他專案會馬上顯示使用的語言，然而 Markdown 不顯示的原因是因為它立即被分類為「Prose」，再來可能是因為存放在 `docs` 或 `documentation` 文件夾中，因此 Markdown 不會被統計到使用語言中。

不過其實 GitHub 是可以記錄我們的筆記是使用 Markdown 語言的，只是我們需要在我們的 Repo 中加入 linguist 的設定檔，就能讓 GitHub 能夠辨識我們的筆記是使用 Markdown 語言。

首先我們要在我們的 Repo 中加入 `.gitattributes` 檔案，並在檔案中加入以下內容：

```
*.md linguist-detectable=true
```

在 Repo 加入後，我們就能夠成功辨識我們的筆記是使用 Markdown 語言了。

不過當我們今天 Repo 裡的多數檔案名稱命名為 `README.md` 時，GitHub 可能不會成功辨識為 Markdown 語言，這時我們可以在 `.gitattributes` 檔案中加入更多內容如：

```
*.md linguist-vendored=false
*.md linguist-generated=false
*.md linguist-documentation=false
*.md linguist-detectable=true
```


而這些設定分別是用來指定在 Git 存儲庫中的 Markdown 文件的屬性。

具體來說，這些設定指定了以下屬性：
- `linguist-vendored=false`：指示該 Markdown 文件不是由第三方供應商提供的。
- `linguist-generated=false`：指示該 Markdown 文件不是自動生成的。
- `linguist-documentation=false`：指示該 Markdown 文件不是文檔文件。
- `linguist-detectable=true`：指示 Git 能夠檢測到該 Markdown 文件。

這些屬性設定可以幫助 Git 在處理和顯示 Markdown 文件時進行適當的處理。

### git check-attr 使用

Final notes:
Keep in mind that the solution found here is applicable towards many issues with Github stats; you can easily override any Linguist classifications with Git attributes.

Also, Pro Tip: You can easily check if your file patterns are correct in your .gitattributes file by using the “git check-attr” command. For example, to check the attributes of a markdown file with the filename “web-dev.md”, in my folder “cheatsheets”, I would use:

git check-attr -a cheatsheets/web-dev.md


https://github.com/github-linguist/linguist/issues/5951

https://joshuatz.com/posts/2019/how-to-get-github-to-recognize-a-pure-markdown-repo/