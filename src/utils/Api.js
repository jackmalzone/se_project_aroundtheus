import { apiConfig } from "./constants";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async _request(endpoint, options = {}) {
    const res = await fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getInitialCards() {
    return this._request("/cards");
  }

  async getUserInfo() {
    return this._request("/users/me");
  }

  async updateProfile(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async updateAvatar(avatarLink) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarLink }),
    });
  }

  async addCard(data) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  async likeCard(cardId) {
    return this._request(`/cards/likes/${cardId}`, {
      method: "PUT",
    });
  }

  async unlikeCard(cardId) {
    return this._request(`/cards/likes/${cardId}`, {
      method: "DELETE",
    });
  }
  // other methods for working with the API
}

// API INIT
const Api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    authorization: `Bearer ${apiConfig.authToken}`,
    "Content-Type": "application/json",
  },
});

export default Api;
