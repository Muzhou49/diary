## ADDED Requirements

### Requirement: Grain texture background
应用 SHALL 在背景上叠加 SVG 颗粒纹理，模拟手工纸张质感。

#### Scenario: Texture renders on all pages
- **WHEN** 用户访问任意页面
- **THEN** 背景显示半透明 grain 纹理（body::before 固定定位）
- **AND** 纹理不影响交互（pointer-events: none）

### Requirement: Earthy tone gradient
背景 SHALL 使用多段泥土色调渐变替代单一暖粉渐变。

#### Scenario: Gradient spans warm earth tones
- **WHEN** 页面渲染
- **THEN** 背景从 cream → terracotta → sand → warm beige 四段渐变

### Requirement: Decorative leaf SVGs
页面 SHALL 在左上角和右下角显示淡彩树叶 SVG 装饰。

#### Scenario: Leaves visible but subtle
- **WHEN** 页面渲染
- **THEN** 左上角显示暖陶色叶子，右下角显示橄榄绿叶子
- **AND** 透明度 ≤ 0.15，不影响内容可读性
