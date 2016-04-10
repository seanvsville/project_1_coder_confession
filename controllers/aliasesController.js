/************
 * DATABASE *
 ************/

var db = require('../models');

// GET /api/aliases
function index(req, res) {
  db.Alias.find({}, function(err, allAliases) {
    if (err) { return console.log('does not compute' + err);}
    res.json(allAliases);
  });
}

// POST /api/aliases
// app.post('/api/aliases', controllers.aliases.create);
function create(req, res) {
  // set the value of the new Alias
  var newAlias = {
    name: req.body.name,
    emailAddress: req.body.emailAddress
  };

  db.Alias.find(newAlias, function isFound(err, found) {
    if (err) {return console.log('ERR1: ', err);}
    // if found is empty, create new alias with confession
    if(found.length===0) {
      console.log('This is a new alias, creating a new db entry...');
      // Create new alias in database with key: values from submitted forms (newAlias)
      db.Alias.create(newAlias, function newAliasCreated(err, createdAlias) {
        if (err) {return console.log('ERR2: ', err);}
        console.log('Created new Alias');
        // push new alias and push new instance of sub.schema key:value pair for submission
        createdAlias.confessions.push(new db.Confession({submission: req.body.confession }));
        console.log('New Confessions: ', createdAlias.confessions);
        // save new alias and set as finalAlias to be sent back to client side as JSON object
        createdAlias.save(function sendJSON(err, finalAlias) {
          if (err) {return console.log('ERR3: ', err);}
          console.log('Successfully added confession and sending whole new alias');
          res.json(finalAlias);
        });
      });
    }
    // if found (alias) already exists, attach confession to existing alias
    else if (found[0]._id) {
      // Set alias Id as a variable and set to foundAlias variable
      var aliasId = found[0]._id;
      console.log('aliasId: ', aliasId);
      db.Alias.findById(aliasId)
      .populate('confession')
      .exec(function (err, foundAlias) {
        console.log('foundAlias: ', foundAlias);
        if (err) {return console.log('ERR4: ', err);}
        else {
          //Drill down into confessions of foundAlias and push new instance of sub.schema key:value pair for submission
          foundAlias.confessions.push(new db.Confession({submission: req.body.confession }));
          foundAlias.save();
          res.json(foundAlias);
        }
      });
    }
  });
}

function show(req, res) {
  // FILL ME IN !
}

// Delete entire alias (alias, email, confession)
// app.delete('/api/aliases/:aliasId/', controllers.alias.destroy);
function destroy(req, res) {
  console.log('alias to delete: ', req.params.aliasId);
  var aliasId = req.params.aliasId;
// find the index of the alias we want to delete
    db.Alias.findOneAndRemove({ _id: aliasId }, function (err, deletedAlias) {
    res.json(deletedAlias);
    });
}

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
