<template>  
  <div class="sm:w-[840px] w-[360px] mx-auto px-4 sm:px-0">    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">      
      <div class="flex items-center">        
        <label class="label">관광 단체명:</label>        
        <p class="content">{{ quoteDetails?.quo?.req?.req_group_name ?? '-' }}</p>      
      </div>      
      <div class="flex items-center">        
        <label class="label">성함:</label>        
        <p class="content px-2 py-2">{{ quoteDetails?.quo?.req?.req_book_name ?? '-' }}</p>      
      </div>    
    </div>     

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">      
      <div class="flex items-center">        
        <label class="label">이메일:</label>        
        <p class="content">{{ quoteDetails?.quo?.req?.req_book_email ?? '-' }}</p>      
      </div>      
      <div class="flex items-center">        
        <label class="label">핸드폰 번호:</label>        
        <p class="content px-2 py-2">{{ quoteDetails?.quo?.req?.req_book_phone ?? '-' }}</p>      
      </div>    
    </div>     

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">      
      <div class="flex items-center">        
        <label class="label">인원:</label>        
        <p class="content">{{ sumNumberPeople(quoteDetails?.quo?.req?.req_adults, quoteDetails?.quo?.req?.req_kids, quoteDetails?.quo?.req?.req_infant) }}</p>      
      </div>      
      <div class="flex items-center">        
        <label class="label">주요 연령대:</label>        
        <p class="content px-2 py-2">{{ quoteDetails?.quo?.req?.req_main_group_main_group?.mg_age ?? '-' }} Year</p>      
      </div>    
    </div>     

    <div class="grid grid-cols-1 py-2">      
      <div class="flex items-center">        
        <label class="w-[142px] text-[#132d5c]">여행 일정:</label>        
        <p class="contentOne h-[48px] flex items-center">{{ quoteDetails?.quo?.req?.req_depart ?? '-' }} ~ {{ quoteDetails?.quo?.req?.req_arr ?? '-' }}</p>      
      </div>    
    </div>     

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">      
      <div class="flex items-center">        
        <label class="label">여행 목적:</label>        
        <p class="content">{{ quoteDetails?.quo?.req?.goal_selecteds?.[0]?.gid_tour_goal?.g_name_kr ?? '-' }}</p>      
      </div>      
      <div class="flex items-center">        
        <label class="label">희망 테마:</label>        
        <p class="content px-2 py-2">{{ quoteDetails?.quo?.req?.theme_selecteds?.[0]?.th?.theme_name_kr ?? '-' }}</p>      
      </div>    
    </div>     

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">      
      <div class="flex items-center">        
        <label class="label">희망 출발 시간:</label>        
        <p class="content">{{ quoteDetails?.quo?.req?.req_depart_period_tourism_period?.tp_name_kr ?? '-' }}</p>      
      </div>      
      <div class="flex items-center">        
        <label class="label">희망 도착 시간:</label>        
        <p class="content px-2 py-2">{{ quoteDetails?.quo?.req?.req_arr_period_tourism_period?.tp_name_kr ?? '-' }}</p>      
      </div>    
    </div>     

    <div class="grid grid-cols-1 py-2">      
      <div class="flex items-start">        
        <label class="w-[140px] text-[#132d5c]">여행 희망 사항:</label>        
        <p class="contentOne min-h-[110px] flex items-start">{{ quoteDetails?.quo?.req?.req_opt ?? '-' }}</p>      
      </div>    
    </div>  
  </div> 
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  }
});

// Function to sum the number of people
function sumNumberPeople(adults = 0, kids = 0, infant = 0) {
  return (adults || 0) + (kids || 0) + (infant || 0);
}
</script>


<style>
.label {
  color: #132d5c;
  margin-right: 2px;
  width: 31%;
  font-size: 16px;
  text-align: start;
}

.content {
  color: #5e5f61;
  background-color: #EDEDF2;
  border-radius: 4px;
  padding: 9px;
  font-size: 16px;
  width: 70%;
  min-height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;             
  white-space: nowrap; 
  text-overflow: ellipsis;     
}


.labelOne {
  color: #132d5c;
  font-size: 16px;
  margin-right: 2px;
  width: 15%;
}

.contentOne {
  color: #5e5f61;
  background-color: #EDEDF2;
  border-radius: 4px;
  padding: 9px;
  font-size: 16px;
  width: 94%;
}
@media (max-width: 640px) {
  .contentOne {
    width: 85%;
  }
}
</style>
