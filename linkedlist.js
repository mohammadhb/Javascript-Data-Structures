class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList {

    constructor(list, options){
        this.first = null;
        this.last = null;
    }
    
    add(value){
        
        const newNode = new Node(value);
        
        if(!this.first)
        this.first = newNode, this.last = newNode;
        else if(this.first == this.last)
        this.last = newNode, this.first.next = newNode;
        else {
            this.last.next = newNode;
            this.last = newNode;
        }
        
        return newNode;
        
    }
    
    toArray(){
        let tempNode = this.first;
        const arrayLinkedList = [];
        
        while(tempNode){
            arrayLinkedList.push(tempNode.value);
            tempNode = tempNode.next;
        }
        
        return arrayLinkedList;
    }
    
}

module.exports = {
    LinkedList
};