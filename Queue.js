function Queue(){
	this.root = null;
}

//checks whether the queue is empty
Queue.prototype.isEmpty = function(){ return this.root == null; };

//adds a new item to the queue
Queue.prototype.push = function(item){
	var newNode = {data : item, next : null};
	if(this.isEmpty()) this.root = newNode;
	else{
		var current = this.root.next, previous = this.root;
		while(current){ //iterate through the nodes, until: previous points to the last node
			previous = current;
			current = current.next;
		}
		//set previous.next to be the new node
		previous.next = newNode;
	}
};

//gets the data at the top of the stack
Queue.prototype.top = function(){
	if(!this.isEmpty()) return this.root.data;
	return null;
};

//returns the item at the top of the stack
Queue.prototype.pop = function(){
	if(this.isEmpty()) return null;
	var top = this.top();
	this.root = this.root.next;
	return top;
};

if(typeof module !== 'undefined') module.exports = Queue;