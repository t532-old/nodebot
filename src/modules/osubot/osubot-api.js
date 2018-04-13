import url from 'url'
import axios from 'axios'

class APIQuery {
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
        return axios.get(this.url)
    }
}

class StatQuery extends APIQuery {
    constructor(params) { super('get_user', params) }
    async exec() {
        let result
        try { 
            result = await super.exec()
            if (result.data[0] === undefined) throw new Error('StatQuery: user does not exist')
            else return result.data[0]
        } catch (err) { throw new Error('StatQuery: bad network status') } 
    }
}

class RecentQuery extends APIQuery {
    constructor(params) { super('get_user_recent', params) }
    async exec() {
        let result
        try { 
            console.log(this.url)
            result = await super.exec()
            if (result.data[0] === undefined) throw new Error('RecentQuery: user does not exist or not played recently')
            else return result.data[0]
        } catch (err) { throw new Error('RecentQuery: bad network status') } 
    }
}

class MapQuery extends APIQuery {
    constructor(params) { super('get_beatmaps', params) }
    async exec() {
        let result
        try { 
            result = await super.exec()
            if (result.data[0] === undefined) throw new Error('RecentQuery: user does not exist')
            else return result.data[0]
        } catch (err) { throw new Error('RecentQuery: bad network status') } 
    }
}

export default { APIQuery, RecentQuery, StatQuery, MapQuery }