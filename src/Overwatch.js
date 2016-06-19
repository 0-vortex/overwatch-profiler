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

    getProfileLink(tag) {
        return this.baseUri + this.normalizeTag(tag);
    }
}

module.exports = Overwatch;
