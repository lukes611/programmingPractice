
function OrderedLinkedList(comparitor){
	this.length = 0;
	this.head = null;
	this.comparitor = comparitor !== undefined ? comparitor : function(a,b){return a-b;};
}

OrderedLinkedList.prototype.newNode = function(data, next){
	if(next === undefined) next = null;
	return {
		data : data,
		next : next
	};
};

//forEach : a function to loop through each item, performing f(x) on each item x
OrderedLinkedList.prototype.forEach = function(f){
	var ptr = this.head;
	while(ptr){
		f(ptr.data);
		ptr = ptr.next;
	}
};

//converts the list to an array
OrderedLinkedList.prototype.toArray = function(){
	var rv = [];
	this.forEach(rv.push.bind(rv));
	return rv;
};

//converts the list to a string
OrderedLinkedList.prototype.toString = function(){
	return this.toArray().join(',');
};

//retrieves the item at index
OrderedLinkedList.prototype.at = function(index){
	var c = this.head;
	for(var i = 0; i < index; i++, c = c.next) ;
	return c.data;
};

OrderedLinkedList.prototype.iterator = function(){
	var c = this.head;
	return {
		hasNext : function(){ return c !== null; },
		next : function(){ var rv = c.data; c = c.next; return rv; }
	};
};

//adds an item in order to the linked list
OrderedLinkedList.prototype.push = function(item){
	//if no items, make head point to newNode
	if(this.length == 0) this.head = this.newNode(item);
	//if item should go before head's, place it as the head where the new head points to the old head
	else if(this.comparitor(item,this.head.data) <= 0) this.head = this.newNode(item, this.head);
	else{ //otherwise, iterate through the linked list to find the correct spot
		var current = this.head.next, previous = this.head;
		while(current){ //if current is null: break
			if(this.comparitor(item,current.data) <= 0) break; //if item should go ahead of current: break
			previous = current;
			current = current.next;
		}
		//place a new node pointing to previous.next, and set previous.next to be this new node
		//(place new node between previous and previous.next) -> the spot it belongs
		previous.next = this.newNode(item, previous.next);
	}
	//increment the counter
	this.length++;
};



if(typeof module !== 'undefined') module.exports = OrderedLinkedList;