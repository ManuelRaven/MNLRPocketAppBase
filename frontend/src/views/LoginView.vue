<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card" style="width: 30rem">
      <div class="card-body">
        <div v-if="authList && authList.password.enabled">
          <h5 class="card-title text-center">Login</h5>
          <BForm @submit="onSubmit">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <BFormInput
                v-model="form.email"
                required
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <BFormInput
                type="password"
                v-model="form.password"
                required
                class="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <BButton type="submit" class="btn btn-primary w-100">Login</BButton>
          </BForm>
          <BButton
            class="btn btn-secondary w-100 mt-2"
            @click="router.push('/register')"
            >Register</BButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composeables/useAuth";
import { useToastController } from "bootstrap-vue-next";
import { ClientResponseError, type AuthMethodsList } from "pocketbase";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const { show } = useToastController();
const auth = useAuth();
const authList = ref<AuthMethodsList | null>(null);
const form = reactive({
  email: "",
  password: "",
});
const router = useRouter();
onMounted(async () => {
  // Check if already logged in and redirect to home
  if (await auth.getAuthState()) {
    await router.replace("/");
  }

  authList.value = await auth.listAuthOptions();
});

const onSubmit = async (event: Event) => {
  event?.preventDefault();
  try {
    let authresponse = await auth.login(form.email, form.password);
    show?.({
      props: {
        title: "Success",
        body: "You have successfully logged in",
        variant: "success",
      },
    });
    await router.replace("/");
    console.log(authresponse);
  } catch (error: unknown) {
    console.error("This", error);
    if (error instanceof ClientResponseError) {
      show?.({
        props: {
          title: "Error",
          body: error.message,
          variant: "danger",
        },
      });
    } else {
      show?.({
        props: {
          title: "Error",
          body: "An error occurred: " + JSON.stringify(error),
          variant: "danger",
        },
      });
    }
  }
};
</script>

<style scoped></style>
