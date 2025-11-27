let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb4YsomOQPxcz7XFDk558DmjccKgI7Uyo';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb4YsomOQPxcz7XFDk558DmjccKgI7Uyo';
    }
    const userData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Faild to authenticate. check your login data. '
      );
      throw error;
    }
    // '+' before responseData.expiresIn converts string to a number
    const expiresIn = +responseData.expiresIn * 1000;
    const tokenExpirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    const userInfo = {
      token: responseData.idToken,
      userId: responseData.localId,
    };

    context.commit('setUser', userInfo);
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpirationDate');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) return;

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      const userInfo = {
        token,
        userId,
      };

      context.commit('setUser', userInfo);
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpirationDate');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },

  async removeAccount(context) {
    const token = context.rootGetters.token;
    if (!token) {
      return;
    }
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDb4YsomOQPxcz7XFDk558DmjccKgI7Uyo';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
      }),
    });

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || 'Failed to delete account.'
      );
      throw error;
    }

    const responseData = await response.json();

    context.dispatch('logout');
  },
};
