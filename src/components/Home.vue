<template>
	<SideBar />
  <div class="jumbotron pt-5">
    <div class="container" style="background-color: rgb(216, 224, 221);">
      <h1>Welcome</h1>
      <p>Contents ...</p>
      <p>
        <a class="btn btn-primary btn-lg">Learn more</a>
      </p>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Home',
  components: {
    SideBar
  }
}
</script>
