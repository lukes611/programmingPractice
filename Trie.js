function Trie(parent){
	this.root = {};
	this.parent = parent === undefined ? null : parent;
}

Trie.prototype._push = function(st){
	if(st.length <= 0) return;
	var c = st.shift();
	if(!(c in this.root))
			this.root[c] = new Trie();
	if(st.length > 0)
		this.root[c]._push(st);
};

Trie.prototype.numChildren = function(){
	return Object.keys(this.root).length;
};

Trie.prototype.hasChildren = function(){
	return this.numChildren() > 0;
};

Trie.prototype.push = function(str){
	var st = str.split('');
	this._push(st);
};

Trie.prototype.forEach = function(func){
	var fe = function(node, st){
		for(var k in node.root){
			fe(node.root[k], st + k);
		}
		if(!node.hasChildren()) func(st);
	};
	fe(this, '');
};

Trie.prototype._contains = function(st){
	if(st.length == 0) return true;
	var c = st.shift();
	if(c in this.root){
		return this.root[c]._contains(st);
	}
	return false;
};

Trie.prototype.contains = function(str){
	str = str.split('')
	return this._contains(str);
};


if(typeof module !== 'undefined') module.exports = Trie;
