const fetch = require('node-fetch');

const app = require('./app.js');

const URL = 'http://localhost:3000/v1';


test('app module should be defined', () => {
    expect(app).toBeDefined();
});

test('GET / should return 200 (using fetch)', () => {
    return fetch(URL).then(response => {
        expect(response.status).toBe(200);
    });
});

test('POST /assignments should return 201 with valid data', () => {
    let postBody = {
        taskId: 'pitagora',
        assignmentId: 'giugno',
        workerId: 'giacomo',
        assignmentResult: {}
    };
    return fetch(URL + '/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
    }).then(response => {
        expect(response.status).toBe(201);
    });
});