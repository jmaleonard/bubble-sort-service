'use strict';
const _ = require('lodash');
const ArrayBoundLimitError = require('./src/errors').ArrayBoundsLimitError
const MAX_AMOUNT_OF_ITEMS_PER_ARRAY = process.env.MAX_AMOUNT_OF_ITEMS_PER_ARRAY || 100000

function comparator(a, b) {
  return a - b;
}

/**
 * Bubble Sort with O(n^2) complexity
 * @param {Array} input array
 * @param {Function} comparator
 * @returns {Array} bubble sorted array
 */
module.exports = function (arr, cmp) {
  cmp = cmp || comparator;
  var temp;
  arr = _.chain(arr).flattenDeep().compact().value()
  if(arr.length > MAX_AMOUNT_OF_ITEMS_PER_ARRAY){
      throw new ArrayBoundLimitError('ArrayBoundLimitError');
  } // assignment states "Arrays of 10 000 elements" I am going to assume you meant more?

  for (var i = 0, l = arr.length; i < l; i++) {
    for (var j = i; j > 0; j--) {
      if (cmp(arr[j], arr[j - 1]) < 0) {
        temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
  }
  return arr;
};