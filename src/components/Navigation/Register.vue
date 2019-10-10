<template>
  <div id="login">
    <v-alert
      id="created-account"
      v-if="this.validation.success"
      class="mb-4"
      type="success"
    >Account Created</v-alert>
    <v-form v-else @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              id="username-register"
              v-model="form.username"
              :rules="[rules.userRequired, rules.userLength]"
              :counter="20"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              id="password-register"
              v-model="form.password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.passRequired, rules.passMin]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="Must be at least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              id="confirmPassword-register"
              v-model="form.confirmPassword"
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :rules="[rules.passRequired, rules.passMin]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password"
              hint="Must match password"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto" offset="1">
            <v-switch id="notBot-register" v-model="validation.notBot" label="Not a Bot"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto" offset="1">
            <v-switch
              id="accept-register"
              v-model="validation.accept"
              label="Accept Terms & Conditions"
            ></v-switch>
          </v-col>
        </v-row>
        <v-alert
          id="error-nonUser-register"
          v-if="this.validation.error && this.validation.invalidUsername"
          class="mb-4"
          type="warning"
        >Username already exists</v-alert>
        <v-alert
          id="error-noMatch-register"
          v-if="this.validation.error && this.validation.invalidMatch"
          class="mb-4"
          type="error"
        >Passwords do not match</v-alert>
        <v-btn id="button-register" color="primary" text type="submit" :disabled="checked">Submit</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      validation: {
        invalidUsername: false,
        invalidMatch: false,
        error: false,
        submitting: false,
        success: false,
        notBot: false,
        accept: true
      },
      show1: false,
      show2: false,

      form: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        userRequired: v => !!v || "Username is required",
        userLength: v =>
          v.length <= 20 || "Username must be less than 20 characters",
        passRequired: value => !!value || "Password is required.",
        passMin: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {
    checked() {
      if (
        !this.validation.notBot ||
        !this.validation.accept ||
        this.form.username.length > 20 ||
        this.form.password.length < 8 ||
        this.form.password.length === 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    onSubmit() {
      this.clearStatus();
      this.validation.submitting = true;
      this.$store
        .dispatch("checkUser", this.form)
        .then(checkUser => {
          if (!checkUser) {
            this.validation.invalidUsername = true;
            this.validation.error = true;
            return;
          }
          if (this.form.password !== this.form.confirmPassword) {
            this.validation.invalidMatch = true;
            this.validation.error = true;
            return;
          }
          this.$store.commit("register", this.form);
          this.validation.submitting = false;
          this.clearStatus();
          this.validation.success = true;
          this.$store.commit("login", this.form);
        })
        .catch();
    },
    clearStatus() {
      this.validation.error = false;
      this.validation.success = false;
      this.validation.invalidUsername = false;
      this.validation.invalidMatch = false;
    }
  }
};
</script>