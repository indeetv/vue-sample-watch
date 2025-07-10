<template>
    <nav class="sticky top-0 z-10 bg-white border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div 
                @click="()=>{ router.push('/brands'); }" 
                class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <img 
                    src="/images/indee-logo/indeeLogo.webp" 
                    class="h-8" 
                    alt="Indee.tv Logo" 
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap">
                    Indee Vue Demo App
                </span>
            </div>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button 
                    @click="clearData" 
                    type="button" 
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                    Log out
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">

    import { clearAuthData } from '@/store/utils/auth.ts';
    import { router } from '@/router/index.ts';

    const clearData = () => {
        clearAuthData();
        router.push('/login');
    }
    
</script>

<style scoped>
/* Your styles here */
</style>
