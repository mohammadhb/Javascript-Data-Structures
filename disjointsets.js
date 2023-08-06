const { LinkedList } = require("./linkedlist");

class Node {
    constructor(value, leaderSet=null){
        this.value = value;
        this.next = null;
        this.leaderSet = leaderSet;
    }
}

class NodeSet {
    constructor(head=null, tail=null){
        this.head = head;
        this.tail = tail;
    }
}

class DisjointSet{

    constructor(){}

    makeSet(value){}
    union(destination, source){}
    find(){}

}

//With LinkedList   M+N*(logN) -> <m actions in total + n makesets + maximum n-1 union>
class DisjointSetLinkedList extends DisjointSet {
    
    constructor(){
        super();
        this.valueToSetMap = {};
        this.count = 0;
    }

    makeSet(value){

        //Doesn't accept duplicates
        if(value in this.valueToSetMap) return;
        
        const newNode = new Node(value);
        const newSet = new NodeSet(newNode, newNode);
        newNode.leaderSet = newSet;
        this.valueToSetMap[value] = newSet.head;
        this.count++;
    
    }

    find(value){
        return this.valueToSetMap[value].leaderSet;
    }

    union(destination, source){

        //Finding the nodes
        const destinationSet = this.find(destination);
        const sourceSet = this.find(source);

        //If the leaders are same they are a jointset no need to union
        if(sourceSet == destinationSet) return;

        //Iterating over the source nodes
        let curser = sourceSet.head;
        while(curser){
            curser.leaderSet = destinationSet;
            curser = curser.next;
        }

        //Gluing the destination end to the start of the source
        destinationSet.tail.next = sourceSet.head;
        destinationSet.tail = sourceSet.tail;

        //At last a set is combined to another.
        this.count--;

    }

    toArray(){

        const sets = [], headCheckpoint = {};
        //Traversal ...
        
        for(const value in this.valueToSetMap){

            const leaderSet = this.find(value);
            if(leaderSet.head.value in headCheckpoint) continue;

            let curser = leaderSet.head;
            const tempSet = [];
            while(curser){
                tempSet.push(curser.value);
                curser = curser.next;
            }
            sets.push(tempSet);

            headCheckpoint[leaderSet.head.value] = true;

        }

        return sets;

    }


}

//Test

const disjointSetLinkedList = new DisjointSetLinkedList();

disjointSetLinkedList.makeSet(1);
disjointSetLinkedList.makeSet(2);
disjointSetLinkedList.makeSet(3);
disjointSetLinkedList.makeSet(10);
disjointSetLinkedList.makeSet(12);

disjointSetLinkedList.union(2,10); // [ [ 1 ], [ 2, 10 ], [ 3 ], [ 12 ] ]
disjointSetLinkedList.union(2,10); // [ [ 1 ], [ 2, 10 ], [ 3 ], [ 12 ] ]
disjointSetLinkedList.union(2,12); // [ [ 1 ], [ 2, 10, 12 ], [ 3 ] ]

console.log(disjointSetLinkedList.toArray()); // [ [ 1 ], [ 2, 10, 12 ], [ 3 ] ]
console.log(disjointSetLinkedList.count); // 3 Disjoint Arrays

//With Array        
class DisjointSetArray extends DisjointSet {
    constructor(n) {
        this.rank = new Array(n);
        this.parent = new Array(n);
        this.n = n;
        this.makeSet();
    }
 
    makeSet() {
        for (let i = 0; i < this.n; i++) {
            this.parent[i] = i;
        }
    }
 
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
 
    Union(x, y) {
        let xset = this.find(x);
        let yset = this.find(y);
 
        if (xset === yset) return;
 
        if (this.rank[xset] < this.rank[yset]) {
            this.parent[xset] = yset;
        } else if (this.rank[xset] > this.rank[yset]) {
            this.parent[yset] = xset;
        } else {
            this.parent[yset] = xset;
            this.rank[xset] = this.rank[xset] + 1;
        }
    }
}