<template>
  <div class="flex items-center justify-center mt-[16px]">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #aaaaaa;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>