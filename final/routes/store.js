
var items = {
    Menu2:{name:'All you can eat page 2', code:'Next Page'},
    
};


exports.home = function(req, res) {
    if (typeof req.session.username == 'undefined') res.render('home', { title: 'Team Elysion^o^'});
    else res.redirect('/menus');
};


exports.home_post_handler = function(req, res) {
    
    username = req.body.username || 'Visitor';
    school = req.body.school || ' $25 per person';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};

// handler for displaying the items
exports.items = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('courses', { title: 'The Elysion- Courses', username: req.session.username, items:items });
};

// handler for displaying individual items
exports.item = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = items[req.params.id].name;
        var code = items[req.params.id].code;
        res.render('course', { title: 'Team Elysion^o^ ' + name, username: req.session.username, name:name, code:code });
    }
};

// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var nick = {about: 'Admin: '};
    var brain = {about: 'No customer comment yet.Would you like to be first one to post a comment? '};
    var bill = {about: '2013, Apr 10'};
    res.render('page', { title: 'Team Elysion^o^ ' + name, username: req.session.username, developer1:nick[name], developer2: brain[name], developer3: bill[name]});
};
