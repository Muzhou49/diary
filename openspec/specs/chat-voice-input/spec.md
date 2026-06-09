## ADDED Requirements

### Requirement: Voice input in AI chat dialog
聊天对话框 SHALL 提供语音输入按钮，使用 Web Speech API。

#### Scenario: Voice button visible
- **WHEN** 浏览器支持 Speech API 且为今天
- **THEN** 输入框左侧显示麦克风按钮

#### Scenario: Start recording
- **WHEN** 用户点击麦克风按钮
- **THEN** 开始录音，显示红色脉冲条"正在聆听…"
- **AND** 实时显示识别文字

#### Scenario: Auto send on stop
- **WHEN** 用户停止录音
- **THEN** 识别文字自动发送为消息
