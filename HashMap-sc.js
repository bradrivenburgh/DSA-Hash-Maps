const LinkedList = require('./LinkedList');

class HashMapSC {
  constructor(initialCapacity=8) {
      this.length = 0;
      this._hashTable = [];
      this._capacity = initialCapacity;
      // Add as many LL to _hashTable as the _capacity allows
      for (let i = 0; i < this._capacity; i++) {
        this._hashTable.push(new LinkedList());
      }            
  }

  get(key) {
      const index = this._findSlot(key);
      return this._hashTable[index].find(key);
  }

  peek(key) {
    const index = this._findSlot(key);
    return this._hashTable[index] === undefined
      ? false
      : true
  }

  set(key, value){
      const index = this._findSlot(key);
      if(!this._hashTable[index].find(value)) {
          this.length++;
      }
      this._hashTable[index].insertFirst({
          key,
          value,
      }); 
  }

  delete(key) {
      const index = this._findSlot(key);
      const slot = this._hashTable[index];
      slot.remove(key);
      this.length--;
  }

  _findSlot(key) {
      const hash = HashMapSC._hashString(key);
      return hash % this._capacity;
  }

  static _hashString(string) {
      let hash = 5381;
      for (let i = 0; i < string.length; i++) {
          hash = (hash << 5) + hash + string.charCodeAt(i);
          hash = hash & hash;
      }
      return hash >>> 0;
  }
}


function main() {
  const lotr = new HashMapSC();

  const characters = [
    ["Hobbit", "Bilbo"],
    ["Hobbit", "Frodo"],
    ["Wizard", "Gandalf"],
    ["Human", "Aragorn"],
    ["Elf", "Legolas"],
    ["Maiar", "The Necromancer"],
    ["Maiar", "Sauron"],
    ["RingBearer", "Gollum"],
    ["LadyOfLight", "Galadriel"],
    ["HalfElven", "Arwen"],
    ["Ent", "Treebeard"],
  ];
  for (element of characters) {
    lotr.set(element[0], element[1]);
  }

  return lotr;
}

lotrHashMap = main();
console.log(lotrHashMap);
console.log(lotrHashMap.get("Maiar"), lotrHashMap.get('Hobbit'));


module.exports = HashMapSC;