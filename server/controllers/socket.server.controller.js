/**
 * Created by admin on 10/12/2016.
 */
module.exports=function(io){
    var users=[];
io.on('connection',function(socket){
    socket.on('nickNameWritten',function(nickname){
        console.log(nickname);
        users.push({'nickname':nickname,'id':socket.id})
        io.emit('user:join',{'msg':nickname+' has just joined','online':users.length-1});
    });

    socket.on('send message',function(data){
        console.log(data);
        socket.broadcast.emit('receive message',data);
    });
    socket.on('disconnect',function(){
        var result = users.filter(function( obj ) {
            return obj.id == socket.id;
        });

        console.log(result);
        if(result[0])
        {
            users.splice(users.indexOf(result[0]),1);
            io.emit('user:left',{'name':result[0].nickname,'online':users.length});

        }
    })
})

};