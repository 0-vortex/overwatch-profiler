#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
    .version('0.0.1')
    .command('search [tag]', 'search for a battle.net tag and get available platforms')
    .command('parse [tag] [region] [platform]', 'get profile data for a battle.net tag, region and platform');

program.parse(process.argv);
