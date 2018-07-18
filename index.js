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

const formatResult = (size, files) => {
  const inKB = (size / 1024);
  const inMB = (inKB / 1024);
  const inGB = (inMB / 1024);

  console.log();
  (Number(inGB.toFixed(2)) > 0) ? console.log('\t', `${inGB.toFixed(2)}`.red, 'GB'.green) : null;
  console.log('\t', `${inMB.toFixed(2)}`.red, 'MB'.green);
  console.log('\t', `${inKB.toFixed(2)}`.red, 'KB'.green);
  console.log('\t', `${size}`.red, 'bytes'.green);
  files ? console.log('\t', `${files} total files inside.`.yellow) : null;
  console.log();
};

// ======
// App
// ======

const TARGET = process.argv[2];

if (fs.lstatSync(TARGET).isDirectory()) {
  getDirectorySize(TARGET);
} else {
  formatResult(getFileSize(TARGET));
}
