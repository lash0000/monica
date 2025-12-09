import { create } from 'zustand';
import axios from 'axios';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useAnalyticsStore = create((set) => ({
  // State
  aiReviews: [],
  reviewCount: 0,
  isLoadingReviews: false,
  reviewError: null,

  // Action
  getAIReview: async () => {
    set({ isLoadingReviews: true, reviewError: null });
    
    try {
      const access_token = localStorage.getItem('access_token');
      
      if (!access_token) {
        throw new Error('No access token found');
      }

      const response = await axios.get(
        `${SOCKET_URL}/api/v1/data/ai/reviews`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );

      set({
        aiReviews: response.data.data,
        reviewCount: response.data.count,
        isLoadingReviews: false,
        reviewError: null
      });

      return response.data;
    } catch (error) {
      set({
        isLoadingReviews: false,
        reviewError: error.response?.data?.message || error.message
      });
      throw error;
    }
  }
}));

export default useAnalyticsStore;
