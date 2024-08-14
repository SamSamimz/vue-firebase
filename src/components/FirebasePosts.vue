<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-between">
      <h3>Welcome to Post</h3>
      <button @click="toggleForm" class="btn btn-primary">
        {{ showForm.value ? "Hide Form" : "Show Form" }}
      </button>
    </div>

    <div
      v-show="showForm.value"
      class="col-12 col-md-6 mx-auto bg-light p-3 rounded"
    >
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
        <button class="btn btn-primary col-12" :disabled="loading.value">
          Submit
        </button>
      </form>
    </div>

    <div v-if="loading.value" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else class="py-2">
      <div class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-4 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.description }}</p>
              <button
                class="btn btn-danger"
                @click="deletePost(post.id)"
                :disabled="loading.value"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useToast } from "vue-toastification";
export default {
  name: "FirebasePosts",
  setup() {
    const newPost = reactive({
      title: "",
      description: "",
    });

    const showForm = reactive({ value: false });
    const posts = reactive([]);
    const loading = reactive({ value: false });
    const toast = useToast();

    const fetchPosts = async () => {
      loading.value = true;
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        posts.splice(0, posts.length, ...fetchedPosts);
        console.log("Fetched Posts:", fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        loading.value = false;
      }
    };

    const addNewPost = async () => {
      loading.value = true;
      try {
        await addDoc(collection(db, "posts"), {
          ...newPost,
          createdAt: Date.now(),
        });
        newPost.title = "";
        newPost.description = "";
        toast.success("Post has been created successfully");
        await fetchPosts();
      } catch (error) {
        console.error("Error adding post:", error);
      } finally {
        loading.value = false;
      }
    };

    const toggleForm = () => {
      showForm.value = !showForm.value;
    };

    const deletePost = async (id) => {
      if (confirm("Are you sure you want to delete?")) {
        loading.value = true;
        try {
          const postDoc = doc(db, "posts", id);
          await deleteDoc(postDoc);
          toast.success("Post has been deleted");
          console.log(`Post with ID ${id} has been deleted.`);
          await fetchPosts();
        } catch (error) {
          console.error("Error deleting post:", error);
        } finally {
          loading.value = false;
        }
      }
    };

    onMounted(() => {
      fetchPosts();
    });

    return {
      newPost,
      posts,
      addNewPost,
      deletePost,
      showForm,
      toggleForm,
      loading,
    };
  },
};
</script>
<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999; /* Ensure it is on top of other elements */
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat radial-gradient(farthest-side, #25b09b 92%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right, var(--_c) bottom;
  background-size: 12px 12px;
  animation: l7 1s infinite;
}

@keyframes l7 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>