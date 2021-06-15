#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

program.action((filepath1, filepath2) => {
  const result = gendiff(filepath1, filepath2);
  console.log(result);
});
program.parse(process.argv);
