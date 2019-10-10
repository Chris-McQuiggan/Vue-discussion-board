<template>
  <div id="new-post">
    <v-row>
      <v-col cols="12" offset="0">
        <h3>Got Something To Add?</h3>
        <v-form @submit.prevent="onSubmit" ref="form">
          <v-alert
            :id="'error-newPost-'+this.$store.state.liveTopic"
            v-if="error && submitting"
            type="error"
            class="mb-4"
            min-width="135"
          >Please check password</v-alert>
          <v-alert
            :id="'success-newPost-'+this.$store.state.liveTopic"
            v-if="success"
            type="success"
            class="mb-4"
            min-width="145"
          >Post successfully added</v-alert>

          <v-textarea
            :id="'postText-newPost-'+this.$store.state.liveTopic"
            ref="postTextNew"
            prepend-icon="comment"
            counter
            rounded
            background-color="textbox"
            auto-grow
            rows="4"
            required
            :rules="[rules.postRequired]"
            v-model="form.postText"
            placeholder="Enter something..."
            @focus="clearStatus"
            @keypress="clearStatus"
          ></v-textarea>

          <v-text-field
            :id="'password-newPost-'+this.$store.state.liveTopic"
            ref="password"
            v-model="form.password"
            required
            label="Password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.passRequired]"
            :type="show1 ? 'text' : 'password'"
            @focus="clearStatus"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :id="'button-newPost-'+this.$store.state.liveTopic"
            type="submit"
            outlined
            rounded
            color="primary"
            :disabled="checked"
          >Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "new-post",
  data() {
    return {
      show1: false,
      submitting: false,
      error: false,
      success: false,
      name: "",
      form: {
        postText: "",
        password: "",
        date: "",
        topic: ""
      },
      rules: {
        postRequired: v => !!v || "Posts cannot be blank",
        passRequired: value => !!value || "Password is required."
      }
    };
  },
  computed: {
    checked() {
      if (this.form.postText.length === 0 || this.form.password.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    validation() {
      return this.submitting && this.invalidPost;
    }
  },
  methods: {
    onSubmit() {
      this.submitting = true;
      this.clearStatus();

      if (this.$store.state.user.password !== this.form.password) {
        this.error = true;
        return;
      }
      let date = Date()
        .toString()
        .split(" ", 5);
      this.form.date =
        date[2] + " " + date[1] + " " + date[3] + " " + date[4].substring(0, 5);
      this.form.topic = this.$store.state.liveTopic;
      this.$store.commit(this.form.topic, this.form);
      this.form = {
        postText: "",
        password: "",
        date: ""
      };
      this.error = false;
      this.success = true;
      this.submitting = false;
      this.resetValidation();
    },

    clearStatus() {
      this.success = false;
      this.error = false;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style>
#new-post {
  padding-left: 10px;
  position: sticky;
  top: 100px;
}

[class*="-message"] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>