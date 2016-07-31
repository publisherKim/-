var i = 0;
console.time('0 ~ 10');
while(i<10){
	console.log("i", i);
	i++;
}
console.timeEnd('0 ~ 10');