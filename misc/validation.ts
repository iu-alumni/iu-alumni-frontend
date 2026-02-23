export function resetErrorMessage (reactiveValue: Ref<unknown>, reactiveError: Ref<boolean>) {
  watch(reactiveValue, () => {
    reactiveError.value = false
  }, {deep: true})
}