<template>
  <div class="container">
    <div class="pt-5">

      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>


      <div class="card">
        <div class="card-header">

          <div class="row">
            <div class="col-6">
              <h3>All Devices</h3>
            </div>

            <div class="col-6 text-end">
              <button class="btn btn-primary" @click="createDeviceRequest">Create Device</button>
            </div>
          </div>

        </div>
        <div class="card-body">
          <table class="table table-striped">

            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(device,key) in deviceList" :key="key">
              <th scope="row">{{ key + 1 }}</th>
              <td>{{ device.name }}</td>
              <td>{{ `$ ${device.price}` }}</td>
              <td>{{ device.deviceType }}</td>
              <td>{{ new Date(device.createTime).toLocaleDateString() }}</td>
              <td>
                <button class="btn btn-primary me-1" @click="editDeviceRequest(device)">Edit</button>
                <button class="btn btn-danger" @click="deleteDeviceRequest(device, key)">Delete</button>
              </td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
  <device-modal
    ref="deviceModal"
    @saved="deviceSaved"
    :selected-device="selectedDevice"
  />

  <delete-device-confirm-modal
    ref="deleteConfirmModal"
    @delete-confirmed="deleteDevice"
  />
</template>

<script>
import DeviceService from "@/services/device.service";

import DeviceModal from "@/components/Device";
import DeleteDeviceConfirmModal from "@/components/DeleteDeviceConfirmModal";

import Device from "@/models/device";
import { nextTick } from "vue";

export default {
  name: "Admin",
  components: { DeviceModal, DeleteDeviceConfirmModal },
  data() {
    return {
      deviceList: [],
      selectedDevice: new Device(),
      errorMessage: "",
      selectedIndex: undefined,
    };
  },
  mounted() {
    DeviceService.getAllDevices().then((response) => {
      this.deviceList = response.data;
    });
  },
  methods: {
    createDeviceRequest() {
      this.selectedDevice = new Device();
      this.$refs["deviceModal"].showDeviceModal();
    },

    editDeviceRequest(device) {
      this.selectedDevice = Object.assign({}, device);

      // make sure pre-data is ready.
      nextTick(() => {
        this.$refs["deviceModal"].showDeviceModal();
      });

    },

    deviceSaved(device) {
      const itemIndex = this.deviceList.findIndex(item => item.id === device.id);

      if (itemIndex !== -1) {
        this.deviceList[itemIndex] = device;
      } else {
        this.deviceList.push(device);
      }
    },

    deleteDeviceRequest(device, index){
      this.selectedDevice = device;
      this.selectedIndex = index;

      nextTick(() => {
        this.$refs['deleteConfirmModal'].openDeleteConfirmationModal();
      })
    },

    deleteDevice() {

      DeviceService.deleteDevice(this.selectedDevice.id).then(() => {
        this.deviceList.splice(this.selectedIndex, 1);
      }).catch((err) => {
        console.log(err);
        this.errorMessage = "Unexpected error occurred.!";
      });
    }
  }
};
</script>

<style scoped>

</style>