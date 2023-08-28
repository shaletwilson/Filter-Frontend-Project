<template>
  <!-- <nav> -->
    <!-- <router-link to="/sign-up">SignUP</router-link> |
    <router-link to="/log-in">Login</router-link> -->
  <!-- </nav> -->
  <router-view/>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$store.state.isAuthenticated);
    this.$store.commit('initializeStore');
    localStorage.setItem("is_expanded", false)
  }
}
</script>

<style lang="scss">
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
	--primary: #06AEE2;
  --primary-transparent: #06afe229; 
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #0B1F3E;
  --dark-transparent: #0b1f3e3b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
