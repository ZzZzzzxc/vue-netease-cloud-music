<template>
  <div>
    <h1>Table</h1>
    <ZTable :columns="columns" :data="data">
      <template v-slot:name="slotProps">
        <div>123{{ slotProps.name }}</div>
      </template>
      <template v-slot:action="slotProps">
        <button @click="click(slotProps)" />
      </template>
    </ZTable>
  </div>
</template>

<script>
import { ZTable } from "@/base";
export default {
  components: { ZTable },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" }
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "出生日期",
          key: "birthday"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [
        {
          name: "王小明",
          age: 18,
          birthday: "919526400000",
          address: "北京市朝阳区芍药居"
        },
        {
          name: "张小刚",
          age: 25,
          birthday: "696096000000",
          address: "北京市海淀区西二旗"
        },
        {
          name: "李小红",
          age: 30,
          birthday: "563472000000",
          address: "上海市浦东新区世纪大道"
        },
        {
          name: "周小伟",
          age: 26,
          birthday: "687024000000",
          address: "深圳市南山区深南大道"
        }
      ]
    };
  },
  methods: {
    click(data) {
      console.log(data);
    }
  }
};
</script>

<style></style>
