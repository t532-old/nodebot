const url = require('url')
const axios = require('axios')

class Query {
    constructor(name, params) {
        this.name = name
        this.params = params
    }
    get url() {
        return url.format({
            protocol: 'https',
            host: 'osu.ppy.sh',
            pathname: `api/${this.name}`,
            query: this.params
        })
    }
    async exec() {
        try { return axios.get(this.url) }
        catch (err) { return err }
    }
}

class StatQuery extends Query {
    constructor(params) { super('get_user', params) }
    async exec() {
        const result = await super.exec()
        if (result instanceof Error) throw new Error('StatQuery: bad network status')
        else if (result.data[0] === undefined) throw new Error('StatQuery: user does not exist')
        else return result.data[0]
    }
}

class RecentQuery extends Query {
    constructor(params) { super('get_user_recent', params) }
    async exec() {
        const result = await super.exec()
        if (result instanceof Error) throw new Error('RecentQuery: bad network status')
        else if (result.data[0] === undefined) throw new Error('RecentQuery: user does not exist')
        else return result.data[0]
    }
}

module.exports = { Query, RecentQuery, StatQuery }