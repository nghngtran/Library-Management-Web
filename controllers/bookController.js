var controller = {};
var models = require('../models');

controller.getAll = function(){
    return new Promise((resolve,reject)=>{
		models.Book
			.findAll({
				attribute : ['id', 'title', 'description', 'kindid','author','quantity','available','ratings','imgID']
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};

controller.getAll = (query)=>{
    return new Promise((resolve,reject)=>{
		let options = {
			attribute : ['id', 'title', 'description', 'kindid','author','quantity','available','ratings','imgID'],
			where : { }
		}
		//if (query.limit > 0){
		//	options.limit = query.limit,
		//	options.offset = query.limit * (query.page -1)
		//}
		models.Book
			.findAndCountAll(options)
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};




module.exports = controller;