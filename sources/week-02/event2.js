var test2 = new process.EventEmitter();

test2.on('myName', (name)=> {
	console.log(`My Name is ${name}`);
});
test2.on('yourName', (name)=> {
	console.log(`Your Name is ${name}`);
});

test2.emit('yourName', 'Lee Heung-Hyun');