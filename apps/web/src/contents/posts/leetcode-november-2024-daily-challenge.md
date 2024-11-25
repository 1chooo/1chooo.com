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

## [3011. Find if Array Can Be Sorted](https://leetcode.com/problems/find-if-array-can-be-sorted) [Medium] - 2024-11-06

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/find-if-array-can-be-sorted
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
public:
    static bool canSortArray(const vector<int>& nums) {
        uint16_t preMax = 0, currentMin = 0, currentMax = 0;
        uint8_t prevBitCount = 0;

        for (const uint16_t num : nums) {
            const uint8_t currentBitCount = popcount(num);
            if (prevBitCount == currentBitCount) {
                currentMin = min(currentMin, num);
                currentMax = max(currentMax, num);
            } else if (currentMin < preMax) {
                return false;
            } else {
                preMax = currentMax;
                currentMin = currentMax = num;
                prevBitCount = currentBitCount;
            }
        }
        return currentMin >= preMax;
    }
};
```

## [2275. Largest Combination With Bitwise AND Greater Than Zero](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero) [Medium] - 2024-11-07

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero
 * Runtime: 15ms (92.54%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    int largestCombination(vector<int> &candidates) {
        int ans = 0;

        for (int i = 0; i < 24; i++) {
            int count = 0;
            for (auto candidate : candidates)
                count += (candidate >> i) & 1;
            ans = max(ans, count);
        }

        return ans;
    }
};
```

## [1829. Maximum XOR for Each Query](https://leetcode.com/problems/maximum-xor-for-each-query)

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/maximum-xor-for-each-query
 * Runtime: 0ms (100.00%)
 * Reference: https://leetcode.com/problems/maximum-xor-for-each-query/solutions/6021112/beats-100-very-short-simple-solution/
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    vector<int> getMaximumXor(vector<int> &nums, int maximumBit) {
        int mask = (1LL << maximumBit) - 1;
        int n = nums.size();
        vector<int> res(n);

        for (int i = 0, curr = 0; i < n; i++) {
            curr ^= nums[i];
            res[n - i - 1] = ~curr & mask;
        }

        return res;
    }
};
```

## [3133. Minimum Array End](https://leetcode.com/problems/minimum-array-end) [Medium] - 2024-11-09

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/minimum-array-end
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    long minEnd(int n, int x) {
        long result = x;
        long remaining = n - 1;
        long position = 1;

        while (remaining) {
            if (!(x & position)) {
                result |= (remaining & 1) * position;
                remaining >>= 1;
            }
            position <<= 1;
        }

        return result;
    }
};
```

## [3097. Shortest Subarray With OR at Least K II](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii) [Medium] - 2024-11-10

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/
 * Runtime: 47ms (79.12%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    int minimumSubarrayLength(vector<int> &nums, int k) {
        int n = nums.size();
        vector<int> bitCount(32, 0);
        int currentOR = 0;
        int left = 0;
        int minLength = INT_MAX;

        for (int right = 0; right < n; right++) {
            currentOR |= nums[right];

            for (int bit = 0; bit < 32; bit++)
                if (nums[right] & (1 << bit))
                    bitCount[bit]++;

            while (left <= right && currentOR >= k) {
                minLength = min(minLength, right - left + 1);

                int updatedOR = 0;
                for (int bit = 0; bit < 32; bit++) {
                    if (nums[left] & (1 << bit))
                        bitCount[bit]--;
                    if (bitCount[bit] > 0)
                        updatedOR |= (1 << bit);
                }
                currentOR = updatedOR;
                left++;
            }
        }

        return minLength == INT_MAX ? -1 : minLength;
    }
};
```

## [2601. Prime Subtraction Operation](https://leetcode.com/problems/prime-subtraction-operation) [Medium] - 2024-11-11

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/prime-subtraction-operation
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    bool primeSubOperation(vector<int> &nums) {
        int maxElement = getMaxElement(nums);

        vector<bool> sieve(maxElement + 1, true);
        sieve[1] = false;
        for (int i = 2; i <= sqrt(maxElement + 1); i++)
            if (sieve[i])
                for (int j = i * i; j <= maxElement; j += i)
                    sieve[j] = false;

        int currValue = 1;
        int i = 0;
        while (i < nums.size()) {
            int difference = nums[i] - currValue;

            if (difference < 0)
                return false;

            if (sieve[difference] == true ||
                difference == 0) {
                i++;
                currValue++;
            } else {
                currValue++;
            }
        }
        return true;
    }

  private:
    int getMaxElement(vector<int> &nums) {
        int max = -1;
        for (int num : nums)
            if (num > max)
                max = num;
        return max;
    }
};
```

## [2070. Most Beautiful Item for Each Query](https://leetcode.com/problems/most-beautiful-item-for-each-query/) [Medium] - 2024-11-12

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/most-beautiful-item-for-each-query/
 * Runtime: 46ms (84.43%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    vector<int> maximumBeauty(
        vector<vector<int>> &items, vector<int> &queries) {
        int queriesSize = queries.size();
        vector<pair<int, int>> sortedQueries;
        vector<int> results(queriesSize);
        int itemIndex = 0;
        int currentMaxBeauty = 0;

        for (int i = 0; i < queriesSize; i++) {
            sortedQueries.push_back({queries[i], i});
        }
        sort(sortedQueries.begin(), sortedQueries.end());
        sort(items.begin(), items.end());

        for (int i = 1; i < items.size(); i++) {
            items[i][1] = max(items[i - 1][1], items[i][1]);
        }

        for (int i = 0; i < queriesSize; i++) {
            while (itemIndex < items.size() &&
                   items[itemIndex][0] <= sortedQueries[i].first) {
                currentMaxBeauty = max(currentMaxBeauty, items[itemIndex][1]);
                itemIndex++;
            }
            results[sortedQueries[i].second] = currentMaxBeauty;
        }

        return results;
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

## [1861. Rotating the Box](https://leetcode.com/problems/rotating-the-box/) [Medium] - 2024-11-23


```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/rotating-the-box
 * Runtime: 131ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    vector<vector<char>> rotateTheBox(vector<vector<char>> &box) {
        int m = box.size();
        int n = box[0].size();

        for (auto &row : box) {
            int dropPosition = n - 1;

            for (int currPos = n - 1; currPos >= 0; currPos--) {
                if (row[currPos] == '*') {
                    dropPosition = currPos - 1;
                } else if (row[currPos] == '#') {
                    swap(row[dropPosition], row[currPos]);
                    dropPosition--;
                }
            }
        }

        vector<vector<char>> rotatedBox(n, vector<char>(m));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                rotatedBox[j][m - 1 - i] = box[i][j];
            }
        }

        return rotatedBox;
    }
};
```

## [1975. Maximum Matrix Sum](https://leetcode.com/problems/maximum-matrix-sum/) [Medium] - 2024-11-24

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/maximum-matrix-sum/
 * Runtime: 0ms (100.00%)
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
public:
    long long maxMatrixSum(vector<vector<int>>& matrix) {
        int minValue = INT_MAX;
        long long sum = 0;
        int negCount = 0;

        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (matrix[i][j] < 0)
                    negCount++;
                int absValue = abs(matrix[i][j]);
                minValue = min(minValue, absValue);
                sum += absValue;
            }
        }

        if (negCount % 2 == 0)
            return sum;
        return sum - 2 * minValue;
    }
};
```

## [773. Sliding Puzzle](https://leetcode.com/problems/sliding-puzzle/) [Hard] - 2024-11-25

```cpp
/**
 * Author: 1chooo<hugo970217@gmail.com>
 * Problem: https://leetcode.com/problems/sliding-puzzle/
 * Runtime: 3ms (92.73%)
 * https://leetcode.com/problems/sliding-puzzle/solutions/6080339/easy-to-understand-using-bfs/
 */

const static auto _ = []() {
    cin.tie(nullptr)->sync_with_stdio(false);
    return nullptr;
}();

class Solution {
  public:
    int slidingPuzzle(vector<vector<int>> &board) {
        string s = "";
        for (auto &r : board) {
            for (int n : r) {
                s += to_string(n);
            }
        }

        string g = "123450";

        vector<vector<int>> n = {
            {1, 3},
            {0, 2, 4},
            {1, 5},
            {0, 4},
            {1, 3, 5},
            {2, 4}};

        queue<pair<string, int>> q;
        unordered_set<string> v;

        q.push({s, 0});
        v.insert(s);

        while (!q.empty()) {
            auto [c, m] = q.front();
            q.pop();

            if (c == g) return m;

            int z = c.find('0');

            for (int x : n[z]) {
                string t = c;
                swap(t[z], t[x]);

                if (v.find(t) == v.end()) {
                    q.push({t, m + 1});
                    v.insert(t);
                }
            }
        }

        return -1;
    }
};
```