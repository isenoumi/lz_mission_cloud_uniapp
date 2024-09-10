class RequestService {
    constructor(url) {
        this.url = url;
    }

    get(url, params, header = {}) {
        header['x-Resource-Token'] = uni.getStorageSync('xtoken')
        return uni.$u.http.get(`${this.url}${url}`, {
            params: params,
            header: header
        })
    }

    post(url, params, header = {}) {
        header['x-Resource-Token'] = uni.getStorageSync('xtoken')
        return uni.$u.http.post(`${this.url}${url}`, params, header)
    }

    put(url, params, header = {}) {
        header['x-Resource-Token'] = uni.getStorageSync('xtoken')
        return uni.$u.http.put(`${this.url}${url}`, params, header)
    }
    delete(url, params, header = {}) {
        header['x-Resource-Token'] = uni.getStorageSync('xtoken')
        return uni.$u.http.delete(`${this.url}${url}`, params, header)
    }
    upload(url, config) {
        console.log(config)
        return uni.$u.http.upload(`${this.url}${url}`, config)
    }
}

export default RequestService;