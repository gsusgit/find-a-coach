export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      userMessage: payload.message
    }
    // TODO: add to Firebase
    context.commit('sendRequest', newRequest)
  }
  // TODO: create method to fetch from Firebase
}