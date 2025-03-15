<template>
  <div class="row">
    <a @click="displayDenomination" class="float">
      <font-awesome-icon icon="fa-solid fa-calculator" />
    </a>
    <div v-if="popup" class="popover__content">
      <div class="popup-header-content">
        <h6 class="font-weight-bold">DENOMINATION CALCULATOR<span><a  @click="popup = false" class="btn-close pe-5"></a></span></h6>
      </div>
      <div class="content">
        <div style="display: flex; justify-content: end;" @click="clearInput()">
          <a class="clear-btn">Clear</a>
        </div>
        <div class="denom-container">
          <div class="denom-item" v-for="(noteKey, index) in Object.keys(notes)" :key="index">
            <span class="denom-label">{{ defaultNotes[index] }}</span>
            <span class="denom-symbol">*</span>
            <input type="number" v-model="notes[noteKey].value" placeholder="0" @input="calculate" />
            <span class="denom-symbol">=</span>
            <span class="denom-result">{{ formatCurrency(notes[noteKey].total) }}</span>
          </div>
        </div>
        <div class="total-row">
          <div class="total-text">Total</div>
          <div class="total-value">= {{ formatCurrency(totalAmount) }}</div>
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
        N_200_B: { value: '', total: 0 },
        N_100_B: { value: '', total: 0 },
        N_50_B: { value: '', total: 0 },
        N_10_B: { value: '', total: 0 },
        N_5_B: { value: '', total: 0 },
        N_1_B: { value: '', total: 0 },
        N_50_C: { value: '', total: 0 },
        N_25_C: { value: '', total: 0 },
        N_10_C: { value: '', total: 0 },
        N_5_C: { value: '', total: 0 },
        N_1_C: { value: '', total: 0 }
      },
      popup: false
    };
  },
  methods: {
    displayDenomination() {
      this.popup = !this.popup;
    },
    clearInput() {
      Object.keys(this.notes).forEach((key) => {
        this.notes[key].value = '';
        this.notes[key].total = 0.00;
      });
      this.totalAmount = 0.00;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',  // Change to your desired currency, e.g. 'INR' for Indian Rupee
        minimumFractionDigits: 2
      }).format(value);
    }
  },
  computed: {
    calculate() {
      Object.keys(this.notes).forEach((key, index) => {
        this.notes[key].total = (this.notes[key].value || 0) * this.defaultNotes[index];
      });
      this.totalAmount = Object.values(this.notes).reduce((sum, note) => sum + note.total, 0);
    }
  }
};
</script>


<style scoped>
/* Floating button */
.float {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 65px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color:rgba(240, 206, 13, 0.937);
  color: #ffffff;
  font-size: 25px;
  border-radius: 50%;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  cursor: pointer;
}

.float:hover {
  background: transparent;
  color: rgb(37, 91, 48);
  border: 3px solid rgb(37, 91, 48);
  transition: 0.1s;
}

/* Popup Container */
.popover__content {
  position: fixed;
  top: 2%;
  bottom: 2%;
  right: 19px;
  background-color: #bfbfbf;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  width: 30%;
  border-radius: 10px;
  z-index: 99999;
  /* padding: 1.5rem; */
}

/* Popup Header */
.popup-header-content {
  background-color: rgb(37, 91, 48);
  color: rgba(240, 206, 13, 0.937);
  text-align: center;
  padding: 0.7rem;
  font-weight: bold;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  margin-bottom: 5px;
  
}

/* Clear button */
.clear-btn {
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

.clear-btn:hover {
  background: rgb(37, 91, 48);
  color: #ffffff;
}

/* Denomination Container */
.denom-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 10px 0;
}

/* Each row (label + input + result) */
.denom-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  width: 100%;
  justify-content: space-between;
}

/* Labels */
.denom-label {
  min-width: 10%;
  text-align: center;
  font-weight: bold;
}

/* Symbols */
.denom-symbol {
  font-size: 16px;
  font-weight: bold;
}

/* Input Fields */
.denom-item input {
  width: 30%;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(37, 91, 48);
  background-color: #bfbfbf;
  text-align: center;
  font-size: 14px;
  padding: 5px;
}

/* Results */
.denom-result {
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

/* Total Row */
.total-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
}

.total-text {
  font-size: 16px;
  font-weight: bold;
}

.total-value {
  font-size: 16px;
  font-weight: bold;
  color: rgb(37, 91, 48);
}
.close-btn {
  background-color: transparent;
  border: none;
  font-size: 20px; /* Size of the icon */
  color: #ff3333; /* Red color for the icon */
  cursor: pointer;
  padding: 0;
}

.close-btn:hover {
  color: #cc0000; /* Darker red on hover */
}

.font-weight-bold {
  display: flex;
  justify-content: space-between; /* Space between text and button */
  align-items: center; /* Align vertically */
}


/* Responsive */
@media (max-width: 768px) {
  .popover__content {
    width: 90%;
    right: 5%;
  }
  
  .denom-item {
    font-size: 12px;
    gap: 5px;
  }

  .denom-item input {
    width: 45px;
    font-size: 12px;
  }

  .denom-label,
  .denom-symbol,
  .denom-result {
    font-size: 12px;
    min-width: 40px;
  }
}
</style>
