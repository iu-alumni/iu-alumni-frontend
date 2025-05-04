<script setup lang="ts">
import Logo from "@/assets/icons/logo.svg";
import { serverLogin } from "~/api/auth";
import DefaultButton from "~/components/common/DefaultButton.vue";
import TextInput from "~/components/common/TextInput.vue";
import { resetErrorMessage } from "~/misc/validation";
const { $auth } = useNuxtApp();

definePageMeta({
    layout: "login",
});

const signIn = () => {
    serverLogin(credentials.value.email, credentials.value.password)
        .then((res) => $auth.login(res.data.access_token))
        .then(() => {
            navigateTo("/users");
        })
        .catch((e) => {
            console.error(e);
            isError.value = true;
        });
};

const errorMessage = "Incorrect password or e-mail";
const isError = ref(false);

const credentials = ref({
    email: "",
    password: "",
});

resetErrorMessage(credentials, isError);
</script>

<template>
    <div class="w-full h-[100vh] bg-lightgray flex items-center justify-center">
        <div
            class="p-[72px] pb-[114px] max-w-[504px] w-full mx-[36px] max-h-[664px] bg-white flex flex-col items-center gap-[92px] base-shadow"
        >
            <img :src="Logo" alt="Logo" class="max-w-[192px] self-center" />
            <div class="flex flex-col gap-[15px] w-full">
                <h3 class="mb-[5px]">Sign in</h3>
                <TextInput v-model="credentials.email" placeholder="E-mail" />
                <TextInput
                    v-model="credentials.password"
                    placeholder="Password"
                    is-password
                    :is-error="isError"
                    :error-message="errorMessage"
                />
                <DefaultButton @click.prevent="signIn">
                    Continue
                </DefaultButton>
                <button class="button-text">Forgot password?</button>
            </div>
        </div>
    </div>
</template>
