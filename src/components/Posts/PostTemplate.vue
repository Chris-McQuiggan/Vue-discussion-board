<template>
  <div :id="this.$store.state.liveTopic+'-post-'+data.id">
    <v-col cols="12" offset="0">
      <div v-if="editing==data.id">
        <v-lazy :options="{
          threshold: .5
        }" transition="fade-transition">
          <v-card
            bg-variant="secondary"
            text-variant="white"
            :header="data.username"
            class="text-left"
          >
            <v-card-title>
              <v-col cols="7" offset="0">{{data.username}}</v-col>
              <v-col cols="5" offset="0" style="font-size: 13px;">{{data.date}}</v-col>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <v-textarea
                  :id="this.$store.state.liveTopic+'-postText-'+data.id"
                  ref="postText"
                  prepend-icon="comment"
                  counter
                  rounded
                  background-color="textbox"
                  auto-grow
                  v-model="data.postText"
                  :rules="[rules.required]"
                  @focus="clearStatus"
                  @keypress="clearStatus"
                ></v-textarea>

                <v-row>
                  <v-col cols="auto" offset="0">
                    <v-btn
                      :id="this.$store.state.liveTopic+'-save-'+data.id"
                      type="Submit"
                      text
                      icon
                      color="primary"
                    >
                      <v-icon>save</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" offset="0">
                    <v-btn
                      :id="this.$store.state.liveTopic+'-cancel-'+data.id"
                      @click.prevent="handleCancel"
                      text
                      icon
                      color="danger"
                    >
                      <v-icon>cancel</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-lazy>
      </div>

      <div v-else>
        <v-lazy :options="{
          threshold: .5
        }" transition="fade-transition">
          <v-card
            bg-variant="secondary"
            text-variant="white"
            :header="data.username"
            class="text-left"
          >
            <v-card-title>
              <v-col cols="7" offset="0">{{data.username}}</v-col>
              <v-col cols="5" offset="0" style="font-size: 13px;">{{data.date}}</v-col>
            </v-card-title>
            <v-card-text>{{ data.postText }}</v-card-text>
            <v-row v-if="this.$store.state.user.username===this.data.username">
              <v-card-actions>
                <v-col cols="auto" offset="1">
                  <v-btn
                    :id="this.$store.state.liveTopic+'-edit-'+data.id"
                    @click.prevent="handleEdit"
                    text
                    icon
                    color="primary"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="auto" offset="0">
                  <v-btn
                    :id="this.$store.state.liveTopic+'-delete-'+data.id"
                    @click.prevent="handleDelete"
                    text
                    icon
                    color="danger"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-lazy>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "post-template",
  props: ["data"],
  data() {
    return {
      editing: "",
      invalidText: false,
      submitting: false,
      error: false,
      success: false,
      name: "",
      cachedData: null,
      rules: {
        required: value => !!value || "Posts cannot be blank."
      }
    };
  },
  methods: {
    handleDelete() {
      this.$store.commit("deletePost", this.data.id);
    },
    handleEdit() {
      this.cachedData = Object.assign({}, this.data);
      this.editing = this.data.id;
    },
    handleSubmit() {
      this.clearStatus();
      this.submitting = true;

      if (this.data.postText === "") {
        this.invalidText = true;
        this.error = true;
        return;
      }
      this.$store.commit("editPost", this.data);
      this.editing = null;
      this.submitting = false;
    },
    handleCancel() {
      Object.assign(this.data, this.cachedData);
      this.editing = null;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    }
  }
};
</script>