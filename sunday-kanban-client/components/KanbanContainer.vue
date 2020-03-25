<template>
  <div v-if="isLoggedIn" class="main-container">
    <div id="kanban" class="kanban-container mt-5">
      <div
        v-for="(category, idx) in categories"
        :key="idx"
        class="kanban-category-main shadow bg-white rounded"
      >
        <h4>{{ category.name }}</h4>
          <!-- DRAGGABLE -->
          <draggable class="kanban-category-container" :list="filterTasks(tasks, category.id)" :group="{name: 'categories'}" @end="drop">
            <transition-group tag="div" :id="category.id">
              <div
                v-for="task in filterTasks(tasks, category.id)"
                :key="task.id"
                :id="task.id"
                class="kanban-category-item shadow bg-white rounded"
              >
                <div>
                  <div v-if="isUpdating != task.id">
                    <h6>{{ task.name }}</h6>
                    <p>{{ task.description }}</p>
                  </div>
                  <div class="kanban-item-footer">
                    <div
                      v-if="task.CategoryId != 1 && isUpdating != task.id"
                      type="button"
                      role="button"
                      @click.prevent="goLeft(category.id, task.id)"
                      class="fas fa-lg fa-arrow-left"
                    ></div>
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
                    <div
                      v-if="task.CategoryId != categories.length && isUpdating != task.id"
                      type="button"
                      role="button"
                      @click.prevent="goRight(category.id, task.id)"
                      class="fas fa-lg fa-arrow-right"
                    ></div>
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
          <!-- DRAGGABLE -->
        <div class="kanban-category-main-footer">
          <div
            type="button"
            v-if="isAdding == null"
            @click="preAddTask(category.id)"
            class="add-button fas fa-lg fa-plus-circle"
          >&emsp;Add card...</div>
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
import draggable from "vuedraggable";

// Development
// const baseURL = `http://localhost:3000/api`;

// Production
const baseURL = `https://sunday-kanban.herokuapp.com/api`;

export default {
  name: "KanbanContainer",
  props: ["isLoggedIn"],
  components: {
    TaskAddForm,
    TaskUpdateForm,
    draggable
  },
  data() {
    return {
      categories: [],
      tasks: [],
      isAdding: null,
      isUpdating: null
    };
  },
  sockets: {
    connect() {
      console.log(`Socket is connected!`);
    },
    reload(data) {
      this.showAllCategories();
      this.showAllTasks();
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.showAllCategories();
      this.showAllTasks();
    }
  },
  methods: {
    drop(e) {
      const task_id = e.item.id;
      const cat_id = e.to.id;
      if (e.from.id != e.to.id) {
        axios({
          method: "PUT",
          url: `${baseURL}/tasks/${cat_id}/${task_id}`,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goLeft(cat_id, task_id) {
      axios({
        method: "PUT",
        url: `${baseURL}/tasks/${cat_id - 1}/${task_id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          console.log(result);
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
          console.log(result);
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
          // console.log(result);
          this.isAdding = null;
        })
        .then(err => {
          // console.log(err);
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
          console.log(result);
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
          console.log(result);
          this.isUpdating = null;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showAllCategories() {
      axios({
        method: "GET",
        url: `${baseURL}/categories`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          const categories = response.data.categories;
          this.categories = [...categories];
        })
        .catch(err => {
          const errMessage = err.response.data.message;
          console.log(errMessage);
        });
    },
    showAllTasks() {
      axios({
        method: "GET",
        url: `${baseURL}/tasks`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          const tasks = response.data.tasks;
          if (!tasks) {
            this.tasks = [];
          } else {
            this.tasks = [...tasks];
          }
        })
        .catch(err => {
          const errMessage = err.response.data.message;
          console.log(errMessage);
        });
    }
  }
};
</script>

<style scoped></style>