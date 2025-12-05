import {defineStore} from "pinia";
import { ref, computed } from "vue";
import {fetchProfile} from "@/api/profile";
import { ProfileUser } from '../src/interfaces/AuthResponse';


export const useUserStore = defineStore("user", () => {
    const user = ref<ProfileUser | null>(null);
    const authState = ref<'login' | 'register' | ''>('')
    const loading = ref<boolean>(false);

    const setUser = (userData: ProfileUser | null) => {
        user.value = userData;
    };


    const showLoginModal = computed(() => authState.value === 'login');
    const showRegisterModal = computed(() => authState.value === 'register');
    const setAuthState = (state: 'login' | 'register' | '') => {
        authState.value = state
    }
    const clearUser = () => (user.value = null);
    const setLoading = (state: boolean) => (loading.value = state);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response: any = await fetchProfile();
            setUser(response.user);
            console.log(response);
        } catch (error: unknown) {
            if (error instanceof Error) console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        authState,
        loading,
        showLoginModal,
        showRegisterModal,
        setUser,
        setAuthState,
        clearUser,
        setLoading,
        fetchUser
    };
});