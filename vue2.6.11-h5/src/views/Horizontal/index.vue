<!-- 江湖地位 趋势图 -->
<template>
  <div class="jhdw-details">
    <div class="content">
      <van-row>
        <van-col span="12">
          <div class="title_1">
            {{ info.username }}{{ info.title }}趋势<span class="time">{{ info.time || "" }}</span>
          </div>
          <div class="option">
            <div class="text">
              <div :key="`chart_title_${idx}`" v-for="(item, idx) in titleList" class="list">
                <div :style="{ background: item.bgColor }" class="legend" />
                <div>
                  <div class="subhead">
                    {{ item.lable }}
                  </div>
                  <div class="number">
                    {{ item.numble || 0 }}
                    <span v-if="item.numble != '-'" class="unit">{{ item.unit }}</span>
                    <van-tag v-if="getData(item, 'tag')" type="primary" class="tag">
                      <van-icon :name="getData(item, 'icon')" :color="getData(item, 'color')" class-prefix="iconfont"
                        size="10px" class="icons" />
                      <span :style="{ color: getData(item, 'color') }" v-if="item.hbRatio" class="font">{{ item.hbRatio
                      }}%</span>
                    </van-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <tabItemDom :data="tabData" @onchange="handleClickItem" />
        </van-col>
      </van-row>
      <chart :options="option" id="npDetailsChart" @on-change="changeLineChart" />
    </div>
  </div>
</template>

<script>
import tabItemDom from '@/components/publiccom/tabItem.vue';
import chart from '@/components/chart/chart.vue';
import { horizontal } from '@/mixin/horizontal';
import { toNumble } from '@/utils/tools';
export default {
  'components': {
    tabItemDom,
    chart
  },
  'mixins': [horizontal],
  data() {
    return {
      'tabData': [
        { 'lable': '市场份额', 'name': '1' },
        { 'lable': '份额增幅', 'name': '2' },
        { 'lable': '达艾比', 'name': '3' },
        { 'lable': '达百比', 'name': '4' }
      ],
      'info': {
        'username': '',
        'userType': '',
        'title': '',
        'active': 1,
        'time': ''
      },
      'titleList': [],
      'valueData': [],
      'lineArr2': [],
      'lineArr3': [],
      'cloneData': [],
      'option': {}
    };
  },
  created() {
    this.init();
  },
  'methods': {
    init() {
      let _title = this.tabData[0];
      this.handleClickItem(_title);
    },
    handleClickItem(item, idx) {
      let _router = this.$route.query;
      this.info.username = `${_router.name}`;
      this.info.userType = `${_router.type}`;
      this.info.title = item.lable;
      this.info.active = item.name;
      this.getAllCompeteRatioByMonth();
    },
    //NP-Lilly事业部NP日均增长对比
    getAllCompeteRatioByMonth() {
      /* let o = {
        '1': '达伯舒',
        '2': '达伯舒',
        '3': '艾瑞卡',
        '4': '百泽安'
      };
      let data = {
        'province': '*',
        'dept1Name': '*',
        'productName': o[this.info.active]
      };
      if (this.info.userType == 1){
        data.dept1Name = this.info.username;
      } else if (this.info.userType == 2){
        data.province = this.info.username;
      }
      getAllCompeteRatioByMonth(data).then(response=>{
        this.cloneData = JSON.parse(JSON.stringify(response.data));
        this.drawLineChart();
      }); */
      let response = {
        'code': 200,
        'msg': null,
        'data': [
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '24.4',
            'marketCompAmplificationRatio': '-',
            'accumulativeRatio': '-',
            'accMarketCompToAllRatio': '-',
            'time': '202012'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '37.2',
            'marketCompAmplificationRatio': '-',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '37.2',
            'time': '202101'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '37.9',
            'marketCompAmplificationRatio': '0.2',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '37.5',
            'time': '202102'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '33.4',
            'marketCompAmplificationRatio': '-1.5',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '36',
            'time': '202103'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '34.6',
            'marketCompAmplificationRatio': '-0.3',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '35.6',
            'time': '202104'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '36.2',
            'marketCompAmplificationRatio': '0.1',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '35.7',
            'time': '202105'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '37.3',
            'marketCompAmplificationRatio': '0.3',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '36.1',
            'time': '202106'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '40.1',
            'marketCompAmplificationRatio': '0.6',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '36.6',
            'time': '202107'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '42.2',
            'marketCompAmplificationRatio': '0.8',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '37.4',
            'time': '202108'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '42.2',
            'marketCompAmplificationRatio': '0.7',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '38',
            'time': '202109'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '42',
            'marketCompAmplificationRatio': '0.4',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '38.4',
            'time': '202110'
          },
          {
            'marketIbi308VsRate': '100',
            'marketCompToAllRatio': '44.9',
            'marketCompAmplificationRatio': '0.6',
            'accumulativeRatio': '100',
            'accMarketCompToAllRatio': '39.1',
            'time': '202111'
          }
        ]
      };
      this.cloneData = JSON.parse(JSON.stringify(response.data));
      this.drawLineChart();
    },
    //绘制NP 日均增长对比
    drawLineChart() {
      let monthText = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
      };
      let _data = this.cloneData,
        xLable = [],
        lineArr1 = [],
        lineArr2 = [],
        lineArr3 = [],
        dateYmonth = [],
        dataYmonthText = {
          'first': [],
          'last': []
        };
      _data.map((item, idx) => {
        let month = item.time.slice(-2);
        let year = item.time.slice(0, 4);
        if (this.info.active == 1) {
          lineArr1.push(item.marketCompToAllRatio);
          lineArr2.push(item.accMarketCompToAllRatio);
          xLable.push(`${year}-${monthText[month]}`);
        } else if (this.info.active == 2) {
          if (!isNaN(item.marketCompAmplificationRatio) && item.marketCompAmplificationRatio !== null) {
            xLable.push(`${year}-${monthText[month]}`);
            lineArr1.push(item.marketCompAmplificationRatio);
          }
        }
        else {
          lineArr1.push(item.marketIbi308VsRate);
          lineArr2.push(item.accumulativeRatio);
          xLable.push(`${year}-${monthText[month]}`);
        }
      });
      xLable.reduce((last, item, idx) => {
        const lastTime = last.split('-');
        const itemTime = item.split('-');
        if (lastTime[0] != itemTime[0]) {
          dateYmonth.push(idx);
          dataYmonthText.first.push(lastTime[0]);
          dataYmonthText.last.push(itemTime[0]);
        }
        return item;
      }, xLable[0]);
      let obj = {
        'line0': lineArr1.slice(-1)[0],
        'line1': lineArr2.slice(-1)[0],
        'line2': lineArr3.slice(-1)[0],
        'idx': xLable.length - 1
      };
      let options = {
        'grid': { 'left': '0', 'right': '0', 'bottom': '0', 'top': '5%', 'containLabel': true },
        'xAxis': {
          'type': 'category',
          'boundaryGap': true,
          'axisLine': { 'show': true, 'lineStyle': { 'color': 'rgba(240, 240, 240, 1)' } },
          'axisPointer': {
            'value': xLable.slice(-1)[0],
            'type': 'shadow',
            'label': {
              'show': true,
              'color': '#FFFFFF',
              'backgroundColor': '#007AFF',
              'formatter': (param) => {
                return param.value.split('-')[1];
              }
            },
            'shadowStyle': { 'color': 'rgba(216, 216, 216, .2)' },
            'handle': { 'show': true, 'color': 'rgba(0,0,0,0)' }
          },
          'axisLabel': {
            'formatter': (value) => {
              return value.split('-')[1];
            }
          },
          'data': xLable
        },
        'yAxis': [
          {
            'type': 'value',
            'show': true,
            'splitLine': {
              'lineStyle': { 'color': 'rgba(240, 240, 240, 1)', 'type': 'dashed' }
            },
            'axisLabel': {
              'interval': 0,
              'formatter': '{value}%'
            },
            'min': function (value) {
              return Math.floor(value.min);
            }
          }
        ],
        'series': [
          {
            'type': 'line',
            'itemStyle': {
              'normal': {
                'color': 'rgba(0, 122, 255, 1)',
                'lineStyle': { 'color': 'rgba(0, 122, 255, 1)' }
              }
            },
            'areaStyle': {
              'color': {
                'type': 'linear',
                'x': 0,
                'y': 1,
                'x2': 0,
                'y2': 0,
                'colorStops': [
                  { 'offset': 0, 'color': 'rgba(0, 122, 255, 0)' }, // 0% 处的颜色
                  { 'offset': 1, 'color': 'rgba(0, 122, 255, 0.28)' } // 100% 处的颜色
                ],
                'global': false // 缺省为 false
              }
            },
            'data': lineArr1
          },
          {
            'type': 'line',
            'itemStyle': {
              'normal': {
                'color': 'rgba(33, 201, 186, 1)',
                'lineStyle': { 'color': 'rgba(33, 201, 186, 1)' }
              }
            },
            'areaStyle': {
              'color': {
                'type': 'linear',
                'x': 0,
                'y': 1,
                'x2': 0,
                'y2': 0,
                'colorStops': [
                  { 'offset': 0, 'color': 'rgba(33, 201, 186, 0)' }, // 0% 处的颜色
                  { 'offset': 1, 'color': 'rgba(33, 201, 186, 0.28)' } // 100% 处的颜色
                ],
                'global': false // 缺省为 false
              }
            },
            'data': lineArr2
          }
        ]
      };
      if (this.info.active == 2) options.series.splice(1, 1);
      dateYmonth.map((item, idx) => {
        let obj = {
          'type': 'line',
          'show': false,
          'markLine': {
            'symbol': 'none',
            'lineStyle': {
              'color': 'rgba(210, 209, 209, 1)',
              'width': 1,
              'type': 'dashed',
              'padding': [0, 0, 0, 0]
            },
            'label': {
              'normal': {
                'show': true,
                'formatter': `${dataYmonthText.first[idx]}   ${dataYmonthText.last[idx]}`,
                'textStyle': {
                  'color': 'rgba(153, 153, 153, 1)', //标注线终点文字颜色
                  'fontSize': 13,
                  'fontWeight': 400,
                  'padding': [0, 0, -25, 0] //文字间距
                }
              }
            },
            'data': [{ 'xAxis': xLable[item] }]
          }
        };
        options.series.push(obj);
      });
      this.option = options;
      this.valueData = xLable;
      this.lineArr2 = lineArr2;
      this.lineArr3 = lineArr3;
      this.changeLineChart(obj);
    },
    getData(val, type) {
      if (type == 'tag') {
        return val.hbRatio && val.hbRatio != '-';
      } else if (type == 'icon') {
        return val.hbRatio > 0 ? 'arrowTop' : 'arrowBottom';
      } else if (type == 'color') {
        return item.hbRatio > 0
          ? 'rgba(22, 119, 255, 1)'
          : 'rgba(255, 73, 0, 1)';
      }
    },
    changeLineChart(item) {
      const line2 = this.lineArr2[item.idx] || '';
      const line3 = this.lineArr3[item.idx] || '';
      const lable = this.valueData[item.idx] || '';
      this.info.time = lable;
      let arr = [
        {
          'lable': this.info.title,
          'numble': toNumble(item.line0),
          'unit': '%',
          'hbRatio': toNumble(line3),
          'textColor': 'rgba(102, 102, 102, 1)',
          'bgColor': '#007AFF'
        }

      ];
      if (this.info.active == '1' || this.info.active == '3' || this.info.active == '4') {
        arr[0].lable = `月度${arr[0].lable}`;
        arr.push({
          'lable': `累计${this.info.title}`,
          'numble': toNumble(line2),
          'unit': '%',
          'textColor': 'rgba(102, 102, 102, 1)',
          'bgColor': 'rgba(33, 201, 186, 1)'
        });
      }
      if (this.info.active == '2') {
        arr[0].lable = `累计${arr[0].lable}`;
      }
      this.titleList = arr;
    }
  }
};
</script>

<style lang="less" scoped src='./index.less'></style>