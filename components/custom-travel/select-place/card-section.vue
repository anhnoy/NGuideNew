<template>
  <!-- Card Section -->
  <div class="md:h-[334px] md:w-full bg-white md:py-[100px] w-full">
    <div class="md:max-w-[1280px] mx-auto">
      <div
        class="grid grid-cols-2 md:gap-[80px] text-center md:grid-cols-4 p-3"
      >
        <!-- Card 1 -->
        <div class="flex flex-col items-center gap-3 md:w-[300px]">
          <img
            src="@/assets/icons/freedom.png"
            alt="자유로운 선택"
            class="md:h-[46px] md:w-12 h-[25px] w-[25px]"
          />
          <h3 class="font-bold text-[#152123] md:text-[20px] text-sm">
            자유로운 선택
          </h3>
          <p
            class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] sm:block hidden"
          >
            여행 일정을 자유롭게 선택하고 나만의<br />방식으로 설계하세요.
          </p>
          <p class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] md:hidden">
            여행 일정을 자유롭게 선택하고<br />
            나만의 방식으로 설계하세요.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="flex flex-col items-center gap-3 md:w-[300px]">
          <img
            src="@/assets/icons/custom-trip.png"
            alt="나만의 여행"
            class="md:h-[46px] md:w-12 h-[25px] w-[25px]"
          />
          <h3 class="font-bold text-[#152123] md:text-[20px] text-sm">
            나만의 여행
          </h3>
          <p
            class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] sm:block hidden"
          >
            여행지부터 일정까지 내 취향에 맞게 직 <br />접 구성할 수 있어요.
          </p>
          <p class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] md:hidden">
            여행지부터 일정까지 내 취향에<br />맞게 직접 구성할 수 있어요.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="flex flex-col items-center gap-3 md:w-[300px] mt-3">
          <img
            src="@/assets/icons/planning.png"
            alt="편리한 계획"
            class="md:h-[46px] md:w-12 h-[25px] w-[25px]"
          />
          <h3 class="font-bold text-[#152123] md:text-[20px] text-sm">
            편리한 계획
          </h3>
          <p
            class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] sm:block hidden"
          >
            클릭 몇 번으로 손쉽게 여행을 계획하고<br />
            자유롭게 조정하세요.
          </p>
          <p class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] md:hidden">
            클릭 몇 번으로 손쉽게 여행을 계<br />획하고 자유롭게 조정하세요.
          </p>
        </div>

        <!-- Card 4 -->
        <div class="flex flex-col items-center gap-3 mt-3 md:w-[300px]">
          <img
            src="@/assets/icons/experience.png"
            alt="더 나은 경험"
            class="md:h-[46px] md:w-12 h-[25px] w-[25px]"
          />
          <h3 class="font-bold text-[#152123] md:text-[20px] text-sm">
            더 나은 경험
          </h3>
          <p
            class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] sm:block hidden"
          >
            내 손으로 만드는 여행, 그만큼 특별한<br />추억이 됩니다.
          </p>
          <p class="text-[#8E8D8D] text-xs leading-6 md:text-[18px] md:hidden">
            내 손으로 만드는 여행, 그만큼<br />특별한 추억이 됩니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
