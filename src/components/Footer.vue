<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Code.Hub. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Footer styles */
.footer {
  color: #094ee2;
  font-size: 12px;
  border-top: 1px solid #e1e2f5;
  padding: 2px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white; 
}

.footer-content {
  display: flex;
  max-width: 1280px;
  margin: auto;
  padding: 0 8px;
  justify-content: center; 
}
</style>
