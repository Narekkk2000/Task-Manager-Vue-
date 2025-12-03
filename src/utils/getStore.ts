export const getStore = async (path: string) => {
    const { useUserMessageStore } = await import(path);
}