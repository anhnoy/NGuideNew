import { defineNuxtStore } from "@/.nuxt/composition-api";
import { useBannerMainStore } from "@/bannermain.store";
import { useFaqStore } from "@/stores/faq.store";
import { useTourStore } from "@/stores/tour.store";

export default defineNuxtStore(() => ({
  BannerMainStore: useBannerMainStore(),
  TourStore: useTourStore(),
  FaqStore: useFaqStore(),
}));
