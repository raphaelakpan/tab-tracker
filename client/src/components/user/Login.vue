<template>
<v-layout column>
    <v-flex class="form">
      <div class="white elevation-2">
        <v-toolbar dense flat dark class="blue">
          <v-toolbar-title>Log In to your Account </v-toolbar-title>
        </v-toolbar>
        <div style="padding: 10px">
          <v-form v-model="valid" ref="form">
           <v-text-field
              label="Email"
              v-model="user.email"
              :rules="emailRules"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="user.password"
              :rules="passwordRules"
              type="password"
              required
            ></v-text-field>
            <div class="form-group">
              <v-btn dark class="blue" @click="login">Log In</v-btn>
              <v-btn dark class="orange darken-4" @click="reset">Clear</v-btn>
            </div>
            <p class="blue--text"> {{ message }} <p>
            <p
              v-for="(error, index) in serverErrors"
              :key="index"
              class="red--text">
              {{ error }}
            </p>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  /* eslint-disable no-useless-escape */

  import Authentication from '@/services/Authentication'

  export default {
    data () {
      return {
        user: {
          email: '',
          password: ''
        },
        serverErrors: [],
        message: '',
        valid: false,
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v && v.length >= 8 || 'Password must be at least 8 characters'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      login () {
        this.valid = this.$refs.form.validate()
        if (!this.valid) {
          this.message = ''
          return
        }
        Authentication.login({
          email: this.user.email,
          password: this.user.password
        }).then(response => {
          this.message = response.data.message
          this.serverErrors = []
          this.$refs.form.reset()
        }).catch(error => {
          this.serverErrors = error.response.data.errors
          this.message = ''
        })
      },
      reset () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>
  .form {
    margin: 0 auto;
    width: 100%;
  }

  @media(min-width: 700px) {
    .form {
      width: 30%
    }
  }

</style>
