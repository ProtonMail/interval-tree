export enum Direction {
    LEFT,
    RIGHT,
    NIL
}

export enum Color {
    RED,
    BLACK,
    NIL
}

export type SearchResult = [number, number, string];

export type MaybeLinkedListNode = LinkedListNode | undefined

export interface LinkedListNode {
    next: MaybeLinkedListNode;
    high: number;
    id: string;
}

export enum LinkedListResult {
    DELETE_NODE,
    KEEP_NODE,
    NOT_FOUND
}

export interface TreeNode {
    key: number;
    color: Color;

    parent: TreeNode;
    right: TreeNode;
    left: TreeNode;

    max: number;
    high: number;
    //id: string;
    list: LinkedListNode;
}

export interface Tree {
    root: TreeNode;
    count: number;
}
