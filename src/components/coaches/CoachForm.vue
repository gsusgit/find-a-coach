<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !firstName.isValid}">
      <label for="firstName">Firstname</label>
      <input type="text" id="firstName" v-model.trim="firstName.val" />
      <small v-if="!firstName.isValid">Firstname can't be empty.</small>
    </div>
    <div class="form-control" :class="{invalid: !lastName.isValid}">
      <label for="lastName">Lastname</label>
      <input type="text" id="lastName" v-model.trim="lastName.val" />
      <small v-if="!lastName.isValid">LastName can't be empty.</small>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model="description.val" ></textarea>
      <small v-if="!description.isValid">Description can't be empty.</small>
    </div>
    <div class="form-control" :class="{invalid: !rate.isValid}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model="rate.val" />
      <small v-if="!rate.isValid">Hourly Rate can't be empty or negative.</small>
    </div>
    <div class="form-control" :class="{invalid: !areas.isValid}">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="careers"
          value="careers"
          v-model="areas.val"
        />
        <label for="careers">Career Advisory</label>
      </div>
      <small v-if="!areas.isValid">You must select at least one area.</small>
    </div>
    <p v-if="!formIsValid">Please fix the errors</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  emits: ['add-coach'],
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.rate.val === null || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (this.formIsValid) {
        const formData = {
          first: this.firstName,
          last: this.lastName,
          desc: this.description,
          rate: this.rate,
          areas: this.areas,
        };
        this.$emit('add-coach', formData);
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
