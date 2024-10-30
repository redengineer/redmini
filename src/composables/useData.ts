import { ref, provide, inject } from 'vue'

const provideKey = Symbol('provide')

export const useDataProvider = () => {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--

  provide(provideKey, { count, increment, decrement })
  console.log("%c Line:11 🌰 provideKey", "color:#2eafb0", provideKey);
  return { count, increment, decrement }
}

export const useDataInject = () => {
  console.log("%c Line:16 🍇 provideKey", "color:#fca650", provideKey);
  const data = inject<ReturnType<typeof useDataProvider>>(provideKey)
  console.log("%c Line:17 🍉 data", "color:#4fff4B", data);
  if (!data) {
    throw new Error('No provide found')
  }
  return data
}