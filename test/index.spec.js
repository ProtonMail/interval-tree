import createIntervalTree from '../lib/index';

const toIdSorted = (result) => result.map(([,,id]) => id).sort();

const shuffle = (original) => {
    const array = original.concat();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const expectSearch = (records, tree, low, high) => {
    const expectation = records.filter((record) => {
        if (!record) {
            return false;
        }
        const [otherLow, otherHigh] = record;
        return otherLow <= high && otherHigh >= low;
    });

    expect(toIdSorted(tree.search(low, high)).join(','))
        .toEqual(toIdSorted(expectation).join(','));
};

describe('tree', () => {
    it('should insert and find', () => {
        const x = [
            [ 3, 4, '0' ],
            [ 6, 15, '1' ],
            [ 7, 10, '2' ],
            [ 5, 5, '3' ],
            [ 8, 11, '4' ],
            [ 0, 10, '5' ],
            [ 9, 11, '6' ],
        ];

        const tree = createIntervalTree();
        for (const [low, high, id] of x) {
            tree.insert(low, high, id);
        }
        const sortedResult = toIdSorted(tree.search(9, 11)).join(',');
        expect(sortedResult).toEqual('1,2,4,5,6');
    });

    it('should insert, remove, and find', () => {
        const tree = createIntervalTree();

        const list  =[
            [15, 23, 'a'],
            [ 8,  9, 'b'],
            [25, 30, 'c'],
            [19, 20, 'd'],
            [16, 21, 'e'],
            [ 5,  8, 'f'],
            [26, 26, 'g'],
            [ 0, 21, 'h'],
            [17, 19, 'i'],
            [ 6, 10, 'j']
        ];

        for (const [low, high, id] of list) {
            tree.insert(low, high, id);
        }

        const results = [
            [0, 30, 'abcdefghij'],
            [7, 8, 'bfhj'],
            [0, 1, 'h'],
            [-2, -1, '']
        ];

        for (let i = 0; i < 10000; ++i) {
            for (const [low, high, id] of shuffle(list)) {
                tree.remove(low, high, id);
            }

            expect(tree.getCount()).toBe(0);

            for (const [low, high, id] of shuffle(list)) {
                tree.insert(low, high, id);
            }

            expect(tree.getCount()).toBe(10);

            for (const [low, high, result] of results) {
                expect(toIdSorted(tree.search(low, high)).join('')).toEqual(result);
            }
        }
    });

    it('should insert and remove multiple', () => {
        const tree = createIntervalTree();

        const records = [];

        for (let i = 0; i < 1000; ++i) {
            const low = getRandomInt(0, 100);
            const high = getRandomInt(low, low + getRandomInt(0, 100));
            const id = '' + i;

            records.push([low, high, id]);

            tree.insert(low, high, id);

            expectSearch(records, tree, low, high);
            expect(tree.getCount()).toBe(records.length);
        }

        const toRemove = shuffle(records.concat());
        for (let i = 0; i < toRemove.length; ++i) {
            const [low, high, id] = toRemove[i];
            toRemove[i] = undefined;

            tree.remove(low, high, id);

            expectSearch(toRemove, tree, low, high);
            for (let j = 0; j < 100; ++j) {
                const low = getRandomInt(0, 100);
                const high = getRandomInt(low, low + getRandomInt(0, 100));
                expectSearch(toRemove, tree, low, high);
            }
            expect(tree.getCount()).toBe(records.length - i - 1);
        }
    });

    it('should insert and remove multiple randomly', () => {
        const list = [];
        const tree = createIntervalTree();
        let id = 0;

        const removeAnItem = (list, tree) => {
            if (list.length === 0) {
                return;
            }
            const idx = getRandomInt(0, list.length - 1);
            const item = list[idx];
            list.splice(idx, 1);
            tree.remove(item[0], item[1], item[2]);
        };

        const addAnItem = (list, tree) => {
            const low = getRandomInt(0, 100);
            const record = [low, low + getRandomInt(0, 100), '' + (++id)];
            list.push(record);
            tree.insert(record[0], record[1], record[2]);
        };

        for (let i = 0; i < 1000; ++i) {
            const action = getRandomInt(0, 3);
            if (action === 0) {
                removeAnItem(list, tree);
            }
            if (action === 1) {
                addAnItem(list, tree);
            }
            expect(list.length).toEqual(tree.getCount());
            for (let j = 0; j < 10; ++j) {
                const low = getRandomInt(0, 100);
                const high = low + getRandomInt(0, 100);
                expectSearch(list, tree, low, high);
            }
        }
    });
});
