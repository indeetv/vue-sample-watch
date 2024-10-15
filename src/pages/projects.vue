<template>
  <div v-if="isLoading">
    <Loader></Loader>
  </div>
  <div v-else>
    <Navbar />
    <Table  
      :heading="`Brand : ${brandKey}`" 
      :columns="columnsData" 
      :data="projectsData" 
      :isLoading="isLoading"
      @click="handleClick"
    />
    <div 
      v-if="paginatedCallOngoing">
      <ContentLoader></ContentLoader>
    </div>
    <div 
      v-if="projectListing.next && !paginatedCallOngoing" 
      class="text-center">
      <button
        class="text-blue-700 text-center no-underline p-5 cursor-pointer"
        @click="handleProjectPagination"
      >
        Load More Projects...
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { metaConfigStore } from '@/store/meta-config.ts';
  import { useProjectListing } from '@/store/project-listing.ts';
  import Loader from '@/components/Loader.vue';
  import ContentLoader from '@/components/ContentLoader.vue';
  import Navbar from '@/components/Navbar.vue';
  import Table from '@/components/Table.vue';

  const heading = ref<string>('');
  const columnsData = ref<Array<string>>([]);
  const isLoading = ref<boolean>(true);
  const paginatedCallOngoing = ref<boolean>(false);
  const brandKey = ref<string | undefined>();
  const route = useRoute();
  const router = useRouter();
  const metaConfigStoreData = metaConfigStore();
  const projectListing = useProjectListing();

  const projectsData = computed(() => projectListing.results);

  const handleClick = (payLoad: any) => {

    event.stopPropagation();
    router.push({
      path: '/videos',
      query: {
        heading: payLoad.name,
        projectKey: payLoad.key,
        brandKey: brandKey.value || ''
      }
    });
    
  };

  const handleProjectPagination = async () => {

    paginatedCallOngoing.value = true;
    await projectListing.fetchProjectListing(projectListing.next, null, true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    paginatedCallOngoing.value = false;

  };

  onMounted(async () => {

    await projectListing.resetProjectStore();

    await metaConfigStoreData.getMetaConfigData();

    heading.value = route.query.heading as string || '';
    brandKey.value = route.query.brandKey as string | undefined;

    await projectListing.fetchProjectListing(metaConfigStoreData.endpoints['watch.content.project.list'], brandKey.value);

    columnsData.value = projectListing.results.length > 0 ? Object.keys(projectListing.results[0]) : [];
    isLoading.value = false;

  });
  
</script>

<style scoped>
/* Add your styles here */
</style>
