export default {
    coaches (state){
        return state.coaches;
    },
    hasCoaches (state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_,getters,_2, rootGetters){
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coache => coache.id === userId);
    },
    shouldUpdate(state) {
    const lastFetch = state.lastFetch
    const currentTimeStamp = new Date().getTime()
    if(!lastFetch){
      return true;
    }
    return (currentTimeStamp - lastFetch)/1000 > 10;
  },
}