// Simple index controller
var indexController = {

  // Handle incoming requests for the '/' route
  index: function(req, res){

    // Since this route requires authentication,
    // called out in app.js, we have access to the
    // logged-in user's document from the database
    // via the injected "req.user" variable
    res.render('index', {
      user: req.user
    });
  }
};

// Export our index control
module.exports = indexController;