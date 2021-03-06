﻿
var uuid = require('node-uuid');

$data.Class.define("$provision.Types.AppOwner", $data.Entity, null, {
    Id: { type: "string", key: true },
    Name: { type: "string" },
    AppIds: { type: "Array", elementType: "id" }
}, null);
$data.Class.define("$provision.Types.App", $data.Entity, null, {
    Id: { type: "string", key: true },
    Name: { type: "string" },
    AppOwnerId: { type: "string" },
    ItemIds: { type: "Array", elementType: "string" },
    InstanceIds: { type: "Array", elementType: "string" }
}, null);
$data.Class.define("$provision.Types.AppItem", $data.Entity, null, {
    Id: { type: "string", key: true },
    AppId: { type: "string" },
    Type: { type: "string" },
    Data: { type: "object" },
    CreationDate: { type: 'date' }
}, null);
$data.Class.define("$provision.Types.AppHost", $data.Entity, null, {
    Id: { type: "id", key: true },
    AppId: { type: "string" },
    Host: { type: "string" }
}, null);
$data.Class.define("$provision.Types.Instance", $data.Entity, null, {
    Id: { type: "string", key: true },
    AppId: { type: "string" },
    Username: { type: "string" },
    Password: { type: "string" },
    StartDate: { type: 'date' },
    StopDate: { type: 'date' },
    IsProvision: { type: 'boolean' },
    ProvisionId: { type: 'string' }
}, null);
$data.Class.define("$provision.Types.CuInventory", $data.Entity, null, {
    Id: { type: "id", key: true, computed: true },
    //AppId: { type: "string" },
    PublicAddress: { type: "string" },
    PrivateAddress: { type: "string" },
    AppItemId: { type: "string" },
//ex-awsid defalt ures, awsid ha kiesett
    AWSId: { type: "string" },
    ExAWSId: { type: "string" },
    Size: { type: "string" }, // micro
    Type: { type: "string" }, // reserved, ondemand, spot
    Used: { type: "boolean" },
    LastModified: { type: "datetime" }
}, null);
$data.Class.define("$provision.Types.DbInventory", $data.Entity, null, {
    Id: { type: "id", key: true, computed: true },
    InstanceId: { type: "string" },
    AppItemId: { type: "string" },
    DbName: { type: "string" },
    Data: { type: "object" }
}, null);

$data.Class.defineEx("$provision.Types.ProvisionContext", [$data.EntityContext,$data.ServiceBase], null, {
    AppOwners: { type: $data.EntitySet, elementType: $provision.Types.AppOwner },
    Apps: { type: $data.EntitySet, elementType: $provision.Types.App },
    AppItems: { type: $data.EntitySet, elementType: $provision.Types.AppItem },
    AppHosts: { type: $data.EntitySet, elementType: $provision.Types.AppHost },
    Instances: { type: $data.EntitySet, elementType: $provision.Types.Instance },
    CuInventories: { type: $data.EntitySet, elementType: $provision.Types.CuInventory },
    DbInventories: { type: $data.EntitySet, elementType: $provision.Types.DbInventory },


    findAppOwnerById: function(appownerid) { return this.AppOwners.single(function(a) { return a.Id == this.appownerid; }, { appownerid: appownerid }); },
    findAppOwnerByName: function(appownername) { return this.AppOwners.single(function(a) { return a.Name == this.appownername; }, { appownername: appownername }); },
    findAppOwnerByApp: function(app) { return this.AppOwners.single(function(a) { return a.Id == app.AppOwnerId; }); },
    findAppByName: function(appname) { return this.Apps.single(function(a) { return a.Name == this.appname; }, { appname: appname }); },
    findAppById: function(appid) { return this.Apps.single(function(a) { return a.Id == this.appid; }, { appid: appid }); },




    findDbs: function(id) { return this.AppItems.filter(function(item){return item.AppId == this.id && item.Type == 'QueryableDB'; },{id:id}).toArray(); },




    checkProvisionId: function(app, provisionid) { return this.AppItems.single(function (i) { return (i.Id in this.items && i.type == 'provisionableapp' && i.Data.provisionId == this.provisionid); }, { items: app.items, provisionId: provisionid }); },
    //checkDb: function(app, dbid) { return this.AppItems.single(function (i) { return (i.Id in this.items && i.type == 'QueryableDB' && i.Data.DbId == this.dbid); }, { items: app.items, dbid: dbid }); },
    //checkCu: function(app, cuid) { return this.AppItems.single(function (i) { return (i.Id in this.items && i.type == 'cu' && i.Data.CuId == this.cuid); }, { items: app.items, cuid: cuid }); },

    // constructor
    // pre, post
    constructor: function() {
	this.Apps.beforeDelete=function(items) {
		return false;
	};
    },

    // only needed for init
    checkInventory: function(id) { return this.CuInventories.single(function(a) { return a.AppItemId == this.id; }, { id: id }); },

    addappowner: function(owner) {
	this.AppOwners.add(owner);
	return this.saveChanges()
    },

    addapp: function(app, owner) {
	var self = this;
	this.Apps.add(app);
	return this.saveChanges()
		//.then(function(c) {
		    //self.AppOwners.attach(owner);
		    //owner.AppIds = owner.AppIds.concat(app.Id);
		    //return self.saveChanges();
		//})
		.then(function(c) { return self.createinstance(app, undefined);});
    },

    createinstance: function(app, provisionid) {
	var self = this;
	var instance = new $provision.Types.Instance();
	instance.AppId = app.Id;
	instance.Username = uuid.v4(); 
	instance.Password = uuid.v4();
        instance.ProvisionId = provisionid;
        instance.StartDate = new Date();
        if (provisionid) {
		instance.Id = uuid.v4();
        	instance.isProvision = true;
	} else {
		instance.Id = app.Id;
        	instance.isProvision = false;
	}
	this.Instances.add(instance);
	return self.saveChanges()
		.then(function(c) {
		    self.Apps.attach(app);
		    app.InstanceIds = app.InstanceIds.concat(instance.Id);
		    return self.saveChanges().then(function(c){console.log('parent app saved'); return instance;});
		});
    },

    createprovisioneddb: function(instance, db) {
	var self = this;
	var dbinstance = new $provision.Types.DbInventory();
	dbinstance.InstanceId = instance.Id;
	dbinstance.AppItemId = instance.AppId;
	dbinstance.DbName = db.Data.dbname;
	dbinstance.Data = db.Data;
	// TODO el kellene tenni forditva is, vagyis az instance tudjon a db-irol
	this.DbInventories.add(dbinstance);
	return this.saveChanges().then(function(c){ return dbinstance;});
    },

    additem: function(item, app) {
	var self = this;
        if (Array.isArray(item))
          item.forEach(function(item) {
             this.AppItems.add(item);
          });
	else this.AppItems.add(item);
	return this.saveChanges()
	     .then(function(c) {
		self.Apps.attach(app);
		if (Array.isArray(item))
			app.ItemIds = app.ItemIds.concat(item.map(function(i){ return i.Id;}));
		else
			app.ItemIds = app.ItemIds.concat(item.Id);
	     	return self.saveChanges();
	     });
    }
});

exports = $provision.Types.ProvisionContext;

