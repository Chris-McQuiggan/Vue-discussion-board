import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: false,
    overlay: false,
    login: false,
    register: false,
    loggedin: false,
    drawer: null,
    liveTopic: "topic1",
    users: [
      {
        username: null,
        password: null
      },
      {
        username: "Mathews65",
        password: "password"
      },
      {
        username: "John123",
        password: "password"
      },
      {
        username: "HappyMan",
        password: "password"
      },
      {
        username: "ImOnHoliday",
        password: "password"
      },
      {
        username: "CatchEmAll",
        password: "password"
      },
      {
        username: "Sam4312",
        password: "password"
      },
      {
        username: "Jack321",
        password: "password"
      },
      {
        username: "Bob90",
        password: "password"
      },
      {
        username: "Harry1990",
        password: "password"
      },
      {
        username: "Jerry123",
        password: "password"
      },
      {
        username: "Harry",
        password: "password"
      },
      {
        username: "Smith321",
        password: "password"
      }
    ],
    user: {
      username: null,
      password: null
    },
    topic1: [
      {
        id: 1,
        username: "John123",
        postText: "Some Text",
        date: "24 Sep 2019 10:30"
      },
      {
        id: 2,
        username: "Smith321",
        postText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus imperdiet nulla malesuada pellentesque elit. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Auctor augue mauris augue neque gravida in fermentum et. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Integer enim neque volutpat ac. Enim diam vulputate ut pharetra sit amet aliquam. Porttitor massa id neque aliquam vestibulum morbi. Suscipit tellus mauris a diam maecenas sed enim ut sem. Eget lorem dolor sed viverra ipsum nunc aliquet. Amet commodo nulla facilisi nullam vehicula ipsum. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Fermentum leo vel orci porta non pulvinar. Facilisis mauris sit amet massa. Volutpat commodo sed egestas egestas. Mollis aliquam ut porttitor leo a diam. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Phasellus faucibus scelerisque eleifend donec. Vestibulum mattis ullamcorper velit sed. Ullamcorper a lacus vestibulum sed arcu non. \n Erat pellentesque adipiscing commodo elit at. Viverra nam libero justo laoreet sit. Ultricies mi eget mauris pharetra. Ultricies mi quis hendrerit dolor magna eget. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus et malesuada fames ac. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Tellus in metus vulputate eu. Mauris commodo quis imperdiet massa tincidunt nunc. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Eu consequat ac felis donec et odio. Integer quis auctor elit sed vulputate mi sit amet mauris. Egestas dui id ornare arcu odio. Nulla at volutpat diam ut venenatis tellus in metus. \n \n ignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Morbi tempus iaculis urna id. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Sit amet purus gravida quis blandit turpis cursus in hac. Interdum velit laoreet id donec ultrices tincidunt. Fermentum leo vel orci porta non. Rhoncus est pellentesque elit ullamcorper dignissim cras. Vitae turpis massa sed elementum. Ac orci phasellus egestas tellus rutrum tellus. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Cras tincidunt lobortis feugiat vivamus.",
        date: "24 Sep 2019 23:45"
      },
      {
        id: 3,
        username: "Mathews65",
        postText: "Good thinking",
        date: "25 Sep 2019 12:25"
      }
    ],
    topic2: [
      {
        id: 1,
        username: "HappyMan",
        postText: "I'm always HAPPY!",
        date: "24 Sep 2019 10:30"
      },
      {
        id: 2,
        username: "ImOnHoliday",
        postText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "24 Sep 2019 23:45"
      },
      {
        id: 3,
        username: "CatchEmAll",
        postText: ":D",
        date: "25 Sep 2019 12:25"
      }
    ],
    topic3: [
      {
        id: 1,
        username: "Sam4312",
        postText: "Who am I",
        date: "24 Sep 2019 10:30"
      },
      {
        id: 2,
        username: "Jack321",
        postText:
          "Tempus imperdiet nulla malesuada pellentesque elit. Amet commodo nulla facilisi nullam vehicula ipsum. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Fermentum leo vel orci porta non pulvinar. Facilisis mauris sit amet massa. Volutpat commodo sed egestas egestas. Mollis aliquam ut porttitor leo a diam. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Phasellus faucibus scelerisque eleifend donec. Vestibulum mattis ullamcorper velit sed. Ullamcorper a lacus vestibulum sed arcu non. \n Erat pellentesque adipiscing commodo elit at. Viverra nam libero justo laoreet sit. Ultricies mi eget mauris pharetra. Ultricies mi quis hendrerit dolor magna eget. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus et malesuada fames ac. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Tellus in metus vulputate eu. Mauris commodo quis imperdiet massa tincidunt nunc. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Eu consequat ac felis donec et odio. Integer quis auctor elit sed vulputate mi sit amet mauris. Egestas dui id ornare arcu odio. Nulla at volutpat diam ut venenatis tellus in metus. \n \n ignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Morbi tempus iaculis urna id. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Sit amet purus gravida quis blandit turpis cursus in hac. Interdum velit laoreet id donec ultrices tincidunt. Fermentum leo vel orci porta non. Rhoncus est pellentesque elit ullamcorper dignissim cras. Vitae turpis massa sed elementum. Ac orci phasellus egestas tellus rutrum tellus. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Cras tincidunt lobortis feugiat vivamus.",
        date: "24 Sep 2019 23:45"
      },
      {
        id: 3,
        username: "Bob90",
        postText: "Why not",
        date: "25 Sep 2019 12:25"
      }
    ],
    topic4: [
      {
        id: 1,
        username: "Harry",
        postText: "Some Random Text",
        date: "24 Sep 2019 10:30"
      },
      {
        id: 2,
        username: "Jerry123",
        postText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus imperdiet nulla malesuada pellentesque elit. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Auctor augue mauris augue neque gravida in fermentum et. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Integer enim neque volutpat ac. Enim diam vulputate ut pharetra sit amet aliquam. Porttitor massa id neque aliquam vestibulum morbi. Suscipit tellus mauris a diam maecenas sed enim ut sem. Eget lorem dolor sed viverra ipsum nunc aliquet. Amet commodo nulla facilisi nullam vehicula ipsum. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Fermentum leo vel orci porta non pulvinar. Facilisis mauris sit amet massa. Volutpat commodo sed egestas egestas. Mollis aliquam ut porttitor leo a diam. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Phasellus faucibus scelerisque eleifend donec. Vestibulum mattis ullamcorper velit sed. Ullamcorper a lacus vestibulum sed arcu non. \n Erat pellentesque adipiscing commodo elit at. Viverra nam libero justo laoreet sit. Ultricies mi eget mauris pharetra. Ultricies mi quis hendrerit dolor magna eget. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Tristique senectus et netus et malesuada. Morbi tristique senectus et netus et malesuada fames ac. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Tellus in metus vulputate eu. Mauris commodo quis imperdiet massa tincidunt nunc. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Eu consequat ac felis donec et odio. Integer quis auctor elit sed vulputate mi sit amet mauris. Egestas dui id ornare arcu odio. Nulla at volutpat diam ut venenatis tellus in metus. \n \n ignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Morbi tempus iaculis urna id. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Sit amet purus gravida quis blandit turpis cursus in hac. Interdum velit laoreet id donec ultrices tincidunt. Fermentum leo vel orci porta non. Rhoncus est pellentesque elit ullamcorper dignissim cras. Vitae turpis massa sed elementum. Ac orci phasellus egestas tellus rutrum tellus. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Cras tincidunt lobortis feugiat vivamus.",
        date: "24 Sep 2019 23:45"
      },
      {
        id: 3,
        username: "Harry1990",
        postText: "Where are all of the real people",
        date: "25 Sep 2019 12:25"
      }
    ]
  },

  getters: {},

  mutations: {
    setTopic(state, item) {
      state.liveTopic = item;
    },
    toggleDark(state) {
      state.darkMode = !state.darkMode;
    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    loginOverlay(state) {
      state.overlay = !state.overlay;
      state.login = !state.login;
    },
    registerOverlay(state) {
      state.overlay = !state.overlay;
      state.register = !state.register;
    },
    login(state, form) {
      state.user.username = form.username;
      state.user.password = form.password;
      state.loggedin = true;
    },
    logout(state) {
      state.user.username = null;
      state.user.password = null;
      state.loggedin = false;
    },
    // addPost(state, newPost) {
    //   let id = state.allPosts.length + 1;
    //   let createdPost = {
    //     id: id,
    //     postText: newPost.postText,
    //     username: state.user.username,
    //     date: newPost.date
    //   };
    //   state.allPosts = [...state.allPosts, createdPost];
    // },
    topic1(state, newPost) {
      let id = state.topic1.length + 1;
      let createdPost = {
        id: id,
        postText: newPost.postText,
        username: state.user.username,
        date: newPost.date
      };
      state.topic1 = [...state.topic1, createdPost];
    },
    topic2(state, newPost) {
      let id = state.topic2.length + 1;
      let createdPost = {
        id: id,
        postText: newPost.postText,
        username: state.user.username,
        date: newPost.date
      };
      state.topic2 = [...state.topic2, createdPost];
    },

    topic3(state, newPost) {
      let id = state.topic3.length + 1;
      let createdPost = {
        id: id,
        postText: newPost.postText,
        username: state.user.username,
        date: newPost.date
      };
      state.topic3 = [...state.topic3, createdPost];
    },

    topic4(state, newPost) {
      let id = state.topic4.length + 1;
      let createdPost = {
        id: id,
        postText: newPost.postText,
        username: state.user.username,
        date: newPost.date
      };
      state.topic4 = [...state.topic4, createdPost];
    },

    deletePost(state, id) {
      if (state.liveTopic === "topic1") {
        state.topic1 = state.topic1.filter(post => post.id !== id);
      } else if (state.liveTopic === "topic2") {
        state.topic2 = state.topic2.filter(post => post.id !== id);
      } else if (state.liveTopic === "topic3") {
        state.topic3 = state.topic3.filter(post => post.id !== id);
      } else if (state.liveTopic === "topic4") {
        state.topic4 = state.topic4.filter(post => post.id !== id);
      }
    },
    editPost(state, updatedPost) {
      if (state.liveTopic === "topic1") {
        state.topic1 = state.topic1.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
      } else if (state.liveTopic === "topic2") {
        state.topic2 = state.topic2.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
      } else if (state.liveTopic === "topic3") {
        state.topic3 = state.topic3.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
      } else if (state.liveTopic === "topic4") {
        state.topic4 = state.topic4.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
      }
      // state.allPosts = state.allPosts.map(post =>
      //   post.id === updatedPost.id ? updatedPost : post
      // );
    },
    register(state, form) {
      let id = state.users.length + 1;
      let newUser = {
        id: id,
        username: form.username,
        password: form.password
      };
      state.users = [...state.users, newUser];
    }
  },

  actions: {
    checkUser({ state }, form) {
      let checkUser = state.users.find(user => user.username === form.username);
      if (checkUser !== undefined) {
        if (checkUser.username === form.username) {
          return false;
        }
      }
      return true;
    },
    checkPassword({ state }, form) {
      let checkUser = state.users.find(user => user.username === form.username);
      if (checkUser !== undefined) {
        if (checkUser.password === form.password) {
          return false;
        }
      }
      return true;
    }
  }
});
