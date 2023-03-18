<template>
  <div >
    <button class="btn btn-primary"  @click="openModal">openModal</button>
    <button class="btn btn-primary"  @click="showConfirmModal">openModal</button>
    <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '50vw'}">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <template #footer>
        <button class="btn btn-danger"   @click="closeModal">Cancel</button>
        <button class="btn btn-primary"   @click="closeModal">Save</button>
      </template>
    </Dialog>

    <delete-device-confirm-modal
      ref="deleteConfirmModal"
      @delete-confirmed=""
    />
  </div>
</template>

<script>
import DeleteDeviceConfirmModal from "@/components/DeleteDeviceConfirmModal";

export default {
  name: "Testing",
  components: { DeleteDeviceConfirmModal },
  data() {
    return {
      displayModal: false,
    };
  },
  methods: {
    openModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },

    showConfirmModal() {
      this.$refs["deleteConfirmModal"].openDeleteConfirmationModal();
    },
  }
};
</script>

<style scoped>
.p-button {
  margin: 0.3rem 0.5rem;
  min-width: 10rem;
}

p {
  margin: 0;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-dialog .p-button {
  min-width: 6rem;
}
</style>