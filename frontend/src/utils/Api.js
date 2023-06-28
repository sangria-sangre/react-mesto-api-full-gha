class Api {
    constructor(url, headers) {
        this._headers = headers;
        this._baseUrl = url;
    }

    _getHeaders() {
        return {
            authorization: this._headers,
            'Content-Type': 'application/json'
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getAllData() {
        return Promise.all([this.getCard(), this.getUserInfo()]);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders()
        }).then(this._getJson);
    }

    postUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._getJson);
    }

    postUserPhoto(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar,
            })
        }).then(this._getJson);
    }

    getCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeaders()
        }).then(this._getJson);
    }

    postCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._getJson);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then(this._getJson);
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        }).then(this._getJson);
    }

    deletetLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders()
        }).then(this._getJson);
    }

    changeLikeCardStatus(id, status) {
        if (status) {
            return this.putLike(id)
        } else {
            return this.deletetLike(id)
        }
    }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', '2509058a-382e-4c49-aae4-82e3509c7f6a');
export default api;