/// <reference path="typings/node/node.d.ts"/>
module.exports = (function(App){
    var express = require('express');
    var miniApp = express();
    var Command = App.Command(App);
    var path = require('path');

    function mcmsNodePagesServiceProvider(){
        this.packageName = 'mcmsNodePages';

        this.services = {};
        this.controllers = {};
        this.adminModule = __dirname + '/admin-package.json';
        this.viewsDir = __dirname + '/views';
        this.baseFolder = '/';

        App.dbLoader[App.Config.database.default].loadModels(__dirname + '/Models/' + App.Config.database.default);

        miniApp.on('mount', function (parent) {
            console.log('Pages Mounted');//parent is the main app
        });
        
        this.modelRelationships = require('./Models/model-relationships');
        App.Services[this.packageName] = App.Helpers.services.loadService(__dirname + '/Services',null,this);

        if (App.CLI){
            var commandFolder = path.join(__dirname , '../bin/Command/');
            Command.registerCommand([
            ]);

            return;
        }

        App.Controllers[this.packageName] = App.Helpers.services.loadService(__dirname + '/Controllers',true,this);
        miniApp.use(express.static(__dirname + '/public'));
        App.viewEngine.registerTemplates(this.viewsDir, miniApp);
        App.server.use(miniApp);
        require('./routes')(App, miniApp,this);

    }

    return new mcmsNodePagesServiceProvider();
});