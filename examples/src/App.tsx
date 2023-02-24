import { MouseEvent, useState } from 'react'

// NOTE: 这种方式测试没有组件属性代码提示, 需要使用npm link的方式才有，因为package.json中配置typings: 这个属性
// import { Button } from '../../dist/es'
// import type { PrimaryButtonProps } from '../../dist/es'

// 是否可以将它开发成一个插件
// TODO: 如何通过配置别名的方式，例如 ’@@‘ 来代替 ’../..‘ 写法
import { Button, Input } from '../../packages'

import './App.less'

function App() {
  const [count, setCount] = useState(0)

  const clickHandler = (e: MouseEvent) => {
    e.preventDefault()

    console.log('click handler')
  }

  return (
    <div>
      <Button
        type="primary"
        size="medium"
        rounded
        onClick={clickHandler}
        // className="btn btn2"
        // style={{ backgroundColor: '#000' }}
      >
        Click Me
      </Button>

      <Input rounded />
    </div>
  )
}

export default App
