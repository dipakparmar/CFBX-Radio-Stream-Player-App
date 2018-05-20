"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
exports.createRandomNum = createRandomNum;
exports.distinct = distinct;
exports.arrayEqual = void 0;

function formatTime(second) {
  var i = 0;
  var s = parseInt(second);

  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);

    if (i > 60) {
      i = parseInt(i % 60);
    }
  } // 


  var zero = function zero(v) {
    return v >> 0 < 10 ? "0".concat(v) : v;
  };

  return [zero(i), zero(s)].join(":");
}

function createRandomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

function distinct(array) {
  return array.map(function (item) {
    return JSON.stringify(item);
  }).filter(function (item, idx, arry) {
    return idx === arry.indexOf(item);
  }).map(function (item) {
    return JSON.parse(item);
  });
}

var arrayEqual = function arrayEqual(arr1) {
  return function (arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };
};

exports.arrayEqual = arrayEqual;