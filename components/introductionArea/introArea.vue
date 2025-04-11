<template>
  <div class="lg:w-[1200px] mx-auto p-6 lg:p-1 text-black">
    <p class="text-[18px] lg:text-[30px] font-bold mb-8 text-center">
      <span class="text-green-700">오</span>
      <span class="text-green-700">토</span>
      <span class="text-green-700">앤</span>
      <span class="text-green-700">투</span>
      <span class="text-green-700">어</span>와 함께해야 하는 이유
    </p>
    
    <!-- Grid container -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 py-5 lg:ml-6">
      <!-- Card 1 -->
      <div class="flex items-center gap-4 p-4 rounded-3xl lg:rounded-xl  border-r border-b  lg:w-[551px] ">
        <div class="lg:w-[100px] lg:h-[80px] w-[80px] h-[50px]">
          <img src="../../assets/icons/intro1.svg" class="lg:w-[100px] lg:h-[100px] w-[50px] h-[60px]" />
        </div>
        <div class="hidden lg:block p-2">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">현지 자회사 운영</p>
          <p class="text-[12px] lg:text-[18px] break-words">안전하고 편안하게 여행할 수 있도록 한국부터 </p>
          <p class="text-[12px] lg:text-[18px] break-words">현지까지 완벽하게 케어해 드려요</p>
        </div>
        <div class="lg:hidden">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">현지 자회사 운영</p>
          <p class="text-[12px] lg:text-[18px] break-words">안전하고 편안하게 여행할 수 있도록</p>
          <p class="text-[12px] lg:text-[18px] break-words">한국부터 현지까지 완벽하게 케어해 드려요</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="flex items-center gap-4 p-4 rounded-3xl lg:rounded-xl border-b  border-r lg:w-[551px]">
        <div class="lg:w-[100px] lg:h-[80px] w-[80px] h-[50px]">
          <img src="../../assets/icons/intro2.png" class="lg:w-[90px] lg:h-[100px] w-[50px] h-[60px]" />
        </div>
        <div class="hidden lg:block p-2">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">편리한 여행 APP 'nGuide'</p>
          <p class="text-[12px] lg:text-[18px] break-words">여행하면서 핸드폰으로 여행 일정과 관광지 정보를</p>
          <p class="text-[12px] lg:text-[18px] break-words">확인하고, 가이드와 실시간 채팅이 가능해요</p>
        </div>
        <div class="lg:hidden">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">편리한 여행 APP 'nGuide'</p>
          <p class="text-[12px] lg:text-[18px] break-words">여행하면서 핸드폰으로 여행 일정과</p>
          <p class="text-[12px] lg:text-[18px] break-words">관광지 정보를 확인하고, 가이드와</p>
          <p class="text-[12px] lg:text-[18px] break-words">실시간 채팅이 가능해요</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="flex items-center gap-4 p-4 rounded-3xl lg:rounded-xl border-b border-r lg:w-[551px]">
        <div class="lg:w-[100px] lg:h-[80px] w-[80px] h-[50px]">
          <img src="../../assets/icons/intro3.svg" class="lg:w-[100px] lg:h-[90px] w-[50px] h-[60px]" />
        </div>
        <div class="hidden lg:block p-2">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">중간 수수료 NO!</p>
          <p class="text-[12px] lg:text-[18px]">중간 마진을 최소화해서 여행 가격을 합리적으로</p>
          <p class="text-[12px] lg:text-[18px]">제공해 드려요</p>
        </div>
        <div class="lg:hidden">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">중간 수수료 NO!</p>
          <p class="text-[12px] lg:text-[18px]">중간 마진을 최소화해서 여행 가격을</p>
          <p class="text-[12px] lg:text-[18px]">합리적으로 제공해 드려요</p>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="flex items-center gap-4 p-4 rounded-3xl lg:rounded-xl border-b border-r lg:w-[551px]">
        <div class="lg:w-[100px] lg:h-[80px] w-[80px] h-[50px]">
          <img src="../../assets/icons/intro4.svg" class="lg:w-[90px] lg:h-[100px] w-[50px] h-[60px]" />
        </div>
        <div class="hidden lg:block p-2">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">우리끼리 프라이빗한 여행</p>
          <p class="text-[12px] lg:text-[18px]">낯선 사람과의 동행없이 소중한 사람들과 행복한</p>
          <p class="text-[12px] lg:text-[18px]">시간을 보낼 수 있어요</p>
        </div>
        <div class="lg:hidden">
          <p class="text-[14px] lg:text-[20px] font-semibold mb-1">우리끼리 프라이빗한 여행</p>
          <p class="text-[12px] lg:text-[18px]">낯선 사람과의 동행없이 소중한 사람들과</p>
          <p class="text-[12px] lg:text-[18px]">행복한 시간을 보낼 수 있어요</p>
        </div>
      </div>
    </div>
  </div>
</template>
