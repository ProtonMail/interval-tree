import createIntervalTree from '../lib/index';

const toList = (linkedListNode) => {
    const result = [];
    while (linkedListNode) {
        result.push(linkedListNode.id);
        linkedListNode = linkedListNode.next;
    }
    return result;
};

describe('linked list', () => {
    it('should add and remove from linked list', () => {
        const tree = createIntervalTree();
        tree.insert(8, 8, 'a');
        tree.insert(8, 8, 'b');
        tree.insert(8, 8, 'c');
        expect(toList(tree.getRoot().list)).toEqual(['a', 'b', 'c']);

        tree.remove(8, 8, 'c');
        expect(toList(tree.getRoot().list)).toEqual(['a', 'b']);

        tree.remove(8, 8, 'a');
        expect(toList(tree.getRoot().list)).toEqual(['b']);

        tree.remove(8, 8, 'b');
        expect(toList(tree.getRoot().list)).toEqual([]);
    });
});
