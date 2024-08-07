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
    console.log("Making request to: ", `${this._baseUrl}${endpoint}`);

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
    const response = await this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
    return { isLiked: true, ...response };
  }

  async unlikeCard(cardId) {
    const response = await this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
    return { isLiked: false, ...response };
  }

  async getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

// API INIT
const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    Authorization: "4e792af1-5796-4959-889f-63e7625cacce",
    "Content-Type": "application/json",
  },
});

export default api;
