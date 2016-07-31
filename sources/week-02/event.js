var test = new process.EventEmitter();

test.on('aaa', (b, c)=> {
	console.log('sun', b, c);
});

test.emit('aaa', 'baaa', 2234);