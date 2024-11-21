---
title: "(Updating) LeetCode November 2024 Daily Challenge by Hugo"
publishedAt: '2024-11-30'
category: LeetCode
tags: 
  - VSCode
  - LeeCode
  - Daily Challenge
summary: "This is my first time participating in the LeetCode Daily Challenge. Below is a list of the problems I've solved in November 2024. I'll continue updating the notes and solutions until the end of the month."
banner: /images/banner/posts/leetcode-november-2024-daily-challenge.png
alt: "(Updating) LeetCode November 2024 Daily Challenge by Hugo"
mathjax: true
---

Hey there 👋! This is Hugo. This is my first time participating in the LeetCode Daily Challenge. Below is a list of the problems I've solved in November 2024. I'll continue updating the notes and solutions until the end of the month.

## [1957. Delete Characters to Make Fancy String](https://leetcode.com/problems/delete-characters-to-make-fancy-string/description/?envType=daily-question&envId=2024-11-01) [Easy] - 2024-11-01

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/delete-characters-to-make-fancy-string
 * Runtime: 15ms (93.51%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    string makeFancyString(string s) {
        int count = 1;
        int len = s.size();
        string ans = "";
        ans.push_back(s[0]);

        for (int i = 1; i < len; i++) {
            if (s[i] != ans.back()) {
                count = 1;
                ans.push_back(s[i]);
            } else if (++count < 3) {
                ans.push_back(s[i]);
            }
        }

        return ans;
    }
};
```

## [2257. Count Unguarded Cells in the Grid](https://leetcode.com/problems/count-unguarded-cells-in-the-grid/description/?envType=daily-question&envId=2024-11-21) [Medium] - 2024-11-21

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/count-unguarded-cells-in-the-grid/
 * Runtime: 52ms (77.32%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    int countUnguarded(int m, int n, vector<vector<int>> &guards, vector<vector<int>> &walls) {
        vector<vector<int>> grid(m, vector<int>(n, 0));
        // 0 = free, 1 = guard, 2 = wall, 3 = guardable
        for (const auto &guard : guards) {
            grid[guard[0]][guard[1]] = 1;
        }
        for (const auto &wall : walls) {
            grid[wall[0]][wall[1]] = 2;
        }
        auto mark_guarded = [&](int r, int c) {
            for (int row = r + 1; row < m; row++) {
                if (grid[row][c] == 1 || grid[row][c] == 2) break;
                grid[row][c] = 3;
            }
            for (int row = r - 1; row >= 0; row--) {
                if (grid[row][c] == 1 || grid[row][c] == 2) break;
                grid[row][c] = 3;
            }
            for (int col = c + 1; col < n; col++) {
                if (grid[r][col] == 1 || grid[r][col] == 2) break;
                grid[r][col] = 3;
            }
            for (int col = c - 1; col >= 0; col--) {
                if (grid[r][col] == 1 || grid[r][col] == 2) break;
                grid[r][col] = 3;
            }
        };
        for (const auto &guard : guards) {
            mark_guarded(guard[0], guard[1]);
        }
        int res = 0;
        for (const auto &row : grid) {
            for (int cell : row) {
                if (cell == 0) res++;
            }
        }
        return res;
    }
};
```

