
function HashMap(size){
	this.size = size === undefined ? 200 : size;
	this.data = Array.apply(undefined, Array(this.size)).map(function(){return [];});
}

//adds a new item to the hash map
HashMap.prototype.push = function(item){
	//get the index,
	var index = this.hashFunction(item);
	//insert item by index
	this.data[index].push(item);
};

//implement the hash function
HashMap.prototype.hashFunction = function(item){
	var index = HashMap.hashFunction(item);
	return index % this.size; //loop around for out of bounds index
};

HashMap.prototype.hasItem = function(item){
	var index = this.hashFunction(item);
	var bucket = this.data[index];
	for(var i = 0; i < bucket.length; i++)
		if(bucket[i] == item) return true;
	return false;
};

HashMap.prototype.forEach = function(func){
	//for each item x, call func(x)
	for(var i = 0; i < this.data.length; i++){
		this.data[i].forEach(func);
	}
};




HashMap.hashFunction = function(item){
	if(typeof item === 'number') return Math.pow(item, 3);
	if(typeof item === 'string'){
		var rv = 0;
		for(var i = 0; i < item.length; i++){
			rv += item.charCodeAt(i);
		}
		return Math.pow(rv, 3);
	}
	return HashMap.hashFunction(item.toString());
};


if(typeof module !== 'undefined') module.exports = HashMap;