import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expectedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(values)).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c'];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
