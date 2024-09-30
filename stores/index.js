import { defineNuxtStore } from "@/.nuxt/composition-api";
import { useBannerStore } from "@/banner.store";
import { useFaqStore } from "@/stores/faq.store";
import { useTourStore } from "@/stores/tour.store";

export default defineNuxtStore(() => ({
  BannerStore: useBannerStore(),
  TourStore: useTourStore(),
  FaqStore: useFaqStore(),
}));
