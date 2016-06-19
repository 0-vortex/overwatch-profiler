var request = require('superagent'),
    _ = require('lodash');

class Overwatch {
    constructor() {
        this._baseUri = 'https://playoverwatch.com/en-us';
        this._baseSearchUri = 'https://playoverwatch.com/en-us/search/account-by-name';
    }

    get baseUri() {
        return this._baseUri;
    }

    get baseSearchUri() {
        return this._baseSearchUri;
    }

    checkBattleTag(tag) {
        return tag.match(/^[a-zA-Z0-9]{3,12}\#[0-9]+$/);
    }

    normalizeTag(tag) {
        return tag.replace('#', '-');
    }

    getSearchLink(tag) {
        return this.baseSearchUri + '/' + this.normalizeTag(tag);
    }

    getSearchResults(tag, callback) {
        request
            .get(this.getSearchLink(tag))
            .set('Accept', 'application/json')
            .end(function (error, data) {
                if (error || !data.ok) {
                    return false;
                } else {
                    callback(data.body);
                }
            });
    }

    refineSearchResults(result, platform, region) {
        result = _.find(result, function (item) {
            var regexp = '\\/career' + '\\/' + (platform ? platform : '[^\\/]+') + '\\/' + (region ? region : '.*');

            return item.careerLink.match(new RegExp(regexp));
        });

        if (undefined !== result) {
            return {
                "name": result.platformDisplayName,
                "level": result.level,
                "avatar": result.portrait,
                "link": this.baseUri + result.careerLink
            }
        }

        return result;
    }
}

module.exports = Overwatch;
