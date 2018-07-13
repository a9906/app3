'use strict';
/*
	var mongoose = require('mongoose'),
	Inscricao = mongoose.model('Inscricoes');
	
	exports.list_all_inscricoes = function(req, res) {
		
		Inscricao.find({}, function(err, inscricao) {
			if (err)
				res.send(err);
			res.json(inscricao);
		});
	};
	
	exports.create_a_inscricao = function(req, res) {
		
	var new_insc = new Inscricao(req.body);
		new_insc.save(function(err, inscricao) {
			if (err)
				res.send(err);
			res.json(inscricao);
		});
	};
	
	exports.read_a_inscricao = function(req, res) {
		
		Inscricao.findById(req.params.id, function(err, inscricao) {
		if (err)
			res.send(err);
		res.json(inscricao);
		});
	};

	exports.update_a_inscricao = function(req, res) {
		
		Inscricao.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, inscricao) {
			if (err)
				res.send(err);
			res.json(inscricao);
	});
	};

	exports.delete_a_inscricao = function(req, res) {
		
		Inscricao.remove({ _id: req.params.id }, function(err, inscricao) {
			if (err)
				res.send(err);
			res.json({ message: 'inscricao eliminada' });
		});
	};
*/


//var Inscricao = require('../models/obj'); // instanciar o modelo de dados definido
var usersHelper = require('../models/users.js');
var adt = require('../lib/activedirectory.js');
var config = require('../config/configAD.js');

var reject = require('reject');
var assert = require('assert');
var helper = require('../lib/helper');

exports.getAllUsers = function(req, res){
	var users = usersHelper.getAllUsers(); 
    var userIds = Object.keys(users);
    var userNames = userIds.map(function(id){
        return users[id].name;
    });
    var userNameString = userNames.join(' and ');
    res.send('users ' + userNameString);

};

exports.GetUserByID = function(req, res){
	var userId = req.params['id'];
    var user = usersHelper.getUserById(userId);
    res.send('User ' + user.name);


}


exports.find = function (req, res){
    var ad = new adt(config);
	var username = req.params['id'];
    ad.findUser(username, false, function(err, obj) {
      if (err) return(err );
      console.dir(obj);	  
	  res.json(obj);
	}
  );
}

exports.getAllGroups = function (req, res){
    var ad = new adt(config);
    ad.findGroups(false, function(err, obj) {
      if (err) return(err );
      console.dir(obj);	  
	  res.json(obj);
	}
  );
}

exports.getAllUsersAD = function (req, res){
    var ad = new adt(config);
	//var username = req.params['id'];
    ad.findUsers(false, function(err, obj) {
      if (err) return(err );
      console.dir(obj);	  
	  res.json(obj);
	}
  );
}



 exports.autentica = function(queryStr, res){
	  var ad = new adt(config);
      
	  var query = queryStr.url.slice(6);
	  var partes = query.split('&');
	  /*
	  var data = {};
	  partes.forEach(function (parte) {
		  var chaveValor = parte.split('=');
		  var chave = chaveValor[0];
		  var valor = chaveValor[1];
		  data[chave] = valor;
	  });
*/
        ad.authenticate(partes[0], partes[1], function(err, auth) {
        if (err) {
          console.log('ERROR: '+JSON.stringify(err));
          return;
        }
        
        if (auth) {
		  console.log('Authenticated!');
		  //const resultado = auth;
        }
        else {
          console.log('Authentication failed!');
		}
		
	  });
	  res.json(resultado);
}


	var ldap2 = require('ldapjs');
	var sleep = require('sleep');
	//var lpad = require ('../config/configldapgrud');




/*
	// Add User...
	exports.addUser = () => {
	return new Promise((resolve, reject) => {
	
	let ldapOptions = {
	url: "ldap://192.168.71.10:389",
	timeout: 30000,
	connectTimeout: 30000,
	reconnect: true
	};


	  let controls = {
		attributes: [
		  "cn",
		  "createTimestamp",
		  "modifyTimestamp",
		  "pwdPolicySubentry"
		],
		scope: "sub",
		filter: "(objectClass=person)"
	  };

 var entry6 = {
	cn: 'LastName12345',
	sn: 'LastName12345',
	mail: ['LastName12345@invalid.invalid'],
	objectclass: ['top','person','organizationalPerson','user'],
	distinguishedName: 'cn=LastName12345,ou=Alunos,dc=ipca,dc=local',
	userPrincipalName: 'LastName12345@invalid.invalid',
	sAMAccountName: 'LastName12345',
	title: "Automation Tester",
	description: 'user created at blahblahblah',
	telephoneNumber: '123123',
	givenName: 'dummy',
	displayName: 'LastName12345',
	info: 'user added',
	company: 'ipca',
	division: 'hostname',
	userPassword: 'y4!e1NIQX1tc'
	};

	var entry7 = {
		cn: 'joao',
		sn: 'joao',
		mail: ['joao@alunos.ipca.pt'],
		objectclass: ['top','person','organizationalPerson','user'],
		distinguishedName: 'cn=joao,ou=Alunos,dc=ipca,dc=local',
		userPrincipalName: 'joao@alunos.ipca.pt',
		sAMAccountName: 'joao',
		title: "Automation Tester",
		description: 'user created at blahblahblah',
		telephoneNumber: '123123',
		givenName: 'dummy',
		displayName: 'joao',
		info: 'user added',
		company: 'ipca',
		division: 'hostname',
		userPassword: 'Ipca2016'
		};

		// Campos minimos admitidos
		var entry8 = {
			//cn: 'luis7',
			//sn: 'luis6',
			//mail: ['luis6@alunos.ipca.pt'],
			objectclass: [ 'top','person','organizationalPerson','user'],
			//distinguishedName: 'cn=luis,ou=Alunos,dc=ipca,dc=local',
			//userPrincipalName: 'luis@alunos.ipca.pt',
			//sAMAccountName: 'luis3',
			//title: "Automation Tester",
			//description: 'user created at blahblahblah',
			//telephoneNumber: '123123',
			//givenName: 'dummy',
			//displayName: 'luis',
			//info: 'user added',
			//company: 'ipca',
			//division: 'hostname',
			//userPassword: 'Ipca2016'
			};
	  
	const ldapClient = ldap2.createClient(ldapOptions);


		// Bind...dados do utilizador autorizado
		ldapClient.bind('CN=Dan,CN=Users,DC=ipca,DC=local', 'Ipca2016', function (err) {
			if (err) {
			  console.log('LDAP binding failed... disconnecting');
			}else{
			 console.log("Bind Success");
			}
		});

		// Add...dados do utilizador a ser inserido
		ldapClient.add('cn=luis7, ou=Alunos, dc=ipca, dc=local', entry8, function(err) {
			if(err)
			{
				console.log(err);
			}else{
				console.log("Success");
			}
		 });

		 // Unbind...  
		ldapClient.unbind(function(err) {
			assert.ifError(err);
		  });


	});	
}
*/

exports.addUser  = function(req, res){


	/* exemplos....
	var a = options.a !== undefined ? options.a : "nothing";
	var b = options.b !== undefined ? options.b : "nothing";
	myObj = { "name":"John", "age":30, "car":null };
x = myObj.name;
var myObj, x;
myObj = { "name":"John", "age":30, "car":null };
x = myObj["name"];
document.getElementById("demo").innerHTML = x;
*/


var resultado = {};
// Add User...
//exports.addUser = () => {
//return new Promise((resolve, reject) => {

	let ldapOptions = {
		url: "ldap://192.168.71.10:389",
		timeout: 30000,
		connectTimeout: 30000,
		reconnect: true
	};


	let controls = {
		attributes: [
		"cn",
		"createTimestamp",
		"modifyTimestamp",
		"pwdPolicySubentry"
		],
		scope: "sub",
		filter: "(objectClass=person)"
	};

	var entry6 = {
		cn: 'LastName12345',
		sn: 'LastName12345',
		mail: ['LastName12345@invalid.invalid'],
		objectclass: ['top','person','organizationalPerson','user'],
		distinguishedName: 'cn=LastName12345,ou=Alunos,dc=ipca,dc=local',
		userPrincipalName: 'LastName12345@invalid.invalid',
		sAMAccountName: 'LastName12345',
		title: "Automation Tester",
		description: 'user created at blahblahblah',
		telephoneNumber: '123123',
		givenName: 'dummy',
		displayName: 'LastName12345',
		info: 'user added',
		company: 'ipca',
		division: 'hostname',
		userPassword: 'y4!e1NIQX1tc'
	};

	var entry7 = {
		cn: 'joao4',
		sn: 'joao4',
		mail: ['joao4@alunos.ipca.pt'],
		objectclass: ['top','person','organizationalPerson','user'],
		distinguishedName: 'cn=joao4,ou=Alunos,dc=ipca,dc=local',
		userPrincipalName: 'joao4@alunos.ipca.pt',
		sAMAccountName: 'joao4',
		title: "Automation Tester",
		description: 'user created at blahblahblah',
		telephoneNumber: '123123',
		givenName: 'dummy',
		displayName: 'joao4',
		info: 'user added',
		company: 'ipca',
		division: 'hostname',
		userPassword: 'Ipca2016'
		};

	// Campos minimos admitidos
	var entry8 = {
		//cn: 'luis7',
		//sn: 'luis6',
		//mail: ['luis6@alunos.ipca.pt'],
		objectclass: [ 'top','person','organizationalPerson','user'],
		//distinguishedName: 'cn=luis,ou=Alunos,dc=ipca,dc=local',
		//userPrincipalName: 'luis@alunos.ipca.pt',
		//sAMAccountName: 'luis3',
		//title: "Automation Tester",
		//description: 'user created at blahblahblah',
		//telephoneNumber: '123123',
		//givenName: 'dummy',
		//displayName: 'luis',
		//info: 'user added',
		//company: 'ipca',
		//division: 'hostname',
		//userPassword: 'Ipca2016'
		};
 // var entry9 = req.body;
	const ldapClient = ldap2.createClient(ldapOptions);


	// Bind...dados do utilizador autorizado
	var dn = req.body.options.option1.user + ',' + req.body.options.option1.cn + ',' + req.body.options.option1.baseDN;
	var pw = req.body.options.option1.password;
	ldapClient.bind(dn, pw, function (err) {
		if (err) {
		  console.log('LDAP binding failed... disconnecting');
		  resultado.bind = 'LDAP binding failed...';
		}else{
		 console.log("Bind Success");
		 resultado.bind = 'Bind Success...';
		}
	});

	// Add...dados do utilizador a ser inserido
	//ldapClient.add('cn=joao5, ou=Alunos, dc=ipca, dc=local', entry9, function(err) {
		ldapClient.add(req.body.options.option2.distinguishedName, req.body.options.option2, function(err) {
		if(err)
		{
			console.log(err);
			resultado.addresult = 'Erro...';
			resultado.addmsg = (err);
			res.send(JSON.stringify(resultado));
		}else{
			console.log("Add Success...");
			resultado.addresult = 'Adicionado com sucesso.';
			//res.send(JSON.stringify(entry7));
			res.send(JSON.stringify(resultado));
		
		}
	 });

	 // Unbind...  
	ldapClient.unbind(function(err) {
		assert.ifError(err);
	});

	//res.send('User result: ' + res + resultado);
	//data = JSON.parse(data);
	//JSON.stringify(err)
	
}

// Delete User
//exports.deleteUser = () => {
//	return new Promise((resolve, reject) => {
exports.deleteUser  = function(req, res){

	var resultado = {};
	let ldapOptions = {
		url: "ldap://192.168.71.10:389",
		timeout: 30000,
		connectTimeout: 30000,
		reconnect: true
		};


	const ldapClient = ldap2.createClient(ldapOptions);

		// Bind...
		//ldapClient.bind('CN=Dan,CN=Users,DC=ipca,DC=local', 'Ipca2016', function (err) {

        var dn = req.body.options.option1.user + ',' + req.body.options.option1.cn + ',' + req.body.options.option1.baseDN;
        var pw = req.body.options.option1.password;
		ldapClient.bind(dn, pw, function (err) {
			if (err) {
				console.log('LDAP binding failed... disconnecting');
				resultado.bind = 'LDAP binding failed...';
			}else{
				console.log("Bind Success");
				resultado.bind = 'Bind Success...';
			}
		});

	// Delete	
	//ldapClient.del('cn=joao5, ou=Alunos, dc=ipca, dc=local', function(err) {
	ldapClient.del(req.body.options.option2.distinguishedName, function(err) {
		//assert.ifError(err);
		if(err)
		{
			console.log(err);
			resultado.addresult = 'Erro...';
			resultado.addmsg = (err);
			res.send(JSON.stringify(resultado));
		}else{
			console.log("User deleted...");
			resultado.addresult = 'User deleted...';
			res.send(JSON.stringify(resultado));
		}
		});
	
	// Unbind...  
	ldapClient.unbind(function(err) {
		assert.ifError(err);
	});
	//JSON.stringify(err)
	//res.json.stringify(resultado);  //???
	

}


// Edit User

exports.editUser  = function(req, res){

	var resultado = {};
	let ldapOptions = {
		url: "ldap://192.168.71.10:389",
		timeout: 30000,
		connectTimeout: 30000,
		reconnect: true
		};


	const ldapClient = ldap2.createClient(ldapOptions);

		// Bind...
		var dn = req.body.options.option1.user + ',' + req.body.options.option1.cn + ',' + req.body.options.option1.baseDN;
		var pw = req.body.options.option1.password;

		ldapClient.bind(dn, pw, function (err) {
			if (err) {
				console.log('LDAP binding failed... disconnecting');
				resultado.bind = 'LDAP binding failed...';
			}else{
				console.log("Bind Success");
				resultado.bind = 'Bind Success...';
			}
		});

/*
	var change = new ldapClient.Change({
		operation: 'add',
		modification: {
			pets: ['cat', 'dog']
		}
		});
*/

var teste = req.body;
	var mod = {};
//	mod[parsed.attribute] = [];
/*	parsed.value.forEach(function (v) {
		mod[parsed.attribute].push(v);
	});*/
	/*
	var change = new ldap.Change({
		operation: 'replace',
		modification: {employeeNumber: ''}
   });*/
	var change = new ldap2.Change({
		operation: 'replace',
		//modification: mod
		modification: req.body.options.option3
	});

	// Edit...	
	ldapClient.modify(req.body.options.option2.distinguishedName, change, function(err) {
		if(err)
		{
			console.log(err);
			resultado.addresult = 'Erro...';
			resultado.addmsg = (err);
			res.send(JSON.stringify(resultado));
		}else{
			console.log("User updated...");
			resultado.addresult = 'User updated...';
			res.send(JSON.stringify(resultado));
		}
		});
	
	// Unbind...  
	ldapClient.unbind(function(err) {
		assert.ifError(err);
	});	
}


  
 