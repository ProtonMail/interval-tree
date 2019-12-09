import { Color, LinkedListResult, MaybeLinkedListNode, SearchResult, Tree, TreeNode } from './types';
import { addNode as addLinkedListNode, removeNode as removeLinkedListNode } from './linkedList';

export const NULL_NODE: TreeNode = {
    key: 0,
    max: 0,
    high: 0,
    color: Color.NIL,

    // @ts-ignore
    parent: undefined,
    // @ts-ignore
    right: undefined,
    // @ts-ignore
    left: undefined,

    // @ts-ignore
    list: undefined
};

NULL_NODE.parent = NULL_NODE;
NULL_NODE.left = NULL_NODE;
NULL_NODE.right = NULL_NODE;

const updateMax = (node: TreeNode) => {
    const max = node.high;

    if (node.left === NULL_NODE && node.right === NULL_NODE) {
        node.max = max;
    }
    else if (node.left === NULL_NODE) {
        node.max = Math.max(node.right.max, max);
    }
    else if (node.right === NULL_NODE) {
        node.max = Math.max(node.left.max, max);
    }
    else {
        node.max = Math.max(Math.max(node.left.max, node.right.max), max);
    }
};

const updateMaxUp = (node: TreeNode) => {
    let x = node;
    while (x.parent != NULL_NODE) {
        updateMax(x.parent);
        x = x.parent;
    }
};

const searchNode = (x: TreeNode, key: number) => {
    while (x !== NULL_NODE && key !== x.key) {
        if (key < x.key) {
            x = x.left;
        } else {
            x = x.right;
        }
    }
    return x;
};

const rotateLeft = (tree: Tree, x: TreeNode) => {
    if (x.right == NULL_NODE) {
        return
    }
    const y = x.right;
    x.right = y.left;
    if (y.left !== NULL_NODE) {
        y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === NULL_NODE) {
        tree.root = y;
    } else {
        if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
    }
    y.left = x;
    x.parent = y;

    updateMax(x);
    updateMax(y);
};

const rotateRight = (tree: Tree, x: TreeNode) => {
    if (x.left == NULL_NODE) {
        return
    }
    const y = x.left;
    x.left = y.right;
    if (y.right !== NULL_NODE) {
        y.right.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === NULL_NODE) {
        tree.root = y;
    } else {
        if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
    }
    y.right = x;
    x.parent = y;

    updateMax(x);
    updateMax(y);
};


const rbTransplant = (tree: Tree, u: TreeNode, v: TreeNode) => {
    if (u.parent === NULL_NODE) {
        tree.root = v;
    } else if (u === u.parent.left) {
        u.parent.left = v;
    } else {
        u.parent.right = v;
    }
    v.parent = u.parent;
};

const rbDeleteFixup = (tree: Tree, x: TreeNode) => {
    let w;
    while (x !== NULL_NODE && x.color === Color.BLACK) {
        if (x === x.parent.left) {
            w = x.parent.right;
            if (w.color === Color.RED) {
                w.color = Color.BLACK;
                x.parent.color = Color.RED;
                rotateLeft(tree, x.parent);
                w = x.parent.right;
            }
            if (w.left.color === Color.BLACK && w.right.color === Color.BLACK) {
                w.color = Color.RED;
                x = x.parent;
            }
            else {
                if (w.right.color === Color.BLACK) {
                    w.left.color = Color.BLACK;
                    w.color = Color.RED;
                    rotateRight(tree, w);
                    w = x.parent.right;
                }
                w.color = x.parent.color;
                x.parent.color = Color.BLACK;
                w.right.color = Color.BLACK;
                rotateLeft(tree, x.parent);
                x = tree.root;
            }
        } else {
            w = x.parent.left;

            if (w.color === Color.RED) {
                w.color = Color.BLACK;
                x.parent.color = Color.RED;
                rotateRight(tree, x.parent);
                w = x.parent.left;
            }
            if (w.right.color === Color.BLACK && w.left.color === Color.BLACK) {
                w.color = Color.RED;
                x = x.parent;
            }
            else {
                if (w.left.color === Color.BLACK) {
                    w.right.color = Color.BLACK;
                    w.color = Color.RED;
                    rotateLeft(tree, w);
                    w = x.parent.left;
                }
                w.color = x.parent.color;
                x.parent.color = Color.BLACK;
                w.left.color = Color.BLACK;
                rotateRight(tree, x.parent);
                x = tree.root;
            }
        }
    }
    x.color = Color.BLACK;
};

const minimumTree = (x: TreeNode) => {
    while (x.left !== NULL_NODE) {
        x = x.left;
    }
    return x;
};

const deleteNode = (tree: Tree, key: number, high: number, id: string) => {
    const z = searchNode(tree.root, key);

    if (z === NULL_NODE) {
        return;
    }
    const linkedListResult = removeLinkedListNode(z, high, id);
    if (linkedListResult === LinkedListResult.NOT_FOUND) {
        return;
    }
    if (linkedListResult === LinkedListResult.KEEP_NODE) {
        z.high = z.list.high;
        updateMax(z);
        updateMaxUp(z);
        tree.count -= 1;
        return;
    }

    let y = z;
    let originalYColor = y.color;
    let x;
    if (z.left === NULL_NODE) {
        x = z.right;
        rbTransplant(tree, z, z.right);
    } else if (z.right === NULL_NODE) {
        x = z.left;
        rbTransplant(tree, z, z.left);
    } else {
        y = minimumTree(z.right);
        originalYColor = y.color;
        x = y.right;
        if (y.parent === z) {
            x.parent = y;
        } else {
            rbTransplant(tree, y, y.right);
            y.right = z.right;
            y.right.parent = y;
        }
        rbTransplant(tree, z, y);
        y.left = z.left;
        y.left.parent = y;
        y.color = z.color;
    }
    updateMax(x);
    updateMaxUp(x);
    if (originalYColor === Color.BLACK) {
        rbDeleteFixup(tree, x);
    }
    tree.count -= 1;

};

const rbInsertFixup = (tree: Tree, z: TreeNode) => {
    let y;
    while (z.parent.color === Color.RED) {
        if (z.parent === z.parent.parent.left) {
            y = z.parent.parent.right;

            if (y.color === Color.RED) {
                z.parent.color = Color.BLACK;
                y.color = Color.BLACK;
                z.parent.parent.color = Color.RED;
                z = z.parent.parent;
            } else {
                if (z === z.parent.right) {
                    z = z.parent;
                    rotateLeft(tree, z);
                }
                z.parent.color = Color.BLACK;
                z.parent.parent.color = Color.RED;
                rotateRight(tree, z.parent.parent);
            }
        } else {
            y = z.parent.parent.left;

            if (y.color === Color.RED) {
                z.parent.color = Color.BLACK;
                y.color = Color.BLACK;
                z.parent.parent.color = Color.RED;
                z = z.parent.parent;
            } else {
                if (z === z.parent.left) {
                    z = z.parent;
                    rotateRight(tree, z);
                }
                z.parent.color = Color.BLACK;
                z.parent.parent.color = Color.RED;
                rotateLeft(tree, z.parent.parent);
            }

        }
    }
    tree.root.color = Color.BLACK;
};

const addNode = (tree: Tree, key: number, high: number, id: string) => {
    let y = NULL_NODE;
    let x = tree.root;

    while (x !== NULL_NODE) {
        y = x;
        if (key === y.key) {
            break;
        }
        if (key < x.key) {
            x = x.left;
        } else {
            x = x.right;
        }
    }

    if (key === y.key && y !== NULL_NODE) {
        if (!addLinkedListNode(y, high, id)) {
            return;
        }
        y.high = Math.max(y.high, high);
        updateMax(y);
        updateMaxUp(y);
        tree.count += 1;
        return;
    }

    const z: TreeNode = {
        key,
        color: Color.RED,

        parent: y,
        left: NULL_NODE,
        right: NULL_NODE,

        max: high,
        high,
        list: {
            id,
            high,
            next: undefined
        }
    };

    if (y === NULL_NODE) {
        tree.root = z;
    } else {
        if (z.key < y.key) {
            y.left = z;
        } else {
            y.right = z;
        }
        updateMaxUp(z);
    }

    rbInsertFixup(tree, z);
    tree.count += 1;
};

const search = (root: TreeNode, low: number, high: number, results: SearchResult[]) => {
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.pop() as TreeNode

        if (node === NULL_NODE || low > node.max) {
            continue;
        }

        if (node.left !== NULL_NODE) {
            stack.push(node.left)
        }

        if (node.right !== NULL_NODE) {
            stack.push(node.right)
        }

        if (node.key <= high && node.high >= low) {
            let linkedListNode: MaybeLinkedListNode = node.list;
            while (linkedListNode && linkedListNode.high >= low) {
                results.push([node.key, linkedListNode.high, linkedListNode.id]);
                linkedListNode = linkedListNode.next;
            }
        }
    }
};

export default (tree = { root: NULL_NODE, count: 0 }) => {
    return {
        insert: (low: number, high: number, id: string) => {
            if (low > high) {
                throw new Error(`${low} > ${high} for ${id}`);
            }
            addNode(tree, low, high, id);
        },
        remove: (low: number, high: number, id: string) => {
            deleteNode(tree, low, high, id);
        },
        search: (low: number, high: number): SearchResult[] => {
            const results: SearchResult[] = [];
            search(tree.root, low, high, results);
            return results;
        },
        getCount: () => tree.count,
        getRoot: () => tree.root
    }
}
