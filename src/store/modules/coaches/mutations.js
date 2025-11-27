export default {
  addCoach(state, payload) {
    const index = state.coaches.findIndex((c) => c.id === payload.id);

    if (index !== -1) {
      state.coaches.splice(index, 1, payload);
    } else {
      state.coaches.unshift(payload);
    }
    // state.coaches.unshift(payload);
    // state.coaches.filter(coach => coach.id !== payload.id).unshift(payload)
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
  
  removeCoach(state, coachId) {
  state.coaches = state.coaches.filter(coach => coach.id !== coachId);
}
};
