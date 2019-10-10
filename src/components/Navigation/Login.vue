<template>
  <div id="login">
    <v-form @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              id="username-login"
              v-model="form.username"
              :rules="nameRules"
              label="Username"
              @focus="clearStatus"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              id="password-login"
              v-model="form.password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              @focus="clearStatus"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-alert
          id="error-login"
          v-if="this.error && this.submitting"
          class="mb-4"
          type="error"
        >Please Check Username & Password</v-alert>
        <v-btn id="button-login" color="primary" text type="submit">Submit</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      validUser: true,
      show1: false,
      error: false,
      submitting: false,
      form: {
        username: "",
        password: ""
      },
      nameRules: [v => !!v || "Username is required"],
      rules: {
        required: value => !!value || "Password is required."
      }
    };
  },
  methods: {
    onSubmit() {
      this.clearStatus();
      this.submitting = true;
      this.$store
        .dispatch("checkUser", this.form)
        .then(value => {
          this.validUser = value;
          this.$store
            .dispatch("checkPassword", this.form)
            .then(checkPassword => {
              if (this.validUser || checkPassword) {
                this.error = true;
                return;
              }
              this.$store.commit("login", this.form);
              this.submitting = false;
              this.$store.commit("loginOverlay");
            })
            .catch();
        })
        .catch();
    },
    clearStatus() {
      this.error = false;
    }
  }
};
</script>