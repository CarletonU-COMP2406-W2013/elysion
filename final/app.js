var express = require('express')
  , http = require('http')
  , path = require('path');

var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;

var store = store = require('./routes/store');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

var articleProvider = new ArticleProvider('localhost', 27017);

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', store.home);
app.post('/', store.home_post_handler);

app.get('/menus', store.items);

app.get('/item/:id', store.item);

app.get('/addCourse', function(req, res){
    res.render('addCourse.jade', {title: 'Add course'});
});


app.get('/posts', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('def.jade', {title: 'Current Posts',
                articles:docs});
    })
});

app.get('/blog/new', function(req, res) {
    res.render('blog_new.jade', {title: 'New Post'});
});


app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body'),
        cc: req.param('cc'),
   }, function( error, docs) {
        res.redirect('/posts/n')
    });
});


app.get('/page', store.page);

app.get('/blog/new', function(req, res) {
    res.render('blog_new.jade', {title: 'New Post'});
});

app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body'),
        cc: req.param('cc'),
   }, function( error, docs) {
        res.redirect('/posts')
    });
});

app.get('/blog/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('blog_show.jade', {title: article.title,
            article:article});
    });
});

app.get('/home', function(req, res) {
    delete req.session.username;
    res.redirect('/');
});
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
