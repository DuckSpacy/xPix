# xPix

**Stable UI pixel system for mobile WebApps (fixes Android scaling, 428px design).**

xPix is a pixel normalization engine that ensures your mobile WebApp looks **identical on all devices**.  
It removes Android display scaling issues, unifies UI dimensions across manufacturers, and provides a consistent 428px design baseline for layout.

Perfect for:

- Telegram WebApps
- TWA (Trusted Web Activity)
- Any mobile WebView where Android DPI scaling breaks UI

---

## 🚨 The Problem: Android Display Scaling

Most modern Android devices apply **Display Size / Font Size scaling**, which dramatically affects:

- spacing
- text sizes
- padding
- visual proportions
- overall UI consistency

This leads to a situation where:

> **Your WebApp looks perfect on iPhone, but 20–40% larger or smaller on Android.**

Different manufacturers apply scaling differently (Samsung, Xiaomi, Huawei, Honor), making it **impossible to design reliably using CSS px or rem**.

---

## ✅ The Solution: xPix

xPix introduces a **normalized, cross-device pixel unit**.

- Ignores Android Display Scaling
- Makes UI identical across all devices
- Uses a fixed baseline of **428px design width**
- Allows you to write code using pixel-based mental model
- Guarantees predictable rendering in all mobile WebApps
- Works with Tailwind, Svelte, vanilla CSS, and all UI libraries

xPix does **NOT** try to be universal for websites.  
It is intentionally optimized **only for mobile WebApps**.

---

## 📦 Installation

```bash
pnpm add xpix
```

or

```bash
npm install xpix
```

## 🚀 Quick Start

### 1. Initialize xPix (generate normalized pixel tokens)

```ts
import { xPix } from 'xpix';

xPix(300); // generates --x1 … --x300
```
