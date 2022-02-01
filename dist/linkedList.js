import { LinkedListResult } from './types';
export const addNode = (treeNode, high, id) => {
    let node = treeNode.list;
    if (!node) {
        treeNode.list = { id, high, next: undefined };
        return true;
    }
    let prevNode;
    while (node) {
        if (node.id === id) {
            // Already exists.
            return false;
        }
        if (high > node.high) {
            break;
        }
        prevNode = node;
        node = node.next;
    }
    if (!prevNode) {
        treeNode.list = { id, high, next: node };
    }
    if (prevNode) {
        prevNode.next = { id, high, next: prevNode.next };
    }
    return true;
};
export const removeNode = (treeNode, high, id) => {
    let node = treeNode.list;
    let prevNode;
    while (node) {
        if (high > node.high) {
            return LinkedListResult.NOT_FOUND;
        }
        if (node.id === id) {
            // There are multiple items in the linked list. Delete the current one.
            if (prevNode) {
                prevNode.next = node.next;
                return LinkedListResult.KEEP_NODE;
            }
            // Only one item in the linked list. The node should be removed.
            if (!prevNode && !node.next) {
                return LinkedListResult.DELETE_NODE;
            }
            // First item to delete.
            if (!prevNode && node.next) {
                treeNode.list = node.next;
                return LinkedListResult.KEEP_NODE;
            }
        }
        prevNode = node;
        node = node.next;
    }
    return LinkedListResult.NOT_FOUND;
};
