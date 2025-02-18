<template>
<div class="row">
    <a @click="displayDemnomination" class="float">
        <font-awesome-icon icon="fa-solid fa-calculator" />
      </a>
      <div v-if="popup" class="popover__content">
      <div class="popup-header-content">
        <h6 class="font-weight-bold">
          DENOMINATION CALCULATOR
        </h6>
      </div>
      <div class="content">
 	<div style="display: flex; justify-content: end;" @click="clearInput()">
            <a class="clear-btn">
                Clear
            </a>
        </div>
        <div class="row">
          <div class="col-md-2">
            <div class="contact_form-container" style="text-align:right">
                <div v-for="(note, index) in defaultNotes" :key="index">
                  <div v-if="index === 0 ">
                    <span>{{note}}</span>
                  </div>
                  <div v-else class="mt-2">
                    <span>{{note}}</span>
                  </div>

                </div>
              </div>
          </div>
          <div class="col-md-1">
            <div class="contact_form-container">
                <div v-for="(note, index) in defaultNotes" :key="index">
                  <div v-if="index === 0 ">
                    <span>*</span>
                  </div>
                  <div v-else class="mt-2">
                    <span>*</span>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="denom-calc">
                <div>
                  <div>
                    <input type="number" v-model="notes.N_200_B.value" placeholder="0" @input="calculate" style="margin-top: 7px;">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_100_B.value" placeholder="0" @input="calculate" >
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_50_B.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_10_B.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_5_B.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_1_B.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_50_C.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_25_C.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_10_C.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_5_C.value" placeholder="0" @input="calculate">
                  </div>
                  <div >
                    <input type="number" v-model="notes.N_1_C.value" placeholder="0" @input="calculate">
                  </div>
                  <!-- <div class="mt-3">
                    <button type="submit">
                      send
                    </button>
                  </div> -->
                </div>
              </div>
          </div>
          <div class="col-md-1">
            <div class="contact_form-container">
                <div v-for="(note, index) in defaultNotes" :key="index">
                  <div v-if="index === 0 ">
                    <span>=</span>
                  </div>
                  <div v-else class="mt-2">
                    <span>=</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="contact_form-container">
                <div>
                  <div>
                    <span>{{this.notes.N_200_B.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_100_B.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_50_B.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_10_B.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_5_B.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                     <span>{{this.notes.N_1_B.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                     <span>{{this.notes.N_50_C.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_25_C.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_10_C.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_5_C.total.toFixed(2)}}</span>
                  </div>
                  <div class="mt-2">
                    <span>{{this.notes.N_1_C.total.toFixed(2)}}</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">

          </div>
          <div class="col-md-3" style="text-align: right">
              Total
          </div>
          <div class="col-md-1">
              =
          </div>
          <div class="col-md-4" style="font-weight: bold;">
            {{this.totalAmount}}
          </div>
        </div>
      </div>
      </div>
      </div>
</template>

<script>
export default {
    data() {
    return {
      totalAmount: 0,
      defaultNotes: [200, 100, 50, 10, 5, 1, 0.50, 0.25, 0.10, 0.05, 0.01],
      notes: {
        N_200_B:{
          value: '',
          total: 0
        },
        N_100_B: {
          value: '',
          total: 0
        },
        N_50_B: {
          value: '',
          total: 0
        },
        N_10_B: {
          value: '',
          total: 0
        },
        N_5_B: {
          value: '',
          total: 0
        },
        N_1_B: {
          value: '',
          total: 0
        },
        N_50_C: {
          value: '',
          total: 0
        },
        N_25_C: {
          value: '',
          total: 0
        },
        N_10_C: {
          value: '',
          total: 0
        },
        N_5_C: {
          value: '',
          total: 0
        },
        N_1_C: {
          value: '',
          total: 0
        },
      },
      popup: false
    };
  },
  methods:{
    displayDemnomination(){
      this.popup = !this.popup
    },
    clearInput(){
      this.notes.N_200_B.total = this.notes.N_100_B.total = this.notes.N_50_B.total = this.notes.N_10_B.total =
      this.notes.N_5_B.total = this.notes.N_1_B.total = this.notes.N_50_C.total = this.notes.N_25_C.total = 
      this.notes.N_10_C.total = this.notes.N_5_C.total = this.notes.N_1_C.total = 0.00;

      this.notes.N_200_B.value = this.notes.N_100_B.value = this.notes.N_50_B.value = this.notes.N_10_B.value =
      this.notes.N_5_B.value = this.notes.N_1_B.value = this.notes.N_50_C.value = this.notes.N_25_C.value = 
      this.notes.N_10_C.value = this.notes.N_5_C.value = this.notes.N_1_C.value = '';

      this.totalAmount = 0.00;
    }
  },
  computed: {
    calculate(){
      this.notes.N_200_B.total = this.notes.N_200_B.value * 200;
      this.notes.N_100_B.total = this.notes.N_100_B.value * 100;
      this.notes.N_50_B.total = this.notes.N_50_B.value * 50;
      this.notes.N_10_B.total = this.notes.N_10_B.value * 10;
      this.notes.N_5_B.total = this.notes.N_5_B.value * 5;
      this.notes.N_1_B.total = this.notes.N_1_B.value * 1;
      this.notes.N_50_C.total = this.notes.N_50_C.value * 0.5;
      this.notes.N_25_C.total = this.notes.N_25_C.value * 0.25;
      this.notes.N_10_C.total = this.notes.N_10_C.value * 0.1;
      this.notes.N_5_C.total = this.notes.N_5_C.value * 0.05;
      this.notes.N_1_C.total = this.notes.N_1_C.value * 0.01;
      this.totalAmount = this.notes.N_200_B.total + this.notes.N_100_B.total + this.notes.N_50_B.total + this.notes.N_10_B.total+
                          this.notes.N_5_B.total + this.notes.N_1_B.total + this.notes.N_50_C.total + this.notes.N_25_C.total+
                          this.notes.N_10_C.total + this.notes.N_5_C.total + this.notes.N_1_C.total ;
      this.totalAmount = this.totalAmount.toFixed(2);
    }
  },
}
</script>

<style scoped>
  .clear-btn{
    font-size: 11px;
    padding: 3px;
    border-radius: 17px;
    background: transparent;
    color: rgb(37, 91, 48);
    border: 2px solid rgb(37, 91, 48);
    width: 55px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
  .clear-btn:hover{
     border: 2px solid rgb(37, 91, 48);
     background: rgb(37, 91, 48);
     color: #FFFFFF !important;
   }
    .float{
  display: flex;
  align-items: center;
  justify-content: center;
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:rgb(37, 91, 48) !important;
	color:#FFFFFF !important;
  font-size: 25px;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
  cursor: pointer;
    }
    .float:hover{
    background:transparent;
    color: rgb(37, 91, 48);
    transition: .1s;
    border: 3px solid rgb(37, 91, 48);
    }

    .popover__title {
    font-size: 24px;
    line-height: 36px;
    text-decoration: none;
    color: rgb(228, 68, 68);
    text-align: center;
    padding: 15px 0;
    }

    /* .popover__wrapper {
    position: relative;
    margin-top: 1.5rem;
    display: inline-block;
    } */
    .popover__content {
    opacity: 100;
    position: fixed;
    top: 105px;
    right: 19px;
    transform: translate(0, 10px);
    background-color: #bfbfbf;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: 40%;
    border-radius: 10px;
    z-index: 99999;
    }
    .content{
    padding: 1.5rem;
    }
    .popover__content::after {
    position: absolute;
    z-index: -1;
    content: "";
    top: 100%;
    right: 12%;
    transform: rotate(180deg);
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #bfbfbf transparent;
    transition-duration: 0.3s;
    transition-property: transform;
    }
    .popover__wrapper:hover .popover__content {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate(0, -20px);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
    }
    .popover__message {
    text-align: center;
    }
    .denom-calc input{
    border: none;
        outline: none;
        border-bottom: 0.8px solid rgb(37, 91, 48);
        background-color: #bfbfbf;
        width: 100%;
        margin: 2.5px 0;
    }
    .popup-header-content{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: rgb(37, 91, 48);
    height: 44px;
    }
    .font-weight-bold{
        text-align: center;
        color: rgba(240, 206, 13, 0.937);
        padding: 0.7rem;
    }
</style>