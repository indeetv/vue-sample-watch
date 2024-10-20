<template>
    <div>
        <p class="w-screen h-screen flex items-center justify-center font-semibold text-lg">
            {{ apiError }}
        </p>
    </div>
</template>

<script setup lang="ts">

    import { computed } from 'vue';
    import { useApiErrorData } from '@/store/api-error.ts';

    const apiError = computed(() =>  useApiErrorData().api_error_msg);

</script>

<style scoped>
</style>