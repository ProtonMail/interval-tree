# Interval tree

Augemented red-black tree with support for operations on dynamic sets of intervals

Based on interval tree described in Introduction to Algorithms Third Edition, published by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein.

## API

### import

Creates an interval tree

```js
import createIntervalTree from 'interval-tree';

const tree = createIntervalTree();
```

### insert(low, high, id)

Inserts an interval into the tree

```js
tree.insert(10, 15, '123');
```

### remove(low, high, id)

Removes an interval from the tree

```js
tree.remove(10, 15, '123');
```

### search(low, high)

Searches overlapping intervals in an inclusive range

```js
const results = tree.search(10, 15);
```
Where `results` is an array of matching intervals, where each item is an array of 3 items:
```js
[low, high, id]
```
