// client-side js

// sets the 'messages to pi' count
const setCount = count => document.querySelector('.msg-count').innerHTML = count;

// get count from endpoint
fetch('/count')
    .then(res => res.json())
    .then(json => setCount(json.count));