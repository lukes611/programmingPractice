
function BinarySearchTree(){
	this.root = null;
};

//push function
BinarySearchTree.prototype.push = function(item){
	//if there are items in the tree, begin decending the tree to insert the item
	if(this.root) this.pushHelper(this.root, item);
	//otherwise, there are no nodes, set the root to a new node
	else this.root = {data : item, left : null, right : null };
};

BinarySearchTree.prototype.pushHelper = function(node, item){
	//if item is the same as the current node in the tree, the item is already there... dont add anything
	if(item == node.data) return;
	if(item < node.data){ //if item < the current node's data: consider the left side of the sub tree
		if(node.left) this.pushHelper(node.left, item); //if there are nodes down there, decend to the left
		else node.left = {data : item, left : null, right : null }; //else set the left node to item
	}else{ //else item > node's data
		if(node.right) this.pushHelper(node.right, item);
		else node.right = {data : item, left : null, right : null };
	}
};

//forEach functions
BinarySearchTree.prototype.forEach = function(func, node){
	if(node === undefined){ 
		node = this.root;
		if(node === undefined) return;
	}
	if(node.left) this.forEach(func, node.left);
	func(node.data);
	if(node.right) this.forEach(func, node.right);
};

//toString function
BinarySearchTree.prototype.toString = function(){
	var rv = [];
	this.forEach(rv.push.bind(rv));
	return rv.join(',');
};

//size function
BinarySearchTree.prototype.size = function(){
	var size = 0;
	this.forEach(function(){size++;});
	return size;
};

//searchFunction
BinarySearchTree.prototype.contains = function(item, node){
	if(node === undefined){ 
		node = this.root;
		if(node === undefined) return false;
	}
	if(node.data == item) return true;
	if(item < node.data && node.left) return this.contains(item, node.left);
	else if(item > node.data && node.right) return this.contains(item, node.right);
	return false;
};


if(typeof module !== 'undefined') module.exports = BinarySearchTree;

