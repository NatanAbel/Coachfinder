<template>
  <section class="container">
    <base-previous>
      <base-button mode="outline controls-btn" @click="previousPage"
        ><FontAwesomeIcon icon="arrow-left"
      /></base-button>
    </base-previous>
    <base-card>
      <base-page title="Register"></base-page>
      <coach-form @save-data="saveForm"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveForm(data) {
      this.$store.dispatch('coaches/addCoach', data);
      this.$router.replace('/coaches');
    },
    previousPage() {
      this.$router.go(-1);
      console.log('sdfsdfsdffsfsf');
    },
  },
};
</script>

<style scoped>
.container{
  max-width: 1200px;
  margin: 0 auto;
}
</style>
