export default {
    contactCoach(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            userEmail: payload.email,
            userMessage: payload.message
        }
        context.commit('sendRequest', newRequest)
    }
}