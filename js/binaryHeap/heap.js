


function addHeap(){
	this.array = [];
	this.capacity = 2;
	this.size = 0

	this.separation = [0, 20, 40, 78, 160];
	this.speed = 50;

//	this.buildHeap = buildHeap;
	this.percolatingDown = percolatingDown;
//	this.heapSort = heapSort;
	this.deleteMin = deleteMin;
	this.insert = insert;

	this.moveNodes = moveHeapNodes;

	this.toString = HeapToString;

}
/*
function buildHeap(){
	for(var k = Math.floor(this.size/2); k > 0; k--)
		this.percolatingDown(k);
}
*/
function percolatingDown(k){
	var tmp = this.array[k];
	var child;

	for(; 2 * k <= this.size; k = child){
		child = 2 * k;

		if(child != this.size &&
			this.array[child].id > this.array[child + 1].id)
			child++;

		if(tmp.id > this.array[child].id)
			this.array[k] = this.array[child];
		else
			break;
	}
	this.array[k] = tmp;
}
/*
function heapSort(array){
	this.size = array.length;
	for(var i=0; i<array.length; i++){
		this.array[i + 1] = array[i];  // no se usa la posición 0 en el array del heap
	}
	this.buildHeap();

	for(var i= this.size; i > 0; i--){
		var tmp = this.array[i];
		this.array[i] = this.array[1];
		this.array[1] = tmp;
		this.size --;
		this.percolatingDown(1);
	}

	for(var k=0; k < this.array.length - 1; k++)
		array[k] = this.array[this.array.length - 1 - k];
}
*/
function deleteMin(){
	if(this.size == 0)
		return false;

	var min = this.array[1];
	this.array[1] = this.array[this.size--];
	this.percolatingDown(1);
	return min;
}

function insert(x){
	var pos = ++this.size;

	for(; pos > 1 && x < this.array[Math.floor(pos/2)].id; pos = Math.floor(pos/2))
		this.array[pos] = this.array[Math.floor(pos/2)];

	this.array[pos] = addNode(x);

	this.moveNodes( 1, 400, 300, Math.floor(Math.log2(this.size)) );
}

function HeapToString(){
	var out = "height: " + Math.floor(Math.log2(this.size)) + " Array: ";
	for(var k = 1; k <= this.size; k++)
		out += this.array[k].id + "-";
	return out;
}

function moveHeapNodes(i, x, y, height){
	this.array[i].move(x, y);

	if(this.array[2*i])
		this.moveNodes(2*i, x - this.separation[height], y + 40, height - 1);
	if(this.array[2*i + 1])
		this.moveNodes(2*i + 1, x + this.separation[height], y + 40, height - 1);
	
}