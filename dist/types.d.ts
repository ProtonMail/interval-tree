export declare enum Direction {
    LEFT = 0,
    RIGHT = 1,
    NIL = 2
}
export declare enum Color {
    RED = 0,
    BLACK = 1,
    NIL = 2
}
export declare type SearchResult = [number, number, string];
export declare type MaybeLinkedListNode = LinkedListNode | undefined;
export interface LinkedListNode {
    next: MaybeLinkedListNode;
    high: number;
    id: string;
}
export declare enum LinkedListResult {
    DELETE_NODE = 0,
    KEEP_NODE = 1,
    NOT_FOUND = 2
}
export interface TreeNode {
    key: number;
    color: Color;
    parent: TreeNode;
    right: TreeNode;
    left: TreeNode;
    max: number;
    high: number;
    list: LinkedListNode;
}
export interface Tree {
    root: TreeNode;
    count: number;
}
