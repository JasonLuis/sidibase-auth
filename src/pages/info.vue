<template>
    <v-sheet>
        <v-btn @click="clickButton()">Obter Token</v-btn>
        <v-btn @click="out()">Logout</v-btn>
        <p>{{ tokenString }}</p>
    </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const { token, signOut } = useAuth();

const tokenString = ref<string | undefined>(undefined);

const clickButton = async () => {
    console.log("user", token.value);

    tokenString.value = token.value!;
}

const out = async () => {
    await signOut({
        callbackUrl: '/'
    });
}
</script>