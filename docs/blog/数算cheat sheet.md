# CS201 2026 Spring Cheat Sheet (Python)

## 1. Python 竞赛速查

### 1.1 I/O 与通用头

```python
import sys

# 1. 快速输入
input = sys.stdin.readline  # 替换标准 input

# 2. 快速输出 (通常 print 足够快，但在海量输出时使用)
sys.stdout.write(str(result) + '\n')

# 3. 修改递归深度 (Python 默认递归深度仅 1000，DFS 必备)
sys.setrecursionlimit(200000)

# 4. 处理不定行输入 (Read until EOF)
# 场景：题目没说有多少组数据，要求读到文件结束为止

# 方法 A: 逐行读取 (推荐)
for line in sys.stdin:
    line = line.strip()
    if not line: continue # 防止空行干扰
    # process(line)
    
# 方法 B: 一次性读取 (适合小数据或整体处理)
lines = sys.stdin.read().splitlines()

# 5. 不定输入
try:
    datas = sys.stdin.read().split()
    iterator = iter(datas)
    n = int(next(iterator))
except StopIteration:
    sys.exit()
```

### 1.2 容器与库

```python
# list
a = [0] * n
g = [[] for _ in range(n)]      # 二维/邻接表别用 [[]]*n
a.sort(key=lambda x: (x[0], -x[1]))

# dict / set
d = {}
val = d.get(x, 0) # 安全获取，默认为0
d.keys() d.values() d.items()

s = set()
s.add(4) s.discard(5)       # 安全删除，不存在不报错 (remove 会报错)
s1 & s2  # 交集
s1 | s2  # 并集
s1 - s2  # 差集(在s1不在s2)
s1 ^ s2  # 对称差集(不同时存在的元素)

# Counter / defaultdict
cnt = Counter(a) # 返回一个可以当字典用的Counter对象
g = defaultdict(list)
g[u].append(v)

# deque
q = deque([start])
q.append(x); q.appendleft(x)
x = q.popleft(); y = q.pop()

# heapq: 小顶堆；大顶堆存负数
h = []
heappush(h, (dist, node))
dist, node = heappop(h)

# bisect
i = bisect_left(a, x)   # first >= x
j = bisect_right(a, x)  # first > x
```

### 1.3 字符串、数字、位运算

```python
ord('A')          # 65
chr(65)           # 'A'
s.strip().split()
" ".join(words)
s[::-1]           # 反转
f"{x:.2f}"        # 保留小数
s.replace('l', 'x') # 替换所有 (注意：字符串不可变，返回新串)
s.isdigit()      # 是否全为数字
s.lower() / s.upper() # 大小写转换

bin(x), oct(x), hex(x)
bin(x)[2:].zfill(10) #十进制转二进制并补全10位
int("1010", 2)    # 二进制转十进制
pow(a, b, mod)    # O(log b)
isqrt(n)          # 整数平方根
```

```python
mask | (1 << i)       # 置 1
mask & ~(1 << i)      # 置 0
mask ^ (1 << i)       # 翻转
(mask >> i) & 1       # 取位
mask & (mask - 1)     # 去最低位 1
mask.bit_count()      # 1 的个数
mask.bit_length()     # 二进制位数
```

### 1.4 常见小模板

```python
# 离散化
vals = sorted(set(a))
rank = {x: i for i, x in enumerate(vals)}
b = [rank[x] for x in a]
```

## 2. 线性结构与基础算法

### 2.1 前缀和 / 差分

适用：区间和、子矩阵和、静态多次查询。预处理 O(n)，查询 O(1)。

```python
# 1D prefix: sum(l..r), 0-based inclusive
pre = [0]
for x in a:
    pre.append(pre[-1] + x)
range_sum = pre[r + 1] - pre[l]

# 2D prefix: grid n*m, sum rectangle [r1..r2][c1..c2]
n, m = len(grid), len(grid[0])
ps = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(n):
    row = 0
    for j in range(m):
        row += grid[i][j]
        ps[i + 1][j + 1] = ps[i][j + 1] + row

def rect(r1, c1, r2, c2):
    return ps[r2+1][c2+1] - ps[r1][c2+1] - ps[r2+1][c1] + ps[r1][c1]

# 差分：多次区间加，最后还原
diff = [0] * (n + 1)
diff[l] += v
if r + 1 < n:
    diff[r + 1] -= v
cur = 0
for i in range(n):
    cur += diff[i]
    a[i] += cur
```

### 2.2 双指针 / 滑动窗口

适用：连续子数组/子串，窗口性质可随右端点扩张、左端点收缩。通常 O(n)。

```python
# 最长无重复子串
def longest_unique(s):
    last, left, ans = {}, 0, 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        ans = max(ans, right - left + 1)
    return ans

# 最小长度子数组使 sum >= target (正数数组)
def min_len_subarray(a, target):
    left = total = 0
    ans = 10**18
    for right, x in enumerate(a):
        total += x
        while total >= target:
            ans = min(ans, right - left + 1)
            total -= a[left]
            left += 1
    return 0 if ans == 10**18 else ans
```

### 2.3 二分答案

适用：最小化最大值、最大化最小值、可行性单调。复杂度 O(check * log 值域)。

```python
# 找最大 x 使 check(x) 为 True
L, R = 0, 10**18
ans = -1
while L <= R:
    mid = (L + R) // 2
    if check(mid):
        ans = mid
        L = mid + 1
    else:
        R = mid - 1
print(ans)

# 小数版本
L, R = 0.0, max(S)
ans = 0.0
for _ in range(80): # 从while改成有限次二分
    mid = (L + R) / 2
    if check(mid):
        ans = mid
        L = mid
    else:
        R = mid
print(f"{ans:.3f}") # 保留指定位数
```

### 2.4 栈：括号、路径、碰撞、表达式

```python
# 中缀转后缀：数字可多位，运算符 + - * /，括号
def infix_to_postfix(expr):
    pri = {'+': 1, '-': 1, '*': 2, '/': 2}
    st, out, num = [], [], ''
    for ch in expr.replace(' ', ''):
        if ch.isdigit() or ch == '.':
            num += ch
        else:
            if num:
                out.append(num); num = ''
            if ch == '(':
                st.append(ch)
            elif ch == ')':
                while st and st[-1] != '(':
                    out.append(st.pop())
                st.pop()
            elif ch in pri:
                while st and st[-1] != '(' and pri[st[-1]] >= pri[ch]:
                    out.append(st.pop())
                st.append(ch)
    if num:
        out.append(num)
    while st:
        out.append(st.pop())
    return out

def eval_postfix(tokens):
    st = []
    for t in tokens:
        if t not in '+-*/':
            st.append(float(t))
        else:
            b, a = st.pop(), st.pop()
            st.append({'+': a+b, '-': a-b, '*': a*b, '/': a/b}[t])
    return st[-1]
```

### 2.5 单调栈 / 单调队列

适用：下一个更大/更小元素、矩形面积、滑动窗口最大值。O(n)。

```python
# 右侧第一个更大元素
def next_greater(a):
    n = len(a)
    ans = [-1] * n
    st = []  # index, values decreasing
    for i, x in enumerate(a):
        while st and x > a[st[-1]]:
            ans[st.pop()] = x
        st.append(i)
    return ans

# 柱状图最大矩形
def largest_rectangle(heights):
    h = heights + [0]
    st = [-1]
    ans = 0
    for i, x in enumerate(h):
        while st[-1] != -1 and h[st[-1]] > x:
            height = h[st.pop()]
            width = i - st[-1] - 1
            ans = max(ans, height * width)
        st.append(i)
    return ans

# 滑动窗口最大值
def sliding_max(a, k):
    q, ans = deque(), []
    for i, x in enumerate(a):
        while q and q[0] <= i - k:
            q.popleft()
        while q and a[q[-1]] <= x:
            q.pop()
        q.append(i)
        if i >= k - 1:
            ans.append(a[q[0]])
    return ans
```

### 2.6 归并排序 / 逆序对

使用二分归并的方法进行排序，顺便可求出逆序对数量。O(nlogn)

```python
def inv(arr, L, R):
    if R - L <= 1: return 0
    l, m, r = L, (L+R)//2, R
    cnt = inv(arr, l, m) + inv(arr, m, r)

    i, j, tmp = l, m, []
    while i < m and j < r:
        if arr[i] > arr[j]:
            tmp.append(arr[j])
            cnt += m-i
            j += 1
        else:
            tmp.append(arr[i])
            i += 1
    while i < m:
        tmp.append(arr[i])
        i += 1
    while j < r:
        tmp.append(arr[j])
        j += 1
    arr[L:R] = tmp
    return cnt
```

### 2.7 链表

```python
# 反转链表
def reverse(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev

# 快慢指针判环
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

# 找中点
def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```



## 3. 树

### 3.1 表示、建树、遍历

树题常见输入：`parent -> children` 或边表。要先找根：没有父亲的点。

```python
# 边表建有根树：输入 child, parent
children = [[] for _ in range(n + 1)]
has_parent = [False] * (n + 1)
for child, parent in edges:
    children[parent].append(child)
    has_parent[child] = True
root = next(i for i in range(1, n + 1) if not has_parent[i])
```

```python
# 二叉树节点
class Node:
    __slots__ = ("val", "left", "right")
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

def preorder(root):
    if not root: return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def inorder(root):
    if not root: return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def postorder(root):
    if not root: return []
    return postorder(root.left) + postorder(root.right) + [root.val]

def level_order(root):
    if not root: return []
    q, ans = deque([root]), []
    while q:
        u = q.popleft()
        ans.append(u.val)
        if u.left: q.append(u.left)
        if u.right: q.append(u.right)
    return ans
```

### 3.2 经典递归应用

```python

def tree_depth(root):
    if not root:
        return 0
    return 1 + max(tree_depth(root.left), tree_depth(root.right))

def count_leaves(root):
    if not root:
        return 0
    if not root.left and not root.right:
        return 1
    return count_leaves(root.left) + count_leaves(root.right)
```

### 3.3 由遍历序列建树

```python
# preorder + inorder
def build_pre_in(pre, ino):
    pos = {x: i for i, x in enumerate(ino)} # 记录中序表达式中每个值的索引
    def rec(pl, pr, il, ir): # 包含l，不包含r
        if pl >= pr:
            return None
        root = Node(pre[pl])
        k = pos[pre[pl]]
        left_len = k - il
        root.left = rec(pl + 1, pl + 1 + left_len, il, k)
        root.right = rec(pl + 1 + left_len, pr, k + 1, ir)
        return root
    return rec(0, len(pre), 0, len(ino))

# postorder + inorder
def build_post_in(post, ino):
    pos = {x: i for i, x in enumerate(ino)}
    def rec(pl, pr, il, ir):
        if pl >= pr:
            return None
        root = Node(post[pr - 1])
        k = pos[post[pr - 1]]
        left_len = k - il
        root.left = rec(pl, pl + left_len, il, k)
        root.right = rec(pl + left_len, pr - 1, k + 1, ir)
        return root
    return rec(0, len(post), 0, len(ino))
```

### 3.4 括号表达式建二叉树

适用：`A(B(C,D),E)`、括号嵌套树。O(n)。

```python
def parse_tree(s):
    if not s:
        return None
    st, root, cur = [], None, None
    side = None
    for ch in s:
        if ch.isalnum():
            node = Node(ch)
            if not root:
                root = node
            elif st:
                if side == 'L':
                    st[-1].left = node
                else:
                    st[-1].right = node
            cur = node
        elif ch == '(':
            st.append(cur)
            side = 'L'
        elif ch == ',':
            side = 'R'
        elif ch == ')':
            st.pop()
    return root
```

### 3.5 Huffman编码

```python
from heapq import heapify, heappop, heappush

def huffman_wpl(weights):
    h = weights[:]
    heapify(h)
    ans = 0
    while len(h) > 1:
        a = heappop(h)
        b = heappop(h)
        s = a + b
        ans += s
        heappush(h, s)
    return ans
```

### 3.6 二叉堆

数组下标 0-based：`left=2*i+1, right=2*i+2, parent=(i-1)//2`。

二叉堆实现思路：

- 插入元素：放在列表最后后sift up。
- 弹出元素：交换第一个与最后一个元素，pop最后一个元素后对第一个元素sift down，也即一直和子节点中较小的那一个交换。
- 建堆：从最后一个非叶子节点开始，依次向前做sift down操作。下标：`n//2-1`

### 3.7 BST（二叉搜索树）

```python
def bst_insert(root, x):
    if not root:
        return Node(x)
    if x < root.val:
        root.left = bst_insert(root.left, x)
    elif x > root.val:
        root.right = bst_insert(root.right, x)
    return root

def bst_search(root, x):
    while root and root.val != x:
        root = root.left if x < root.val else root.right
    return root is not None

# BST 中序有序；第 k 小
def kth_smallest(root, k):
    st = []
    while st or root:
        while root:
            st.append(root); root = root.left
        root = st.pop()
        k -= 1
        if k == 0:
            return root.val
        root = root.right
```

### 3.8 树形 DP：父子约束最大权独立集

适用：父子不能同时选、树上最大独立集。O(n)。

```python
def tree_independent_set(n, weight, rel):
    # weight[1..n], rel: (child, parent)
    ch = [[] for _ in range(n + 1)]
    has_parent = [False] * (n + 1)
    for u, p in rel:
        ch[p].append(u)
        has_parent[u] = True
    root = next(i for i in range(1, n + 1) if not has_parent[i])

    dp0 = [0] * (n + 1)  # u 不来
    dp1 = [0] * (n + 1)  # u 来
    order, st = [], [root]
    while st:
        u = st.pop()
        order.append(u)
        st.extend(ch[u])
    for u in reversed(order):
        dp1[u] = weight[u]
        for v in ch[u]:
            dp0[u] += max(dp0[v], dp1[v])
            dp1[u] += dp0[v]
    return max(dp0[root], dp1[root])
```

### 3.9 LCA

```python
# 朴素版本，每次查询O(n)
def lca(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lca(root.left, p, q)
    right = lca(root.right, p, q)

    if left and right:
        return root

    return left if left else right

# 倍增版本，预处理O(nlogn)，查询O(logn)
fa = [[0] * 20 for _ in range(N+1)]
depth = [0] * (N+1)
def dfs(u, p):
    depth[u] = depth[p] + 1
    fa[u][0] = p
    for i in range(1, 20):
        fa[u][i] = fa[fa[u][i-1]][i-1]
    for j in edges[u]:
        if j != p:
            dfs(j, u)
dfs(S, 0) # S为根节点

def lca(u, v):
    if depth[u] < depth[v]:
        u, v = v, u

    for i in range(19, -1, -1):
        if depth[fa[u][i]] >= depth[v]:
            u = fa[u][i]
        if depth[u] == depth[v]: break

    if u == v:
        return u
    for i in range(19, -1, -1):
        if fa[u][i] != fa[v][i]:
            u = fa[u][i]
            v = fa[v][i]
    return fa[u][0]
```

### 3.10 Trie 前缀树

适用：前缀匹配、字典检索、异或类题。插入/查询 O(字符串长度)。

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = 0      # 有多少个单词在这里结束

class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    # 插入一个单词
    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.end += 1

    # 查询单词是否存在
    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.end > 0

    # 查询是否存在某个前缀
    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True
```

### 3.11 并查集 DSU

适用：连通性、等价关系、Kruskal、动态加边统计连通点对。近似 O(1)/次。

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) # 路径压缩
        return self.parent[x]

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        # 按秩合并
        if self.rank[ra] < self.rank[rb]:
            self.parent[ra] = rb
        elif self.rank[ra] > self.rank[rb]:
            self.parent[rb] = ra
        else:
            self.parent[rb] = ra
            self.rank[ra] += 1
        return True
```

### 3.12 带权/带势能 DSU

适用：约束 `dist[y]-dist[x]=w`、相对关系判矛盾。O(alpha n)。

```python
class weightedDSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
        self.diff = [0] * n  # value[x] - value[parent[x]]

    def find(self, x):
        if self.parent[x] != x:
            root = self.find(self.parent[x])
            self.diff[x] += self.diff[self.parent[x]]
            self.parent[x] = root
        return self.parent[x]
	
    def weight(self, x):
        self.find(x)
        return self.diff[x]
    
    def union(self, x, y, w): # impose value[y] - value[x] = w
        rx, ry = self.find(x), self.find(y)
        wx, wy = self.weight(x), self.weight(y)
        if rx == ry:
            return wy - wx == w
        # 按秩合并
        if self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
            self.diff[rx] = wy - wx - w
        else:
            self.parent[ry] = rx
            self.diff[ry] = wx + w - wy
            if self.rank[rx] == self.rank[ry]:
                self.rank[rx] += 1
            
        return True
```

### 3.13 树状数组

单点加，前缀和 / 区间和查询。

```python
class BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, i, delta):
        # a[i] += delta
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def sum(self, i):
        # return a[1] + ... + a[i]
        res = 0
        while i > 0:
            res += self.tree[i]
            i -= i & -i
        return res

    def range_sum(self, l, r):
        # return a[l] + ... + a[r]
        return self.sum(r) - self.sum(l - 1)
```

### 3.14 线段树

单点修改，区间和查询。

```python
class SegTree:
    def __init__(self, a):
        # a: 0-based
        self.n = len(a)
        self.tree = [0] * (4 * self.n)
        self.build(a, 1, 0, self.n - 1)

    def build(self, a, node, l, r):
        if l == r:
            self.tree[node] = a[l]
            return

        mid = (l + r) // 2
        self.build(a, node * 2, l, mid)
        self.build(a, node * 2 + 1, mid + 1, r)

        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def update(self, idx, val):
        # a[idx] = val
        self._update(1, 0, self.n - 1, idx, val)

    def _update(self, node, l, r, idx, val):
        if l == r:
            self.tree[node] = val
            return

        mid = (l + r) // 2
        if idx <= mid:
            self._update(node * 2, l, mid, idx, val)
        else:
            self._update(node * 2 + 1, mid + 1, r, idx, val)

        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def query(self, ql, qr):
        # sum a[ql..qr]
        return self._query(1, 0, self.n - 1, ql, qr)

    def _query(self, node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return self.tree[node]

        mid = (l + r) // 2
        ans = 0

        if ql <= mid:
            ans += self._query(node * 2, l, mid, ql, qr)
        if qr > mid:
            ans += self._query(node * 2 + 1, mid + 1, r, ql, qr)

        return ans
```

区间加，区间和查询。

```python
class LazySegTree:
    def __init__(self, a):
        self.n = len(a)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self.build(a, 1, 0, self.n - 1)

    def build(self, a, node, l, r):
        if l == r:
            self.tree[node] = a[l]
            return

        mid = (l + r) // 2
        self.build(a, node * 2, l, mid)
        self.build(a, node * 2 + 1, mid + 1, r)

        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def push_down(self, node, l, r):
        if self.lazy[node] == 0:
            return

        mid = (l + r) // 2
        val = self.lazy[node]

        left = node * 2
        right = node * 2 + 1

        self.tree[left] += val * (mid - l + 1)
        self.tree[right] += val * (r - mid)

        self.lazy[left] += val
        self.lazy[right] += val

        self.lazy[node] = 0

    def range_add(self, ql, qr, val):
        self._range_add(1, 0, self.n - 1, ql, qr, val)

    def _range_add(self, node, l, r, ql, qr, val):
        if ql <= l and r <= qr:
            self.tree[node] += val * (r - l + 1)
            self.lazy[node] += val
            return

        self.push_down(node, l, r)

        mid = (l + r) // 2
        if ql <= mid:
            self._range_add(node * 2, l, mid, ql, qr, val)
        if qr > mid:
            self._range_add(node * 2 + 1, mid + 1, r, ql, qr, val)

        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def query(self, ql, qr):
        return self._query(1, 0, self.n - 1, ql, qr)

    def _query(self, node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return self.tree[node]

        self.push_down(node, l, r)

        mid = (l + r) // 2
        ans = 0

        if ql <= mid:
            ans += self._query(node * 2, l, mid, ql, qr)
        if qr > mid:
            ans += self._query(node * 2 + 1, mid + 1, r, ql, qr)

        return ans
```

## 4. 图论

### 4.1 二分图染色

```python
def isBipartite(graph):
    n = len(graph)
    color = [-1] * n
    for i in range(n):
        if color[i] != -1: continue

        q = deque([i])
        color[i] = 0
        while q:
            u = q.popleft()
            for v in graph[u]:
                if color[v] == -1:
                    color[v] = color[u] ^ 1
                    q.append(v)
                elif color[u] == color[v]:
                    return False

    return True
```

### 4.2 骑士周游 

Warnsdorff 算法，每一步优先走向“下一步可选出口最少”的格子。

```python
def knight_tour(n, m, sx, sy):
    """
    n, m: 棋盘大小 n 行 m 列
    sx, sy: 起点，0-based
    返回路径 path，若失败返回 None
    """

    dirs = [
        (1, 2), (2, 1), (2, -1), (1, -2),
        (-1, -2), (-2, -1), (-2, 1), (-1, 2)
    ]

    visited = [[False] * m for _ in range(n)]
    path = []

    def degree(x, y):
        """统计从 (x, y) 出发还能走到多少个未访问格子"""
        cnt = 0
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if inside(nx, ny) and not visited[nx][ny]:
                cnt += 1
        return cnt

    def dfs(x, y, step):
        visited[x][y] = True
        path.append((x, y))

        if step == n * m:
            return True

        candidates = []

        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 0 <= x < n and 0 <= y < m and not visited[nx][ny]:
                candidates.append((degree(nx, ny), nx, ny))

        # Warnsdorff 核心：优先走 degree 最小的格子
        candidates.sort()

        for _, nx, ny in candidates:
            if dfs(nx, ny, step + 1):
                return True

        visited[x][y] = False
        path.pop()
        return False

    if dfs(sx, sy, 1):
        return path
    return None
```

### 4.3 拓扑排序

适用：依赖关系、课程安排、DAG 动态规划、关键路径。O(V+E)。

```python
def topo_sort(n, g):
    indeg = [0] * n
    for u in range(n):
        for v in g[u]:
            indeg[v] += 1
    q = deque([i for i in range(n) if indeg[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return order if len(order) == n else None # 判环
```

### 4.4 最短路

```python
# 0-1 BFS: 边权只有 0/1，O(E+v)
def bfs(n, g, s):
    dist = [inf] * n
    dist[s] = 0
    dq = deque([s])
    while dq:
        u = dq.popleft()
        for v, w in g[u]:
            nd = dist[u] + w
            if nd < dist[v]:
                dist[v] = nd
                if w == 0:
                    dq.appendleft(v)
                else:
                    dq.append(v)
    return dist

# 朴素Dijkstra，O(V^2+E)
def dijkstra_bfs(graph, start):
    dist = [INF] * len(graph)
    dist[start] = 0
    visited = [False] * len(graph)
    
    n = len(graph)
    for _ in range(n):
        u = -1
        for i in range(n):
            if not visited[i] and (u == -1 or dist[i] < dist[u]):
                u = i

        if u == -1: break
        
        visited[u] = True
        for v, w in graph[u]:
            if dist[v] > dist[u] + w:
                dist[v] = dist[u] + w
        
    return dist
                
    
# 堆优化Dijkstra，O(ElogV)
def dijkstra_heap(graph, start, end):
    dist = [INF] * len(graph)
    dist[start] = 0

    queue = [(0, start)]
    while queue:
        cost, u = heapq.heappop(queue)
        if cost > dist[u]: continue
        if u == end: break

        for v, w in graph[u]:
            if dist[v] > dist[u] + w:
                dist[v] = dist[u] + w
                heapq.heappush(queue, (dist[v], v))

    return dist

# Bellman-Ford: 可有负边，可判负环，O(VE)
def bellman_ford(n, edges, start):
    dist = [INF] * n
    dist[start] = 0

    for _ in range(n-1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # 如果经过n-1轮松弛，还可以更小，则说明有负环。
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return None

    return dist

# SPFA: 队列优化的Bellman-Ford，但最坏仍为O(VE)
def spfa(graph, n, start):
    dist = [INF] * n
    dist[start] = 0
    cnt = [0] * n

    in_queue = [False] * n

    q = deque([start])
    in_queue[start] = True

    while q:
        u = q.popleft()
        in_queue[u] = False

        for v, w in graph[u]:
            if dist[v] > dist[u] + w:
                dist[v] = dist[u] + w
                cnt[v] = cnt[u] + 1

                # 最小路只需n-1轮，因此如果一条路走了超过n轮，说明一定有负环。
                if cnt[v] >= n:
                    return None

                if not in_queue[v]:
                    q.append(v)
                    in_queue[v] = True
    return dist

# Floyd-Warshall: 用于求多源最短路，O(V^3)
def floyd_warshall(edges, n):
    dist = [[INF] * n for _ in range(n)]

    for i in range(n):
        dist[i][i] = 0

    for u, v, w in edges:
        dist[u][v] = min(dist[u][v], w)

    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    return dist
```

### 4.5 最小生成树 MST

```python
# Kruskal O(ElogE)
def kruskal(n, edges):
    dsu = DSU(n)
    total = 0
    cnt = 0
    for w, u, v in sorted(edges):
        if dsu.union(u, v):
            total += w
            cnt += 1
            if cnt == n - 1:
                break
    return total if cnt == n - 1 else None  # None 表示不连通

# Prim: 适合邻接表 O(ElogE)
def prim(n, g, start=0):
    visited = [False] * n
    h = [(0, start)]
    total = cnt = 0
    while h and cnt < n:
        w, u = heappop(h)
        if visited[u]:
            continue
        visited[u] = True
        total += w
        cnt += 1
        for v, c in g[u]:
            if not visited[v]:
                heappush(h, (c, v))
    return total if cnt == n else None
```

### 4.6 SCC 强连通分量：Tarjan

适用：有向图缩点、最终 SCC、软件安装依赖。O(V+E)。**记得开递归深度！**

```python
def tarjan(n, edges):
    adj = [[] for _ in range(n+1)]
    for u, v in edges:
        adj[u].append(v)

    dfn = [0] * (n+1)
    low = [0] * (n+1)
    in_stack = [False] * (n+1)
    stack = []
    timer = 0
    sccs = []

    def dfs(u):
        nonlocal timer
        timer += 1
        dfn[u] = low[u] = timer
        stack.append(u)
        in_stack[u] = True

        for v in adj[u]:
            if dfn[v] == 0:
                dfs(v)
                low[u] = min(low[u], low[v])
            elif in_stack[v]:
                low[u] = min(low[u], dfn[v])

        if dfn[u] == low[u]:
            current_scc = []
            while True:
                node = stack.pop()
                in_stack[node] = False
                current_scc.append(node)
                if node == u:
                    break
            sccs.append(current_scc)

    for i in range(1, n+1):
        if dfn[i] == 0:
            dfs(i)

    return sccs

```

### 4.7 关键路径

```python
def critical_path(n, edges):
    graph = [[] for _ in range(n + 1)]
    indeg = [0] * (n + 1)
    for u, v, w in edges:
        graph[u].append((v, w))
        indeg[v] += 1
    # 1. 拓扑排序
    q = deque()
    for i in range(1, n + 1):
        if indeg[i] == 0:
            q.append(i)
    topo = []
    while q:
        u = q.popleft()
        topo.append(u)

        for v, w in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    if len(topo) != n:
        return None   # 图中有环
    # 2. 计算 ve：事件最早发生时间
    ve = [0] * (n + 1)
    for u in topo:
        for v, w in graph[u]:
            ve[v] = max(ve[v], ve[u] + w)
    project_time = max(ve[1:])
    # 3. 计算 vl：事件最晚发生时间
    vl = [project_time] * (n + 1)
    for u in reversed(topo):
        for v, w in graph[u]:
            vl[u] = min(vl[u], vl[v] - w)
    # 4. 找关键活动
    critical_edges = []
    for u, v, w in edges:
        e = ve[u]
        l = vl[v] - w
        if e == l:
            critical_edges.append((u, v, w))

    return project_time, ve, vl, critical_edges
```

### 4.8 补图BFS

可在O(V+E)内求出补图的连通块，对稀疏图尤其有效。

```python
def complement_bfs(n, adj):
    unvis = set(range(1, n+1))
    cnt = 0
    while unvis:
        cnt += 1
        start = unvis.pop()
        q = deque([start])

        while q:
            u = q.popleft()

            nxt_unvis = set()
            for v in unvis:
                if v in adj[u]:
                    nxt_unvis.add(v)
                else:
                    q.append(v)

            unvis = nxt_unvis
        
    return cnt
```

### 4.9 最短 Hamilton 路径

适用：n <= 20 左右。复杂度 O(2^n n^2)。

```python
def tsp(dist):
    n = len(dist)
    INF = 10**18
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0
    for mask in range(1 << n):
        for u in range(n):
            if not (mask >> u) & 1:
                continue
            cur = dp[mask][u]
            if cur == INF:
                continue
            for v in range(n):
                if not (mask >> v) & 1:
                    nm = mask | (1 << v)
                    dp[nm][v] = min(dp[nm][v], cur + dist[u][v])
    full = (1 << n) - 1
    return min(dp[full][u] + dist[u][0] for u in range(n))
```

### 4.10 欧拉图

**欧拉路径**：经过每条边恰好一次，点可以重复；**欧拉回路**：起点和终点相同的欧拉路径。

**判断条件**：

有向欧拉回路：所有点 in_degree == out_degree，并且边所在部分连通。

有向欧拉路径：所有点连通，最多一个点 out_degree = in_degree + 1，作为起点；最多一个点 in_degree = out_degree + 1，作为终点；其他点 in_degree == out_degree。

```python
def directed_euler_path(n, edges):
    """
    n: 点数，0-based
    edges: [(u, v), ...]
    返回欧拉路径上的点序列 path
    若不存在，返回 None
    """

    g = [[] for _ in range(n)]
    indeg = [0] * n
    outdeg = [0] * n

    for u, v in edges:
        g[u].append(v)
        outdeg[u] += 1
        indeg[v] += 1
	
    # 如果是要按字典序排序，需要先对邻接表排序。注意由于后面是pop()，所以需要倒序排序
    for u in g:
        g[u].sort(reverse=True)
    
    start = -1
    plus = minus = 0

    for i in range(n):
        if outdeg[i] - indeg[i] == 1:
            plus += 1
            start = i
        elif indeg[i] - outdeg[i] == 1:
            minus += 1
        elif indeg[i] != outdeg[i]:
            return None

    if not ((plus == 1 and minus == 1) or (plus == 0 and minus == 0)):
        return None

    # 如果是欧拉回路，从任意有出边的点出发
    if start == -1:
        for i in range(n):
            if outdeg[i] > 0:
                start = i
                break

    # 没有边
    if start == -1:
        return []

    path = []
    def dfs(u):
        while g[u]:
            v = g[u].pop()
            dfs(v)
        path.append(u)
    
    dfs(start)

    path.reverse()

    if len(path) != len(edges) + 1:
        return None

    return path
```

## 5. 数学与杂项

```python
# 埃氏筛 O(n log log n)
def sieve(n):
    is_prime = [True] * (n + 1)
    if n >= 0: is_prime[0] = False
    if n >= 1: is_prime[1] = False
    for i in range(2, isqrt(n) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n + 1) if is_prime[i]]

# 快速幂
def fast_pow(a, b, mod=None):
    res = 1
    while b:
        if b & 1:
            res = res * a if mod is None else res * a % mod
        a = a * a if mod is None else a * a % mod
        b >>= 1
    return res

# math库
math.gcd(a, b)      # 最大公约数
math.lcm(a, b)      # 最小公倍数 (Python 3.9+)
math.ceil(x)        # 向上取整
math.floor(x)       # 向下取整
math.perm(n, k)     # 排列 A(n, k)
math.comb(n, k)     # 组合 C(n, k)
math.isqrt(n)       # 整数平方根 (比 int(n**0.5) 更精确)
```
