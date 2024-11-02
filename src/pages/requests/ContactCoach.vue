<template>
  <div>
    <base-dialog :show="!!error" title="Error fetching" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section v-if="isLoading">
      <base-spinner></base-spinner>
    </section>
    <form v-else @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model="message"></textarea>
      </div>
      <p v-if="!formIsValid" class="errors">
        Please enter a valid email and message
      </p>
      <base-button>Send Message</base-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
      isLoading: false,
      error: null
    }
  },
  emits: ['send-request'],
  methods: {
    async submitForm() {
      this.formIsValid = true

      if (this.email === '' || !this.isValidEmail()) {
        this.formIsValid = false
      }
      if (this.message === '') {
        this.formIsValid = false
      }
      if (!this.formIsValid) {
        return
      }

      this.isLoading = true
      try {
        await this.$store.dispatch('requests/contactCoach', {
          coachId: this.$route.params.id,
          email: this.email,
          message: this.message
        })
        this.$router.replace('/coaches')
      } catch (error) {
        this.error = error.message || 'Something went wrong'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
    isValidEmail() {
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(this.email)
    }
  }
}
</script>

<style scoped>
form {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
