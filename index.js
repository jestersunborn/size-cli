#! /usr/bin/env node

// Imports
const fs = require('fs');
const recursive = require('recursive-readdir');
const colors = require('colors');

// =======
// Helpers
// =======

const getFileSize = (filename) => fs.statSync(filename).size;

const getDirectorySize = (directory) => {
  recursive(directory)
    .then(files => {
      const size = files.reduce((sum, file) => sum + getFileSize(file), 0);
      formatResult(size, files.length);
    });
}

const isMoreThanZero = (num = 0) => Number(num.toFixed(2)) > 0;

const formatResult = (size, files = 0) => {
  const inKB = (size / 1024);
  const inMB = (inKB / 1024);
  const inGB = (inMB / 1024);

  console.log();

  if (isMoreThanZero(inGB)) {
    console.log('\t', `${inGB.toFixed(2)}`.red, 'GB'.green);
  }

  if (isMoreThanZero(inMB)) {
    console.log('\t', `${inMB.toFixed(2)}`.red, 'MB'.green);
  }

  if (isMoreThanZero(inKB)) {
    console.log('\t', `${inKB.toFixed(2)}`.red, 'KB'.green);
  }

  console.log('\t', `${size}`.red, 'bytes'.green);

  if (files) {
    console.log('\t', `${files} total files inside.`.yellow)
  }

  console.log();
};

// ======
// Main
// ======

// Get dir or file name from arguments
const TARGET = process.argv[2];

if (fs.lstatSync(TARGET).isDirectory()) {
  getDirectorySize(TARGET);
} else {
  formatResult(getFileSize(TARGET));
}
