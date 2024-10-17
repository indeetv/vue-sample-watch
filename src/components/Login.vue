<template>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-16 w-auto" :src='logo_image' alt="Company Logo">
            <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            <p class="mt-4 text-center text-sm text-gray-500">Please enter your credentials</p>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submitHandler" class="space-y-6" action="#" method="POST">
                <div v-if="props.authType!=='PIN'">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div class="mt-2">
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            v-model=email 
                            autocomplete="email"  
                            placeholder="Enter your email address"
                            class="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            required
                        >
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                            {{authType==='PIN'?"Access Code":"Password"}}
                        </label>
                    </div>
                    <div class="mt-2">
                        <input 
                            id="authKey" 
                            name="authKey" 
                            :type="inputType" 
                            @focus="changeType('text')" 
                            @blur="changeType('password')"
                            v-model=authKey 
                            :placeholder="authType == 'password' ? 'Enter your password' : 'Enter your access code'"                            autocomplete="current-password" 
                            class="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            required 
                        >
                    </div>
                </div>
                <p class="text-red-600 text-center w-full text-sm">
					{{error_msg}}
				</p>
                <div>
                    <button 
                        type="submit" 
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <template v-if="isLoading">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        dur="0.75s"
                                        repeatCount="indefinite"
                                        type="rotate"
                                        values="0 12 12;360 12 12"
                                    />
                                </path>
                            </svg>
                        </template>
                        <template v-else>
                            Sign In
                        </template>
                    </button>
                </div>
            </form>
        </div>
    </div>
    
</template>

<script setup lang="ts">
    import { defineProps, ref, defineEmits, computed } from 'vue';
    import { useLoggedInStore } from '@/store/loggedIn.ts';

    const props = defineProps({
        logo_image: {
            type: String,
            required: false
        },
        authType: {
            type: String,
            required: true,
        }
    });

    const email = ref('');
    const authKey = ref('');
    const inputType = ref<string>('password')
    const isLoading = ref(false);
    const loggedInStore = useLoggedInStore();
    const error_msg = computed(()=>{
        return loggedInStore.error_msg;
    });

    const changeType = (type: string)=> {
      inputType.value = type;
    }

    const emit = defineEmits<{
        (e: 'submit', data: { email?: string; authKey: string }): void;
    }>();

    const submitHandler = async () => {

        loggedInStore.error_msg = '';

        isLoading.value = true;

        const formData = {
            email: props.authType !== 'PIN' ? email.value : undefined, // include email only if not 'PIN'
            authKey: authKey.value,
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        emit('submit', formData);

        isLoading.value = false;
    }
</script>

<style scoped>
    /* Your styles here */
</style>
