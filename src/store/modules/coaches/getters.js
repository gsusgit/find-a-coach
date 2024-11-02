export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    return coaches.some((coach) => coach.id === userId)
  },
  shouldUpdate(state) {
    const lastUpdate = state.lastFetch
    if (!lastUpdate) {
      return true
    }
    const now = new Date().getTime()
    return (now - lastUpdate) / 1000 > 60
  }
}
