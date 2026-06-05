import { NextRequest, NextResponse } from 'next/server';
import { chatWithDeepSeek } from '@/lib/deepseek';

const POLISH_SYSTEM_PROMPT = `你是一个温暖、善解人意的日记润色助手。用户会给你一段他们写的感恩日记内容（可能是零散的句子、关键词、或者口语化的表达）。

请你：
1. 保持用户的原意和情感
2. 整理成一段优美、流畅、有温度的中文感恩日记
3. 语气要像年轻人写的，自然不做作
4. 篇幅不要超过 200 字
5. 结尾可以加一个温暖的小总结

不要改变人称，不要添加用户没说的事。`;

export async function POST(request: NextRequest) {
  try {
    const { content, apiKey } = await request.json();

    if (!content || !apiKey) {
      return NextResponse.json({ error: '缺少 content 或 apiKey' }, { status: 400 });
    }

    const polished = await chatWithDeepSeek([
      { role: 'system', content: POLISH_SYSTEM_PROMPT },
      { role: 'user', content: `请帮我润色这段感恩日记：${content}` },
    ], apiKey);

    return NextResponse.json({ polished });
  } catch (error) {
    console.error('Polish API error:', error);
    return NextResponse.json(
      { error: 'AI 润色失败，请稍后再试' },
      { status: 500 }
    );
  }
}
