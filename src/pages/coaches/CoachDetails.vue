<template>
  <article class="container">
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="selectedCoach">
      <section>
        <section>
          <base-previous>
            <base-button mode="outline controls-btn" @click="previousPage"
              ><FontAwesomeIcon icon="arrow-left"
            /></base-button>
          </base-previous>
        </section>
        <!-- <base-card>
          <div class="page-title-wrapper">
            <h1 class="page-details">Coach Profile</h1>
          </div>
          <header class="section-block">
            <h2 class="coach-info">
              <span class="label">Name :</span> {{ fullName }}
            </h2>
            <h3 class="coach-info">
              <span class="label">Rate :</span> ${{ rate }}/hour
            </h3>
          </header>
          <section class="expertise-area section-block">
            <h3 class="expertise-title">
              <span class="label">Expertise Area :</span>
            </h3>
            <div class="expertise-badges">
              <base-badge
                v-for="area in areas"
                :key="area"
                :type="area"
                :title="area"
              ></base-badge>
            </div>
          </section>
          <section class="section-block">
            <h3 class="description-title">
              <span class="label">Description :</span>
            </h3>
            <p class="description-text">{{ selectedCoach.description }}</p>
          </section>
        </base-card> -->
        <base-card>
          <div class="page-title-wrapper">
            <h1 class="page-details">Coach Profile</h1>
          </div>

          <header class="section-block">
            <h2 class="coach-name">{{ fullName }}</h2>
            <p class="coach-rate">${{ rate }}/hour</p>
          </header>

          <section class="expertise-area section-block">
            <p class="section-label">Expertise</p>
            <div class="expertise-badges">
              <base-badge
                v-for="area in areas"
                :key="area"
                :type="area"
                :title="area"
              />
            </div>
          </section>

          <section class="section-block">
            <p class="section-label">Description</p>
            <p class="coach-description">{{ selectedCoach.description }}</p>
          </section>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h2>Interested? Reach out now!</h2>
            <base-button
              link
              :to="contactLink"
              mode="outline card-btn"
              :disable="disableBtn"
              >Contact</base-button
            >
          </header>
          <router-view></router-view>
        </base-card>
      </section>
    </div>
  </article>
</template>

<script>
import BaseCard from '../../components/ui/BaseCard.vue';
export default {
  components: { BaseCard },
  props: ['coachId'],
  data() {
    return {
      selectedCoach: null,
      isLoading: false,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach
        ? this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
        : '';
    },
    rate() {
      return this.selectedCoach ? this.selectedCoach.hourlyRate : '';
    },
    contactLink() {
      const currentPath = this.$route.path;
      if (currentPath === `/coaches/${this.coachId}/contact`) {
        return `/coaches/${this.coachId}`;
      } else if (currentPath === `/coaches/${this.coachId}`) {
        return `/coaches/${this.coachId}/contact`;
      } else {
        return currentPath;
      }
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    userId() {
      return this.$store.getters.userId;
    },
    disableBtn() {
      return this.userId === this.coachId;
    },
  },
  methods: {
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
      const coach = coaches.find((c) => c.id === this.coachId);

      if (!coach) {
        // Redirect to NotFound page
        this.$router.replace('/not-found');
        return;
      }
      this.selectedCoach = coach;
    },
  },
  created() {
    this.loadCoach();
  },
};
</script>

<style scoped>
 .container {
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
}

/* Page Section Title */
.page-title-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.page-details {
  padding: 0.65rem 1.25rem;
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  border-radius: 0.7rem;
  background: rgba(0,0,0,0.03);
  font-weight: 700;
}

/* Remove unnecessary margin around nested sections */
section > section {
  margin-top: 0;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0.75rem 0 0.1rem;
}

/* Headings / Info */
.coach-name {
  font-size: clamp(1.4rem, 5vw, 2rem);
  font-weight: 700;
  margin: 0;
}

.coach-rate {
  font-size: clamp(1.05rem, 3.5vw, 1.35rem);
  font-weight: 600;
  color: #444;
  margin: -0.2rem 0 0.1rem;
}

/* Labels */
.section-label {
  font-size: clamp(1rem, 2.8vw, 1.2rem);
  font-weight: 600;
  opacity: 0.9;
  margin: -0.2rem 0 0.1rem;
}

/* Expertise */
.expertise-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

/* Description Text */
.coach-description {
  font-size: clamp(0.95rem, 2.6vw, 1.15rem);
  line-height: 1.6;
  color: #222;
   margin-top: -0.3rem;
  text-align: left;
  hyphens: auto;
  word-spacing: normal;
}

/* Mobile improvements */
@media (max-width: 480px) {
  .coach-rate {
    margin-bottom: 0.4rem;
  }

  .expertise-badges {
    justify-content: flex-start;
  }

  .page-title-wrapper {
    margin-bottom: 0.75rem;
  }
}

</style>
