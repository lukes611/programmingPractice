var Sorting = {};

Sorting.test = function(list){
	for(var i = 0; i < list.length - 1; i++)
		if(list[i] > list[i+1]) return false;
	return true;
};

Sorting.swap = function(l, i, j){
	var x = l[i];
	l[i] = l[j];
	l[j] = x;
};

Sorting.bubble = function(list){
	for(var x = 0; x < list.length; x++)
		for(var i = 0; i < list.length-1-x; i++)
			if(list[i] > list[i+1]) Sorting.swap(list, i, i+1);
};


Sorting.selection = function(list){
	for(var i = 0; i < list.length -1; i++){
		var min = i;
		for(var j = i+1; j < list.length; j++){
			if(list[min] > list[j]) min = j;
		}
		Sorting.swap(list, i, min);
	}
};

Sorting.insertion = function(list){
	for(var i = 1; i < list.length; i++){
		for(var j = i; j >= 1; j--){
			if(list[j] < list[j-1]) Sorting.swap(list, j, j-1);
			else break;
		}
	}
};

Sorting.shell = function(list){
	var insertionSkipSort = function(skip, start){
		for(var i = start+skip; i < list.length; i+=skip){
			for(var j = i; j >= skip; j-=skip){
				if(list[j] < list[j-skip]) Sorting.swap(list, j, j-skip);
				else break;
			}
		}	
	};
	var startSkip = Math.floor(list.length / 4) + 1;
	for(var skip = startSkip; skip >= 1; skip--){
		for(var i = 0; i < skip; i++){
			insertionSkipSort(skip, i);
		}
	}
	
};


Sorting.merge = function(list){
	var Combine = function(start1, start2, end){
		var tmp = list.slice(start1, end+1);
		var a = 0, b = start2-start1, c = end-start1, d = start2-start1, i = start1;
		while(a < d && b <= c){
			if(tmp[a] < tmp[b])
				list[i++] = tmp[a++];
			else list[i++] = tmp[b++];
		}
		while(a < d) list[i++] = tmp[a++];
		while(b <= c) list[i++] = tmp[b++];
	};
	var split = function(start, end){
		var mid = start + Math.floor((end-start)*0.5);
		if(start < end){
			split(start, mid);
			split(mid+1, end);
			Combine(start, mid+1, end);
		}
	};
	split(0, list.length-1);
};

Sorting.quick = function(list){
	var qs = function(start, end){
		if(end - start > 0){
			var pivot = end, i = start;
			var pivotValue = list[pivot];
			pivot = start;
			for(; i < end; i++){
				if(list[i] <= pivotValue){
					Sorting.swap(list, i, pivot);
					pivot++;
				}
			}
			Sorting.swap(list, end, pivot);
			qs(start, pivot-1);
			qs(pivot, end);
		}
	};
	qs(0, list.length-1);
};

if(typeof module !== 'undefined') module.exports = Sorting;