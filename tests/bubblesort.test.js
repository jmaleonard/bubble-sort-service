'use strict';

const bubbleSort = require('../bubblesort');
const _ = require('lodash');
const ArrayBoundsLimitError = require('../src/errors').ArrayBoundsLimitError;

let getArrayWithNumberOfElements = (N) => {
  let array = [];
  function getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  for(let x = 0; x <= N; x++){
    array.push(getRandomInt())
  }
  return array;
}


test('Bubble sort sorts', () => {
  let unsortedArray = [6, 2, [4, 3],[[[5], null], 1]];
  let sorted = bubbleSort(unsortedArray);
  expect(sorted).toEqual([1,2,3,4,5,6])
});

test('Ensure that our bubble sorts, also passes based on lodash sort', () => {
  let unsortedArray = getArrayWithNumberOfElements(100);
  let sorted = bubbleSort(unsortedArray);
  expect(sorted).toEqual(_.sortBy(unsortedArray))
})

test('Test Error is Thrown', () => {
  let unsortedArray = getArrayWithNumberOfElements(1000000);
  expect(() => bubbleSort(unsortedArray)).toThrow(ArrayBoundsLimitError)
})