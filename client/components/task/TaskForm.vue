<template>
  <form>
    <div class="form-group">
      <label for="task-name">Task Name</label>
      <input
        v-if="!isUpdating"
        v-model="task_name"
        type="text"
        class="form-control"
        id="task-name"
        disabled
      />
      <input v-if="isUpdating" v-model="task_name" type="text" class="form-control" id="task-name" />
    </div>
    <div class="form-group">
      <label for="task-description">Task Description</label>
      <textarea
        v-if="!isUpdating"
        v-model="task_description"
        class="form-control"
        id="task-description"
        rows="3"
        disabled
      ></textarea>
      <textarea
        v-if="isUpdating"
        v-model="task_description"
        class="form-control"
        id="task-description"
        rows="3"
        disabled
      ></textarea>
    </div>
    <i role="button" type="submit" @submit.prevent="updateTask" class="fas fa-edit"></i>
    <i
      role="button"
      type="submit"
      @submit.prevent="$emit('deleteTask', taskData)"
      class="fas fa-trash-alt"
    ></i>
    <i
      role="button"
      type="submit"
      @submit.prevent="$emit('doneTask', taskData)"
      class="fas fa-check-circle"
    ></i>
  </form>
</template>

<script>
export default {
  name: "TaskForm",
  props: ["task"],
  data() {
    return {
      isUpdating: false,
      taskData: {
        task_name: "",
        task_description: ""
      }
    };
  },
  methods: {
    updateTask(taskData) {
      this.$emit("updateTask", taskData);
    },
    deleteTask(taskData) {
      this.$emit("deleteTask", taskData);
    },
    doneTask(taskData) {
      this.$emit("doneTask", taskData);
    }
  }
};
</script>

<style scoped>
</style>