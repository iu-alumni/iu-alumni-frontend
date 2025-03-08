<script setup lang="ts">
</script>

<template>
  <div>
    <h3 class="mb-[12px]">
      <slot name="title" />
    </h3>
    <p class="paragraph opacity-80">
      <slot name="text" />
    </p>
  </div>
</template>