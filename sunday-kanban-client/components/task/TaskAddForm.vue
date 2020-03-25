<template>
  <form @submit.prevent="addTask">
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
    <button class="btn btn-primary" type="submit">Add Task</button>
    <button class="btn btn-secondary" type="button" @click.prevent="cancelAddTask">Cancel</button>
  </form>
</template>

<script>
export default {
  name: "TaskAddForm",
  props: ["CategoryId"],
  data() {
    return {
      taskData: {
        task_name: "",
        task_description: "",
        CategoryId: this.CategoryId
      }
    };
  },
  methods: {
    addTask() {
      this.$emit('addTask', this.taskData);
    },
    cancelAddTask() {
      this.$emit('cancelAddTask');
    }
  }
};
</script>

<style scoped>
</style>