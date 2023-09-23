import { PureComponent, ReactNode } from 'react';

/**
 * @description 装饰器，为组件添加age属性
 * @param Target
 */
function AddAge(Target: Function) {
  Target.prototype.age = 18;
}

// 使用装饰器
@AddAge
export default class Class extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'jeff',
    };
  }

  age?: number;

  render(): ReactNode {
    return (
      <>
        <h2>我是类组件</h2>
        <h2>我是{this.state.name}</h2>
        <h2>我已经{this.age}</h2>
      </>
    );
  }
}
