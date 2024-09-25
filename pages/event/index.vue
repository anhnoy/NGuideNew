<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 lg:bg-[#F5F5F7] bg-white">
      <div class="card min-h-screen">
        <div class="lg:flex lg:justify-center hidden">
          <h1 class="text-[#152123] text-3xl font-bold">이벤트</h1>
        </div>
        <main class="flex-1">
          <div class="mt-6 space-y-6">
            <div
              v-for="(event, index) in paginatedEvents"
              :key="index"
              class="bg-white flex flex-col lg:flex-row items-center lg:items-center border-b-2 border-dashed lg:p-0 pb-5 lg:border-0 m-7"
            >
              <img
                :src="event.image"
                alt=""
                class="image-event mb-4 lg:mb-0 lg:mr-6"
              />
              <div class="text-center lg:text-left">
                <p class="text-[#152123] lg:text-xl font-medium text-base">
                  {{ event.title }}
                </p>
                <p class="text-[#5E5F61] font-normal lg:text-sm text-xs">
                  {{ event.date }}
                </p>
              </div>
            </div>
          </div>
        </main>

        <div class="flex justify-center mt-6 space-x-4">
          <p
            v-for="(page, index) in totalPages"
            :key="index"
            @click="currentPage = index + 1"
            :class="{
              'text-[#FF9900] text-sm font-medium cursor-pointer':
                currentPage === index + 1,
              'text-[#5E5F61] text-sm font-normal cursor-pointer':
                currentPage !== index + 1,
            }"
          >
            {{ index + 1 }}
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";

const events = ref([
  {
    image:
      "https://assets.avanihotels.com/image/upload/q_auto,f_auto,c_limit,w_1045/media/minor/avani/images/luang-prabang/playing/avani_luang_prabang_kuang_si_waterfalls_984x532.jpg",
    title: "다양한 액티비를 즐길 수 있는 라오스",
    date: "2020.02.02 ~ 2020.02.02",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661916287718-edb15703cbaf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFvc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "다양한 액티비를 즐길 수 있는 라오스",
    date: "2020.02.02 ~ 2020.02.02",
  },
  {
    image:
      "https://vanillalagoon.com/wp-content/uploads/2021/03/11-1024x768.jpg",
    title: "다양한 액티비를 즐길 수 있는 라오스",
    date: "2020.02.02 ~ 2020.02.02",
  },
  {
    image:
      "https://www.exoticca.com/_next/image?url=https%3A%2F%2Fuploads.exoticca.com%2Fglobal%2Fdestination%2Fpoi%2Fluang-prabang.png&w=3840&q=75",
    title: "다양한 액티비를 즐길 수 있는 라오스",
    date: "2020.02.02 ~ 2020.02.02",
  },
  {
    image:
      "https://laostravel.com/images/2020/11/Intro-Vientiane-to-Luangprabang.jpg",
    title: "다양한 액티비를 즐길 수 있는 라오스",
    date: "2020.02.02 ~ 2020.02.02",
  },
  {
    image:
      "https://i0.wp.com/laovoices.com/wp-content/uploads/2023/07/Patuxay-Monument.jpg?fit=1200%2C800&ssl=1",
    title: "다양한 액티비를 즐길 수 있는 라오스",
    date: "2020.02.02 ~ 2020.02.02",
  },
]);

const currentPage = ref(1);
const itemsPerPage = 4;

const totalPages = computed(() =>
  Math.ceil(events.value.length / itemsPerPage)
);

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return events.value.slice(start, end);
});
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 50px auto;
}

.image-event {
  width: 330px;
  height: 180px;
  object-fit: cover;
}


</style>
