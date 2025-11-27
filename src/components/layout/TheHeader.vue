<template>
  <header>
    <base-dialog
      :show="!!error || !!deleteAccountPopup"
      :title="title"
      @close="handleError"
      @delete-coach="deleteAccount"
    >
      <p>{{ deleteAccountPopup ? deleteAccountPopup : error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <nav class="nav">
      <div class="nav-container">
        <h1><router-link to="/">Coach Finder</router-link></h1>
        <!-- DESKTOP MENU (visible only on large screens) -->
        <ul class="desktop-menu">
          <li>
            <router-link to="/coaches">All Coaches</router-link>
          </li>

          <li v-if="isAuthenticated">
            <router-link to="/requests">Requests</router-link>
          </li>

          <li v-else>
            <router-link to="/auth">Login</router-link>
          </li>
          <li v-if="isAuthenticated" class="desktop-avatar">
            <div class="dropDown-container">
              <div class="avatar-wrapper">
                <img
                  src="/images/profile-picture.png"
                  class="profile-img"
                  @click="displayDropdown"
                />
              </div>
              <div
                v-if="isShowDropdown"
                @click="displayDropdown"
                class="backdrop"
              ></div>
              <transition name="dropdown-transition" mode="out-in">
                <ul class="dropdown-menu" v-if="isShowDropdown">
                  <li class="list-dropdown" @click="deleteDialog">
                    <FontAwesomeIcon icon="trash" /> Delete Account
                  </li>
                  <li class="list-dropdown" @click="logout"><FontAwesomeIcon icon="right-from-bracket" /> Logout</li>
                </ul>
              </transition>
            </div>
          </li>
        </ul>
        <div class="menu-bar">
          <img
            src="/images/menu-bar.png"
            alt="menu-bar-img"
            class="menu-bar-img"
            @click="handleBurgerMenu"
          />
        </div>
        <div
          v-if="isBurgerMenuDisplay"
          @click="handleBurgerMenu"
          class="backdrop"
        ></div>
        <transition name="burger-menu">
          <ul class="mobile-menu" v-if="isBurgerMenuDisplay">
            <li>
              <router-link to="/coaches">All Coaches</router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/requests"> Requests</router-link>
            </li>
            <li v-else>
              <router-link to="/auth"> Login</router-link>
            </li>
            <li v-if="isAuthenticated">
              <div class="dropDown-container">
                <div class="avatar-wrapper">
                  <img
                    src="/images/profile-picture.png"
                    class="profile-img"
                    @click="displayDropdown"
                  />
                </div>
                <div
                  v-if="isShowDropdown"
                  @click="displayDropdown"
                  class="backdrop"
                ></div>
                <transition name="dropdown-transition" mode="out-in">
                  <ul class="dropdown-menu" v-if="isShowDropdown">
                    <li class="list-dropdown" @click="deleteDialog">
                      <FontAwesomeIcon icon="trash" /> Delete Account
                    </li>
                    <li class="list-dropdown" @click="logout"><FontAwesomeIcon icon="right-from-bracket" /> Logout</li>
                  </ul>
                </transition>
              </div>
            </li>
          </ul>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isShowDropdown: false,
      error: null,
      title: '',
      deleteAccountPopup: '',
      isLoading: false,
      isBurgerMenuDisplay: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    coaches() {
      return this.$store.getters['coaches/coaches'];
    },
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.isBurgerMenuDisplay = false;
        this.isShowDropdown = false;
      }, 50);
    },
  },
  methods: {
    deleteDialog() {
      this.title = 'Delete Account!!';
      this.error = null;
      this.isShowDropdown = false;
      if (this.title === 'Delete Account!!') {
        this.deleteAccountPopup =
          'Are you sure you want to delete your account?';
      }
    },
    displayDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
    logout() {
      this.isShowDropdown = false;
      this.isBurgerMenuDisplay = false;
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
    async deleteAccount() {
      this.title = '';
      this.deleteAccountPopup = '';
      this.isBurgerMenuDisplay = false;
      this.isLoading = true;
      const userId = this.$store.getters.userId;
      const isCoach = this.$store.getters['coaches/isCoach'];

      try {
        if (isCoach) {
          const coachToDelete = this.coaches.find(
            (coach) => coach.id === userId
          );
          await this.$store.dispatch('coaches/deleteCoach', coachToDelete);
        }
        await this.$store.dispatch('removeAccount');
      } catch (err) {
        this.isLoading = false;
        this.title = 'An error occured!';
        this.error = err.message || 'Failed to delete!';
      }
      this.isLoading = false;
    },
    handleBurgerMenu() {
      this.isBurgerMenuDisplay = !this.isBurgerMenuDisplay;
    },
    handleError() {
      this.title = '';
      this.deleteAccountPopup = '';
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  background-color: #4338ca;
  justify-content: center;
  align-items: center;
}

nav {
  position: fixed;
  width: 100%;
  
  height: 5rem;
  background-color: #4338ca;
  z-index: 1;
}

.nav-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 0.8rem;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 0.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.desktop-menu {
  display: none;
  align-items: center;
  gap: 1rem;
}

.desktop-menu li {
  list-style: none;
}

.desktop-menu a {
  color: white;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
}

.desktop-menu a:hover,
.desktop-menu a.router-link-active {
  border: 1px solid #f391e3;
  border-radius: 4px;
}

/* Desktop Avatar styling */
.desktop-avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  cursor: pointer;
}

li {
  margin: 0 0.5rem;
}

.dropDown-container {
  position: relative;
  display: inline-block;
}

.avatar-wrapper {
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

/*--- Profile Image ---*/
.profile-img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  cursor: pointer;
}

.profile-img:hover {
  transform: scale(1.05);
  /* box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); */
}
/*--- Backdrop ---*/
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 1;
}

/*--- Dropdown Menu transition---*/
.dropdown-transition-enter-from,
.dropdown-transition-leave-to {
  opacity: 0;
  transform: translateY(-4.5px);
}

.dropdown-transition-enter-active {
  transition: all 0.3s ease-out;
}

.dropdown-transition-leave-active {
  transition: all 0.3s ease-in;
}

.dropdown-transition-enter-to,
.dropdown-transition-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

/*--- Dropdown Menu ---*/

.dropdown-menu {
  position: absolute;
  top: calc(100% + 1rem);
  right: 0rem;
  width: 10rem;

  background: #fff;
  border-radius: 0.5rem;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2;
  padding: 0.4rem 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.list-dropdown {
  width: 100%;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.4s ease-out;
}

.list-dropdown:hover {
  background-color: #eee;
}

.mobile-menu {
  display: none;
}
/* --------------------------------------
   MOBILE — Extra Small (0px → 480px)
---------------------------------------*/
@media (max-width: 480px) {
  header nav {
    width: 100%;
  }

  h1 a {
    font-size: 1.5rem;
  }

  .mobile-menu {
    left: 0;
    margin-top: -0.3rem;
  }

  .dropdown-menu {
    margin-top: 0.5rem;
  }
}

/* --------------------------------------
   MOBILE — Large (480px → 640px)
---------------------------------------*/
@media (max-width: 640px) {
  header a {
    width: 100%;
  }

  li a {
    font-size: 1rem;
    color: black;
    padding: 0.75rem 1.5rem 0.75rem 0.5rem;
  }

  a:hover {
    border: none;
  }

  a:active,
  a.router-link-active {
    border: none;
    background-color: #d4d1d1ed;
  }

  .menu-bar {
    max-width: 2.8rem;
    max-height: 2.8rem;
  }

  .menu-bar-img {
    width: 100%;
    background-color: rgba(227, 223, 223, 0.886);
    border-radius: 0.5rem;
  }

  .mobile-menu {
    position: absolute;
    width: 100%;
    top: 5rem;
    right: -1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0, 0, 0);
    background-color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    z-index: 2;
  }

  .mobile-menu li {
    width: 100%;
  }

  li .dropDown-container {
    padding-left: 0.5rem;
  }

  .mobile-menu li:hover {
    background-color: #f6f4f4ed;
    border: none;
  }

  .profile-img {
    width: 2.8rem;
    height: 2.8rem;
  }

  .dropdown-menu {
    top: calc(100% + -8.5rem);
    right: -10rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0);
  }

  .list-dropdown {
    width: 100%;
    padding-bottom: 0.5rem;
  }

  .burger-menu-enter-from,
  .burger-menu-leave-to {
    opacity: 0;
    transform: translateY(-4.6px);
  }

  .burger-menu-enter-active {
    transition: all 0.5s ease-out;
  }

  .burger-menu-leave-active {
    transition: all 0.5s ease-in;
  }

  .burger-menu-enter-to,
  .burger-menu-leave-from {
    opacity: 1;
    transform: translateY(0px);
  }

  .dropdown-transition-enter-from,
  .dropdown-transition-leave-to {
    opacity: 0;
    transform: translateX(-6px);
  }

  .dropdown-transition-enter-active {
    transition: all 0.3s ease-out;
  }

  .dropdown-transition-leave-active {
    transition: all 0.3s ease-in;
  }

  .dropdown-transition-enter-to,
  .dropdown-transition-leave-from {
    opacity: 1;
    transform: translatex(0px);
  }
}

/* --------------------------------------
   TABLET (min 768px)
---------------------------------------*/
@media (min-width: 640px) {
  header nav {
    width: 100%;
  }
  .desktop-menu {
    display: flex;
  }

  .mobile-menu {
    display: none !important;
  }

  .menu-bar {
    display: none; /* hide burger */
  }
}
</style>
