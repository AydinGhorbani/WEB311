/*********************************************************************************

* WEB322 – Assignment 1

* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 

* No part of this assignment has been copied manually or electronically from any other source

* (including web sites) or distributed to other students.

*

* Name: Aydin Ghorbani Student ID: 127170226 Date: 9/15/23

* The copied code is cited.

*packge.jason file is used from previous semester to zip the files 
* with the prepare-submission command. (bestzip).
********************************************************************************/


const { dir } = require('console'); //---->this was supposed to be used when user
const fs = require('fs');              //inputs a dir name instate of file name
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Do you wish to process a File (f) or directory (d): ', (answer) => {
  if (answer.toLowerCase() === 'f') {
    rl.question('Enter the name of the file: ', (fileName) => {
      processFile(fileName);
      rl.close();
    });
  } else if (answer.toLowerCase() === 'd') {
    rl.question('Enter the name of the directory: ', (dirName) => {
      processDirectory(dirName);
      rl.close();
    });
  } else {
    console.log('Invalid Selection');
    rl.close();
  }
});

//https://stackoverflow.com/questions/15772925/encoding-is-ignored-in-fs-readfile
// processFile function source "encoding ignored"
function processFile(fileName) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const content = data.toString().replace(/\s+/g, ' ');
    const words = content.replace(/[^\w\s\']/g, '').split(' ');
    const wordCount = words.length;
    const charCount = content.length;
    const longestWord = findLongestWord(words);
    const mostRepeatedWord = findMostRepeatedWord(words);

    console.log(`Number of Characters (including spaces): ${charCount}`);
    console.log(`Number of Words: ${wordCount}`);
    console.log(`Longest Word: ${longestWord}`);
    console.log(`Most Repeated Word: ${mostRepeatedWord.word} - ${mostRepeatedWord.count} times`);
  });
}


function findLongestWord(words) {
  let longest = '';
  for (const current of words) {
    if (current.length > longest.length) {
      longest = current;
    }
  }
  return longest;
}


function findMostRepeatedWord(words) {
  const wordCountMap = {};
  words.forEach((word) => {
    wordCountMap[word] = (wordCountMap[word] || 0) + 1;
  });

  let mostRepeatedWord = { word: '', count: 0 };
  for (const word in wordCountMap) {
    if (wordCountMap[word] > mostRepeatedWord.count) {
      mostRepeatedWord = { word, count: wordCountMap[word] };
    }
  }

  return mostRepeatedWord;
}

function processDirectory(dirName) {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      console.log(err.message);
      return;
    }

    console.log(`Files (reverse alphabetical order): ${files.sort().reverse().join(', ')}`);

    // Optional Challenge: Display file sizes
    //https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
    files.forEach((file) => {
      const filePath = `${dirName}/${file}`;
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.log(statErr.message);
          return;
        }
        console.log(`${file}: ${stats.size} bytes`);
      });
    });
  });
}
