#!/usr/bin/env node

var program = require('commander'),
    overwatch = new (require('../lib/Overwatch'));

program
    .description('Search for a BattleTag™ and return profile link, platform display name, full level and avatar image in human readable output')
    .arguments('<tag>')
    .action(function (tag) {
        battleTag = tag;
    })
    .option('-r, --region [region]', 'return BattleTag™ that matches region', /^(us|eu|kr|cn|global)$/i)
    .option('-p, --platform [platform]', 'return BattleTag™ that matches platform', /^(pc|xbl|psn)$/i)
    .option('-j, --json', 'return the search result in json format');

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

if (!overwatch.checkBattleTag(battleTag)) {
    console.error('Incorrect BattleTag™ format provided !');
    process.exit(1);
}

overwatch.getSearchResults(battleTag, function(data) {
    if (false !== data && data.length) {
        data = overwatch.refineSearchResults(data, program.platform, program.region);

        if (data !== undefined) {
            if (program.json) {
                console.log(JSON.stringify(data));
            } else {
                console.log('**[' + data.name + '](' + data.link + ')** is level ' + data.level + ' with avatar');
                console.log('');
                console.log('![avatar](https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x02500000000005CD.png)');
            }

            process.exit(0);
        } else {
            console.log('No profile matching BattleTag™ and given parameters found :(');
        }
    }
});
