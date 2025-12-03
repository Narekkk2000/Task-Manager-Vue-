import {onBeforeUnmount, onMounted, ref} from "vue";

export const useDropDown = (elementId: string) => {
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

    onMounted(() => document.addEventListener("click", handleClickOutside));
    onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

    return {isOpen, toggleDropdown}
}