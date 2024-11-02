export default {
  async contactCoach(context, payload) {
    const coachId = payload.coachId
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message
    }

    const response = await fetch(
      `https://find-a-coach-9f4e7-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to send request...')
      throw error
    }

    newRequest.id = responseData.name

    context.commit('sendRequest', newRequest)
  },
  async getRequests(context) {
    const coachId = context.rootGetters['userId']

    const response = await fetch(
      `https://find-a-coach-9f4e7-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to get requests')
      throw error
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)
  }
}
