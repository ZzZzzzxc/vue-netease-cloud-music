<template>
  <div class="z-input">
    <div class="prepend-wrap">
      <slot name="prepend"></slot>
    </div>
    <div class="input-wrap">
      <input
        :value="value"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :style="inputStyle"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
const INPUT_MIN_HEIGHT = 38;
const INPUT_PADDINT_TOP = 4;
const DEFAULT_TYPE = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "search",
  "submit",
  "reset",
  "tel",
  "text",
  "time",
  "url",
  "week"
];
export default {
  name: "ZInput",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    type: {
      type: String,
      validator: type => DEFAULT_TYPE.indexOf(type) > -1,
      default: "text"
    },
    value: String,
    minlength: Number,
    maxlength: Number,
    showWordLimit: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    label: String,
    prepend: String,
    append: String
  },
  data() {
    return {};
  },
  computed: {
    isFocus() {
      return this.show;
    },
    inputStyle() {
      return {
        height: `${INPUT_MIN_HEIGHT}px`,
        padding: `${INPUT_PADDINT_TOP}px 12px`
      };
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("change", e.srcElement.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.z-input {
  display: flex;
  .prepend-wrap {
  }
  .input-wrap {
    min-width: 240px;
    width: 100%;
    position: relative;
    input {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      transition: 0.3s;
      &:hover {
        border: 1px solid $grey-dark;
      }
      &:focus {
        outline: none;
        border: 1px solid #409eff;
      }
    }
  }
}
</style>
