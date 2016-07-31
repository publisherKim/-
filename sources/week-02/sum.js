exports.sum = function(a, b){
	if (a===undefined){
		return console.log('a is invalid');
	}
	if (b===undefined){
		return console.log('a is invalid');
	}
	console.time('s');
	var total = a + b;
	console.log("total", total);
	console.timeEnd('s');
}
exports.multiply = function(a, b){
	if (a===undefined){
		return console.log('a is invalid');
	}
	if (b===undefined){
		return console.log('a is invalid');
	}
	console.time('s');
	var total = a * b;
	console.log("total", total);
	console.timeEnd('s');
}