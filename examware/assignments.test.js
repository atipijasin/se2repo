var assignments = require('./assignments.js');

test('postAssignment module should be defined', () => {
    expect(assignments.postAssignment).toBeDefined();
});

test('getAssignment module should be defined', () => {
    expect(assignments.getAssignment).toBeDefined();
});

test('putAssignment module should be defined', () => {
    expect(assignments.putAssignment).toBeDefined();
});

test('deleteAssignment module should be defined', () => {
    expect(assignments.deleteAssignment).toBeDefined();
});