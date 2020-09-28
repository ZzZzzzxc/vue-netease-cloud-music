<template>
  <div class="z-input">
    <div class="prepend-wrap">
      <slot name="prepend"></slot>
    </div>
    <div class="fix prefix-wrap" ref="prefix" :style="prefixStyle">
      <slot name="prefix"></slot>
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
    <div class="append-wrap">
      <slot name="append"></slot>
    </div>
    <div class="fix suffix-wrap" ref="suffix" :style="suffixStyle">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
const SM_INPUT_MIN_HEIGHT = 32;
const MD_INPUT_MIN_HEIGHT = 36;
const LG_INPUT_MIN_HEIGHT = 40;
const INPUT_PADDING_TOP = 2;
const INPUT_PADDING_BOTTOM = 2;
const MIN_INPUT_PADDING_LEFT = 12;
const MIN_INPUT_PADDING_RIGHT = 12;
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
  "week",
];
export default {
  name: "ZInput",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    type: {
      type: String,
      validator: type => DEFAULT_TYPE.indexOf(type) > -1,
      default: "text",
    },
    size: {
      type: String,
      validator: type => ["md", "sm", "lg"].indexOf(type) > -1,
      default: "md",
    },
    borderRadius: {
      type: String,
      default: "3px",
    },
    value: String,
    minlength: Number,
    maxlength: Number,
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    label: String,
    prepend: String,
    append: String,
  },
  data() {
    return {
      suffixWidth: MIN_INPUT_PADDING_RIGHT,
      prefixWidth: MIN_INPUT_PADDING_LEFT,
    };
  },
  computed: {
    inputHeight() {
      const map = {
        sm: SM_INPUT_MIN_HEIGHT,
        md: MD_INPUT_MIN_HEIGHT,
        lg: LG_INPUT_MIN_HEIGHT,
      };
      return map[this.size];
    },
    isFocus() {
      return this.show;
    },
    fixStyle() {
      const { inputHeight } = this;
      return {
        height: `${inputHeight}px`,
      };
    },
    prefixStyle() {
      const { fixStyle, prefixWidth } = this;
      return { ...fixStyle, width: `${prefixWidth}px` };
    },
    suffixStyle() {
      const { fixStyle, suffixWidth } = this;
      return {
        ...fixStyle,
        width: `${suffixWidth}px`,
        right: `${suffixWidth}px`,
      };
    },
    inputStyle() {
      const { borderRadius, inputHeight, suffixWidth, prefixWidth } = this;
      return {
        height: `${inputHeight}px`,
        padding: `${INPUT_PADDING_TOP}px ${suffixWidth}px ${INPUT_PADDING_BOTTOM}px ${prefixWidth}px`,
        borderRadius,
      };
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("change", e.srcElement.value);
    },
  },
  mounted() {
    if (this.$refs.suffix) {
      this.suffixWidth = Math.max(
        this.$refs.suffix.offsetWidth,
        MIN_INPUT_PADDING_RIGHT
      );
    }
    if (this.$refs.prefix) {
      this.prefixWidth = Math.max(
        this.$refs.prefix.offsetWidth,
        MIN_INPUT_PADDING_LEFT
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.z-input {
  display: flex;
  position: relative;
  .prepend-wrap {
  }
  .input-wrap {
    min-width: 180px;
    width: 100%;
    position: relative;
    input {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #dcdfe6;
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
  .fix {
    z-index: 20;
    transition: 0.3s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .prefix-wrap {
    left: 0;
  }
  .suffix-wrap {
  }
}
</style>
