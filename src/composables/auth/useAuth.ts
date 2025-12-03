import {useRouter} from "vue-router";
import {useUserStore} from "../../../stores/user";
import {useTaskStore} from "../../../stores/taskStore";
import {register, login, logout, resetPassword} from "@/api/auth";
import {useValidation} from "@/composables/auth/useValidation";
import {clearFormData} from "@/utils/clearFormData";
import {RegisterFormData, LoginFormData, ResetPasswordFormData} from "@/interfaces/auth";
import {AuthResponse} from "../../interfaces/AuthResponse";


export const useAuth = () => {
    const userStore = useUserStore();
    const tasksStore = useTaskStore();
    const router = useRouter();
    const {
        errors,
        validateRegister,
        validateLogin,
        setServerErrors,
        clearErrors
    } = useValidation()

    const handleRegister = async (formData: RegisterFormData) => {
        if (!validateRegister(formData)) return
        userStore.setLoading(true)
        try {
            const response: AuthResponse = await register(formData);
            await userStore.fetchUser();
            clearErrors();
            clearFormData(formData);
            console.log('register', response);
            userStore.setAuthState('');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                try {
                    const errorData = JSON.parse(error.message);
                    if (errorData.errors) {
                        setServerErrors(errorData.errors);
                    }
                } catch {
                    console.log('Non-JSON error:', error.message);
                }
            }
        } finally {
            userStore.setLoading(false)
        }
    }
    const handleLogin = async (formData:LoginFormData) => {
        if (!validateLogin(formData)) return
        userStore.setLoading(true)
        try {
                const response: AuthResponse = await login(formData);
                await userStore.fetchUser();
                await tasksStore.fetchTasks()
                clearErrors();
                clearFormData(formData)
                userStore.setAuthState('')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Login error:', error.message);
                try {
                    const errorData = JSON.parse(error.message);
                    if (errorData.errors) {
                        setServerErrors(errorData.errors);
                    } else if (errorData.message) {
                        errors.value.password = errorData.message;
                    }
                } catch {
                    if (error.message.includes('Unauthorized') || error.message.includes('Invalid credentials')) {
                        errors.value.password = 'Invalid email or password';
                    } else {
                        console.log('Non-JSON error:', error.message);
                    }
                }
            }
        } finally {
            userStore.setLoading(false)
        }
    }

    const handeLogout = async () => {
        try {
            await logout();
            userStore.clearUser();
            tasksStore.clearTasks()
            await router.push('/');
        } catch (error: unknown) {
            if (error instanceof Error) console.log(error.message);
        }
    }

    const handleResetPassword = async (formData:ResetPasswordFormData) => {
        try {
            const response = await resetPassword(formData);
            console.log(response);
        } catch (error) {
            console.error(error);
            clearFormData(formData)
        }
    }
        return {
            errors,
            handleRegister,
            handleLogin,
            handeLogout,
            handleResetPassword
        } as const;
    }