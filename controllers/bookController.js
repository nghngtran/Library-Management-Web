var controller = {};
var models = require('../models');


controller.getById = (id)=>{
    return new Promise((resolve,reject)=>{
		models.Book
			.findOne({
				where: {id : id}
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};


controller.getHotBooks = ()=>{
    return new Promise((resolve,reject)=>{
		models.Book
			.findAll({
				order: [
					['ratings', 'DESC']
				],
				limit: 4,
				attribute: ['id', 'title', 'author', 'language']
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};

controller.getNewBooks = ()=>{
    return new Promise((resolve,reject)=>{
		models.Book
			.findAll({
				order: [
					['createdAt', 'DESC']
				],
				limit: 4,
				attribute: ['id', 'title', 'author', 'language']
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};

controller.getById = (id)=>{
    return new Promise((resolve,reject)=>{
		models.Book
			.findOne({
				where: {id : id}
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};

controller.getAll = (query)=>{
    return new Promise((resolve,reject)=>{
		console.log("Vao get all quẻy")
		let options = {
			//include : [{model: models.Kind}],
			attribute : ['id', 'title', 'description', 'kindid','author','quantity','available','ratings','imgID'],
			where : { 
				
			}
			
		}
		if (query.limit > 0){
		    	options.limit = query.limit,
		    	options.offset = query.limit * (query.page -1)
		}
		if (query.language ){
			options.where.language = query.language;
		}

		if (query.kind){
			options.where.kindid = query.kind;
		}
		var Sequelize = require('sequelize');
		if (query.search != ''){
			// options.where.title  = {
			// 	[Sequelize.Op.iLike] : `%${query.search}%`
			// }
			options.where = {
				[Sequelize.Op.or]:[
					{
						title : {	
							[Sequelize.Op.iLike] : `%${query.search}%`
						}
					},
					{
						description:{
							[Sequelize.Op.iLike] : `%${query.search}%`
						}
					},
					{
						author:{
							[Sequelize.Op.iLike] : `%${query.search}%`
						}	
					}
				]
			}
		}
		
		if (query.sort){
			switch (query.sort){
				case 'ratings': 
					options.order = [
						['ratings','DESC']
					];
					break;
				case 'available':
					options.order = [
						['available','DESC']
					];
					break;
				default:
					options.order = [
						['title','ASC']
					]
		
			}
		}
		
		models.Book
			.findAndCountAll(options)
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};




module.exports = controller;