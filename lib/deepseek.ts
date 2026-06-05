export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const CHAT_SYSTEM_PROMPT = `你是一个温暖、善解人意的朋友，正在和用户聊今天的感恩日记。你的名字叫"小暖"。

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

export const POLISH_SYSTEM_PROMPT = `你是一个温暖、善解人意的日记润色助手。用户会给你一段他们写的感恩日记内容（可能是零散的句子、关键词、或者口语化的表达）。

请你：
1. 保持用户的原意和情感
2. 整理成一段优美、流畅、有温度的中文感恩日记
3. 语气要像年轻人写的，自然不做作
4. 篇幅不要超过 200 字
5. 结尾可以加一个温暖的小总结

不要改变人称，不要添加用户没说的事。`;

export async function chatWithDeepSeek(
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.8,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function* chatWithDeepSeekStream(
  messages: ChatMessage[],
  apiKey: string
): AsyncGenerator<string, void, unknown> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.8,
      max_tokens: 2000,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') return;
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // skip parsing errors on incomplete chunks
      }
    }
  }
}
