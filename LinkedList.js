const _Node = require('./_Node');

class LinkedList {
  constructor() {
    // 'head' indicates beginning of list / 1st node
    this.head = null;
    this.length = 0;
  }

  insertAt(item, position) {
    if (this.head === null) {
      return;
    }

    if (position === 0) {
      this.insertFirst(item);
      this.length++;
      return;
    }

    // Set a counter; adjust position so it is not zero-based
    let count = 1;
    position += 1;

    if (position > this.length) {
      console.log('Indexing error; position not in list')
      return;
    }

    // Find node with key
    let currNode  = this.head;
    let previousNode = this.head;
    let newNode;
    
    while(count < position) {

      // Save the previous node
      previousNode = currNode;
      currNode = currNode.next;
      count++;
    }
    
    // Point the newNode to Node with key
    newNode = new _Node(item, currNode)
    // Point the previousNode to the newNode between it and currNode
    previousNode.next = newNode;
    this.length++;    
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
    this.length++;
    return this.head;
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
      this.length++;
      return;
    }

    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
      this.length++;
    }
  }

  insertBefore(item, key) {
    //If empty, insert
    if (this.head === null) {
      this.insertFirst(item);
      this.length++;
      return;
    }

    // If key is the first node
    if (this.head.value === key) {
      this.insertFirst(item);
      this.length++;
      return;
    }

    // Find node with key
    let currNode  = this.head;
    let previousNode = this.head;
    let newNode;
    
    while((currNode !== null) && (currNode.value !== key)) {
      // Save the previous node
      previousNode = currNode;
      currNode = currNode.next;
    }
    
    if (currNode === null) { 
      console.log(`Item '${key}' not found`);
      return;
    }
    // Point the newNode to Node with key
    newNode = new _Node(item, currNode)
    // Point the previousNode to the newNode between it and currNode
    previousNode.next = newNode;
    this.length++;
  }

  insertAfter(item, key) {
    //If empty, insert
    if (this.head === null) {
      this.insertFirst(item);
      this.length++;
      return;
    }

    // Find the node
    const nodeToFind = this.find(key);

    // If not found
    if (!nodeToFind) {
      console.log(`Item '${key}' not found`);
      return;
    }

    // If last node
    if (nodeToFind.next === null) {
      nodeToFind.next = new _Node(item, null);
      this.length++;
      return;
    }

    // Point the newNode to node following nodeToFind
    let newNode = new _Node(item, nodeToFind.next)
   
    // Point nodeToFind to newNode
    nodeToFind.next = newNode;
    this.length++;
  }

  find(item) {
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currNode.value !== item) {
      /* Return null if it's the end of the list
         and the item is not on the list */
      if (currNode.next === null) {
        return null;
      }
      else {
        //Otherwise, keep looking
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next
    // node head.
    if (this.head.value === item) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    
    let currNode = this.head; // Start at the head
    let previousNode = this.head; // Start at the head
    while((currNode !== null) && (currNode.value !== item)) {
      // Save the previous node
      previousNode = currNode;
      currNode = currNode.next;
    }
    
    if (currNode === null) { 
      console.log('Item not found');
      return;
    }

    previousNode.next = currNode.next;
    this.length--;
  }
}

module.exports = LinkedList;