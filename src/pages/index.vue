<template>
  <v-sheet
    border="md"
    class="pa-6 text-white mx-auto my-auto"
    color="#141518"
    min-width="400"
  >
    <h4 class="text-h5 font-weight-bold mb-4">User Login</h4>

    <v-text-field
      class="mb-4"
      v-model="login"
      label="Login"
      hide-details
      required
    ></v-text-field>
    <v-text-field
      class="mb-4"
      v-model="password"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      class="text-none text-black mb-4"
      color="red-accent-2"
      size="x-large"
      variant="flat"
      @click="clickButton"
      :loading="loading"
      :disabled="loading || !login || !password"
      block
    >
      Login
    </v-btn>

    <v-btn
      class="text-none text-black mb-4"
      color="red-accent-2"
      size="x-large"
      variant="outlined"
      block
    >
      Create Account
    </v-btn>

    <v-alert
      color="error"
      type="error"
      variant="outlined"
      v-if="isIncorrect"
    > 
      Incorrect login or password! 
    </v-alert>
  </v-sheet>
</template>

<script setup lang="ts">

const { signIn, token } = useAuth();
const router = useRouter();




const loading = ref<boolean>(false);
const isIncorrect = ref<boolean>(false);
const login = ref<string | undefined>(undefined);
const password = ref<string | undefined>(undefined);

const clickButton = async () => {
  
  loading.value = true;
  isIncorrect.value = false;
  try {
    await signIn({
      email: login.value,
      password: password.value
    }, {
      callbackUrl: '/info' 
    });
  }
  catch (error) {
    console.log("error teste", error);
    isIncorrect.value = true;
  }

  loading.value = false;
};



onMounted(() => {
  console.log("token", token.value);
  if(token.value) {
    router.push('/info');
  }
});

</script>
]