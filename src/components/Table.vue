<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-blue-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-if="heading!=null" colspan="5" scope="col" class="text-base text-purple-700 px-6 py-3">
            {{ heading }}
          </th>
        </tr>
        <tr>
          <th v-for="(eachColumn, index) in columns" :key="index" scope="col" class="px-6 py-3 w-1/2">
            {{eachColumn}}
          </th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="!data.length && !isLoading">
          <td colspan="2" class="px-6 py-4 text-center">No data available</td>
        </tr>
        <tr v-if="isLoading">
          <td colspan="2" class="px-6 py-4 text-center">Loading...</td>
        </tr>

        <tr
          v-for="(eachData ,index ) in data"
          :key="index"
          @click="triggerClick(eachData)"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          
          <td class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/2">
            {{ eachData.name }}
          </td>
          <td class="flex justify-center px-6 py-4">
            <img :src="getImage(eachData.logo || eachData.poster)" alt="Poster" class="w-18 h-14 object-contain w-1/2"/>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, ref, defineEmits, PropType, onMounted } from 'vue';

const props=defineProps(
    {
        heading: {
            type:String,
            required: false
        },
        columns:{
          type: Array<string>,
          required:true
        },
        data: {
            type: Array as PropType<any[]>,
            required: true
        },
        isLoading: {
          type: Boolean,
          default:true,
          required: true
        }
    }
);

const emit = defineEmits();
const defaultPoster = new URL('@/assets/images/default-project-poster-1.jpg', import.meta.url).href;

const getImage = (logo: string | null) => {
  return logo ? logo : defaultPoster;
};

const triggerClick = (eachData: any, event: MouseEvent) => {
  // console.log("Table Clicked:", eachData);
  emit('click', { name: eachData.name, key: eachData.key });
};

</script>

<style scoped>


</style>