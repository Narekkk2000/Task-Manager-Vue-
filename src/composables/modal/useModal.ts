import {ref, watch, onBeforeUnmount, onMounted} from "vue";

export const useModal = (elementId: string) => {
    const isOpen = ref<boolean>(false);

    const toggleDropdown = (event: MouseEvent) => {
        event.stopPropagation();
        isOpen.value = !isOpen.value
    };

    const handleClickOutside = (event: MouseEvent) => {
        const dropdown = document.getElementById(elementId);
        if (dropdown && !dropdown.contains(event.target as Node)) {
            isOpen.value = false;
        }
    };

    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') isOpen.value = false;
    };

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
        window.addEventListener('keydown', handleEsc)
    });
    onBeforeUnmount(() => {
        document.removeEventListener("click", handleClickOutside);
        window.removeEventListener('keydown', handleEsc)
    });
    watch(isOpen, (value) => {
        document.body.style.overflow = value ? 'hidden' : '';
    });

    return {isOpen, toggleDropdown}
}