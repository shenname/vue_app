<template>
    <div>
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" dot />
        <van-sidebar-item title="标签名称" badge="5" />
        <van-sidebar-item title="标签名称" badge="99+" />
      </van-sidebar>
    </div>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant';
export default {
  // 数据
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    onClick(key) {
      this.activeKey = key;
    }
  },
}
</script>