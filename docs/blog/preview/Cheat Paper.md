---
title: Cheat Paper
tags:
  - 计算概论
createTime: 2025/11/19 16:37:48
permalink: /blog/ndq71jol/
---
# 算法考试数据结构速查表 (Python 实现)

## 1. 栈 (Stack)

栈是一种 **后进先出 (LIFO)** 的数据结构。在 Python 中，使用内置的 `list` 即可高效实现。

|               |                     |           |               |
| ------------- | ------------------- | --------- | ------------- |
| **操作**        | **Python 方法**       | **时间复杂度** | **描述**        |
| **入栈 (Push)** | `list.append(item)` | O(1)      | 添加元素到末尾       |
| **出栈 (Pop)**  | `list.pop()`        | O(1)      | 移除并返回末尾元素     |
| **查看栈顶**      | `my_stack[-1]`      | O(1)      | 不移除，查看末尾元素    |
| **判空**        | `not my_stack`      | O(1)      | 栈为空时返回 `True` |

### 简洁代码示例

```python
# 初始化
stack = []

# 入栈
stack.append(10)
stack.append(20)

# 查看栈顶
top_element = stack[-1]  # 20

# 出栈
popped_element = stack.pop()  # 20
```

## 2. 队列 (Queue)

队列是一种 **先进先出 (FIFO)** 的数据结构。为了实现 O(1) 的出队操作，**必须**使用 `collections.deque`，而不是普通 `list` (因为 `list.pop(0)` 是 O(n))。

|                  |                      |           |                |
| ---------------- | -------------------- | --------- | -------------- |
| **操作**           | **Python 方法**        | **时间复杂度** | **描述**         |
| **入队 (Enqueue)** | `deque.append(item)` | O(1)      | 添加元素到右侧        |
| **出队 (Dequeue)** | `deque.popleft()`    | O(1)      | 移除并返回左侧元素      |
| **查看队首**         | `my_queue[0]`        | O(1)      | 不移除，查看左侧元素     |
| **判空**           | `not my_queue`       | O(1)      | 队列为空时返回 `True` |

### 简洁代码示例

```python 
from collections import deque

# 初始化
queue = deque()

# 入队
queue.append(100)
queue.append(200)

# 查看队首
front_element = queue[0]  # 100

# 出队
dequeued_element = queue.popleft()  # 100
```

## 3. 堆 (Heap / Priority Queue)

堆是一种优先级队列，通常用于获取最大或最小元素。Python 的 `heapq` 模块默认实现 **最小堆 (Min-Heap)**。

|   |   |   |   |
|---|---|---|---|
|**操作**|**Python 方法**|**时间复杂度**|**描述**|
|**入堆**|`heapq.heappush(heap, item)`|O(logn)|将元素推入堆中|
|**出堆**|`heapq.heappop(heap)`|O(logn)|弹出并返回最小元素|
|**查看堆顶**|`heap[0]`|O(1)|不移除，查看最小元素|
|**最大堆 (Max-Heap) 实现**|存入元素的相反数|O(logn)|最小堆实现最大堆的技巧|

### 简洁代码示例

```python
import heapq

# 初始化 (默认是最小堆)
min_heap = []
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 1)
heapq.heappush(min_heap, 9)

# 最小堆弹出最小元素
min_val = heapq.heappop(min_heap)  # 1

# --- 最大堆实现技巧 ---
max_heap = []
# 存入相反数
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -1)
heapq.heappush(max_heap, -9)

# 弹出时取相反数即为最大值
max_val = -heapq.heappop(max_heap)  # 9
```

## 4. 并查集 (Disjoint Set / Union-Find)

并查集用于处理不相交集合的合并与查询操作，常用于图的连通性、最小生成树等。**路径压缩**和**按秩/大小合并**是核心优化手段。

|   |   |   |   |
|---|---|---|---|
|**核心操作**|**优化技巧**|**时间复杂度**|**描述**|
|**查找 (Find)**|路径压缩 (Path Compression)|接近 O(1)|查找元素所在集合的代表元 (根节点)|
|**合并 (Union)**|按秩/大小合并 (Union by Rank/Size)|接近 O(1)|将两个集合合并为一个|

### 简洁代码示例 (使用路径压缩和按大小合并)

```python
class UnionFind:
    """
    并查集实现 (使用路径压缩和按大小合并)
    """
    def __init__(self, n):
        # 初始化：每个元素的父节点是自身，集合大小为 1
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x):
        """
        查找操作 (带路径压缩)
        """
        # 如果 x 不是根节点，则递归查找，并将其父节点直接指向根节点
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """
        合并操作 (按大小合并)
        """
        rootX = self.find(x)
        rootY = self.find(y)

        if rootX != rootY:
            # 总是将小集合合并到大集合上，减少树的高度
            if self.size[rootX] < self.size[rootY]:
                rootX, rootY = rootY, rootX
            
            self.parent[rootY] = rootX
            self.size[rootX] += self.size[rootY]
            return True # 合并成功
        return False # 已经在同一集合

# --- 使用示例 ---
# 假设有 5 个元素 (0, 1, 2, 3, 4)
uf = UnionFind(5)

# 合并 0 和 1
uf.union(0, 1)

# 合并 2 和 3
uf.union(2, 3)

# 0 和 2 不在同一集合
print(uf.find(0) == uf.find(2)) # False

# 合并 1 和 3
uf.union(1, 3)

# 现在 0, 1, 2, 3 都在同一集合
print(uf.find(0) == uf.find(2)) # True
```
```

```

## 5. 常用基本数据类型操作

这一节总结了在算法题中经常用到的 **字符串 (str)、列表 (list)、字典 (dict)** 和 **集合 (set)** 的关键操作。

### 5.1 字符串 (String) 操作

|**操作**|**Python 方法/语法**|**时间复杂度**|**用途**|
|---|---|---|---|
|**切片**|`s[start:end:step]`|O(k) (k是切片长度)|获取子串，如反转 `s[::-1]`|
|**长度**|`len(s)`|O(1)|获取字符串长度|
|**查找/检查**|`'a' in s`|O(n)|检查字符或子串是否存在|
|**拼接**|`'分隔符'.join(list_of_strings)`|O(N) (总长度)|高效拼接列表中的字符串|
|**分割**|`s.split('分隔符')`|O(n)|按分隔符拆分成列表|

### 5.2 列表 (List) 操作 (数组)

|**操作**|**Python 方法/语法**|**时间复杂度**|**用途**|
|---|---|---|---|
|**初始化**|`[0] * n`|O(n)|初始化长度为 n 的列表|
|**排序**|`list.sort()` / `sorted(list)`|O(nlogn)|原地排序或返回新列表|
|**插入**|`list.insert(idx, item)`|O(n)|插入元素到指定索引|
|**删除**|`del list[idx]` / `list.pop(idx)`|O(n)|按索引删除元素|
|**列表推导式**|`[expr for item in iterable]`|取决于 `expr` 和 `iterable`|快速生成新列表|

### 5.3 字典 (Dictionary) 操作 (哈希表)

|**操作**|**Python 方法/语法**|**时间复杂度**|**用途**|
|---|---|---|---|
|**访问/设置**|`d[key] = value`|O(1)|访问或设置键值对|
|**安全访问**|`d.get(key, default_val)`|O(1)|访问不存在的键时不报错|
|**计数常用**|`d.get(k, 0) + 1`|O(1)|统计频率，简洁写法|
|**遍历**|`for k, v in d.items():`|O(n)|遍历所有键值对|

### 5.4 集合 (Set) 操作 (哈希集合)

| **操作**    | **Python 方法/语法**                  | **时间复杂度**               | **用途**          |
| --------- | --------------------------------- | ----------------------- | --------------- |
| **存在性检查** | `item in s`                       | O(1)                    | 判断元素是否存在 (核心优势) |
| **添加**    | `s.add(item)`                     | O(1)                    | 添加元素            |
| **安全删除**  | `s.discard(item)`                 | O(1)                    | 删除元素，若元素不存在不报错  |
| **交集**    | `s1 & s2` 或 `s1.intersection(s2)` | O(min(len(s1),len(s2))) | 两个集合的交集         |
| **并集**    | `s1 \| s2`或`s1.union(s2)`         | O(len(s1)+len(s2))      | 两个集合的并集         |
### 简洁代码示例

```python
# --- 列表/数组操作 ---
arr = [3, 1, 4, 1, 5, 9, 2]
arr.sort()  # 原地排序：[1, 1, 2, 3, 4, 5, 9]
reversed_arr = arr[::-1]  # 快速反转：[9, 5, 4, 3, 2, 1, 1]

# --- 字典 (哈希表) 操作 ---
freq = {}
for char in "banana":
    # 常用计数技巧
    freq[char] = freq.get(char, 0) + 1
# freq: {'b': 1, 'a': 3, 'n': 2}

# --- 集合 (哈希集合) 操作 ---
set1 = {1, 2, 3}
set2 = {3, 4, 5}

if 2 in set1:  # O(1) 检查
    set1.add(6)

intersection = set1 & set2  # {3}
union = set1 | set2  # {1, 2, 3, 4, 5, 6}
```
## 6. 核心算法模板

### 6.1 二分查找 (Binary Search)

用于在**有序数组**中高效查找元素，时间复杂度 O(logn)。

**模板 (查找第一个** ≥target **的元素)**

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    
    # 查找左边界 (最小的大于等于 target 的索引)
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] < target:
            left = mid + 1  # 目标在右侧
        else:
            # nums[mid] >= target
            # 可能是答案，但尝试找更左侧的
            right = mid - 1 # 目标在左侧
            
    # 如果查找的是 '插入位置' 或 '第一个大于等于 target 的位置'
    # 最终 left 即为答案
    return left
```

### 6.2 广度优先搜索 (BFS - Breadth-First Search)

常用于求最短路径或遍历树/图的每一层，需要使用队列 (`deque`) 和访问集合 (`set`)。

**模板 (图/树遍历)**

```python
from collections import deque

def bfs(graph, start_node):
    # 1. 初始化队列和访问集合
    queue = deque([start_node])
    visited = {start_node}
    
    # 2. 逐层遍历
    while queue:
        current_node = queue.popleft()
        
        # --- 核心处理逻辑 ---
        # print(f"Processing: {current_node}") 
        # ---------------------

        # 3. 探索邻居
        # graph 通常是字典或邻接列表
        for neighbor in graph.get(current_node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited
```

### 6.3 深度优先搜索 (DFS - Depth-First Search)

常用于遍历所有可能的路径、回溯问题、递归结构（如树的遍历）。通常使用**递归**实现。

**模板 (图/树遍历 - 递归)**

```python
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    if node in visited:
        return # 避免重复访问
        
    visited.add(node)
    
    # --- 核心处理逻辑 ---
    # print(f"Visiting: {node}") 
    # ---------------------

    # 递归访问邻居节点
    for neighbor in graph.get(node, []):
        dfs_recursive(graph, neighbor, visited)
    
    # 可以在这里添加回溯或后序遍历逻辑
    # print(f"Finished processing: {node}")

    return visited
```