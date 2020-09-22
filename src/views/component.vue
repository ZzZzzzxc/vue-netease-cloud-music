<template>
  <div class="page-wrap">
    <Menu
      @active-change="activeChange"
      :router="false"
      menuClass="menu-wrap"
      :defaultActive="activeMenuIdx"
    >
      <MenuItemGroup title="MenuItemGroup">
        <MenuItem index="1">MenuItem_1</MenuItem>
        <MenuItem index="2" :disable="true">MenuItem_2</MenuItem>
        <MenuItem index="3">MenuItem_3</MenuItem>
      </MenuItemGroup>
      <SubMenu title="SubMenu" index="/">
        <MenuItem index="4">MenuItem_4</MenuItem>
        <MenuItem index="5">MenuItem_5</MenuItem>
        <MenuItem index="6">MenuItem_6</MenuItem>
      </SubMenu>
    </Menu>
    <div class="content">
      <Card>
        <template slot="header">
          这是一个卡片标题插槽，当前 Menus 为{{ activeMenuIdx }}
          <button
            @click="
              () => {
                this.dialogVisible = !this.dialogVisible;
              }
            "
          >
            打开弹出框
          </button>
        </template>
        <div class="card-content">
          这是内容插槽
          <div class="tabs-wrap">
            <Tabs v-model="activeTabsName" :center="false">
              <TabsPane :name="`轮播图`" :label="`轮播图`">
                <div class="swiper-wrap">
                  <swiper>
                    <swiper-item v-for="banner in banners" :key="banner.url">
                      <div
                        class="banner"
                        v-lazy:background-image="banner.url"
                      />
                    </swiper-item>
                  </swiper>
                </div>
              </TabsPane>
              <TabsPane :name="`加载`" :label="`加载`">
                <Loading :loading="loading" :color="`green`" :width="40">
                  <div style="height:400px;">
                    <p v-if="loading">加载中。。。需要两秒</p>
                    <p v-else>
                      加载完成
                    </p>
                  </div>
                </Loading>
              </TabsPane>
              <TabsPane :name="`进度条`" :label="`进度条`">
                <p>进度条需要一个容器</p>
                <p v-if="move" style="color:red">正在拖动进度条</p>
                <p v-else>没有拖动进度条</p>
                <p>当前进度：{{ percentage }}</p>
                <div style="width:200px;margin:20px 0">
                  <ProgressBar
                    @bar-click="barClick"
                    @moving="moving"
                    @move-stop="moveStop"
                    v-model="percentage"
                  />
                </div>
                <p>禁用的进度条</p>
                <div style="width:200px;margin:20px 0">
                  <ProgressBar v-model="unablePercentage" :disable="true" />
                </div>
              </TabsPane>
              <TabsPane :name="`分页`" :label="`分页`">
                <p>总条数：{{ page.total }}</p>
                <p>每页条数：{{ page.limit }}</p>
                <p>当前页：{{ page.current }}</p>
                <pagination
                  v-model="page.current"
                  :pagerCount="6"
                  :limit="page.limit"
                  :total="page.total"
                ></pagination>
              </TabsPane>
              <TabsPane :name="`气泡卡片`" :label="`气泡卡片`">
                <Popover trigger="click" placement="bottom">
                  <template slot="content">
                    <div style="width:300px;height:120px">
                      这是气泡卡片的内容区
                    </div>
                  </template>
                  <button>向下 click</button>
                </Popover>
                <Popover trigger="hover" placement="top">
                  <template slot="content">
                    <div style="width:300px;height:120px">
                      这是气泡卡片的内容区
                    </div>
                  </template>
                  <button>向上 hover</button>
                </Popover>
                <Popover trigger="hover" placement="right">
                  <template slot="content">
                    <div style="width:300px;height:120px">
                      这是气泡卡片的内容区
                    </div>
                  </template>
                  <button>向右 hover</button>
                </Popover>
                <Popover trigger="click" placement="left">
                  <template slot="content">
                    <div style="width:300px;height:120px">
                      这是气泡卡片的内容区
                    </div>
                  </template>
                  <button>向左 click</button>
                </Popover>
                <Popover trigger="manual" placement="left" :show="manualShow">
                  <template slot="content">
                    <div style="width:300px;height:120px">
                      这是气泡卡片的内容区
                    </div>
                  </template>
                  <button>向左 manual</button>
                  <button
                    @click="
                      () => {
                        this.manualShow = true;
                      }
                    "
                  >
                    打开
                  </button>
                  <button
                    @click="
                      () => {
                        this.manualShow = false;
                      }
                    "
                  >
                    关闭
                  </button>
                </Popover>
              </TabsPane>
              <TabsPane :name="`选择器`" :label="`选择器`">
                <div>
                  <p>当前选择的是:{{ selectIdx }}</p>

                  <button
                    @click="
                      () => {
                        this.multiple = !this.multiple;
                      }
                    "
                  >
                    {{
                      multiple
                        ? `当前为多选，点击切换为单选`
                        : `当前为单选，点击切换为多选`
                    }}
                  </button>
                  <Select
                    :list="selectListData"
                    :placeholder="`自定义placeholder`"
                    @dataChange="getSelectData"
                    :multiple="multiple"
                  />
                </div>
              </TabsPane>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
    <Dialog
      v-model="dialogVisible"
      :handleClose="
        () => {
          this.dialogVisible = false;
        }
      "
    >
      <template slot="header">
        <div>
          标题插槽<button
            @click="
              () => {
                this.dialogVisible = false;
              }
            "
          >
            关闭弹出框
          </button>
        </div>
      </template>
      <h1>这是内容区域</h1>
      <template slot="footer">这是Footer</template>
    </Dialog>
  </div>
</template>

<script>
import {
  Menu,
  SubMenu,
  MenuItem,
  MenuItemGroup,
  Card,
  Swiper,
  SwiperItem,
  Tabs,
  TabsPane,
  Loading,
  ProgressBar,
  Pagination,
  Popover,
  Dialog,
  Select,
  Notification,
} from "@/base";
export default {
  name: "",
  components: {
    Menu,
    MenuItem,
    SubMenu,
    MenuItemGroup,
    Card,
    Swiper,
    SwiperItem,
    Tabs,
    TabsPane,
    Loading,
    ProgressBar,
    Pagination,
    Popover,
    Dialog,
    Select,
  },
  data() {
    return {
      dialogVisible: false,
      activeMenuIdx: "1",
      activeTabsName: "轮播图",
      banners: [
        { url: "https://cdn.zhangxc.cn/image/jpeg/wallhaven-01qpg4.jpg" },
        { url: "https://cdn.zhangxc.cn/image/jpeg/2020-05-19 230011.jpg" },
        { url: "https://cdn.zhangxc.cn/image/jpeg/希里.jpg" },
      ],
      loading: true,
      percentage: 0.2,
      unablePercentage: 0.5,
      move: false,
      page: {
        current: 1,
        limit: 30,
        total: 4000,
      },
      manualShow: false,
      selectListData: [
        { label: "Item 1", value: "1" },
        { label: "Item 2", value: "2" },
        { label: "Item 3", value: "3" },
        { label: "Item 4", value: "4" },
        { label: "Item 5", value: "5" },
      ],
      selectIdx: null,
      multiple: true,
    };
  },
  mounted() {
    Notification({
      duration: 0,
      title: "这是不会消失的一个通知框",
      message: "Notification()调用",
    });
    this.$notify({ title: "这是一个通知框", message: "this.$notify()调用" });
  },
  methods: {
    activeChange(idx) {
      this.activeMenuIdx = idx;
    },
    barClick() {
      console.log("点击进度条");
    },
    moving() {
      this.move = true;
    },
    moveStop() {
      this.move = false;
    },
    getSelectData(idx) {
      this.selectIdx = Array.isArray(idx) ? idx.join(",") : idx;
    },
  },
  computed: {},
  watch: {
    activeTabsName(name) {
      if (name === "加载") {
        const self = this;
        setTimeout(() => {
          self.loading = false;
        }, 2000);
      } else {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrap {
  margin: 30px 0;
  height: 100%;
  border: 1px solid $grey;
  display: flex;
  .menu-wrap {
    height: 100%;
    flex-shrink: 0;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 60px;
    .card-content {
      width: 100%;
      padding: 0 34px;
      .tabs-wrap {
        margin: 30px 0;
        .swiper-wrap {
          margin: 30px 0;
          .banner {
            height: 200px;
            width: 400px;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
