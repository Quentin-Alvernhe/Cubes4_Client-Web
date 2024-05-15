// showToast.ts

import type { NotificationColor } from "@nuxt/ui/dist/runtime/types";

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
})


export const showToast = (typeToast: string, title: string, timeout: number = 1000) => {
    const toast = useToast();
    let iconToast: string;
    let colorToast: string;

    switch (typeToast) {
        case "success":
            iconToast = 'i-heroicons-check-circle';
            colorToast = 'green';
            break;

        case "fail":
            iconToast = 'i-mdi-alert-circle';
            colorToast = 'red';
            break;

        default:
            // Handle unexpected toast types here
            iconToast = 'i-default-icon';
            colorToast = 'default-color';
            break;
    }

    toast.add({
        title,
        timeout,
        icon: iconToast,
        color: colorToast as NotificationColor
    });
}
