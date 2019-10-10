import HomePage from "./components/HomePage.vue";
import AllPosts from "./components/Posts/AllPosts";
import API from "./components/API.vue";
import Poem from "./components/Search";

const routes = [
  { path: "/", component: HomePage, name: "home" },
  { path: "/allposts", component: AllPosts, name: "all-posts", props: true },
  { path: "/topic1", component: AllPosts, name: "topic-1", props: true },
  { path: "/topic2", component: AllPosts, name: "topic-2", props: true },
  { path: "/api", component: API, name: "api", props: true },
  { path: "/poem", component: Poem, name: "poem", props: true }
];

export default routes;
