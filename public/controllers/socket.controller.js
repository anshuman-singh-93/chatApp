/**
 * Created by admin on 10/12/2016.
 */
var app=angular.module('chatApp',[]);

app.controller('socketController',['$scope',function($scope){

    var vm=this;
    vm.showNickName=true;
    var nickname;
    vm.nickName='';
    vm.online=0;
    var socket = io();
    socket.on('receive message',function(data){
        var myEl = angular.element( document.querySelector( '#user_list' ) );
        myEl.append('<div class="clearfix myE1Child" ><blockquote class="you pull-left" >'+data.message+'<span style="font-size: 12px;"> -'+data.nickname+'</span></blockquote></div>');
    });
    socket.on('user:join',function(data){
        console.log('joined');
        var myEl = angular.element( document.querySelector( '#user_list' ) );
        myEl.append('<div class="clearfix myE1Child"><blockquote class="you pull-left" >'+data.msg+''+'</blockquote></div>');
        vm.online=data.online
        $scope.$apply();

    });

    socket.on('user:left',function(data){
        console.log(name);
        var myEl = angular.element( document.querySelector( '#user_list' ) );

        myEl.append('<div class="clearfix myE1Child"><blockquote class="you ">'+data.name+' has left'+'</blockquote></div>');
        vm.online=data.online
        $scope.$apply();
    });


    vm.nicknameSubmit=function(){
        socket.emit('nickNameWritten',vm.nickName);
        vm.showNickName=false;
        nickname=vm.nickName;



    };
    vm.msgSubmit=function(){
        console.log('msg submitting');
        socket.emit('send message',{'nickname':nickname,'message':vm.message});
        var myEl = angular.element( document.querySelector( '#user_list' ) );

        myEl.append('<div class="clearfix myE1Child" ><blockquote class="me pull-right">'+vm.message+'</blockquote></div>');


    };
}]);