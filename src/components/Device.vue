<template xmlns="http://www.w3.org/1999/html">
  <div>
    <Dialog header="Device Details" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '30vw'}" :modal="true">
      <form @submit.prevent="saveDevice" novalidate :class="submitted ? 'was-validated' : ''">

        <div class="alert alert-danger" v-if="errorMessage">
          <strong>Error!</strong>
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="device.name"
            type="text"
            id="name"
            class="form-control"
            name="name"
            placeholder="Name"
            required>
          <div class="invalid-feedback">
            Name is required.
          </div>
        </div>

        <div class="form-group">
          <label for="price">Price</label>
          <input
            v-model="device.price"
            type="number"
            id="price"
            class="form-control"
            name="price"
            placeholder="Price"
            min="1"
            step="any"
            required>
          <div class="invalid-feedback">
            Price is required should be greater than 0.
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="device.description"
            type="text"
            id="description"
            class="form-control"
            name="description"
            placeholder="description"
            required />
          <div class="invalid-feedback">
            Description is required.
          </div>
        </div>

        <div class="form-group">
          <label for="type">Type</label>
          <select
            v-model="device.deviceType"
            name="type"
            id="type"
            class="form-select"
            required
          >
            <option value="" selected>Select Device Type</option>
            <option v-for="(type, key) in deviceTypes" :key="key" :value="type">
              {{ type }}
            </option>
          </select>
          <div class="invalid-feedback">
            Device Type is required.!
          </div>
        </div>

      </form>


      <template #footer>
        <button class="btn btn-secondary" @click="closeDeviceModal">Cancel</button>
        <button class="btn btn-primary" type="submit" @click="saveDevice">Save</button>

      </template>
    </Dialog>
  </div>
</template>

<script>
//Composition API
import { ref } from "vue";
import DeviceType from "@/models/device-type";
import Device from "@/models/device";
import DeviceService from "@/services/device.service";

// //Options API imports
// import Device from "@/models/device";
// import DeviceType from "@/models/device-type";
// import DeviceService from "@/services/device.service";

export default {
  name: "device-modal",
  props: {
    selectedDevice: { type: Object }
  },

  setup(props, context) {
    const device = ref(new Device());
    const errorMessage = ref("");
    const submitted = ref(false);
    const deviceTypes = ref([DeviceType.DESKTOP, DeviceType.LAPTOP, DeviceType.PHONE, DeviceType.TABLET]);
    const displayModal = ref(false);

    const saveDevice = () => {
      submitted.value = true;

      if (!device.value.name || !device.value.price || !device.value.description || !device.value.deviceType) {
        return;
      }
      DeviceService.saveDevice(device.value).then(response => {
        console.log(response.data);
        context.emit("saved", response.data);
        closeDeviceModal();
      }).catch((err) => {
        console.log(err);
        errorMessage.value = "Unexpected Error occurred.!!";
      });
    };

    const showDeviceModal = () => {
      //Props are immutable objects we can not use them directly in the form.
      device.value = Object.assign({}, props.selectedDevice);
      displayModal.value = true;
    };

    const closeDeviceModal = () => {
      displayModal.value = false;
    };

    return {
      device,
      errorMessage,
      deviceTypes,
      displayModal,
      submitted,
      saveDevice,
      showDeviceModal,
      closeDeviceModal
    };
  }

  /* //Options API

  data() {
    return {
      device: new Device(),
      errorMessage: "",
      submitted: false,
      deviceTypes: [DeviceType.DESKTOP, DeviceType.LAPTOP, DeviceType.PHONE, DeviceType.TABLET],
      displayModal: false
    };
  },

  methods: {

    saveDevice() {
      this.submitted = true;
      console.log("clicked");
      if (!this.device.name || !this.device.price || !this.device.description || !this.device.deviceType) {
        return;
      }
      DeviceService.saveDevice(this.device).then(response => {
        console.log(response.data);
        this.$emit("saved", response.data);
        this.closeDeviceModal();
      }).catch((err) => {
        console.log(err);
        this.errorMessage = "Unexpected Error occurred.!!";
      });
    },

    showDeviceModal() {
      //Props are immutable objects we can not use them directly in the form.
      this.device = Object.assign({}, this.selectedDevice);
      this.displayModal = true;
    },
    closeDeviceModal() {
      this.displayModal = false;
    }

  }

  */
};
</script>

<style scoped>

</style>