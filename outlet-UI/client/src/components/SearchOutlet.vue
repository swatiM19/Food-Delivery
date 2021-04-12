<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Enter location</h2>
    <div>
      <input type="text"
             placeholder="Enter location"
             class="input"
             v-model.trim="location"/>
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
      location: [],
      msg: 'Welcome to Search outlet engine'
    }
  },
  methods: {
    // could not test this API properly as it was sending The provided API key is invalid. But the api was correct
    async getAddressFrom(lat, long) {
      try {
        let { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          "&key={}"
        );
        if(data.error_message) {
          console.log(data.error_message)
        } else {
          this.user.location = data.results[0].formatted_address;
          // send the latitude and longitude to server
          await OutletService.fetchOutlet({
            location: this.user.location
          });
          console.log('this.user-------', this.user);
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
  async created() {

    // just for testing purpose sending the coordinates directly to check if it is inside polygon or not.
    console.log('helllooooooo');
    let val = await OutletService.fetchOutlet({
     location: [16.3760662,48.1867045]
    });
  }

}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
