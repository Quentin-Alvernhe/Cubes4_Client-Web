import { defineStore } from 'pinia';
import type { Family } from '../types/Family';

interface FamilyState {
    families: Family[];
    isLoading: boolean;
}

export const useFamilyStore = defineStore({
    id: 'family',
    state: (): FamilyState => ({
        families: [],
        isLoading: false,
    }),
    actions: {
        async fetchFamilies() {
            try {
                this.isLoading = true;

                const families = await $fetch<Family[]>("http://localhost:8080/families", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching families:', error);
                this.isLoading = false;
            }
        },
    },
});