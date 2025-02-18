<template>
<!--style="position:fixed;bottom:0;-->
    <section class="container-fluid footer_section">
        <!--p>
          Copyright &copy; 2022 All Rights Reserved By
          <a href="https://tsehaybank.com.et/" style="color: rgba(240, 206, 13, 0.937)" target="_blank">Tsehay bank Sc.</a>
        </p -->
      <Footer/>
      </section>
</template>

<script>
import Footer from './Footer.vue';
export default {
components: {
    Footer,
  },
}
</script>

<style>
 

section  {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}
@media (max-width: 768px) {
  section  {
    flex-direction: column;
    align-items: center;
  }
}

</style>