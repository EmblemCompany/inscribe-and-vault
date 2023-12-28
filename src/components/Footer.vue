<template>
  <div class="footer">
    Emblem Vault © <span>{{ currentYear }}</span>
  </div>
</template>

<style scoped>
.footer {
  font-weight: 300;
  text-align: right;
  margin-top: auto;
  width: 100%;
  padding: 2rem 1.5rem;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>
