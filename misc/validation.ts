export function resetErrorMessage (reactiveValue: Ref<any>, reactiveError: Ref<boolean>) {
  watch(reactiveValue, () => {
    reactiveError.value = false
  }, {deep: true})
}