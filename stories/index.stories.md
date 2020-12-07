```js script
import { html } from '@open-wc/demoing-storybook';
import '../kemet-draggable.js';

export default {
  title: 'KemetDraggable',
  component: 'kemet-draggable',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# KemetDraggable

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add kemet-draggable
```

```js
import 'kemet-draggable/kemet-draggable.js';
```

```js preview-story
export const Simple = () => html`
  <kemet-draggable></kemet-draggable>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <kemet-draggable title="Hello World"></kemet-draggable>
`;
```
