export class HttpApi {
    constructor(url, at) {
        this.base_url = url;
        this.post_url = {};
        this.access_token = at;

        if (this.base_url[this.base_url.length-1] != '/')
            this.base_url += '/'
    }

    request_callback(group, data, cb) {
        if (data == null)
            data = {};
        if (cb === undefined && typeof data === 'function') {
            cb = data;
            data = {};
        }

        return this.request(group, data).then(cb);
    }

    request(group, data) {
        // @todo: later: how to rate limit anonymous user?
        //   if (access_token == null)
        //     throw "access_token not provided";
        console.log("KURVA ANYAD")
        const method = group.split(' ')[0].upper();
        console.log("KURVA ANYAD")

        // normalize url to call
        let _url = group.substr(len(method)+1, len(group));
        _url = _url.replace('//', '/');
        _url = _url.replace('//', '/');
        _url = _url.replace('//', '/');
        if (_url[0] == '/')
            _url = _url.substring(1);

        if (method == 'GET') {
            data = Object.assign({}, this.post_url, data);

            if (Object.keys(data).length > 0)
                _url += '?' + Object.keys(data).map(key => key + '=' + data[key]).join('&');
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.access_token)
            headers['Authorization'] = 'bearer ' + this.access_token;

            console.log("KURVA ANYAD")

        return fetch(this.base_url+_url, {
            method: method,
            mode: this.mode||'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            credentials: 'omit',
            body: method == 'GET' ? undefined : JSON.stringify(data),
            headers: headers
        }).then((resp)=>{
            console.log(resp);

            if (resp.status == 200)
                return resp.json();
            else 
                throw resp;
        })
    }
}
