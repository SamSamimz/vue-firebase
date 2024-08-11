<template>
  <div class="container">
    <h3>Welcome to Post</h3>
    <div class="col-6 mx-auto bg-light p-3 rounded">
      <form @submit.prevent="addNewPost">
        <div class="mb-3">
          <label for="title" class="form-label">Title :</label>
          <input
            type="text"
            v-model="newPost.title"
            id="title"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description :</label>
          <textarea
            id="description"
            v-model="newPost.description"
            class="form-control"
            required
          ></textarea>
        </div>
        <button class="btn btn-primary col-12">Submit</button>
      </form>
    </div>

    <div class="py-2">
      <div class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-4 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "FirebasePosts",
  setup() {
    const newPost = reactive({
      title: "",
      description: "",
    });

    const posts = reactive([]);

    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        posts.splice(
          0,
          posts.length,
          ...querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const addNewPost = async () => {
      try {
        await addDoc(collection(db, "posts"), {
          ...newPost,
          createdAt: Date.now(),
        });
        newPost.title = "";
        newPost.description = "";
        await fetchPosts();
      } catch (error) {
        console.error("Error adding post:", error);
      }
    };

    onMounted(() => {
      fetchPosts();
    });

    return {
      newPost,
      posts,
      addNewPost,
    };
  },
};
</script>

<style scoped>
</style>
