function Stack(){
	this.root = null;
}

//returns whether the stack is empty
Stack.prototype.isEmpty = function(){
	return this.root == null;
};

//creates a new root pointing to the old root
Stack.prototype.push = function(item){
	this.root = {
		data : item,
		next : this.root
	};
};

//gets the data at the top of the stack
Stack.prototype.top = function(){
	if(!this.isEmpty()) return this.root.data;
	return null;
};

//returns the item at the top of the stack
Stack.prototype.pop = function(){
	if(this.isEmpty()) return null;
	var top = this.top();
	this.root = this.root.next;
	return top;
};

if(typeof module !== 'undefined') module.exports = Stack;