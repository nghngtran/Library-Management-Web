var controller = {};
var models = require('../models');



controller.getAll = (query)=>{
    return new Promise((resolve,reject)=>{
		let options = {
			//include : [{model: models.Kind}],
			attribute : ['id', 'title', 'description', 'kindid','author','quantity','available','ratings','imgID'],
			where : { 
				
			}
			
		}
		console.log(query);
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
		
		models.Book
			.findAndCountAll(options)
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
};




module.exports = controller;