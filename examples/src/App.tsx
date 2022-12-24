import { MouseEvent, useState } from 'react'

import { Button } from '../../dist/es'
// import type { BaseButtonProps } from '../../dist/es'

// 是否可以将它开发成一个插件
// TODO: 如何通过配置别名的方式，例如 ’@@‘ 来代替 ’../..‘ 写法
// import { Button } from '../../packages'

import './App.less'

function App() {
  const [count, setCount] = useState(0)

  const clickHandler = (e: MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <Button
        type="primary"
        size="large"
        rounded
        onClick={clickHandler}
        // className="btn btn2"
        // style={{ backgroundColor: '#000' }}
      >
        Click Me
      </Button>
    </div>
  )
}

export default App
