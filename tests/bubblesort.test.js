'use strict';

const callback = require('./helpers').callback;
const context = require('./helpers').context;
const bubbleSort = require('../bubblesort');


test('Bubble sort sorts', () => {
  let unsortedArray = [6, 2, [4, 3],[[[5], null], 1]];
  let sorted = bubbleSort(unsortedArray);
  expect(sorted).toEqual([1,2,3,4,5,6])
});