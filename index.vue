<template>
  <div id="app">
    <input
      type="text"
      :placeholder="placeHolder"
      :style="inputStyle"
      v-model="phone"
      @input="getFirstFourNumbers($event)"
    />
    <div class="error" v-if="errorDiv.active">
      <span>{{ errorDiv.text }}</span>
    </div>
    <div class="results" v-if="resultDiv.active">
      TELCO: {{ resultDiv.text }}
    </div>
  </div>
</template>

<script>
import { isNumber } from "util";
export default {
  props: {
    placeHolder: {
      type: String,
      default: "Enter your Phone Number"
    },
    inputStyle: {
      type: Object,
      default: function() {
        return {
          "max-width": "50%",
          padding: "5% 15%",
          "font-size": "2rem",
          "text-align": "center",
          border: "1px solid #eda900"
        };
      }
    }
  },
  data() {
    return {
      phone: "",
      errorDiv: {
        active: false,
        text: ""
      },
      loadingDiv: {
        active: false
      },
      resultDiv: {
        active: false,
        text: ""
      },
      initialLength: 4,
      phoneAndTelco: {
        "0701": "Airtel Nigeria",
        "0702": "Smile",
        "07025": "MTN Nigeria (formerly Visafone)",
        "07026": "MTN Nigeria (formerly Visafone)",
        "07027": "Multi-Links",
        "07028": "Starcomms",
        "07029": "Starcomms",
        "0703": "MTN Nigeria",
        "0704": "MTN Nigeria (formerly Visafone)",
        "0705": "Globacom",
        "0706": "MTN Nigeria",
        "0707": "ZoomMobile (formerly Reltel)",
        "0708": "Airtel Nigeria",
        "0709": "Multi-Links",
        "0802": "Airtel Nigeria",
        "0803": "MTN Nigeria",
        "0804": "Ntel",
        "0805": "Globacom",
        "0806": "MTN Nigeria",
        "0807": "Globacom",
        "0808": "Airtel Nigeria",
        "0809": "9mobile",
        "0810": "MTN Nigeria",
        "0811": "Globacom",
        "0812": "Airtel Nigeria",
        "0813": "MTN Nigeria",
        "0814": "MTN Nigeria",
        "0815": "Globacom",
        "0816": "MTN Nigeria",
        "0817": "9mobile",
        "0818": "9mobile",
        "0819": "Starcomms",
        "0909": "9mobile",
        "0908": "9mobile",
        "0901": "Airtel Nigeria",
        "0902": "Airtel Nigeria",
        "0903": "MTN Nigeria",
        "0905": "Globacom",
        "0906": "MTN Nigeria",
        "0907": "Airtel Nigeria"
      }
    };
  },
  methods: {
    /**
     * This Method gets the first four numbers of the phone number and
     * finds the related telco. Numbers that start with 070 are checked
     * after five numbers.
     */
    getFirstFourNumbers(e) {

      if (isNumber(Number(e.data))) {
        //check if first 3 numbers are 070 and allow 5 digits

        if (this.phone.length === 3 && this.phone === "070") {
          this.initialLength = 5;
        }

        if (this.phone.length === this.initialLength) {
          this.resultDiv = {
            active: false,
            text: ""
          };

          //show results
          let TELCO = this.phoneAndTelco[this.phone];

          // if there is no TELCO and length is 5, check for 4 digits
          if (!TELCO && this.initialLength === 5) {
            let numbers = this.phone.substr(0, this.phone.length - 1);
            let result = this.phoneAndTelco[numbers];

            TELCO = result ? result : "TELCO NOT FOUND";
          }

          if (!TELCO) TELCO = "TELCO NOT FOUND";

          this.resultDiv.text = TELCO;
          this.resultDiv.active = true;

          // emit TELCO as response
          this.$emit("find-telco", TELCO);

          // restore initial length
          this.initialLength = 4;

          return TELCO;
        }
      } else {
        this.errorDiv = {
          active: true,
          text: "Only numbers will be used!"
        };
        // Turn the visibility of the errorDiv off after 3 seconds(3000 milliseconds)
        setTimeout(() => {
          this.errorDiv = {
            active: false,
            text: ""
          };
        }, 3000);
      }
    }
  }
};
</script>

<style>
.error span {
  color: red;
}

.results {
  margin-top: 5px;
  font-weight: bolder;
}
</style>
