const initialSpeed = 100; // 初始速度
const preRollTimes = 15; // 转动基本次数：即至少需要转动多少次再进入抽奖环节
const prizeCount = 8; // 总共有多少个位置

export default {
  props: [
    // 抽奖的标题
    'lotteryTip',
    // 抽奖次数
    'lotteryTimes',
    // 奖品列表
    'prizeList',
    // 抽奖按钮文案
    'btnText',
  ],
  data() {
    return {
      index: -1, // 当前转动到哪个位置，起点位置
    };
  },
  methods: {
    /**
     * 开始转动
     * 根据当前奖品在哪个位置即可
     */
    async animate(targetIdx) {
      const oneRoll = async speed => {
        // 等待一个毫秒数
        await new Promise(resolve => {
          setTimeout(resolve, speed);
        });
        this.index = (this.index + 1) % prizeCount;
        console.log(this.index);
        
      };

      await oneRoll(0);

      // 开始先转preRollTimes次
      let speed = initialSpeed;
      for (let i = 0; i <= preRollTimes; i++) {
        speed = Math.max(40, speed - 10);
        await oneRoll(speed);
      }

      // 接下来开始慢慢减速
      for (let i = 0; i < 10; i++) {
        speed += 20;
        await oneRoll(speed);
      }

      while (this.index !== targetIdx) {
        // 在最终中奖奖品的前一个减速
        if ((this.index + 1) % prizeCount === targetIdx) {
          speed += 110;
        } else {
          speed += 20;
        }
        await oneRoll(speed);
      }

      // 等800ms再完成，让用户看到结果
      await new Promise(resolve => {
        setTimeout(resolve, 800);
      });

      this.index = -1;
    },
    handleClickLottery() {
      this.$emit('lottery');
    },
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
   return <div onClick={this.animate(7)}>该抽奖组件只能支持个奖品</div>;
  },
};

