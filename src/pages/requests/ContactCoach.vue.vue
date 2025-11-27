<template>
  <base-dialog :show="isMessageSent" :title="dialogTitle" >
    <p>{{ successMessage }}</p>
  </base-dialog>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">
        <textarea id="message" rows="5" v-model.trim="message"></textarea>
      </label>
    </div>
    <p v-if="!formIsValid" class="errors">
      Please enter a valid email and non-empty messages.
    </p>
    <div class="actions">
      <base-button mode='card-btn'>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
      isMessageSent: false,
      dialogTitle: '',
      successMessage: '',
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      const userMessage = {
        // id: new Date().toISOString(),
        coachId: this.$route.params.coachId,
        email: this.email,
        message: this.message,
      };

      this.isMessageSent = true;
      this.dialogTitle = 'Message Sent!';
      this.successMessage = `Your message has been delivered successfully. The coach will get back to you soon.`;

      this.$store.dispatch('requests/addRequest', userMessage);

      // wait 3 seconds, then navigate
      setTimeout(() => {
        this.$router.replace(`/coaches/${userMessage.coachId}`);
      }, 2000);
    },
  },
  watch: {
    isMessageSent(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.isMessageSent = false;
          this.dialogTitle = '';
          this.successMessage = '';
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

@media(max-width:480px){
  form{
    width:100%;
    margin:0;
  }
}
</style>
