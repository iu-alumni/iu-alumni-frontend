<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/store/counter";

const counter = useCounterStore();
</script>

<template>
    <p>Count: {{ counter.count }}</p>
    <Button @click="counter.increment">Click me</Button>
</template>
