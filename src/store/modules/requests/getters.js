export default {
  allRequests(state, _, _2, rootGaters) {
    const coachId = rootGaters.userId;
    const test = state.requests.filter((req) => req.coachId === coachId)
    return test;
  },
// allRequests in "getters.allRequests" refers to the allRequests getter above.
  hasRequest(_, getters) {
    return getters.allRequests && getters.allRequests.length > 0;
  },
};
