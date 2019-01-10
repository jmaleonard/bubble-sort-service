const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bubbleSort = require('./bubblesort');
const port = process.env.BUBBLE_SORT_PORT || 8000

if (process.env.BUBBLE_SORT_ARRAY) {
  let array = parseStringToArray(process.env.BUBBLE_SORT_ARRAY);
  try {
    let sortedArray = bubbleSort(array);
    console.log('*******SORTED ARRAY**********')
    console.log(sortedArray);
    console.log('******* WE ARE DONE CHEERS **********')
    process.exit(0)
  }
  catch (e) {
    if (e.message === 'ArrayBoundsLimit') {
      console.log('Array is greater than 10000');
      process.exit(1);
    }
    console.log(e);
    console.trace(e);
  }

  app.post('/bubblesort', (req, res) => {
    try {
      let array;
      array = req.body.unsortedArray;
      if (!Array.isArray(array)) {
        res.status(500).send('Body is not of type array');
      }
      let sortedArray = bubbleSort(array);
      res.status(200).send(sortedArray);
    } catch (e) {
      if (e.message === 'ArrayBoundsLimit') {
        res.status(500).send('Array is greater than 10000');
      }
    }
  });

  app.listen(port);

  function parseStringToArray(stringArray) {
    try {
      return JSON.parse("[" + stringArray + "]");
    }
    catch (e) {
      console.log(e);
      console.trace(e);
      throw Error(e);
    }
  }
