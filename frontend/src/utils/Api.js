class Api {
    constructor() {
        this._baseUrl = 'https://api.instamesto.nomoreparties.sbs';
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
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }).then(this._getJson);
    }

    postUserInfo(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._getJson);
    }

    postUserPhoto(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        }).then(this._getJson);
    }

    getCard() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }).then(this._getJson);
    }

    postCard(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._getJson);
    }

    deleteCard(id) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }).then(this._getJson);
    }

    putLike(id) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }).then(this._getJson);
    }

    deletetLike(id) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }).then(this._getJson);
    }

    changeLikeCardStatus(id, status) {
        if (status) {
            return this.putLike(id)
        } else {
            return this.deletetLike(id)
        }
    }

    register(email, password) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        }).then(this._getJson);
    }

    authorize = (email, password) => {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        }).then(this._getJson);
    }

    getContent = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(this._getJson);
    };

}

const api = new Api();
export default api;