import { defineStore } from 'pinia';

/**
 * @typedef {Object} User
 * @property {number} pk
 * @property {string} username
 * @property {string} email
 * @property {?string} first_name
 * @property {?string} last_name
 * @property {?string} phone_number
 * @property {?string} photo
 * @property {?string} latitude
 * @property {?string} longitude
 * @property {?string} date_joined
 */

export const useUserStore = defineStore('user', {
  state: () => ({
    /** @type {?User} */
    info: null,
  }),
  getters: {
    name: state => state.info?.username ?? 'Гость',
    photo: state => state.info?.photo ?? '/profile-default.svg',
  },
  actions: {
    setUser(user) {
      this.info = user;
    },
  },
});
