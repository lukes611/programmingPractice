function AVLNode(data, parent, left, right){
	this.data 	= 	data;
	this.parent = 	(parent === undefined) 	? null 	: parent;
	this.left 	= 	(left === undefined) 	? null 	: left;
	this.right 	= 	(right === undefined) 	? null 	: right;
}

AVLNode.prototype.height = function(){
	var leftHeight = 0;
	var rightHeight = 0;
	if(this.left) leftHeight = this.left.height();
	if(this.right) rightHeight = this.right.height();
	return 1 + Math.max(leftHeight, rightHeight);
};

AVLNode.prototype.setLeft = function(leftNode){
	if(leftNode === null){
		this.left = null;
		return;
	}
	this.left = leftNode;
	this.left.parent = this;
};

AVLNode.prototype.setRight = function(rightNode){
	if(rightNode === null){
		this.right = null;
		return;
	}
	this.right = rightNode;
	this.right.parent = this;
};

AVLNode.prototype.balanceFactor = function(){
	var leftHeight = 0;
	var rightHeight = 0;
	if(this.left) leftHeight = this.left.height();
	if(this.right) rightHeight = this.right.height();
	return rightHeight - leftHeight;
};

AVLNode.prototype.isLeftChild = function(){
	if(this.parent)
		if(this.parent.left === this) return true;
	return false;
};

AVLNode.prototype.isRightChild = function(){
	if(this.parent)
		if(this.parent.right === this) return true;
	return false;
};

AVLNode.prototype.rightRotate = function(){
	if(!this.left) return this;
	var isLeftChild = this.isLeftChild();
	var isRightChild = this.isRightChild();
	var parent = this.parent;
	var newThis = this.left;
	this.setLeft(newThis.right);
	newThis.setRight(this);
	if(isLeftChild){
		parent.setLeft(newThis);
	}else if(isRightChild){
		parent.setRight(newThis);
	}
	return newThis;
};

AVLNode.prototype.leftRotate = function(){
	return this;
	if(!this.right) return this;
	var isLeftChild = this.isLeftChild();
	var isRightChild = this.isRightChild();
	var parent = this.parent;
	var newThis = this.right;
	this.setRight(newThis.left);
	newThis.setLeft(this);
	if(isLeftChild()){
		parent.setLeft(newThis);
	}else if(isRightChild()){
		parent.setRight(newThis);
	}
	return newThis;
};


function AVLTree(){
	this.root = null;
}


AVLTree.prototype.push = function(item){
	if(this.root) this._push(this.root, item); //if there are items: recursively add the new node
	else this.root = new AVLNode(item, null, null, null); //otherwise set the root
};

AVLTree.prototype._push = function(node, item){
	//stop if item is in tree
	if(node.data == item) return false;
	
	if(item < node.data){ //if item is less than the current node's value
		if(node.left){ //if there is already a node there, check whether it is added by decending the tree
			var wasAdded = this._push(node.left, item);
			if(wasAdded){
				this.performRotation(node);
			}
			return wasAdded;
		}else{ //if no node is there, add item on the left
			node.setLeft(new AVLNode(item, null, null, null));
			return true;
		}
	}else{
		if(node.right){
			var wasAdded = this._push(node.right, item);
			if(wasAdded){
				this.performRotation(node)
			}
			return wasAdded;
		}else{
			node.setRight(new AVLNode(item, null, null, null));
			return true;
		}
	}
	return false;
};

AVLTree.prototype.performRotation = function(node){
	var balanceFactor = node.balanceFactor();
	var isRoot = node.data == this.root.data;
	if(balanceFactor >= 2){
		if(node.right.balanceFactor() <= -2){
			//double left
			var newNode = node.leftRotate();
			newNode = newNode.leftRotate();
			if(isRoot) this.root = newNode;
		}else{
			//single left
			var newNode = node.leftRotate();
			if(isRoot) this.root = newNode;
		}
	}else if(balanceFactor <= -2){
		if(node.left.balanceFactor() >= 2){
			//double right
			var newNode = node.rightRotate();
			newNode = newNode.rightRotate();
			if(isRoot) this.root = newNode;
		}else{
			//single right
			var newNode = node.rightRotate();
			if(isRoot) this.root = newNode;
		}
	}
};


AVLTree.prototype.toString = function(){
	var rv = [];
	this.forEach(rv.push.bind(rv));
	return rv.join(',');
};


AVLTree.prototype.size = function(){
	var rv = 0;
	this.forEach(function(){rv++;});
	return rv;
};

AVLTree.prototype.forEach = function(func){
	var process = function(node){
		if(node.left) process(node.left);
		func(node.data);
		if(node.right) process(node.right);
	};
	if(this.root) process(this.root);
};


AVLTree.prototype.contains = function(item, node){
	if(node === undefined){
		node = this.root;
		if(node === undefined) return false;
	}
	if(item == node.data) return true;
	else if(item < node.data && node.left) return this.contains(item, node.left);
	else if(item > node.data && node.right) return this.contains(item, node.right);
	return false;
};


if(typeof module !== 'undefined') module.exports = AVLTree;