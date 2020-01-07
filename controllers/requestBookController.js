var controller = {};
var models = require('../models');

controller.getAll = () => {
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
			}
		}
		models.RequestBook
			.findAndCountAll(options)
			.then(data => resolve(data))
			.catch(error => reject(new Error(error)))
	})
};

controller.getPendingRequest = (username) => {
	var Sequelize = require('sequelize');
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
				[Sequelize.Op.and]: [
					{
						username: username
					},
					{
						status: "Expired"
					}
				]
			}
		}
		models.RequestBook
			.findAll(options)
			.then(data => resolve(data))
			.catch(err => reject(Error(err)))
	})
}

controller.getBorrowingBook = (username) => {
	var Sequelize = require('sequelize');
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
				[Sequelize.Op.and]: [
					{
						username: username
					},
					{
						status: "Borrowing"
					}
				]
			},
			include: [{ model: models.Book }]
		}
		models.RequestBook
			.findAll(options)
			.then(data => resolve(data))
			.catch(err => reject(Error(err)))
	})
}

controller.getByUsername = (username, query) => {
	
	return new Promise((resolve, reject) => {
		var Sequelize = require('sequelize');
		let options = {
			where: { 
				username: username,
				//'$Book.id$' :  { [Sequelize.Op.eq]: 3 }
			},
			include: [{ 
				model: models.Book,
				as : 'Book'
			}]
		}
		if (query.limit > 0) {
			options.limit = query.limit,
			options.offset = query.limit * (query.page - 1)
		}

		if (query.type){
			options.where.status = query.type;
		}

		var Sequelize = require('sequelize');
		if (query.search != '') {
			options.where = {
				[Sequelize.Op.or]: [
					{
						status: {
							[Sequelize.Op.iLike]: `%${query.search}%`
						}
					},
					{
						'$Book.title$': {
							[Sequelize.Op.iLike]: `%${query.search}%`
						}
					},
					{
						'$Book.author$': {
							[Sequelize.Op.iLike]: `%${query.search}%`
						}
					}
				]
			}
		}
		models.RequestBook
			.findAndCountAll(options)
			.then(data => resolve(data))
			.catch(error => reject(new Error(error)))
	})
};



controller.getById = (id) => {
	return new Promise((resolve, reject) => {
		models.RequestBook
			.findOne({
				where: { id: id }
			})
			.then(data => resolve(data))
			.catch(error => reject(new Error(error)))
	})
};


controller.getBorrowedBookOfUser = (username) => {
	return new Promise((resolve, reject) => {
		models.RequestBook
			.findAll({
				where: { userid: username }
			})
			.then(data => resolve(data))
			.catch(error => reject(new Error(error)))
	})
};



controller.add = (request) => {
	return new Promise((resolve, reject) => {
		models.RequestBook
			.create(request)
			.then(data => resolve(data))
			.catch(error => reject(new Error(error)))
	})
}

module.exports = controller;

