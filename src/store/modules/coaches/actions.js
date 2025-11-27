export default {
  async addCoach(context, payload) {
    const { updateId,update,rate, ...rest } = payload;
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    
    // Using id sent to update
    const updateUserId = update ? updateId : userId;
  
    const coachData = {
      ...rest,
      hourlyRate: rate,
    };


    const response = await fetch(
      `https://coachfindercom-default-rtdb.europe-west1.firebasedatabase.app/coaches/${updateUserId}.json?auth=` + token,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coachData),
      }
    );
    
    if (!response.ok) {
      // error
    }

    context.commit('addCoach', { ...coachData, id: updateUserId });
  },

  async loadCoaches(context, payload) {

    if(!payload.forceRefresh && !context.getters.shouldUpdate){
      return true;
    }

    const response = await fetch(
      `https://coachfindercom-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const responseData = await response.json();

    if(!response.ok){
      const error = new Error(responseData.message || 'failed to fetch!');
      throw error;
    }
    
    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },

  async deleteCoach (context, payload){
     const coachId = payload.id
    const token = context.rootGetters.token;
    
    const response = await fetch(`https://coachfindercom-default-rtdb.europe-west1.firebasedatabase.app/coaches/${coachId}.json?auth=${token}`,{
      method: "DELETE",
    });

    if(!response.ok){
      const error = new Error("Failed to delete coach");
      throw error;
    }

    context.commit('removeCoach', coachId)
  }
};
