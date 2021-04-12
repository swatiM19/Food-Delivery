<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Enter location</h2>
    <div>
      <input type="text"
             placeholder="Enter location"
             class="input"
             v-model.trim="user.location"/>
      <button @click="searchOutlet"> Submit </button>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import OutletService from "../services/OutletService";

export default {
  name: 'SearchOutlet',
  data () {
    return {
      user : {
        location: ''
      },
      msg: 'Welcome to Search outlet engine'
    }
  },
  methods: {
    async getAddressFrom(lat, long) {
      try {
        let { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          "&key={key}"
        );
        if(data.error_message) {
          console.log(data.error_message)
        } else {
          this.user.location = data.results[0].formatted_address;
          // send the latitude and longitude to server
          await OutletService.fetchOutlet({
            location: this.user.location
          });
          console.log('this.user', this.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    searchOutlet() {
      // On entering the location this api will get the latitude and longitude of the entered location.
      console.log('i m triggered');
      navigator.geolocation.getCurrentPosition(
        position => {
          this.getAddressFrom(position.coords.latitude, position.coords.longitude);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        error => {
          console.log(error.message);
        },
      )
    },
  },
  mounted() {
    // was working on autocomplete .
    // this.autocomplete = new window.google.maps.places.Autocomplete(
    //   (this.$refs.autocomplete),
    //   {types: ['geocode']}
    // );
  },

}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
