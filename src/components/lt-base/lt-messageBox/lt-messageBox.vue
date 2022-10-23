<template>
  <lt-overlay>
    <div class="lt-message-box">
      <div class="lt-message-box__header">
        <div class="lt-message-box__title">
          <span>{{ title }}</span>
        </div>

        <button class="lt-message-box__headerBtn">x</button>
      </div>

      <div class="lt-message-box__content">
        <div class="lt-message-box__container">
          <div class="lt-message-box__message">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
        </div>
        <div class="lt-message-box__input" v-if="showInput">
          <input type="text" />
        </div>
      </div>

      <div class="lt-message-box__btns">
        <lt-button v-if="showCancelButton">
          {{ cancelButtonText }}
        </lt-button>

        <lt-button v-if="showConfirmButton">
          {{ confirmButtonText }}
        </lt-button>
      </div>
    </div>
  </lt-overlay>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";

export default defineComponent({
  name: "LtMessageBox",
  props,
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./lt-messageBox.scss";
</style>
