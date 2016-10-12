/**
 * Created by admin on 10/12/2016.
 */
var express=require('express');
var path=require('path');

var app= express();
var server=require('http').Server(app);
var io= new require('socket.io')(server);
require(path.resolve('server/controllers/socket.server.controller.js'))(io);

var indexRoute=require(path.resolve('server/routes/index.route.js'));
app.use('/',indexRoute);
app.use('/bower_components',express.static(path.join(__dirname, '/bower_components')));
app.use('/public',express.static(path.join(__dirname, '/public')));

server.listen(5000,function(){
    console.log('listening');
});