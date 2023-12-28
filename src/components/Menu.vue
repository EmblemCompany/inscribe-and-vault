<template>
  <div class="menu" :class="{ 'menu-open': isMenuOpen && isMobile }">
    <div class="logo">
      <img src="/images/favicon/favicon-32x32.png" alt="Logo" />
      <button class="burger-menu" @click="isMenuOpen = !isMenuOpen" v-if="isMobile">☰</button>
    </div>
    <div class="links" :class="{ visible: isMobile ? isMenuOpen : true }">
      <router-link class="link" to="/">Inscriptions</router-link>
      <router-link class="link" to="/create-inscription">Create inscription</router-link>
    </div>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  flex-direction: row;
  min-height: 3rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #22252e 100%, #2f303a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
}
.menu-open {
  height: 100%;
}
.menu .logo {
  display: flex;
  align-items: center;
  align-content: center;
}
.menu .logo img {
  height: 1.5rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
}
.menu .links {
  display: flex;
  flex-direction: row;
  margin-right: auto;
  align-items: center;
}
.menu .link {
  color: rgba(255, 255, 255, 0.5);
  background: linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  padding: 0.7rem 1.2rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.menu .link:hover {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
}
.menu .link.router-link-active {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Styles for mobile menu */
@media screen and (max-width: 768px) {
  .menu {
    flex-direction: column;
    align-items: flex-start;
  }
  .menu .logo {
    width: 100%;
  }
  .menu .logo img {
    margin-left: 0;
  }
  .menu .links {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    display: none;
    margin-top: 0.5rem;
    margin-left: 0;
  }
  .menu .link {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
  .menu .link:last-child {
    margin-bottom: 0;
  }

  .burger-menu {
    display: block;
    margin-left: auto;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .links.visible {
    display: flex;
  }
}

.burger-menu:hover {
  color: #fff;
}
</style>

<script>
export default {
  data() {
    return {
      isMobile: false,
      isMenuOpen: false,
    }
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768
    })
  },
}
</script>
