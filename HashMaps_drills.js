const HashMap = require('./HashMap');
HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

function main() {
  const lotr = new HashMap();

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
// console.log(lotrHashMap);
// console.log(lotrHashMap.get("Maiar"), lotrHashMap.get('Hobbit'));

// Questions:
/*
1. 
A. Were all items hashed? 
Not all items have been hashed; only 9 of the 11,
and one is keyed to an "undefined" property.  I moved the 
HashMap.MAX_LOAD_RATIO and HashMap.SIZE_RATIO to the top of the file
and now all items are being hashed.
B. What are the values keyed to "Maiar" and "Hobbit"? 
"Sauron" and "Frodo" are values keyed to "Maiar" and "Hobbit",
respectively.  The values for these races are not "Bilbo" and
"The Necromancer" because they come first and the property is
overwritten.
C. What is the capacity fo table after hassing all above items?
The capacity is 24.  It starts at 8, but the _resize method is 
triggered when the loadRatio ((length + _deleted + 1) / capacity)
exceeds the MAX_LOAD_RATIO.  The hashTable resizes by a factor of
SIZE_RATIO (3) and the new capacity = 24.

2. WhatDoesThisDo should output:
20
10

str1 to str4 all have the same key ("Hello World."), so  
setting different values to that key will overwrite 
existing data.  
*/

function removeDuplicates(string) {
  const noDups = new HashMap();

  // Set each character as a property, overwriting
  // duplicates.
  let newStr = "";
  // VERSION 1 without peek()
  // for (let char of string) {
  //   noDups.set(char, char);
  //   if (!newStr.includes(char)) {
  //     newStr += noDups.get(char);
  //   }
  // }

  // VERSION 2 with peek()
  for (let char of string) {
    if (!noDups.peek(char)) {
      noDups.set(char, char)
      newStr += char
    }
  }

  return newStr;
}

console.log(removeDuplicates('google all that you think can think of'));

function containsPalindrome(string) {
  const hash = new HashMap();
  // VERSION 2 (with peek())
  // Had to add peek() method to HashMap for this to work
  // without doing three iterations through hash
  for (let char of string) {
    !hash.peek(char)
      ? hash.set(char, 1)
      : hash.set(char, hash.get(char) + 1);
  }

  // VERSION 1 (WITHOUT peek() below)
  /*
  // Load hash with properties, one for each char in string
  for (let char of string) {
      hash.set(char, 0);
  }
  // Count the number of occurrences of each char
  for (let char of string) {
    hash.set(char, hash.get(char) + 1);
  }
  */

  // Count the number of chars that don't have a match
  // e.g., in 'google', 'l' and 'e' would both be without
  // matching chars, so noMatch = 2;
  let noMatch = 0;
  hash._hashTable.forEach(element => {
    if (element.value % 2 !== 0) {
      noMatch++;
    }
  });

  return !(noMatch > 1);
}

console.log(containsPalindrome('google')); // false
console.log(containsPalindrome('acecarr')); // true
console.log(containsPalindrome('north')); // false

function anagramGroups(array) {
  let hash = new HashMap();
  // arrange chars in each str in alphabetical order
  array.forEach(str => {
    const alphaStr = str.split('').sort().join('');
    !hash.peek(alphaStr)
      ? hash.set(alphaStr, [str])
      : hash.get(alphaStr).push(str);
  });
  // Format output
  const output = hash._hashTable.map(property => property.value);
  return output;
}

const input = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
// Output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
console.log(anagramGroups(input));