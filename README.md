# litecase-ui

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/LantzShaw/litecase-ui/LICENSE) ![npm](https://img.shields.io/npm/dm/@udilia/create-react-library) [![npm version](https://img.shields.io/npm/v/litecase-ui.svg?style=flat)](https://www.npmjs.com/package/litecase-ui) 

A UI component library for react.

## Installation

```sh
$ npm i litecase-ui
```

## Usage

```tsx
import { FC, ReactElement } from 'react'
import { Button } from 'litecase-ui'

interface IProps {}

const App:FC<IProps> = (props):ReactElement => {
  return (
    <>
        <Button label="click me" />
    </>
  )
}

export default App
```

## License
litecase-ui is [MIT licensed](./LICENSE).