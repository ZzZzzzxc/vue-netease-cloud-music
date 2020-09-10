<template>
  <div class="z-input">
    <input :type="type" />
  </div>
</template>

<script>
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
  props: {
    type: {
      type: String,
      validator: type => DEFAULT_TYPE.indexOf(type) > -1,
      default: "text",
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
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
