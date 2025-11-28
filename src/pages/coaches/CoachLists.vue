<template>
  <div>
    <base-dialog
      :show="!!error || !!deleteCoachPopup"
      :title="title"
      @close="handleError"
      @delete-coach="deleteCoach"
    >
      <p>{{ deleteCoachPopup ? deleteCoachPopup : error }}</p>
    </base-dialog>
    <section>
      <coach-filter @coach-filter="setFilters"></coach-filter>
    </section>
    <section class="container">
      <base-card>
        <div class="controls">
          <base-button mode="outline controls-btn" @click="loadCoaches(true)"
            ><FontAwesomeIcon icon="arrows-rotate"
          /></base-button>
          <base-button
            v-if="!isAuthenticated"
            link
            :to="registerOrUpdateLink"
            mode="controls-btn"
            ><FontAwesomeIcon icon="user-plus" /> as Coach</base-button
          >
          <div class="edit-wrapper" v-if="isAuthenticated">
            <base-button
              @click="handleEdit"
              mode="outline controls-btn"
              class="edit-btn"
              ><FontAwesomeIcon icon="pen-to-square" class="edit-font-awesome"
            /></base-button>
          </div>
          <div v-if="displayEdit" @click="handleEdit" class="backdrop"></div>
          <transition name="option" mode="out-in">
            <div class="option-btn" v-if="displayEdit && isAuthenticated">
              <base-button
                v-if="isAuthenticated && isCoach"
                link
                mode="dropdown-link"
                :to="updateInfoLink"
                ><FontAwesomeIcon icon="pencil" /> Update</base-button
              >
              <base-button
                v-if="isAuthenticated && isCoach"
                @click="deleteDialog"
                mode="dropdown-btn"
                ><FontAwesomeIcon icon="trash" /> Coach</base-button
              >
              <base-button
                v-if="isAuthenticated && !isCoach && !isLoading"
                link
                to="/register"
                mode="dropdown-link"
                ><FontAwesomeIcon icon="user-plus" /> as Coach</base-button
              >
            </div>
          </transition>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseButton from '../../components/ui/BaseButton.vue';

export default {
  components: { CoachItem, CoachFilter, BaseButton },
  data() {
    return {
      isLoading: false,
      error: false,
      title: '',
      deleteCoachPopup: '',
      displayEdit: false,
      activeFiltes: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    registerOrUpdateLink() {
      return this.isCoach
        ? `/auth?redirect=${this.updateInfoLink.slice(1)}`
        : '/auth?redirect=register';
    },
    updateInfoLink() {
      return '/coaches/' + this.userId + '/update';
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFiltes.frontend && coach.areas.includes('frontend'))
          return true;
        if (this.activeFiltes.backend && coach.areas.includes('backend'))
          return true;
        if (this.activeFiltes.career && coach.areas.includes('career'))
          return true;
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    deleteDialog() {
      this.title = 'Delete coach!!';
      if (this.title === 'Delete coach!!') {
        this.deleteCoachPopup = 'Are you sure you want to delete?';
      }
    },
    handleEdit() {
      this.displayEdit = !this.displayEdit;
    },
    setFilters(updatedFilters) {
      this.activeFiltes = updatedFilters;
    },
    async deleteCoach() {
      this.title = '';
      this.deleteCoachPopup = '';
      this.isLoading = true;
      const coaches = this.$store.getters['coaches/coaches'];
      const userToDelete = coaches.find((coach) => coach.id === this.userId);
      try {
        await this.$store.dispatch('coaches/deleteCoach', userToDelete);
      } catch (error) {
        this.title = 'An error occurred';
        this.isLoading = false;
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    async loadCoaches(resfresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: resfresh,
        });
      } catch (error) {
        this.title = 'An error occured';
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.title = '';
      this.deleteCoachPopup = '';
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  max-width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
}

.edit-wrapper {
  display: block;
}

.edit-btn {
  width: 100%;
}

.option-btn {
  width: 35%;
  position: absolute;
  top: 3.4rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0);
  border-radius: 0.5rem;
  padding: 0.3rem;
  background: #fff;
  z-index: 2;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 1;
}

.option-enter-from,
.option-leave-to {
  opacity: 0;
  transform: translateX(6px);
}

.option-enter-active {
  transition: all 0.5s ease-out;
}

.option-leave-active {
  transition: all 0.5s ease-in;
}

.option-enter-to,
.option-leave-from {
  opacity: 1;
  transform: translatex(0px);
}

/* ----------------------------------------- */
/* MOBILE SCREEN */
/* ----------------------------------------- */
@media (max-width: 480px) {
  .option-btn {
    min-width: 55%;
  }
}

/* ----------------------------------------- */
/* TABLET SCREEN */
/* ----------------------------------------- */
@media (max-width: 640px) {
}
</style>
