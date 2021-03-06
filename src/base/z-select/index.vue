<template>
  <div class="z-select">
    <Popove trigger="manual" :show="show" :placement="`bottom`">
      <div class="input-wrap" :class="isFocus ? `focus` : ``">
        <input
          ref="input"
          readonly
          :value="
            !isFocus && checkedIdx !== null
              ? list[checkedIdx] && list[checkedIdx][labelName]
              : ``
          "
          @focus="onFocus"
          @blur="onBlur"
          type="text"
          :style="inputStyle"
          :placeholder="
            checkedIdx !== null
              ? list[checkedIdx] && list[checkedIdx][labelName]
              : !multiple
              ? placeholder
              : ``
          "
        />
        <div class="close-wrap" @click.stop="clearAll">
          <img :src="require(`@/assets/icon/close.png`)" />
        </div>
        <div class="mul-check-wrap" ref="checkList">
          <div
            class="check-item"
            v-for="checkedIdx in checkedList"
            :key="checkedIdx"
          >
            <div>
              {{ list[checkedIdx] && list[checkedIdx][labelName] }}
            </div>
            <div
              class="mul-check-close-wrap"
              @click.stop="clearTargetIdx(checkedIdx)"
            >
              <img :src="require(`@/assets/icon/close.png`)" />
            </div>
          </div>
        </div>
      </div>
      <template slot="content">
        <div class="list-wrap" :style="listStyle" ref="list">
          <div
            class="item"
            :class="[
              !multiple &&
              list[checkedIdx] &&
              list[checkedIdx][valueName] === item[valueName]
                ? `checked`
                : ``,
              multiple && checkedList.includes(idx) ? `checked` : ``
            ]"
            v-for="(item, idx) in list"
            :key="item[valueName]"
            @mousedown="handleCheck($event, item, idx)"
          >
            <slot name="item" :scopeSlot="item">
              {{ item[labelName] }}
            </slot>
          </div>
        </div>
      </template>
    </Popove>
  </div>
</template>

<script>
const INPUT_MIN_HEIGHT = 38;
const INPUT_PADDINT_TOP = 4;
import Popove from "../z-popover";
export default {
  name: "ZSelect",
  components: { Popove },
  props: {
    // 展示 item 名称
    labelName: {
      type: String,
      default: "label"
    },
    // item 标识符
    valueName: {
      type: String,
      default: "value"
    },
    multiple: {
      type: Boolean,
      default: false
    }, // 多选
    placeholder: {
      type: String,
      default: "请选择"
    },
    list: {
      type: Array,
      required: true
    },
    defaultIdx: {
      default: null
    }
  },
  data() {
    return {
      height: INPUT_MIN_HEIGHT,
      checkedList: [],
      checkedIdx: this.defaultIdx,
      show: false,
      listWidth: 0
    };
  },
  computed: {
    isFocus() {
      return this.show;
    },
    inputStyle() {
      const { height } = this;
      return {
        height: `${height}px`,
        padding: `${INPUT_PADDINT_TOP}px 12px`
      };
    },
    listStyle() {
      const { listWidth } = this;
      return {
        width: `${listWidth}px`
      };
    }
  },
  watch: {
    multiple(multiple) {
      if (multiple) {
        this.checkedIdx = null;
      } else {
        this.checkedList = [];
        this.height = INPUT_MIN_HEIGHT;
      }
    },
    checkedIdx(idx) {
      this.$emit("dataChange", idx);
    },
    checkedList: {
      handler(idxList) {
        this.$emit("dataChange", idxList);
        this.$nextTick(this.calcInputHeight);
      },
      deep: true
    }
  },
  methods: {
    onFocus() {
      this.show = true;
    },
    onBlur() {
      this.show = false;
    },
    calcInputHeight() {
      const [{ offsetHeight }, offset] = [
        this.$refs.checkList,
        INPUT_PADDINT_TOP * 2
      ];
      offsetHeight > INPUT_MIN_HEIGHT - offset &&
        (this.height = offsetHeight + offset);
    },
    handleCheck(e, item, idx) {
      if (!this.multiple) {
        this.checkedIdx = idx;
      } else {
        e.preventDefault(); // 多选情况下阻止 input 失焦，使列表不关闭
        const idxInList = this.checkedList.indexOf(idx);
        idxInList > -1
          ? this.checkedList.splice(idxInList, 1)
          : this.checkedList.push(idx);
      }
    },
    clearAll() {
      if (!this.multiple) {
        this.checkedIdx = null;
      } else {
        this.checkedList = [];
        this.height = INPUT_MIN_HEIGHT;
      }
    },
    clearTargetIdx(target) {
      const idxInList = this.checkedList.indexOf(target);
      this.checkedList.splice(idxInList, 1);
    }
  },
  mounted() {
    this.listWidth = this.$refs.input.offsetWidth;
  }
};
</script>

<style lang="scss" scoped>
.z-select {
  display: inline-block;
  .input-wrap {
    min-width: 80px;
    width: 100%;
    position: relative;
    input {
      @include text-ellipsis;
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      transition: 0.3s;
      &:hover {
        border: 1px solid #dcdfe6;
      }
      &:focus {
        outline: none;
        border: 1px solid #dcdfe6;
      }
    }
    .close-wrap {
      z-index: 20;
      opacity: 0;
      transition: 0.3s;
      position: absolute;
      top: 0;
      right: 8px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .mul-check-wrap {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 20px;
      .check-item {
        display: inline-block;
        position: relative;
        background-color: #f4f4f5;
        border: #e9e9eb solid;
        color: #909399;
        border-radius: 3px;
        padding: 4px 28px 4px 8px;
        margin: 2px;
        font-size: 12px;
        .mul-check-close-wrap {
          position: absolute;
          top: 0;
          right: 4px;
          height: 100%;
          cursor: pointer;
          img {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    &:hover {
      .close-wrap {
        opacity: 1;
      }
    }
  }
}
.list-wrap {
  overflow-y: auto;
  max-height: 200px;
  overflow-y: auto;
  .item {
    cursor: pointer;
    transition: 0.3s;
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 18px;
    &.checked {
      color: #409eff;
      font-weight: bold;
    }
    &:hover {
      background-color: $grey;
    }
  }
}
</style>
