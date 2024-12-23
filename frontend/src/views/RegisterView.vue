<template>
  <div class="card">
    <div class="card-body">
      <div v-if="authList && authList.password.enabled">
        <h5 class="card-title text-center">Register</h5>
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
          <div class="mb-3">
            <label for="password" class="form-label">Repeat Password</label>
            <BFormInput
              type="password"
              v-model="form.repeatedPassword"
              required
              class="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <BButton type="submit" class="btn btn-primary w-100">Submit</BButton>
        </BForm>
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
  repeatedPassword: "",
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

  if (form.password !== form.repeatedPassword) {
    show?.({
      props: {
        title: "Error",
        body: "Passwords do not match",
        variant: "danger",
      },
    });
    return;
  }
  try {
    let authresponse = await auth.register(
      form.email,
      form.password,
      form.repeatedPassword
    );
    show?.({
      props: {
        title: "Success",
        body: "You have successfully registered",
        variant: "success",
      },
    });
    await router.replace("/login");
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
