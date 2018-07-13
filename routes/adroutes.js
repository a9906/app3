'use strict';
module.exports = function(app) {
	
	var adc = require('../controllers/adController');

		// rotas definidas para a API

		app.route('/users')
		//.get(adc.getAllUsers);
		.get(adc.getAllUsersAD)
		.post(adc.addUser)
		.delete(adc.deleteUser);  // tirar isto daqui...
		
		app.route('/users/:id')
		.get(adc.GetUserByID)
		.put(adc.editUser);
		//.put(adc.update_a_inscricao)
		//.delete(adc.delete_a_inscricao);



		app.route('/users/find/:id')
		.get(adc.find);

		app.route('/auth/:id')
		.get(adc.autentica);
		

		app.route('/groups')
		.get(adc.getAllGroups);


};