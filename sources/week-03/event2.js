var m = new process.EventEmitter();

m.on('a', () => {
	for(var i=0;i<3;i++){
		console.log(i);
	}
});

m.on('b', () => {
	console.log('이흥현');
});

exports.m = m;