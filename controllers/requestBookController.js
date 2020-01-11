var controller = {};
var models = require('../models');

controller.getAll = (query) => {
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
			},
			include: [{model :models.Book}]
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
						id: {
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

controller.getPendingRequest = () => {
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
				status: "Pending"
			},
			include : [
				{model :models.Book}
			]
		}
		models.RequestBook
			.findAndCountAll(options)
			.then(data => resolve(data))
			.catch(err => reject(Error(err)))
	})
}

controller.getApprovedRequest = () => {
	var Sequelize = require('sequelize');
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
				status: "Approved"
			},
			include : [
				{model :models.Book}
			]
		}
		models.RequestBook
			.findAndCountAll(options)
			.then(data => resolve(data))
			.catch(err => reject(Error(err)))
	})
}


controller.getReturningRequest = () => {
	var Sequelize = require('sequelize');
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
				status: "Returning"
			},
			include : [
				{model :models.Book}
			]
		}
		models.RequestBook
			.findAndCountAll(options)
			.then(data => resolve(data))
			.catch(err => reject(Error(err)))
	})
}
controller.getReturnedRequest = () => {
	var Sequelize = require('sequelize');
	return new Promise((resolve, reject) => {
		let options = {
			attribute: ['id', 'bookLend', 'username', 'borrowingDate', 'returningDate', 'fee', 'comment'],
			where: {
						status: "Returned"
			},
			include : [
				{model :models.Book}
			]
		}
		models.RequestBook
			.findAndCountAll(options)
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

controller.getApprovedRequestsOfUser = (username) => {
	return new Promise((resolve, reject) => {
		models.RequestBook
			.findAll({
				where: { 
					[Sequelize.Op.or]: [
						{
							userid: username,
							status : "Approved" 
						},
						{
							userid: username,
							status : "Returned" 
						}
					]
				}
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


controller.removeRequest = (id) => {
	return new Promise((resolve,reject)=>{
	models.RequestBook
		.destroy({
			where : {id : id}
		})
		.then(data=>resolve(data))
		.catch(error =>reject(new Error(error)))
	})
}


controller.updateRequest = (request) =>{
    return new Promise((resolve,reject)=>{
		models.RequestBook
			.update(request,{
				where: {id : request.id}
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
}

controller.removeRequest = (id) =>{
	return new Promise((resolve,reject)=>{
		models.RequestBook
			.destroy({
				where: {id : id}
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
}

controller.getNewID = () =>{
 	return models.RequestBook.max('id').then(max=>{
		return max +1;
	})
}


module.exports = controller;

