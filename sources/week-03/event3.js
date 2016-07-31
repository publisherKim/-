exports.test1 = () => {
	process.on('three', () => {
		for(var i=0;i<3; i++){
			console.log(i);
		}
	})
	// process.emit('three');
};