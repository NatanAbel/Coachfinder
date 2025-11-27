<template>
  <div class="container">
    <base-previous>
      <base-button mode="outline controls-btn" @click="previousPage"
        ><FontAwesomeIcon icon="arrow-left"
      /></base-button>
    </base-previous>
    <base-dialog :show="!!error" title="An error occured!" @close="handelError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating...." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <base-page :title="submitBtnCaption"></base-page>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p class="error-text" v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <div class="btn-wrapper">
          <base-button mode="card-btn">{{ submitBtnCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeBtnCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  components: { BaseDialog, BaseSpinner },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitBtnCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeBtnCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    userId() {
      return this.$store.getters.userId;
    },
    redirectLink() {
      const route = this.$route.query.redirect;
      let path;
      if (this.isCoach && route === 'register') {
        path = `/coaches/${this.userId}/update`;
      } else if (!this.isCoach && route === 'register') {
        path = '/register';
      } else {
        path = '';
      }

      return path.slice(1);
    },
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
    
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }

        const redirectUrl = '/' + (this.redirectLink || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'failed to authenticate, try later. ';
      }

      this.isLoading = false;
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.container{
  max-width: 1200px;
  margin: 0 auto;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.error-text{
  color: red;
  text-align: left;
  hyphens: auto;
  word-spacing: normal;
}

@media (max-width: 480px) {
  .btn-wrapper {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 640px) {
  input,
textarea {
  padding: 0.5rem;
}
}
</style>
