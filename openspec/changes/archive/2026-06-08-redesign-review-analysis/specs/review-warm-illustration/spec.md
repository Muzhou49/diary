## ADDED Requirements

### Requirement: DiaryCard uses warm illustration style
DiaryCard SHALL 采用温暖插画风设计：根据心情匹配柔和渐变背景、规整圆角、装饰性圆点。

#### Scenario: Gradient background by mood
- **WHEN** 渲染一张日记卡片
- **THEN** 卡片背景为柔和双色调渐变，颜色由心情决定
- **AND** 感恩→橙到黄、开心→黄到琥珀、温暖→粉到橙、平静→紫到蓝、感动→紫到粉

#### Scenario: Emoji in rounded container
- **WHEN** 渲染卡片头部
- **THEN** 心情 emoji 放在白色半透明圆角方框内（`rounded-xl bg-white/70`）

#### Scenario: Decorative dots
- **WHEN** 渲染卡片底部
- **THEN** 显示三个渐隐的彩色圆点（opacity 100% → 60% → 30%）
- **AND** 圆点颜色与当前心情主色一致

#### Scenario: Clean rounded corners
- **WHEN** 渲染卡片
- **THEN** 使用规整的 `rounded-2xl` 圆角，不歪斜不异形

#### Scenario: Card animation
- **WHEN** 卡片进入视口
- **THEN** 执行交错淡入+上移动画（delay 基于 index）
- **WHEN** 鼠标悬停
- **THEN** 卡片上浮 3px + 阴影加深
- **WHEN** 点击
- **THEN** 卡片轻微缩小（scale 0.97）
