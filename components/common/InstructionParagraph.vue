<script setup lang="ts">
</script>

<template>
  <div>
    <h4 class="mb-[52px]">
      <slot name="title" />
    </h4>
    <p class="paragraph opacity-80">
      <slot name="text" />
    </p>
  </div>
</template>