<template>
  <section>
    <base-card>
    <header>
      <h3>Received Requests</h3>
    </header>
    <ul v-if="hasRequests">
      <request-item
        v-for="request in receivedRequests"
        :key="request.id"
        :email="request.userEmail"
        :message="request.userMessage"
      ></request-item>
    </ul>
    <p v-else>You haven't received any request yet!</p>
  </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
  components: {
    RequestItem
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    }
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3, p {
  text-align: center;
}
</style>
