# xPix  
**consistent pixel scaling across all screens and platforms**

xPix is a pixel-scaling system for mobile WebApps.  
It compensates for **Android display scaling** and provides a **predictable pixel baseline** for UI layout.

Applicable to:
- **Telegram WebApps**  
- **TWA (Trusted Web Activity)**  
- **Mobile WebViews** with system DPI scaling enabled  

### Purpose

Many Android devices apply **system-level display and font scaling**.  
This affects CSS pixel values and leads to **inconsistent UI dimensions**:

- spacing  
- padding  
- element sizes  
- layout proportions  

As a result, the same interface may render with a **visible size difference** across devices.

### 428px Design Baseline


xPix uses **428px** as a reference layout width.  
This value corresponds to the logical viewport width of modern large-screen devices (e.g., iPhone 12–15 Pro Max) and is close to typical Android WebView implementations.

To achieve predictable results, the UI should be designed **as if the screen width is always 428px**.  
All spacing, padding, and component dimensions follow this baseline.

xPix ensures that:
- a layout created for a 428px canvas  
- will render with the **same visual proportions** on any device, regardless of its actual viewport size or DPI scaling.

xPix is designed for mobile devices with a logical viewport width **≤ 428px**,  
which covers nearly the entire modern smartphone market (≈ **97–99%** of devices).

**Important:**  
If the logical viewport width **exceeds 428px** (for example, in landscape mode),  
**xPix automatically falls back to the native CSS pixel and no scaling is applied.**

### How xPix Works


1. On initialization, xPix writes a CSS variable `--x` into the root:


```
--x: clamp(0px, calc((1 / 428) * 1vw * 100), 1px);
```

This formula computes a **normalized pixel unit** based on the actual viewport width  
and caps it at 1px to prevent overscaling.

2. xPix then generates 500 pixel tokens: `--x1` … `--x500`.  
Each token represents:


```
--xN = calc(var(--x) * N)
```


These tokens are used for consistent spacing, padding, sizes, and layout proportions.

3. The helper function `x(value)` returns:


```
calc(var(--x) * value)
```

This allows using dynamic pixel values directly in inline styles or JS frameworks.

4. xPix runs only once per document.  
A guard flag is stored on the root element to prevent repeated initialization  
(important for frameworks with Hot Module Reloading and WebView behavior).

5. If the logical viewport width exceeds **428px** (e.g., landscape mode),  
xPix automatically falls back to **native CSS pixels**, and no scaling is applied.

### Usage Examples

#### 1. Initialization

Call `xPix()` once after the DOM is available.

**Svelte**
```ts
import { onMount } from 'svelte';
import { xPix } from 'xpix';

onMount(() => {
  xPix();
});
```

**React**
```ts
import { useEffect } from 'react';
import { xPix } from 'xpix';

useEffect(() => {
  xPix();
}, []);
```

**Vanilla JS**
```html
<script type="module">
  import { xPix } from './xpix.js';
  window.addEventListener('DOMContentLoaded', xPix);
</script>
```

#### 2. Using x(value) in components


x(value) returns a normalized pixel expression:

```
calc(var(--x) * value)
```

**Example (Svelte / React / Vue)**
```
<div style="padding: {x(16)}">Button</div>
```

**Resulting CSS:**
```
padding: calc(var(--x) * 16);
```


#### 3. Using CSS tokens (--x1 … --x500)


xPix generates pixel tokens for fixed spacing:

```
.box {
  padding: var(--x16);
  margin-top: var(--x24);
}
```

Useful for traditional CSS or component libraries.


#### 4. Tailwind usage (arbitrary values)


Tailwind supports CSS variables through canonical arbitrary values:

```
<div class="pt-(--x20) px-(--x12)"></div>
```

This applies normalized pixel spacing inside Tailwind utilities.


#### 5. Dynamic sizing in JavaScript

You can compute scaled pixel values directly in JS:

```
element.style.height = x(120);
element.style.borderRadius = x(8);
```


#### 6. When to use x() vs var(--xN)


| Task                       | Recommended               |
|----------------------------|---------------------------|
| Dynamic or computed values | `x(24)`                   |
| Fixed spacing in CSS       | `var(--x24)`              |
| Tailwind arbitrary values  | `pt-(--x24)`              |
| Inline sizing in components| `style="margin: {x(12)}"` |


#### 7. Edge cases

- xPix() must be called once per document.
- Do not run during SSR (only after DOM hydration).
- x(value) accepts numbers only (throws on NaN, Infinity, etc.).
- When viewport width > 428px, scaling is disabled automatically (fallback to native pixels).




### Quick Start

#### 1. Install xPix:

```bash
npm install xpix
```
```bash
pnpm install xpix
```


#### 2. Initialize xPix once after the DOM is ready:
```
import { xPix } from 'xpix';

xPix();
```


#### 3. Use x(value) for scaled pixel values:
```
<div style="padding: {x(16)}">Button</div>
```


#### 4. Or use CSS tokens (--x1 … --x500):
```
margin-top: var(--x24);
```






xPix is released under the MIT License.

Created by **Duck Spacy**
