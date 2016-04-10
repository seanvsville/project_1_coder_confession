/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/albums
function index(req, res) {
  // FILL ME IN !
}

function create(req, res) {
  // FILL ME IN !
}

function show(req, res) {
  // FILL ME IN !
}

// Delete a confession submission associated with an alias
// app.delete('/api/aliases/:aliasId/confessions/submission/:submissionId', controllers.confessions.destroy);
function destroy(req, res) {
  var submissionId = req.params.submissionId;
  db.Alias.findById(req.params.aliasId, function(err, foundAlias) {
    console.log('foundAlias: ', foundAlias);
    var trashedSubmission = foundAlias.confessions.id(req.params.submissionId);
    console.log('trashedSubmission: ', trashedSubmission);
/*    if (submissionId.length === 1) {
      return;
    }*/
    if (trashedSubmission) {
      trashedSubmission.remove();
      // save new alias with trashed submission
    foundAlias.save(function(err, saved) {
      console.log('Deleted ', trashedSubmission.name, 'from', saved.submission);
      res.json(trashedSubmission);
    });
    }
   else {res.send(404);}
  });
}

// Update submission
// app.put('/api/aliases/:aliasId/confessions/submission/:submissionId', controllers.confessions.update);
function update(req, res) {




}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
