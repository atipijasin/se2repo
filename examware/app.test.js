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

test('POST /assignments then GET the assignment with the same ID should return 200', () => {
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
        return fetch(URL + '/assignments/' + postBody.assignmentId).then(response => {
            expect(response.status).toBe(200);
        });
    });
});

test('POST /assignments then PUT (update) the assignment with the same ID should return 200', () => {
    let postBody = {
        taskId: 'pitagora',
        assignmentId: 'giugno',
        workerId: 'giacomo',
        assignmentResult: {}
    };

    let putBody = {
        taskId: 'scherzavo xD',
        assignmentId: 'giugno',
        workerId: 'cambiotutto',
        assignmentResult: {}
    };

    return fetch(URL + '/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
    }).then(response => {
        expect(response.status).toBe(201);
        return fetch(URL + '/assignments/' + postBody.assignmentId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(putBody)
        }).then(response => {
            expect(response.status).toBe(200);
        });
    });
});

test('POST /assignments then DELETE the assignment with the same ID should return 200', () => {
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
        return fetch(URL + '/assignments/' + postBody.assignmentId, {
            method: 'DELETE'
        }).then(response => {
            expect(response.status).toBe(200);
        });
    });
});

// INVALID INPUTS

test('POST /assignments with a wrong taskid type should return 400', () => {
    let postBody = {
        taskId: 1,
        assignmentId: 'giugno',
        workerId: 'giacomo',
        assignmentResult: {}
    };
    return fetch(URL + '/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
    }).then(response => {
        expect(response.status).toBe(400);
    });
});

test('POST /assignments with a wrong assignmentId type should return 400', () => {
    let postBody = {
        taskId: 'pitagora',
        assignmentId: 2,
        workerId: 'giacomo',
        assignmentResult: {}
    };
    return fetch(URL + '/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
    }).then(response => {
        expect(response.status).toBe(400);
    });
});

