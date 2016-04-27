var Sorting = require('./Sorting');

function test(name, list, sortingFunction, printOut){
	printOut = printOut | false;
	var tmp = list.map(function(){return arguments[0];});
	console.log('testing', name);
	if(printOut) console.log('input', tmp);
	var startTime = (new Date()).getTime();
	sortingFunction(tmp);
	var endTime = (new Date()).getTime();
	console.log('finished', ((endTime-startTime)));
	if(printOut) console.log('output', tmp);
	console.log('correct', Sorting.test(tmp));
	console.log('*******************************');
}

var N = 5;
var printOut = N < 30;
var list = Array.apply(undefined, Array(N)).map(function(){return Math.round(Math.random() * N * 2);});


test('javascript sort', list, function(l){l.sort(function srtt(a,b){return a-b;});}, printOut);
test('bubble', list, Sorting.bubble, printOut);
test('selection', list, Sorting.selection, printOut);
test('insertion', list, Sorting.insertion, printOut);
test('shell', list, Sorting.shell, printOut);
test('merge', list, Sorting.merge, printOut);
test('quick', list, Sorting.quick, printOut);



