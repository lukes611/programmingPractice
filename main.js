var Trie = require('./Trie');
var fs = require('fs');

var x = new Trie();

var words = fs.readFileSync('dict.txt').toString().split(' ');


words.forEach(x.push.bind(x));


x.forEach(function(y){
	console.log(x.contains(''+y))
});

console.log(x.contains('thef'))