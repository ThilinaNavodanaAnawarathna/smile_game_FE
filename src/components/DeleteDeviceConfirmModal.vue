<template>
  <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
    <div class="confirmation-content">

      <span>Are you sure you want to delete the selected device?</span>
    </div>
    <template #footer>

      <button class="btn btn-secondary" @click="closeDeleteConfirmationModal">Cancel</button>
      <button class="btn btn-danger" type="submit" @click="deleteDevice">Delete</button>
    </template>
  </Dialog>
</template>

<script>
export default {
  name: "DeleteDeviceConfirmModal",
  data() {
    return {
      displayConfirmation: false,
    }
  },
  methods: {
    openDeleteConfirmationModal() {
      this.displayConfirmation = true;
    },
    closeDeleteConfirmationModal() {
      this.displayConfirmation = false;
    },

    deleteDevice(){
      this.$emit('delete-confirmed');
      this.closeDeleteConfirmationModal();
    }
  }
};
</script>

<style scoped>

</style>