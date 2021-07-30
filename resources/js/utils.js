/*-
ProjectName: ValueAndValue
FileName: utils.js
Encoding: UTF-8
Author: TwoSquirrels
CreationDate: Jul 30, 2021
Copyright: (c) 2021 TwoSquirrels
License:
  name: Apache License, Version 2.0
  url: https://apache.org/licenses/LICENSE-2.0
-*/

/**
 * Generates a Promise that waits for the specified time in milliseconds.
 * @param {number} time - how many milliseconds do I have to wait
 * @rerurn {Promise} - a Promise that waits for the specified time in milliseconds
 */
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

/**
 * Cast to Array.
 * @param {} before - before casting
 * @return {Array} - after casting
 */
const castArray = before => Array.prototype.slice.call(before);
