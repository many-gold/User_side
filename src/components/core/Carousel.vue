<template>
  <div class='carousel-view'>
    <transition-group
      class='carousel'
      tag="div">
      <div
        v-for="slide in slides" 
        class='slide'
        :key="slide.id">
        <h4> {{ slide.title }} </h4>
      </div>
    </transition-group>
    <div class='carousel-controls'>
      <button class='carousel-controls__button__prev' @click="previous">&#10094;</button>
      <button class='carousel-controls__button__next' @click="next">&#10095;</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slides: [
        {
          title: 'I am Slide A',
          id: 1
        },
        {
          title: 'I am Slide B',
          id: 2
        },
        {
          title: 'I am Slide C',
          id: 3
        },
        {
          title: 'I am Slide D',
          id: 4
        },
        {
          title: 'I am Slide E',
          id: 5
        }
      ],
      some: []
    }
  },
  methods: {
    next () {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)
    },
    previous () {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)
    }
  }
}
</script>


<style>
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
}
.slide {
  flex: 0 0 20em;
  height: 95vh;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em dashed #000;
  transition: transform 0.3s ease-in-out;
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
.carousel-controls__button__prev{
    cursor: pointer;
        position: absolute;
        top: 50%;
        width: 2%;
        height: 62px;
        color: rgba(240, 206, 13, 0.937);
        background-color: #FFFFFF;
        font-weight: bold;
        font-size: 18px;
        transition: 0.5s ease;
        border-radius: 0 50px 50px 0;
        text-decoration: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        left: 0;
        border: none !important;
}
.carousel-controls__button__next{
     cursor: pointer;
        position: absolute;
        top: 50%;
        width: 2%;
        height: 62px;
        color: rgba(240, 206, 13, 0.937);
        background-color: #FFFFFF;
        font-weight: bold;
        font-size: 18px;
        transition: 0.5s ease;
        border-radius: 50px 0 0 50px;
        text-decoration: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 10px;
        right: 0;
        border: none !important;
}
</style>