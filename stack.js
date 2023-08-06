class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    
    size=0;
    #first = null;
    #last = null;

    constructor(){}

    push(element){
        const node = new Node(element);
        if(!this.first) {
            this.first = node;
            this.last = node;
        } else {
            const temp = this.first;
            this.first = node;
            this.first.next = temp
        }
        return ++this.size;
    }

    pop(){
        if(!this.first) return null;
        const removingNode = this.first;
        if(this.first === this.last){
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return removingNode.value;
    }

}
