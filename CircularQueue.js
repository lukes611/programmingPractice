
function CircularQueue(totalItems){
	this.start = 0;
	this.end = 0;
	this.bufferSize = totalItems !== undefined ? totalItems+1 : 101;
	this.array = new Array(this.bufferSize);
}

//returns whether the circular queue is empty
CircularQueue.prototype.isEmpty = function(){
	return this.start == this.end;
};

CircularQueue.prototype.nextIndex = function(index){
	return (index + 1) % this.bufferSize;
};

//add a new item the the circular queue : returns true if operation was successful
CircularQueue.prototype.push = function(item){
	var nextEnd = this.nextIndex(this.end);
	//if the next index for end is equal to start: the buffer is full!, return false (aka: we can't do that)
	if(nextEnd == this.start) return false;
	this.array[this.end] = item;
	this.end = nextEnd;
	return true; //else return true: there is enough space
};

//returns the first item in the queue
CircularQueue.prototype.pop = function(){
	if(this.isEmpty()) return null;
	var rv = this.array[this.start];
	this.start = this.nextIndex(this.start);
	return rv;
};


if(typeof module !== 'undefined') module.exports = CircularQueue;