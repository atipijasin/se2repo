const db = []

const postAssignment = (req, res) => {
    let assignment = {
        taskId: req.body.taskId,
        assignmentId: req.body.assignmentId,
        workedId: req.body.workerId,
        assignmentResult: req.body.assignmentResult
    };

    if (typeof (assignment.taskId) !== 'string'
        || typeof (assignment.assignmentId) !== 'string'
        || typeof (assignment.workedId) !== 'string'
        || typeof (assignment.assignmentResult) === 'undefined') {
        res.status(400).end();
        return 'Assignment not found';
    } else {
        db.push(assignment);
        res.status(201).json(assignment);
        return assignment;
    }
}

const getAssignment = (req, res) => {
    var i;
    for (i = 0; i < db.length; i++) {
        if (db[i].assignmentId == req.params.assignmentId) {
            res.status(200).json(db[i]);
            return;
        }
    }
    res.sendStatus(404);
}

const putAssignment = (req, res) => {
    var i;
    let assignment = {
        taskId: req.body.taskId,
        assignmentId: req.body.assignmentId,
        workedId: req.body.workerId,
        assignmentResult: req.body.assignmentResult
    };

    for (i = 0; i < db.length; i++) {
        if (db[i].assignmentId == req.params.assignmentId) {
            db[i] = assignment;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

const deleteAssignment = (req, res) => {
    var i;
    for (i = 0; i < db.length; i++) {
        if (db[i].assignmentId == req.params.assignmentId) {
            db.splice(i, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

module.exports = { postAssignment, getAssignment, putAssignment, deleteAssignment };