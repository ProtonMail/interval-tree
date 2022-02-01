import { SearchResult, TreeNode } from './types';
export declare const NULL_NODE: TreeNode;
declare const _default: (tree?: {
    root: TreeNode;
    count: number;
}) => {
    insert: (low: number, high: number, id: string) => void;
    remove: (low: number, high: number, id: string) => void;
    search: (low: number, high: number) => SearchResult[];
    getCount: () => number;
    getRoot: () => TreeNode;
};
export default _default;
