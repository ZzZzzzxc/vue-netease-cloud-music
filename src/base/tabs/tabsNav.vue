<script>
export default {
  name: "ZTabsNav",
  inject: ["root"],
  data() {
    return {
      activeBarWidth: 0,
      activeBarOffsetLeft: 0,
    };
  },
  computed: {
    activeBarStyle() {
      return {
        width: this.activeBarWidth,
        transform: `translateX(${this.activeBarOffsetLeft}px)`,
      };
    },
    navStyle() {
      const placement = this.root.center ? "center" : "flex-start";
      return {
        justifyContent: placement,
      };
    },
  },
  methods: {
    handleCurrentNameChange(pane) {
      this.root.currentName = pane.name;
      this.getActiveBarPosition(`ref_${pane.name}`);
    },
    getActiveBarPosition(refName) {
      const ele = this.$refs[refName];
      if (ele) {
        const { width } = window.getComputedStyle(ele);
        this.activeBarWidth = width;
        this.activeBarOffsetLeft = ele.offsetLeft;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getActiveBarPosition(`ref_${this.root.currentName}`);
    });
  },
  render() {
    return (
      <div class="z-tabs-nav-wrapper" style={this.navStyle}>
        <div class="z-tabs-nav">
          {this.root.panes.map(pane => (
            <div
              class={[
                "z-tabs-nav__item",
                this.root.currentName === pane.name
                  ? "z-tabs-nav__item__active"
                  : "",
              ]}
              onClick={() => {
                this.handleCurrentNameChange(pane);
              }}
              key={pane.name}
              ref={`ref_${pane.name}`}
            >
              {pane.label}
            </div>
          ))}
          <div class="active-bar" style={this.activeBarStyle} />
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.z-tabs-nav-wrapper {
  display: flex;
  border-bottom: 1px $grey solid;
  margin-bottom: 12px;
  .z-tabs-nav {
    display: flex;
    position: relative;
    &__item {
      margin: 0 16px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      &__active {
        color: $theme-color;
        font-weight: bold;
      }
    }
    .active-bar {
      transition: 0.3s;
      position: absolute;
      left: 0;
      bottom: -1.5px;
      height: 2px;
      background-color: $theme-color;
    }
  }
}
</style>
