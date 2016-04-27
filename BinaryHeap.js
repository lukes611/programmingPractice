
function BinaryHeap(){
	this.list = [0];
	this.length = 0;
}

BinaryHeap.prototype.push = function(item){
	this.list.push(item);
	this.length++;
	this.percolate(this.length-1);
};

BinaryHeap.prototype.at = function(index){
	return this.list[index];
};

BinaryHeap.prototype.forEach = function(func){
	if(this.length == 0) return;
	var me = this;
	var process = function(nodeIndex){
		if(nodeIndex >= me.length) return;
		var child1 = nodeIndex * 2;
		var child2 = child1 + 1;
		func(me.list[nodeIndex]);
		process(child1);
		process(child2);
	};
	process(1);
};

BinaryHeap.prototype.toString = function(){
	var st = [];
	this.forEach(st.push.bind(st));
	return st.join(',');
};

BinaryHeap.prototype.percolate = function(child){
	var parent = Math.floor(child / 2);
	if(parent <= 0) return;
	if(this.list[parent] > this.list[child]){
		var tmp = this.list[parent];
		this.list[parent] = this.list[child];
		this.list[child] = this.list[parent];
	}
	this.percolate(parent);
};


if(typeof module !== 'undefined') module.exports = BinaryHeap;