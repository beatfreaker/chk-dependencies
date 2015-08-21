#! /usr/bin/env node

var fs = require('fs');
var Q = require('q');
var chalk = require('chalk');
var Table = require('cli-table');
var table = new Table({
    head: [chalk.cyan.bold('Module Name'), chalk.cyan.bold('Status')],
    colWidth: [100,200]
});
var p = process.cwd();
var extns = Object.create(null);
var filesArray = [];
var param = process.argv.slice(2);

var getDependenciesJSONObject = function() {
    var defered = Q.defer();
    var counter = 1;
    var dependencyList = new Array();
    if(fs.existsSync(p+'/package.json')) {
        var jsonObject = JSON.parse(fs.readFileSync(p+'/package.json','utf-8'));
        for(var key in jsonObject.dependencies) {
            dependencyList.push(key);
            counter++;
            if(counter > Object.keys(jsonObject.dependencies).length) {
                defered.resolve(dependencyList);       
            }
        }
    } else {
        console.log("no");
    }
    return defered.promise;
}

var createTable = function(dependenciesList, index) {
    if(index === dependenciesList.length) {
            console.log(table.toString());
            process.exit();
            return 'done';
        } else {
            isNodeModuleExists(dependenciesList[index]).then(function(status){
                if(status) {
                    table.push([chalk.yellow(dependenciesList[index]),chalk.green('Present')]);
                } else {
                    table.push([chalk.yellow(dependenciesList[index]),chalk.red('Not Present')]);
                }
                index++;
                createTable(dependenciesList, index);
            });
        }
}
    
var isNodeModuleExists = function(moduleName) {
    var defered = Q.defer();
    var status = false;
    var counter = 1;
    var flag = true;
    var list = new Array();
    var temp = p;
    while(flag) {
        list.push(temp+'/node_modules');
        if(temp.indexOf('/') === -1) {
            flag = false;
        } else {
            temp = temp.substr(0, temp.lastIndexOf('/'));
        }
        
    }
    list.forEach(function(nodeModulePath)
    {
        var path = nodeModulePath + "/" + moduleName;
        if(fs.existsSync(path)) {
            status = true;
            defered.resolve(status);
        }
        counter++;
        if(counter > module.paths.length) {
            
            defered.resolve(status);     
        }
    });
    return defered.promise;
};

getDependenciesJSONObject().then(function(data){createTable(data,0)});