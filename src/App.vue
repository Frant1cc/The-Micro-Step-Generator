<script setup lang="ts">
// App.vue 现在只作为路由视图的容器
</script>

<template>
  <router-view />
</template>

<style lang="scss">
/* 全局样式 */
@import './styles/global.scss';
</style>

<style lang="scss" scoped>
@import './styles/variables.scss';
@import './styles/mixins.scss';

main {
  @include flex-center;
  flex-direction: column;
  min-height: 100vh;
  padding: $spacing-xl;
}

.card {
  @include card-style;
  width: 100%;
  max-width: 500px;
  margin-top: $spacing-lg;
  
  input {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: $font-size-base;
    margin-bottom: $spacing-md;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
  
  button {
    @include button-style;
    margin-right: $spacing-sm;
    
    &:last-child {
      margin-right: 0;
    }
  }
}

.todo-card {
  margin-top: $spacing-xl;
  
  h2 {
    text-align: center;
    margin-bottom: $spacing-lg;
    color: $primary-color;
  }
  
  .todo-input-container {
    display: flex;
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;
    
    input {
      flex: 1;
      margin-bottom: 0;
    }
    
    .add-button {
      flex-shrink: 0;
    }
  }
  
  .todo-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-md;
    font-size: $font-size-small;
    color: #666;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0 0 $spacing-lg 0;
    
    .todo-item {
      display: flex;
      align-items: center;
      padding: $spacing-sm 0;
      border-bottom: 1px solid $border-color;
      
      &:last-child {
        border-bottom: none;
      }
      
      &.completed {
        .todo-text {
          text-decoration: line-through;
          color: #999;
        }
      }
      
      input[type="checkbox"] {
        margin-right: $spacing-md;
      }
      
      .todo-text {
        flex: 1;
        margin-right: $spacing-md;
      }
      
      .remove-button {
        @include button-style(#ff6b6b, white);
        padding: $spacing-xs $spacing-sm;
        font-size: $font-size-small;
      }
    }
  }
  
  .todo-actions {
    text-align: center;
    
    button {
      @include button-style(#ffa726, white);
    }
  }
}
</style>
