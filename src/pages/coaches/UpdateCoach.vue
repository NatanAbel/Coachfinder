<template>
  <section class="container">
    <base-previous>
      <base-button mode="outline controls-btn" @click="previousPage"
        ><FontAwesomeIcon icon="arrow-left"
      /></base-button>
    </base-previous>
    <base-card>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div v-else-if="userToUpdate">
        <base-page title="Update"></base-page>
        <coach-form
          @save-data="saveForm"
          :isDataUpdate="isDataUpdate"
          :userToUpdate="userToUpdate"
        ></coach-form>
      </div>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  props: ['coachId'],
  data() {
    return {
      isDataUpdate: true,
      userToUpdate: null,
      isLoading: false,
    };
  },
  created() {
    this.loadCoach();
  },
  methods: {
    saveForm(data) {
      this.$store.dispatch('coaches/addCoach', data);
      this.$router.replace('/coaches');
    },
    previousPage() {
      this.$router.go(-1);
    },
    async loadCoach() {
      if (!this.$store.getters['coaches/coaches']?.length) {
        this.isLoading = true;
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: false,
        });
      }
      this.isLoading = false;
      const coaches = this.$store.getters['coaches/coaches'];
      const coach = coaches.find((coach) => coach.id === this.coachId);

      if (!coach) {
        // Redirect to NotFound page
        this.$router.replace('/not-found');
        return;
      }
      this.userToUpdate = coach;
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