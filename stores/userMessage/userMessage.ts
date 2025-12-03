import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserMessageStore = defineStore("user-message", () => {
    const showSuccessMessage = ref<boolean>(false);
    const message = ref<string>('');

    const openMessage = (msg: string) => {
        showSuccessMessage.value = false; // reset
        message.value = msg;
        setTimeout(() => {
            showSuccessMessage.value = true;
        });
    };

    const closeMessage = () => {
        showSuccessMessage.value = false;
        message.value = '';
    }

    return {
        showSuccessMessage,
        message,
        openMessage,
        closeMessage
    }
});