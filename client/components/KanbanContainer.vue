<template>
  <div class="main-container">
    <div id="kanban" class="kanban-container mt-5">
      <div
        v-for="(category, idx) in categories"
        :key="idx"
        class="kanban-category-main shadow bg-white rounded"
      >
        <h4>{{ category.name }}</h4>
        <div class="kanban-category-container">
          <div
            v-for="task in filterTasks(tasks, category.id)"
            :key="task.id"
            class="kanban-category-item shadow bg-white rounded"
          >
            <div>
              <div v-if="isUpdating != task.id">
                <h6>{{ task.name }}</h6>
                <p>{{ task.description }}</p>
              </div>
              <div class="kanban-item-footer">
                <div v-if="task.CategoryId != 1" type="button" role="button" @click.prevent="goLeft(category.id, task.id)" class="fas fa-lg fa-arrow-left"></div>
                <div
                  v-if="isUpdating != task.id"
                  role="button"
                  type="button"
                  @click.prevent="preUpdateTask(category.id, task.id)"
                  class="fas fa-pencil-alt"
                ></div>
                <TaskUpdateForm
                  :updateData="task"
                  @updateTask="updateTask"
                  @cancelUpdateTask="cancelUpdateTask"
                  v-if="isUpdating == task.id"
                ></TaskUpdateForm>
                <div
                  v-if="isUpdating != task.id"
                  role="button"
                  type="button"
                  @click.prevent="deleteTask(category.id, task.id)"
                  class="fas fa-trash-alt"
                ></div>
                <div v-if="task.CategoryId != categories.length" type="button" role="button" @click.prevent="goRight(category.id, task.id)" class="fas fa-lg fa-arrow-right"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="kanban-category-main-footer">
          <div
            type="button"
            v-if="isAdding == null"
            @click="preAddTask(category.id)"
            class="add-button fas fa-lg fa-plus-circle"
          >Add card...</div>
          <TaskAddForm
            :CategoryId="category.id"
            @addTask="addTask"
            @cancelAddTask="cancelAddTask"
            v-if="isAdding == category.id"
          ></TaskAddForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskAddForm from "./task/TaskAddForm";
import axios from "axios";
import TaskUpdateForm from "./task/TaskUpdateForm";

const baseURL = `https://sunday-kanban.herokuapp.com/api`;

export default {
  name: "KanbanContainer",
  props: ["categories", "tasks"],
  components: {
    TaskAddForm,
    TaskUpdateForm
  },
  data() {
    return {
      isAdding: null,
      isUpdating: null
    };
  },
  methods: {
    goLeft(cat_id, task_id) {
      axios({
        method: "PUT",
        url: `${baseURL}/tasks/${cat_id - 1}/${task_id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.$parent.showAllTasks();
        })
        .catch(err => {
          console.log(err);
        });
    },
    goRight(cat_id, task_id) {
      axios({
        method: "PUT",
        url: `${baseURL}/tasks/${cat_id + 1}/${task_id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.$parent.showAllTasks();
        })
        .catch(err => {
          console.log(err);
        });
    },
    preAddTask(cat_id) {
      this.isAdding = cat_id;
    },
    cancelAddTask() {
      this.isAdding = null;
    },
    addTask(taskData) {
      axios({
        method: "POST",
        url: `${baseURL}/tasks/${taskData.CategoryId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: taskData
      })
        .then(result => {
          console.log(result);
          this.$parent.showAllTasks();
          this.isAdding = null;
        })
        .then(err => {
          console.log(err);
        });
    },
    filterTasks(params, id) {
      return this.tasks.filter(task => task.CategoryId == id);
    },
    deleteTask(cat_id, task_id) {
      axios({
        method: "DELETE",
        url: `${baseURL}/tasks/${cat_id}/${task_id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          // modal here
          this.$parent.showAllCategories();
          this.$parent.showAllTasks();
          this.isAdding = null;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelUpdateTask() {
      this.isUpdating = null;
      this.currentTask = null;
    },
    preUpdateTask(cat_id, task_id) {
      this.isUpdating = task_id;
    },
    updateTask(taskData) {
      axios({
        method: "PUT",
        url: `${baseURL}/tasks/${taskData.CategoryId}/${taskData.task_id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: taskData
      })
        .then(result => {
          console.log("THE RESULT ==>", result);
          console.log(
            "THE URL : ",
            `${baseURL}/tasks/${taskData.CategoryId}/${taskData.UserId}`
          );
          this.isUpdating = null;
          this.$parent.showAllTasks();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
