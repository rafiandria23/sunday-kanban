<template>
  <form @submit.prevent="updateTask">
    <div class="form-group">
      <label for="task-name">Task Name</label>
      <input v-model="taskData.task_name" type="text" class="form-control" id="task-name" />
    </div>
    <div class="form-group">
      <label for="task-description">Task Description</label>
      <textarea
        v-model="taskData.task_description"
        class="form-control"
        id="task-description"
        rows="3"
      ></textarea>
    </div>
    <button class="btn btn-primary" type="submit">Update Task</button>
    <button class="btn btn-secondary" @click.prevent="cancelUpdateTask" type="button">Cancel</button>
  </form>
</template>

<script>
export default {
  name: "TaskUpdateForm",
  props: ["updateData"],
  data() {
    return {
      taskData: {
        task_id: this.updateData.id,
        task_name: this.updateData.name,
        task_description: this.updateData.description,
        CategoryId: this.updateData.CategoryId,
        UserId: this.updateData.UserId
      }
    };
  },
  methods: {
    updateTask() {
      this.$emit('updateTask', this.taskData);
    },
    cancelUpdateTask() {
      this.$emit('cancelUpdateTask');
    }
  }
};
</script>

<style scoped>
</style>