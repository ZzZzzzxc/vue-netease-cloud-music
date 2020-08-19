<script>
export default {
  name: "ZTabsPane",
  inject: ["root"],
  props: {
    lazy: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    active() {
      return this.root.currentName === this.name;
    }
  },
  mounted() {
    this.root.setPanes(this);
  },
  render() {
    const { lazy, active } = this;
    return lazy ? (
      <div style={{ display: active ? "block" : "none" }}>
        {this.$slots.default}
      </div>
    ) : active ? (
      <div>{this.$slots.default}</div>
    ) : null;
  }
};
</script>

<style lang="scss" scoped></style>
