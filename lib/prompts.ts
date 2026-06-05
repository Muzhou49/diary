import { DailyPrompt, GratitudeCategory } from './types';

export const DAILY_PROMPTS: DailyPrompt[] = [
  // 家人
  { id: 'fam-1', text: '今天和家人在一起，有什么让你感恩的瞬间？', category: 'family' },
  { id: 'fam-2', text: '家人为你做的哪件小事，让你心里暖暖的？', category: 'family' },
  { id: 'fam-3', text: '最近一次和家人聊天，谁的话让你特别有感触？', category: 'family' },
  { id: 'fam-4', text: '如果要感谢一位家人，你最想对谁说谢谢？', category: 'family' },
  { id: 'fam-5', text: '今天家里的哪个画面让你觉得"真好啊"？', category: 'family' },
  { id: 'fam-6', text: '小时候家人为你做的一件事，现在想起来还很感恩？', category: 'family' },
  { id: 'fam-7', text: '家人身上你最欣赏的品质是什么？', category: 'family' },
  { id: 'fam-8', text: '今天有没有跟家人说过爱你或谢谢你？', category: 'family' },

  // 朋友
  { id: 'fr-1', text: '今天谁的一句话让你感到被理解？', category: 'friends' },
  { id: 'fr-2', text: '有没有一个朋友，让你觉得认识 TA 真幸运？', category: 'friends' },
  { id: 'fr-3', text: '最近一次和朋友在一起，什么事让你开怀大笑？', category: 'friends' },
  { id: 'fr-4', text: '朋友帮过你的一个小忙，你一直记得？', category: 'friends' },
  { id: 'fr-5', text: '有没有一个人，在你低落时给了你力量？', category: 'friends' },
  { id: 'fr-6', text: '今天和谁的聊天让你觉得特别愉快？', category: 'friends' },
  { id: 'fr-7', text: '如果要介绍一个朋友的好，你会说什么？', category: 'friends' },
  { id: 'fr-8', text: '朋友身上的什么特质，让你也想成为那样的人？', category: 'friends' },

  // 工作/学习
  { id: 'wrk-1', text: '今天工作/学习中，什么事让你有成就感？', category: 'work' },
  { id: 'wrk-2', text: '有没有一位同事或老师，今天帮了你一把？', category: 'work' },
  { id: 'wrk-3', text: '今天学到的什么东西让你觉得很有收获？', category: 'work' },
  { id: 'wrk-4', text: '工作/学习中遇到的挑战，让你成长了什么？', category: 'work' },
  { id: 'wrk-5', text: '你擅长做的事情里，哪一件最让你自豪？', category: 'work' },
  { id: 'wrk-6', text: '今天有没有一个时刻，你觉得自己的努力值得？', category: 'work' },

  // 健康
  { id: 'hl-1', text: '今天你的身体为你做了什么，让你想对它说谢谢？', category: 'health' },
  { id: 'hl-2', text: '最近的睡眠/饮食/运动，哪个让你感觉更好？', category: 'health' },
  { id: 'hl-3', text: '身体给你的一个信号，让你更加珍惜它？', category: 'health' },
  { id: 'hl-4', text: '今天有没有好好吃饭、好好休息？', category: 'health' },
  { id: 'hl-5', text: '能够呼吸、行走、看见、听见——哪一样你此刻最感恩？', category: 'health' },

  // 自然
  { id: 'nat-1', text: '今天有没有被自然的美惊艳到？一片天空/一朵花', category: 'nature' },
  { id: 'nat-2', text: '今天的天气有没有让你心情变好？', category: 'nature' },
  { id: 'nat-3', text: '走在路上，什么自然的声音让你觉得平静？', category: 'nature' },
  { id: 'nat-4', text: '四季变化中，你最喜欢哪个季节的什么？', category: 'nature' },
  { id: 'nat-5', text: '身边有没有一棵树、一朵花让你驻足？', category: 'nature' },

  // 成长
  { id: 'gr-1', text: '最近你做出的一个决定，让你更靠近想成为的自己？', category: 'growth' },
  { id: 'gr-2', text: '今天你比昨天进步了一点点的地方是什么？', category: 'growth' },
  { id: 'gr-3', text: '过去一个月，你在哪方面成长最快？', category: 'growth' },
  { id: 'gr-4', text: '有没有一本书/一句话/一部电影，改变了你？', category: 'growth' },
  { id: 'gr-5', text: '你克服过的一个困难，现在回头看有什么感悟？', category: 'growth' },

  // 日常美好
  { id: 'ev-1', text: '今天有没有一个瞬间，让你觉得生活真美好？', category: 'everyday' },
  { id: 'ev-2', text: '今天吃到什么好吃的了？味蕾的快乐也值得感恩 🍜', category: 'everyday' },
  { id: 'ev-3', text: '今天听到的一首歌，让你的心情变好了？', category: 'everyday' },
  { id: 'ev-4', text: '今天有什么小事，虽然微不足道但让你偷偷开心？', category: 'everyday' },
  { id: 'ev-5', text: '今天你的小确幸是什么？一杯好喝的/一个拥抱/一个好消息', category: 'everyday' },
  { id: 'ev-6', text: '今天有没有什么事情按计划顺利进行？', category: 'everyday' },
  { id: 'ev-7', text: '今天独处的时间，让你舒服了吗？', category: 'everyday' },
  { id: 'ev-8', text: '给自己一个小小的肯定——今天你做得很好的一件事？', category: 'everyday' },

  // 通用（不限定分类）
  { id: 'gen-1', text: '今天有什么好事发生了吗？大事小事都算 🍀' },
  { id: 'gen-2', text: '如果今天只能感谢一件事，那会是什么？' },
  { id: 'gen-3', text: '今天有没有人对你微笑？一个微笑也是礼物' },
  { id: 'gen-4', text: '今天哪个时刻让你觉得"活着真好"？' },
  { id: 'gen-5', text: '今天让你心跳加速的美好瞬间是什么？' },
];

export function getRandomPrompt(category?: GratitudeCategory): DailyPrompt {
  const pool = category
    ? DAILY_PROMPTS.filter((p) => p.category === category)
    : DAILY_PROMPTS;

  if (pool.length === 0) {
    const general = DAILY_PROMPTS.filter((p) => !p.category);
    return general[Math.floor(Math.random() * general.length)];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDailyPrompt(dateStr: string, category?: GratitudeCategory): DailyPrompt {
  const dateNumber = dateStr.split('-').reduce((sum, n) => sum + parseInt(n, 10), 0);
  const pool = category
    ? DAILY_PROMPTS.filter((p) => p.category === category)
    : DAILY_PROMPTS;

  if (pool.length === 0) {
    const general = DAILY_PROMPTS.filter((p) => !p.category);
    return general[dateNumber % general.length];
  }

  return pool[dateNumber % pool.length];
}
