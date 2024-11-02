export default {
  async addCoach(context, data) {
    const userId = context.rootGetters.userId
    
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }

    const response = await fetch(
      `https://find-a-coach-9f4e7-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    )

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to add coach...')
      throw error
    }

    context.commit('addCoach', {
      ...coachData,
      id: userId
    })
  },
  async loadCoaches(context) {
    const response = await fetch(
      'https://find-a-coach-9f4e7-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to get coaches...')
      throw error
    }

    const coaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        hourlyRate: responseData[key].hourlyRate,
        description: responseData[key].description,
        areas: responseData[key].areas
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
  }
}
