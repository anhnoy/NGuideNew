<template>
    <div class="">
        <div class="relative hidden sm:block w-full h-[180px] bg-black">
            <img src="@/assets/images/apply-private-package.png" alt="Private Package"
                class="absolute inset-0 object-cover w-full h-full" />
            <div class="absolute z-10 flex items-center gap-2 text-base text-white top-4 left-[300px]">
                <NuxtLink to="/">
                    <img src="@/assets/icons/home.png" alt="home" class="w-4 h-4" />
                </NuxtLink>
                <span>&gt;</span>
                <NuxtLink to="/private-packages">
                    <span>단독패키지 예약하기</span>
                </NuxtLink>
                <span>&gt;</span>
                <span>단독패키지 예약</span>
            </div>
            <span
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white text-[36px] font-bold z-10">
                단독패키지 예약
            </span>
        </div>

        <div
            class="h-auto md:w-[1282px] md:h-[1650px] rounded-xl md:border md:border-[#E6E6E6] md:shadow-xl mx-auto justify-center md:mt-[50px] mt-[50px]">
            <div class="md:h-3 bg-[#0EC0CB] rounded-t-xl sm:block hidden"></div>
            <div
                class="md:max-w-[550px] w-[328px] p-3 ml-3 mt-3 bg-white flex flex-col md:flex-row border-none md:border rounded-xl border-gray-200 h-[972px] md:h-[965px] md:border-white">
                <div class="bg-white md:max-w-[550px] md:ml-[60px] md:mt-[50px] md:gap-[32px]">
                    <div class="items-center hidden md:flex">
                        <img src="@/assets/icons/person_icon.png" alt="person_icon" class="w-[45px] h-[45px]" />
                        <h2 class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold ml-4 md:ml-7">
                            예약자 정보
                        </h2>
                    </div>
                    <div class="flex flex-col gap-4 pb-4 pl-4 md:hidden">
                        <h2 class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold">
                            단독패키지명
                        </h2>
                        <div class="flex flex-row items-center gap-4 rounded-xl bg-[#F6F6F6] p-4">
                            <img :src="applyStore.package.image" alt="Private package"
                                class="w-[70px] h-[70px] min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-md object-cover" />
                            <span class="text-[#152123] text-[12px] font-NotoSansKR-Regular">{{ applyStore.package.title
                                }}</span>
                        </div>

                    </div>
                    <div class="flex flex-row">
                        <div>
                            <h2 class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0">
                                예약자 성함
                            </h2>
                            <!-- Tour Group -->
                            <input id="req_group_name" v-model="applyStore.name" type="text"
                                placeholder="예약자 성함을 입력해 주세요."
                                class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7" />
                            <h2 class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0">
                                휴대폰 번호
                            </h2>
                            <!-- Tour Group -->
                            <input id="req_group_name" v-model="phone" type="text" placeholder="휴대폰 번호를 입력해 주세요."
                                class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7" />
                            <!-- Date picker -->
                            <div>
                                <h2
                                    class="sm:mb-2 text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium md:mb-5 ml-5 md:ml-0 mt-3">
                                    여행 출발 날짜
                                </h2>
                                <datePicker />
                            </div>
                            <h2
                                class="bg-[#F6F6F6] md:bg-white rounded-t-xl  sm:mb-2 mt-3 text-[#152123] text-[16px] sm:text-[16px] lg:text-[16px] font-medium md:mb-7 p-4 md:ml-0">
                                여행 인원
                            </h2>
                            <div class="hidden sm:block">
                                <div
                                    class="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:w-[550px] justify-between mx-auto">
                                    <!-- Category 1: Adults -->
                                    <div class="flex flex-col">
                                        <div
                                            class="flex flex-row md:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]">
                                            <div class="flex items-center w-[134px] h-[34px]">
                                                <img class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                                                    @click="
                                                        applyStore.adults > 0 &&
                                                        decrement('adults')
                                                        " :src="applyStore.adults > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />

                                                <p
                                                    class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]">
                                                    {{ applyStore.adults }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('adults')" src="@/assets/icons/plus.svg" />
                                            </div>
                                            <div>
                                                <p class="text-[16px] font-medium text-[#5E5F61] sm:text-center">
                                                    성인
                                                </p>
                                                <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                                                    (만 12세 이상)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Category 2: Kids -->
                                    <div class="flex flex-col">
                                        <div
                                            class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]">
                                            <div class="flex items-center w-[134px] h-[34px]">
                                                <img class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                                                    @click="
                                                        applyStore.kids > 0 &&
                                                        decrement('kids')
                                                        " :src="applyStore.kids > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]">
                                                    {{ applyStore.kids }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('kids')" src="@/assets/icons/plus.svg" />
                                            </div>
                                            <div>
                                                <p class="text-[16px] text-[#5E5F61] font-medium sm:text-center">
                                                    아동
                                                </p>
                                                <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                                                    (만 2세~만 12세 이상)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Category 3: Infants -->
                                    <div class="flex flex-col">
                                        <div
                                            class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]">
                                            <div class="flex items-center w-[134px] h-[34px]">
                                                <img class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                                                    @click="
                                                        applyStore.infants > 0 &&
                                                        decrement('infants')
                                                        " :src="applyStore.infants > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]">
                                                    {{ applyStore.infants }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('infants')" src="@/assets/icons/plus.svg" />
                                            </div>
                                            <div>
                                                <p class="text-[16px] font-medium text-[#5E5F61] sm:text-center">
                                                    유아
                                                </p>
                                                <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                                                    (만 2세 미만)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Key Age Group Selection -->
                                <div
                                    class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] md:mb-6 sm:w-[620.02px] mx-auto mt-3 md:mt-7">
                                    <div ref="desktopDropdownRef" class="relative w-[300px] z-30">

                                        <!-- Dropdown List -->
                                        <div v-if="isOpen"
                                            class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-40 max-h-[300px] overflow-auto md:w-[550px] w-[304px] md:text-base">
                                            <ul class="text-sm divide-y divide-gray-100 text-[#152123] md:text-base">
                                                <li v-for="ageGroup in ageGroups" :key="ageGroup.mg_id"
                                                    @click="selectAgeOption(ageGroup.mg_id)"
                                                    class="px-4 py-2 cursor-pointer hover:bg-gray-100" :class="{
                                                        'bg-gray-100 font-medium': selectedOption === ageGroup.mg_id,
                                                    }">
                                                    {{ ageGroup.mg_age }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Mobile Version -->
                            <div class="md:hidden">
                                <div
                                    class="bg-[#F6F6F6] rounded-b-xl grid items-center justify-center mx-auto grid-cols- 1 gap- sm:grid-cols-2 md:grid-cols-3 pb-2 pl-2">
                                    <!-- Category 1: Adults -->
                                    <div class="flex flex-col w-[280px]">
                                        <div class="flex flex-row items-center justify-between md:flex-col">
                                            <p class="text-[12px] font-medium text-[#152123] sm:text-center">
                                                성인 <span class="mb-1 text-center"> (만 12세 이상) </span>
                                            </p>

                                            <div class="flex items-center w-[122px] h-[34px]">
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="
                                                        applyStore.adults > 0 &&
                                                        decrement('adults')
                                                        " :src="applyStore.adults > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg">
                                                    {{ applyStore.adults }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('adults')" src="@/assets/icons/plus.svg" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Category 2: Kids -->
                                    <div class="flex flex-col w-[280px] mt-1">
                                        <div
                                            class="flex sm:flex-col justify-between items-center md:w-[164px] md:h-[91px]">
                                            <p class="text-[12px] text-[#5E5F61] font-medium sm:text-center">
                                                아동 (만 2세~만 12세 이상)
                                            </p>

                                            <div class="flex items-center w-[122px] h-[34px]">
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="
                                                        applyStore.kids > 0 &&
                                                        decrement('kids')
                                                        " :src="applyStore.kids > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg">
                                                    {{ applyStore.kids }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('kids')" src="@/assets/icons/plus.svg" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Category 3: Infants -->
                                    <div class="flex flex-col w-[280px] mt-1">
                                        <div class="flex items-center justify-between sm:flex-col">
                                            <p class="text-[12px] font-medium text-[#152123] sm:text-center">
                                                유아 (만 2세 미만)
                                            </p>
                                            <div class="flex items-center w-[122px] h-[34px]">
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="
                                                        applyStore.infants > 0 &&
                                                        decrement('infants')
                                                        " :src="applyStore.infants > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium rounded-lg">
                                                    {{ applyStore.infants }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('infants')" src="@/assets/icons/plus.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <div
                                class="flex rounded-xl flex-col h-[444px] w-[447px] border border-[#CFE8FD] bg-[#E9F5FF] p-4">
                                <div class="flex flex-col gap-4">
                                    <h2
                                        class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0">
                                        단독패키지명
                                    </h2>
                                    <div class="flex flex-row items-center gap-4 p-4 bg-white rounded-xl">
                                        <img :src="applyStore.package.image" alt="Private package"
                                            class="w-[84px] h-[84px] min-w-[84px] min-h-[84px] max-w-[84px] max-h-[84px] rounded-md object-cover" />

                                        <span class="text-[#152123] text-[16px] lg:text-[16px] font-medium">{{
                                            applyStore.package.title }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom panel -->
                    <div class="mt-2 ">
                        <bottomPanel />
                    </div>
                    <div class="justify-center hidden md:mt-[30px] sm:block md:flex md:w-[1200px]">
                        <button @click="handleConfirm"
                            class="md:w-[284px] md:h-[56px] bg-[#2F312A] text-white justify-center items-center rounded-[8px] text-[20px] font-medium">
                            신청하기
                        </button>
                    </div>
                </div>
            </div>
            <!-- <div
                class="sm:hidden fixed bottom-0 left-0 w-full bg-[#2F312A] h-[50px] p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50 items-center justify-center"> -->
            <button @click="handleConfirm"
                class="sm:hidden fixed bottom-0 left-0 w-full bg-[#2F312A] h-[50px] p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50 text-white flex justify-center items-center rounded-[8px] text-[16px] font-medium">
                신청하기
            </button>
            <!-- </div> -->
        </div>
        <!-- <div class="h-[60px]"></div> -->
    </div>

    <div
      class="h-auto md:w-[1282px] md:h-[1650px] rounded-xl md:border md:border-[#E6E6E6] md:shadow-xl mx-auto justify-center md:mt-[50px] mt-[50px]"
    >
      <div class="md:h-3 bg-[#0EC0CB] rounded-t-xl sm:block hidden"></div>
      <div
        class="md:max-w-[550px] w-[328px] p-3 ml-3 mt-3 bg-white flex flex-col md:flex-row border-none md:border rounded-xl border-gray-200 h-[972px] md:h-[965px] md:border-white"
      >
        <div
          class="bg-white md:max-w-[550px] md:ml-[60px] md:mt-[50px] md:gap-[32px]"
        >
          <div class="items-center hidden md:flex">
            <img
              src="@/assets/icons/person_icon.png"
              alt="person_icon"
              class="w-[45px] h-[45px]"
            />
            <h2
              class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold ml-4 md:ml-7"
            >
              예약자 정보
            </h2>
          </div>
          <div class="flex flex-col gap-4 pb-4 pl-4 md:hidden">
            <h2
              class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold"
            >
              단독패키지명
            </h2>
            <div
              class="flex flex-row items-center gap-4 rounded-xl bg-[#F6F6F6] p-4"
            >
              <img
                :src="applyStore.package.image"
                alt="Private package"
                class="w-[70px] h-[70px] min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-md object-cover"
              />
              <span
                class="text-[#152123] text-[12px] font-NotoSansKR-Regular"
                >{{ applyStore.package.title }}</span
              >
            </div>
          </div>
          <div class="flex flex-row">
            <div>
              <h2
                class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0"
              >
                예약자 성함
              </h2>
              <!-- Tour Group -->
              <input
                id="req_group_name"
                v-model="applyStore.name"
                type="text"
                placeholder="예약자 성함을 입력해 주세요."
                class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7"
              />
              <h2
                class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0"
              >
                휴대폰 번호
              </h2>
              <!-- Tour Group -->
              <input
                id="req_group_name"
                v-model="phone"
                type="text"
                placeholder="휴대폰 번호를 입력해 주세요."
                class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7"
              />
              <!-- Date picker -->
              <div>
                <h2
                  class="sm:mb-2 text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium md:mb-5 ml-5 md:ml-0 mt-3"
                >
                  여행 출발 날짜
                </h2>
                <datePicker />
              </div>
              <h2
                class="bg-[#F6F6F6] md:bg-white rounded-t-xl sm:mb-2 mt-3 text-[#152123] text-[16px] sm:text-[16px] lg:text-[16px] font-medium md:mb-7 p-4 md:ml-0"
              >
                여행 인원
              </h2>
              <div class="hidden sm:block">
                <div
                  class="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:w-[550px] justify-between mx-auto"
                >
                  <!-- Category 1: Adults -->
                  <div class="flex flex-col">
                    <div
                      class="flex flex-row md:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]"
                    >
                      <div class="flex items-center w-[134px] h-[34px]">
                        <img
                          class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                          @click="applyStore.adults > 0 && decrement('adults')"
                          :src="applyStore.adults > 0 ? minusActive : minusGray"
                        />

                        <p
                          class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]"
                        >
                          {{ applyStore.adults }}
                        </p>
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="increment('adults')"
                          src="@/assets/icons/plus.svg"
                        />
                      </div>
                      <div>
                        <p
                          class="text-[16px] font-medium text-[#5E5F61] sm:text-center"
                        >
                          성인
                        </p>
                        <p
                          class="text-xs font-normal text-[#5E5F61] mb-2 text-center"
                        >
                          (만 12세 이상)
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Category 2: Kids -->
                  <div class="flex flex-col">
                    <div
                      class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]"
                    >
                      <div class="flex items-center w-[134px] h-[34px]">
                        <img
                          class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                          @click="applyStore.kids > 0 && decrement('kids')"
                          :src="applyStore.kids > 0 ? minusActive : minusGray"
                        />
                        <p
                          class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]"
                        >
                          {{ applyStore.kids }}
                        </p>
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="increment('kids')"
                          src="@/assets/icons/plus.svg"
                        />
                      </div>
                      <div>
                        <p
                          class="text-[16px] text-[#5E5F61] font-medium sm:text-center"
                        >
                          아동
                        </p>
                        <p
                          class="text-xs font-normal text-[#5E5F61] mb-2 text-center"
                        >
                          (만 2세~만 12세 이상)
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Category 3: Infants -->
                  <div class="flex flex-col">
                    <div
                      class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]"
                    >
                      <div class="flex items-center w-[134px] h-[34px]">
                        <img
                          class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                          @click="
                            applyStore.infants > 0 && decrement('infants')
                          "
                          :src="
                            applyStore.infants > 0 ? minusActive : minusGray
                          "
                        />
                        <p
                          class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]"
                        >
                          {{ applyStore.infants }}
                        </p>
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="increment('infants')"
                          src="@/assets/icons/plus.svg"
                        />
                      </div>
                      <div>
                        <p
                          class="text-[16px] font-medium text-[#5E5F61] sm:text-center"
                        >
                          유아
                        </p>
                        <p
                          class="text-xs font-normal text-[#5E5F61] mb-2 text-center"
                        >
                          (만 2세 미만)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Key Age Group Selection -->
                <div
                  class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] md:mb-6 sm:w-[620.02px] mx-auto mt-3 md:mt-7"
                >
                  <div ref="desktopDropdownRef" class="relative w-[300px] z-30">
                    <!-- Dropdown List -->
                    <div
                      v-if="isOpen"
                      class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-40 max-h-[300px] overflow-auto md:w-[550px] w-[304px] md:text-base"
                    >
                      <ul
                        class="text-sm divide-y divide-gray-100 text-[#152123] md:text-base"
                      >
                        <li
                          v-for="ageGroup in ageGroups"
                          :key="ageGroup.mg_id"
                          @click="selectAgeOption(ageGroup.mg_id)"
                          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          :class="{
                            'bg-gray-100 font-medium':
                              selectedOption === ageGroup.mg_id,
                          }"
                        >
                          {{ ageGroup.mg_age }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Mobile Version -->
              <div class="md:hidden">
                <div
                  class="bg-[#F6F6F6] rounded-b-xl grid items-center justify-center mx-auto grid-cols- 1 gap- sm:grid-cols-2 md:grid-cols-3 pb-2 pl-2"
                >
                  <!-- Category 1: Adults -->
                  <div class="flex flex-col w-[280px]">
                    <div
                      class="flex flex-row items-center justify-between md:flex-col"
                    >
                      <p
                        class="text-[12px] font-medium text-[#152123] sm:text-center"
                      >
                        성인
                        <span class="mb-1 text-center"> (만 12세 이상) </span>
                      </p>

                      <div class="flex items-center w-[122px] h-[34px]">
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="applyStore.adults > 0 && decrement('adults')"
                          :src="applyStore.adults > 0 ? minusActive : minusGray"
                        />
                        <p
                          class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg"
                        >
                          {{ applyStore.adults }}
                        </p>
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="increment('adults')"
                          src="@/assets/icons/plus.svg"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Category 2: Kids -->
                  <div class="flex flex-col w-[280px] mt-1">
                    <div
                      class="flex sm:flex-col justify-between items-center md:w-[164px] md:h-[91px]"
                    >
                      <p
                        class="text-[12px] text-[#5E5F61] font-medium sm:text-center"
                      >
                        아동 (만 2세~만 12세 이상)
                      </p>

                      <div class="flex items-center w-[122px] h-[34px]">
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="applyStore.kids > 0 && decrement('kids')"
                          :src="applyStore.kids > 0 ? minusActive : minusGray"
                        />
                        <p
                          class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg"
                        >
                          {{ applyStore.kids }}
                        </p>
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="increment('kids')"
                          src="@/assets/icons/plus.svg"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Category 3: Infants -->
                  <div class="flex flex-col w-[280px] mt-1">
                    <div class="flex items-center justify-between sm:flex-col">
                      <p
                        class="text-[12px] font-medium text-[#152123] sm:text-center"
                      >
                        유아 (만 2세 미만)
                      </p>
                      <div class="flex items-center w-[122px] h-[34px]">
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="
                            applyStore.infants > 0 && decrement('infants')
                          "
                          :src="
                            applyStore.infants > 0 ? minusActive : minusGray
                          "
                        />
                        <p
                          class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium rounded-lg"
                        >
                          {{ applyStore.infants }}
                        </p>
                        <img
                          class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                          @click="increment('infants')"
                          src="@/assets/icons/plus.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div
                class="flex rounded-xl flex-col h-[444px] w-[447px] border border-[#CFE8FD] bg-[#E9F5FF] p-4"
              >
                <div class="flex flex-col gap-4">
                  <h2
                    class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0"
                  >
                    단독패키지명
                  </h2>
                  <div
                    class="flex flex-row items-center gap-4 p-4 bg-white rounded-xl"
                  >
                    <img
                      :src="applyStore.package.image"
                      alt="Private package"
                      class="w-[84px] h-[84px] min-w-[84px] min-h-[84px] max-w-[84px] max-h-[84px] rounded-md object-cover"
                    />

                    <span
                      class="text-[#152123] text-[16px] lg:text-[16px] font-medium"
                      >{{ applyStore.package.title }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom panel -->
          <div class="mt-2">
            <bottomPanel />
          </div>
          <div
            class="justify-center hidden md:mt-[30px] sm:block md:flex md:w-[1200px]"
          >
            <button
              @click="handleConfirm"
              class="md:w-[284px] md:h-[56px] bg-[#2F312A] text-white justify-center items-center rounded-[8px] text-[20px] font-medium"
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
      <!-- <div
                class="sm:hidden fixed bottom-0 left-0 w-full bg-[#2F312A] h-[50px] p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50 items-center justify-center"> -->
      <button
        @click="handleConfirm"
        class="sm:hidden fixed bottom-0 left-0 w-full bg-[#2F312A] h-[50px] p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50 text-white flex justify-center items-center rounded-[8px] text-[16px] font-medium"
      >
        신청하기
      </button>
      <!-- </div> -->
    </div>
    <!-- <div class="h-[60px]"></div> -->
  <!-- Inside <template> of your page -->
  <ValidationModal
    :visible="isValidationVisible"
    :message="validationMessage"
    @close="handleModalClose"
  />
  <SuccessModal :visible="showSuccess" @close="handleSuccessModalClose" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

import { useApplyPrivatePackageStore } from "@/stores/apply-private-package.store";
import "v-calendar/style.css";
import bottomPanel from "./bottomPanel.vue";
import datePicker from "./date-picker.vue";
import ValidationModal from "@/components/utils/validationModal.vue";
import SuccessModal from "@/components/utils/SuccessModal.vue";
import mainGroup from "@/services/custom-travel.service.js";
import minusActive from "@/assets/icons/minus2.png";
import minusGray from "@/assets/icons/minus1.png";
import privatePackageService from "@/services/private-package.service";

const applyStore = useApplyPrivatePackageStore();
const ageGroups = ref([]);

// Phone formatting
const phone = ref("");

// Watch for phone input changes and format
watch(phone, (newValue) => {
  const numericPhone = newValue.replace(/\D/g, "");
  let formatted = numericPhone;
  if (numericPhone.length <= 3) {
    formatted = numericPhone;
  } else if (numericPhone.length <= 7) {
    formatted = numericPhone.replace(/(\d{3})(\d+)/, "$1-$2");
  } else if (numericPhone.length === 8) {
    formatted = numericPhone.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else if (numericPhone.length === 9) {
    formatted = numericPhone.replace(/(\d{1})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (numericPhone.length === 10) {
    formatted = numericPhone.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (numericPhone.length <= 11) {
    formatted = numericPhone.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
  }

  phone.value = formatted.slice(0, 13); // max length: 13 including dashes
  applyStore.setPhone(numericPhone);
});

const desktopDropdownRef = ref(null);
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Get label from selected ID
const selectedAgeLabel = computed(() => {
  const selected = ageGroups.value.find(
    (group) => group.mg_id === selectedOption.value
  );
  return selected?.mg_age || "";
});

// This sets value to the store
const selectAgeOption = (id) => {
  selectedOption.value = id;
  isOpen.value = false;
};

const increment = (category) => {
  const currentValue = Number(applyStore[category]) || 0;
  if (currentValue < 99) {
    applyStore[`set${category.charAt(0).toUpperCase() + category.slice(1)}`](
      currentValue + 1
    );
  }
};

const decrement = (category) => {
  const currentValue = Number(applyStore[category]) || 0;
  if (currentValue > 0) {
    applyStore[`set${category.charAt(0).toUpperCase() + category.slice(1)}`](
      currentValue - 1
    );
  }
};

const selectedOption = computed({
  get: () => applyStore.selectedOption,
  set: (value) => (applyStore.selectedOption = value),
});

// Fetch main age groups on component mount
onMounted(async () => {
  const response = await mainGroup.getMainGroup();
  if (response && response.data && response.data.resp) {
    ageGroups.value = response.data.resp;
  }

  // Initialize phone formatting if there's an existing phone number
  if (applyStore.phone) {
    const numericPhone = applyStore.phone.replace(/\D/g, "");
    let formatted = numericPhone;
    if (numericPhone.length <= 3) {
      formatted = numericPhone;
    } else if (numericPhone.length <= 7) {
      formatted = numericPhone.replace(/(\d{3})(\d+)/, "$1-$2");
    } else if (numericPhone.length === 8) {
      formatted = numericPhone.replace(/(\d{4})(\d{4})/, "$1-$2");
    } else if (numericPhone.length === 9) {
      formatted = numericPhone.replace(/(\d{1})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (numericPhone.length === 10) {
      formatted = numericPhone.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (numericPhone.length <= 11) {
      formatted = numericPhone.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
    }
    phone.value = formatted.slice(0, 13);
  }
});

const isValidationVisible = ref(false);
const validationMessage = ref("");

const showValidation = (msg) => {
  validationMessage.value = msg;
  isValidationVisible.value = true;
};

const validateFields = () => {
  // Basic required fields
  if (!applyStore.name || applyStore.name.trim() === "") {
    showValidation("예약자 성함을 입력해 주세요.");
    return false;
  }

  if (!applyStore.phone || applyStore.phone.trim() === "") {
    showValidation("휴대폰 번호를 입력해 주세요.");
    return false;
  }

  // Phone number format validation (basic Korean phone number format)
  const phoneRegex = /^[0-9-+\s()]{10,15}$/;
  if (!phoneRegex.test(applyStore.phone.replace(/\s/g, ""))) {
    showValidation("올바른 휴대폰 번호 형식을 입력해 주세요.");
    return false;
  }

  if (!applyStore.startDate) {
    showValidation("여행 출발 날짜를 선택해 주세요.");
    return false;
  }

  const travelDate = new Date(applyStore.startDate);
  if (isNaN(travelDate.getTime())) {
    showValidation("올바른 여행 출발 날짜를 선택해 주세요.");
    return false;
  }

  // Check if travel date is in the future
  const today = new Date();
  if (travelDate <= today) {
    showValidation("여행 출발 날짜는 오늘 이후로 선택해 주세요.");
    return false;
  }

  if (applyStore.adults + applyStore.kids + applyStore.infants === 0) {
    showValidation("여행 인원을 선택해 주세요.");
    return false;
  }

  // At least one adult is required
  if (applyStore.adults === 0) {
    showValidation("성인 인원은 최소 1명 이상이어야 합니다.");
    return false;
  }

  // Additional fields validation
  if (!applyStore.callTime || applyStore.callTime.trim() === "") {
    showValidation("통화 가능 시간을 입력해 주세요.");
    return false;
  }

  if (!applyStore.flight || applyStore.flight.trim() === "") {
    showValidation("항공편 정보를 입력해 주세요.");
    return false;
  }

  if (!applyStore.email || applyStore.email.trim() === "") {
    showValidation("이메일 주소를 입력해 주세요.");
    return false;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(applyStore.email)) {
    showValidation("올바른 이메일 형식을 입력해 주세요.");
    return false;
  }

  // Privacy agreement validation
  if (!applyStore.privacy) {
    showValidation("개인정보 처리방침에 동의해 주세요.");
    return false;
  }

  // Package information validation
  if (!applyStore.package.title || applyStore.package.title.trim() === "") {
    showValidation("패키지 정보가 누락되었습니다.");
    return false;
  }

  return true;
};

const clearStoreData = () => {
  applyStore.setName("");
  applyStore.setPhone("");
  applyStore.setStartDate("");
  applyStore.setAdults(0);
  applyStore.setKids(0);
  applyStore.setInfants(0);
  applyStore.setCallTime("");
  applyStore.setFlight("");
  applyStore.setEmail("");
  applyStore.setInfo("");
  applyStore.setPrivacy(false);
  applyStore.setPackage("", "");
  applyStore.selectedOption = null;
};

const showSuccess = ref(false);

const handleConfirm = async () => {
  if (!validateFields()) return;

  try {
    const response = await privatePackageService.sendPrivatePackage(applyStore);
    if (response.status === 200) {
      showSuccess.value = true;
    }
  } catch (error) {
    console.error("❌ 저장 실패:", error);
    showValidation("요청 처리 중 오류가 발생했습니다.");
  }
};

const handleSuccessModalClose = () => {
  showSuccess.value = false;
  clearStoreData();
  navigateTo("/");
};

const handleModalClose = () => {
  showSuccess.value = false;
  isValidationVisible.value = false;
};

const isOpen = ref(false);

const handleClickOutside = (event) => {
  if (
    desktopDropdownRef.value &&
    !desktopDropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};
</script>

<style scoped>
.panel-scrollable-content {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  /* Allows content to scroll vertically if it exceeds max-height */

  /* --- Styles to hide the scrollbar --- */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
  scrollbar-width: none;
  /* For Firefox */
}

/* For WebKit browsers (Chrome, Safari, newer Edge) to hide scrollbar */
.panel-scrollable-content::-webkit-scrollbar {
  display: none;
}
</style>
