const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bubbleSort = require('./bubblesort');
const port = process.env.BUBBLE_SORT_PORT || 8000

app.post('/bubblesort', (req, res) => {
  let array;
  console.log('process.env.BUBBLE_SORT_ARRAY', process.env.BUBBLE_SORT_ARRAY)
  if (process.env.BUBBLE_SORT_ARRAY) {
    array = process.env.BUBBLE_SORT_ARRAY;
    let sortedArray = bubbleSort(array);
    console.log('*******SORTED ARRAY**********')
    console.log(sortedArray);
    console.log('******* WE ARE DONE CHEERS **********')
    process.exit(0)
  } else {
    array = req.body.unsortedArray;
  }
  if (!Array.isArray(array)) {
    res.status(500).send('Body is not of type array');
    return;
  }
  let sortedArray = bubbleSort(array);
  res.status(200).send(sortedArray);
});

app.listen(port);
