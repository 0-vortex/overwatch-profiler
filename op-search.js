#!/usr/bin/env node

var program = require('commander'),
    request = require('superagent');

program
    .description('Search for a BattleTag™ and return profile link, platform display name, full level and avatar image')
    .arguments('<tag>')
    .action(function (tag) {
        battleTag = tag;
    })
    .option('-r, --region [region]', 'return BattleTag™ that matches region', /^(us|eu|kr|cn|global)$/i)
    .option('-p, --platform [platform]', 'return BattleTag™ that matches platform', /^(pc|xbl|psn)$/i);

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ op search vortex#2239');
    console.log('    $ op search -r eu vortex#2239');
    console.log('    # returns profile only if it matches eu region');
    console.log('    $ op search -r global vortex#2239');
    console.log('    # returns profile only if it matches console region');
    console.log('    $ op search -p pc vortex#2239');
    console.log('    # returns profile only if it matches pc platform');
    console.log('    $ op search -p psn vortex#2239');
    console.log('    # returns profile only if it matches playstation platform');
});

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}

if (typeof battleTag === 'undefined') {
    console.error('No BattleTag™ provided !');
    process.exit(1);
}

if (!battleTag.match(/^[a-zA-Z0-9]{3,12}\#[0-9]+$/)) {
    console.error('Incorrect BattleTag™ format provided !');
    process.exit(1);
}

var url = 'https://playoverwatch.com/en-us/search/account-by-name/' + battleTag.replace("#", '-');

request
    .get(url)
    .set('Accept', 'application/json')
    .end(function(err, res){
        if (err || !res.ok) {
            console.log(err);
        } else {
            console.log(JSON.stringify(res.body));
        }
    });
