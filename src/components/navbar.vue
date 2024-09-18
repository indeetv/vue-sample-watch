<template>
    
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button @click="clearData" type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log out</button>
            </div>
            
        </div>
    </nav>

</template>

<script setup lang='ts'>
import { getAuthData } from '@/store/utils/auth.ts'
import { clearAuthData } from '@/store/utils/auth.ts'
import { router } from '@/router/index.ts';

console.log("----------",getAuthData())

const clearData=()=>{
    clearAuthData();
    router.push('/login')
    console.log("Auth cleared: ",getAuthData());
}


</script>

<style scoped>
</style>