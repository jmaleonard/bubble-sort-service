#!/bin/bash
echo 'VERSION 0.0.2'
cd bubble-sort-service
if [ -n "${BUBBLE_SORT_ARRAY}" ]; then
    echo "RUNNING BUBBLE SORT PROVIDED ARRAY"
    echo "PROVIDED ARRAY ${BUBBLE_SORT_ARRAY}"
    node index.js
else 
    echo "STARTING BUBBLE SORT SERVICE AT PORT 8000"
    node index.js
fi