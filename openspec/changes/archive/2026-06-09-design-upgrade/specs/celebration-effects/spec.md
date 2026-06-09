## ADDED Requirements

### Requirement: Save celebration particles
保存日记成功时 SHALL 显示庆祝粒子动画。

#### Scenario: Particles burst on save
- **WHEN** 用户点击保存且操作成功
- **THEN** 从按钮中心迸发 12 个随机 ✦✧⋆ 粒子向四周飘散
- **AND** 同时扩散暖橙光环
- **AND** 动画持续 ~1.2s 后自动消失

#### Scenario: Hover glow on save button
- **WHEN** 用户悬停在保存按钮上
- **THEN** 按钮微放大 + 阴影加深

### Requirement: Daily prompt as handcrafted card
每日一言 SHALL 以手账卡片样式展示。

#### Scenario: Card design elements
- **WHEN** 渲染每日一言
- **THEN** 卡片显示顶部装饰线 + 四角圆点 + 底部渐隐装饰点
- **AND** 书本图标居中显示在文字上方
