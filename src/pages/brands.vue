<template>
  <navbar />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="text-lg text-center font-bold py-6 my-3">
      Select the brand whose content you want to see.
    </div>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-center text-sm text-blue-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Brand name</th>
          <th scope="col" class="px-6 py-3">Poster</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loading state when no brands are available yet -->
        <tr v-if="!brands.length && !isLoading">
          <td colspan="2" class="px-6 py-4 text-center">No brands available</td>
        </tr>
        <!-- Loading spinner or message -->
        <tr v-if="isLoading">
          <td colspan="2" class="px-6 py-4 text-center">Loading...</td>
        </tr>

        <tr
          v-for="brand in brands"
          :key="brand.key"
          @click="openBrand(brand)"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
        >
          <td class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ brand.name }}
          </td>
          <td class="flex justify-center px-6 py-4">
            <img :src="getBrandLogo(brand.logo)" alt="Poster" class="w-18 h-14 object-contain" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { metaConfigStore } from '@/store/meta-config.ts'
import navbar from '@/components/navbar.vue';
import { useBrandKey } from '@/store/brand-key';

interface BrandType {
  key: string;
  keyword: string;
  name: string;
  logo: string | null;
  header: string;
}

const router = useRouter();
const brands = ref<BrandType[]>([]);
const isLoading = ref(true);

const defaultPoster = new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;

const openBrand = (brand: BrandType) => {
  router.push({ 
    path: '/project', 
    query: { heading: brand.name, brandKey: brand.key } 
  });
  console.log('Selected brand:', brand.key);
};

const getBrandLogo = (logo: string | null) => {
  return logo ? logo : defaultPoster;
};

onMounted(async () => {

  await metaConfigStore().getMetaConfigData();
  
  isLoading.value = true;
  await useBrandKey().setBrandKey();
  brands.value = useBrandKey().brands;
  isLoading.value = false;
  
});
</script>

<style scoped>

</style>
