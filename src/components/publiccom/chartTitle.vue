<template>
  <div class="option">
    <div class="text">
      <div :key="`chart_title_${idx}`" v-for="(item, idx) in data" class="list" @click="handleClickItem(item, idx)">
        <div :style="{ 'text-align': headerAlign }" class="subhead">
          <div :style="{ backgroundColor: item.bgColor }" v-if="item.bgColor" class="border-11" />{{ item.lable }}
        </div>
        <div :style="{ color: item.textColor, 'text-align': align }" class="number">
          <div :style="{ backgroundColor: 'transparent' }" v-if="item.bgColor" class="border-11" />
          <template v-if="item.numble != '-'">
            <span :style="{ color: getData(item, 'normColor') }">{{ thousandth(item.numble) }}
            </span>
            <span :style="{ color: getData(item, 'normColor') }" class="unit">{{ item.unit }}</span>
          </template>
          <span v-else>
            <span>{{ item.numble }}</span>
          </span>
          <van-icon :name="item.numble > -1 ? 'arrowTop' : 'arrowBottom'"
                    :color="`${item.numble > 0 ? '#007AFF' : '#FF3B30'}`" v-if="item.upOrDrop" class-prefix="iconfont"
                    size="14px" class="icons" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatNoFixed } from '@/utils/tools';
export default {
  'props': {
    'data': {
      'type': Array,
      'default': []
    },
    'headerAlign': {
      'type': String,
      'default': 'left'
    },
    'align': {
      'type': String,
      'default': 'left'
    }
  },
  'methods': {
    thousandth (num) {
      return formatNoFixed(num);
    },
    getData (val, type) {
      if (type == 'normColor') {
        if (val.norm) return val.norm > val.numble ? 'rgb(255, 73, 0)' : 'rgb(51, 51, 51)';
        return '';
      }
    },
    handleClickItem (item, idx) {
      if (item.isClick) this.$emit('on-change', { ...item, idx });
    }
  }
};
</script>

<style lang="less" scoped>
.option {
  .text {
    width: 100%;
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .list {
      padding: 20px 0 0 20px;
      flex: 1;

      .subhead {
        color: #666666;
        font-size: 12px;
        font-weight: 500;
      }

      .number {
        color: #333333;
        font-weight: 700;
        margin-top: 7px;
        font-size: 21px;
        min-height: 1.5em;

        .unit {
          font-size: 15px;
        }

        .icons {
          margin-left: 5px;
        }
      }

      .border-11 {
        display: inline-block;
        vertical-align: middle;
        width: 11px;
        height: 2px;
        background-color: #9A9A9A;
        margin-right: 6px;
      }
    }
  }
}
</style>