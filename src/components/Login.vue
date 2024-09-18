<template>
    <div>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submitHandler" class="space-y-6" action="#" method="POST">
                <div v-if="props.authType!=='PIN'">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" v-model=email autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                            {{authType==='PIN'?"Access Code":"Password"}}
                        </label>
                    </div>
                    <div class="mt-2">
                        <input id="authKey" name="authKey" type="password" v-model=authKey autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign in
                    </button>
                </div>
            </form>

        </div>
    </div>

    </div>
</template>

<script setup lang="ts">

import { defineProps,ref,defineEmits } from 'vue';

const props=defineProps({
    authType: {
    type: String,
    required:true,
  }
})
 
const email=ref('');
const authKey=ref('');

const emit = defineEmits<{
    (e: 'submit', data: { email?: string; authKey: string }): void;
}>();

const submitHandler=()=>{
   const formData = {
        email: props.authType !== 'PIN' ? email.value : undefined, // include email only if not 'PIN'
        authKey: authKey.value,
    };
    emit('submit', formData);
}

</script>

<style scoped>

</style>