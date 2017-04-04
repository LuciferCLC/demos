# DOM 事件兼容 demo
> 兼容 IE 与其它主流浏览器。

- 调用 `addEvent(node, type, fn)` 添加事件；
- 调用 `removeEvent(node, type, fn)` 移除事件；
- 调用 `getEvent(e)` 获取事件对象；
- 调用 `getTarget(e)` 获取事件的目标元素；
- 调用 `preventDefault(e)` 取消事件默认行为；
- 调用 `stopPropagation(e)` 取消事件冒泡（捕获）；