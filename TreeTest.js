var AVL = require('./AVLTree');
var BST = require('./BinarySearchTree');

var height = function(node){
	if(node == null) return 1;
	var lh = 0, rh = 0;
	if(node.left) lh = height(node.left);
	if(node.right) rh = height(node.right);
	return 1 + Math.max(lh, rh);
}

function Test1(name, tree, N){
	console.log('testing', name);
	var start = (new Date()).getTime();
	for(var i = N; i >= 0; i--)
		tree.push(i);
	var difference = (new Date()).getTime() - start;
	console.log('size: ' + tree.size(), 'height:', height(tree.root), 'insertion time:', difference);
	start = (new Date()).getTime();
	for(var i = 0, j = Math.round(Math.random() * N); i < N; i++, j = Math.round(Math.random() * N))
		tree.contains(j);
	difference = (new Date()).getTime() - start;
	console.log('search time:', difference);
}

var N = 10000;
Test1('binary search tree', new BST(), N);
Test1('AVL tree', new AVL(), N);


