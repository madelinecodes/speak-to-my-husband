// server.js
// an express app that allows messages to be saved into a queue and retrieved

// ~~ db ~~ 
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({
    data: '[]',
    msgCount: 0
}).write(); // if file not exist, set data to empty

// ~~ express ~~
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));                     // to support URL-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies

// add message to queue
const saveMsg = (content, from) => {
    const msg = {
        content: content,
        from: from,
        date: Date.now()
    }
    let state = JSON.parse(db.get('data'));
    state.unshift(msg);
    db.set('data', JSON.stringify(state)).write();
}

// get message from queue
const readMsg = content => {
    let msgs = JSON.parse(db.get('data'));
    if (msgs.length === 0) {
        return false;
    }
    const lastIdx = msgs.length - 1;
    const msg = msgs[lastIdx];
    db.set('data', JSON.stringify(msgs.splice(0, lastIdx))).write();
    return msg;
};

// count messages
const countMsg = () => db.update('msgCount', n => n + 1).write();

// homepage
app.get('/', (request, response) => response.sendFile(__dirname + '/views/index.html'));

// store messages
app.post('/save', (request, response) => {
    saveMsg(request.body.content, request.body.from);
    countMsg();
    response.redirect('/');
});

// allow pi to read messages
app.post('/read', (request, response) => {
    if (request.body.password !== process.env.SECRET) {
        return response.status(400).send('Bad password!');
    }
    const msg = readMsg();
    if (msg === false) {
        return response.status(204).send();
    }
    response.send(msg);
});

// report message count
app.get('/count', (request, response) => response.send({
    count: db.get('msgCount')
}));

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});