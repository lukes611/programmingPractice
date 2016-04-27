
//a linked list object
function LinkedList(){
	this.length = 0;
	this.head = null;
}

//forEach : a function to loop through each item, performing f(x) on each item x
LinkedList.prototype.forEach = function(f){
	var ptr = this.head;
	while(ptr){
		f(ptr.data);
		ptr = ptr.next;
	}
};

//converts the list to an array
LinkedList.prototype.toArray = function(){
	var rv = [];
	this.forEach(rv.push.bind(rv));
	return rv;
};

//converts the list to a string
LinkedList.prototype.toString = function(){
	return this.toArray().join(',');
};

LinkedList.prototype.push = function(item){
	//create a new node
	var newNode = {
		data : item,
		next : null
	};
	//if nothing is in the list: set head (root node)
	if(this.length == 0) this.head = newNode;
	else{
		//use two pointers (previous and current to iterate through the linked list until current is null)
		//then set previous to the new node
		var previous = this.head, current = this.head.next;
		while(current){
			previous = current;
			current = current.next;
		}
		previous.next = newNode;
	}
	this.length++;
};

//retrieves the item at index
LinkedList.prototype.at = function(index){
	var c = this.head;
	for(var i = 0; i < index; i++, c = c.next) ;
	return c.data;
};

LinkedList.prototype.iterator = function(){
	var c = this.head;
	return {
		hasNext : function(){ return c !== null; },
		next : function(){ var rv = c.data; c = c.next; return rv; }
	};
};

if(typeof module !== 'undefined') module.exports = LinkedList;