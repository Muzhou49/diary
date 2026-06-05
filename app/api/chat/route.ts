import { NextRequest, NextResponse } from 'next/server';
import { chatWithDeepSeek } from '@/lib/deepseek';

const CHAT_SYSTEM_PROMPT = `你是一个温暖、善解人意的朋友，正在和用户聊今天的感恩日记。你的名字叫"小暖"。

对话风格：
- 像朋友一样自然聊天，不要太正式
- 用"你"来称呼对方，语气亲切但不油腻
- 一次只问一个问题，不要一下子问很多
- 根据用户的回答，适当地追问细节（"那当时是什么感觉？"、"这件事为什么让你特别开心？"）
- 适当给出温暖的回应（"哇这个真的好棒！"、"听起来真的很美好呢～"）
- 使用一些年轻人常用的语气词和 emoji
- 对话进行 3-5 轮后，如果用户表示想总结了，就帮用户整理成日记

如果用户说想结束了（比如"好了"、"差不多了"、"生成日记吧"），请用以下格式回复：
[SUMMARY]
将对话内容整理成一篇优美的感恩日记。`;

export async function POST(request: NextRequest) {
  try {
    const { messages, apiKey } = await request.json();

    if (!messages || !apiKey) {
      return NextResponse.json({ error: '缺少 messages 或 apiKey' }, { status: 400 });
    }

    const reply = await chatWithDeepSeek([
      { role: 'system', content: CHAT_SYSTEM_PROMPT },
      ...messages,
    ], apiKey);

    const isSummary = reply.includes('[SUMMARY]');
    const content = isSummary
      ? reply.replace('[SUMMARY]', '').trim()
      : reply;

    return NextResponse.json({ content, isSummary });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'AI 暂时无法回复，请稍后再试' },
      { status: 500 }
    );
  }
}
