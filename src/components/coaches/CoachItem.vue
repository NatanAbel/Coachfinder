<template>
  <li class="container">
    <h2 class="name">{{ fullName }}</h2>
    <p class="price">Hourly Rate: ${{ rate }}</p>
    <div>
      <p class="label">Expertise Area:</p>

      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button
        mode="outline card-btn"
        link
        :disable="disableBtn"
        :to="coachContactLink"
        >Contact</base-button
      >
      <base-button mode="card-btn" link :to="coachDetailsLink"
        >View Details</base-button
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    disableBtn() {
      return this.userId === this.id;
    },
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return '/coaches/' + this.id + '/contact';
      // return this.$route.path + '/' + this.id + '/contact'
    },
    coachDetailsLink() {
      // return '/coaches/' + this.id + '/contact'
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  /* padding: 1rem; */
  padding: clamp(1rem, 3vw, 1.75rem);
  /* background-color: #ffffff; */
}

.name {
  font-size: clamp(1.25rem, 4vw, 1.6rem);
}

.price {
  font-size: clamp(1rem, 3.2vw, 1.25rem);
  font-weight: 600;
  color: #444;
}

.label {
  font-size: clamp(0.9rem, 2.8vw, 1.1rem);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

div {
  /* margin: 0.5rem 0; */
}

.actions {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-end; */
  display: flex;
  gap: 0.75rem;
  justify-content: space-evenly;
  margin-top: 1rem;
}

@media (max-width: 480px) {
  /* li div{
    margin-top: 2rem;
  } */

  /* .actions {
      flex-direction: column;
    align-items: stretch;
  } */

  .actions {
    width: 100%;
    justify-content: center;
    margin-right: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 640px) {
  li div {
    /* margin-top: 1.2rem; */
  }
}
</style>
