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

## [2490. Circular Sentence](https://leetcode.com/problems/circular-sentence/description/?envType=daily-question&envId=2024-11-02) [Easy] - 2024-11-02

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/circular-sentence
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    bool isCircularSentence(string sentence) {
        int len = sentence.size();

        if (sentence[0] != sentence[len - 1])
            return false;

        for (int i = 1; i < len - 1; i++) {
            if (sentence[i] == ' ' &&
                sentence[i - 1] != sentence[i + 1])
                return false;
        }

        return true;
    }
};
```

## [796. Rotate String](https://leetcode.com/problems/rotate-string) [Easy] - 2024-11-03

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/rotate-string
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
public:
    bool rotateString(string s, string goal) {
        if (s.length() != goal.length()) {
            return false;
        }

        string rotated = s;

        for (int i = 0; i < s.length(); i++) {
            if (rotated == goal)
                return true;
            
            char ch = rotated[0];
            rotated.erase(0, 1);
            rotated.push_back(ch);
        }
        return false;
    }
};

/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/rotate-string
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
public:
    bool rotateString(string s, string goal) {
        if (s.length() != goal.length()) {
            return false;
        }
        
        string doubled = s + s;

        return doubled.find(goal) != string::npos;
    }
};
```

## [3163. String Compression III](https://leetcode.com/problems/string-compression-iii) [Medium] - 2024-11-04

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/string-compression-iii
 * Runtime: 11ms (94.02%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    string compressedString(string word) {
        string result = "";
        char comp = word[0];
        int count = 1;
        int len = word.size();

        for (int i = 1; i < len; i++) {
            if (word[i] == comp && count < 9) {
                count++;
            } else {
                result.push_back(count + '0');
                result.push_back(comp);

                comp = word[i];
                count = 1;
            }
        }

        result.push_back(count + '0');
        result.push_back(comp);

        return result;
    }
};
```

## [2914. Minimum Number of Changes to Make Binary String Beautiful](https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful) [Medium] - 2024-11-05

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    int minChanges(string s) {
        int len = s.size();
        int count = 0;

        for (int i = 0; i < len - 1; i += 2)
            if (s[i] != s[i + 1])
                count++;

        return count;
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

## [1072. Flip Columns For Maximum Number of Equal Rows](https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows/description/?envType=daily-question&envId=2024-11-22) [Medium] - 2024-11-22

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows
 * Runtime: 12ms (89.13%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    int maxEqualRowsAfterFlips(vector<vector<int>> &matrix) {
        unordered_map<string, int> patternCount;

        for (const auto &row : matrix) {
            string pattern = "";

            // Generate a pattern string for this row based on the first row
            for (int j = 0; j < row.size(); ++j) {
                // Compare with the first element in the row to determine if flip is needed
                pattern += (row[j] ^ row[0]) ? '1' : '0';
            }

            // Increment the count for this pattern
            patternCount[pattern]++;
        }

        // Find the maximum count of rows with the same pattern
        int maxRows = 0;
        for (const auto &entry : patternCount) {
            maxRows = max(maxRows, entry.second);
        }

        return maxRows;
    }
};
```
