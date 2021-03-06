const express = require('express');
const faker = require('faker');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const minDelay = 1000;
const maxDelay = 3000;


// the mock data has fake email ids just for fun.
let a = Array.from(Array(100), (_, i) => i + 1);

const inboxEmails = a.map(n => ({
    from: faker.internet.email(),
    to: 'me',
    subject: `subject ${n}`,
    message: `message ${n}`,
    mailId: `i${n}`
}));

const sentEmails = a.map(n => ({
    from: 'me',
    to: faker.internet.email(),
    subject: `subject ${n}`,
    message: `message ${n}`,
}));

app.use(cors());
app.use(bodyParser.json());


sendWithRandomDelay = (res, data) =>
    setTimeout(() => res.send(data), minDelay + Math.floor(Math.random() * (maxDelay - minDelay)));

app.get('/api/inbox', (req, res) => {
    sendWithRandomDelay(res, inboxEmails);
})

app.get('/api/sent', (req, res) => {
    sendWithRandomDelay(res, sentEmails);
})

app.post('/api/login', (req, res) => {
    if (req.body.username === 'ivp' && req.body.password === 'ivp') {
        sendWithRandomDelay(res, {
            'status': 'success',
            'user': 'ivp',
            'email': 'ivp@ivp.com'
        });
    } else sendWithRandomDelay(res, {
        'status': 'failure'
    });
});
app.post('/api/deleteMailInInbox', (req, res) => {
    const trashEmails = [];
    req.body.checkMail.map((id) => {
        
        let x = inboxEmails.findIndex((s) => { return s.mailId == id });
        if (x !== -1) {
            trashEmails.push(inboxEmails[x]);
            inboxEmails.splice(x, 1);
        }
    });
    res.send(trashEmails);
  });
app.listen(3005,(req,res)=>{console.log("server is started")});