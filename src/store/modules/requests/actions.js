export default {
  async addRequest(context, payload) {
    // remove coachId from payload
    const { coachId, ...rest } = payload;

    const requestData = {
      ...rest,
    };


    const res = await fetch(
      `https://coachfindercom-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
      {
        method: 'POST',
        hesders: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request.');
      throw error;
    }

    const finallData = {
      ...rest,
      //  The name field is a unique id automatically generated from firebase
      id: resData.name,
      // adding back coachId
      coachId,
    };
    context.commit('addRequest', finallData);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token

    const res = await fetch(
      `https://coachfindercom-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token);

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Something went wrong');
      throw error;
    }

    const requestData = [];

    for (const key in resData) {
      const data = {
        id: key,
        coachId: coachId,
        email: resData[key].email,
        message: resData[key].message,
      };
      requestData.push(data);
    }

    context.commit('setRequests', requestData);
  },
};
