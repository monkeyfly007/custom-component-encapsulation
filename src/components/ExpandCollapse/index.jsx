import PropTypes from "prop-types";
import {
  useImperativeHandle,
  useCallback,
  useRef,
  useState,
  forwardRef
} from "react";
// (css-animation)[https://github.com/yiminghe/css-animation/]
// (css-animation)[https://www.npmjs.com/package/css-animation]
import cssAnimation from "css-animation";
import cs from "classnames";
import "./index.less";

const prefixCls = "collapse";
function ExpandCollapse({ forwardRef, className, ...props }) {
  const boxRef = useRef();
  const [visible, setVisible] = useState(props.visible);

  // https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent
  // https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
  const emitCustomEvent = useCallback((eventName, cfg = {}) => {
    // 创建一个自定义事件：name: 事件名称；detail(只读属性)：当事件初始化时传递的数据
    const event = new CustomEvent(eventName, { detail: cfg });
    if (window.dispatchEvent) {
      // 向一个指定的事件目标派发一个事件, 并以合适的顺序同步调用目标元素相关的事件处理函数
      window.dispatchEvent(event);
    } else {
      window.fireEvent(event);
    }
  }, []);

  useImperativeHandle(forwardRef, () => ({
    getVisibleValue: () => visible,
    toggleCollapse: onVisibleChange,
    emitCustomEvent
  }));

  // 展开折叠切换时触发
  const onVisibleChange = useCallback(
    (visible, callback) => {
      const node = boxRef.current;
      node.style.display = "block";

      const fn = () => {
        node.style.display = visible ? "block" : "none";
        setVisible(visible);
        typeof callback === "function" && callback(visible);
        emitCustomEvent("resize.collapse", {
          visible,
          // getBoundingClientRect 提供了元素的大小及其相对于视口的位置
          width: node.parentNode.getBoundingClientRect().width,
          role: props.mode.replace("slide", "").toLowerCase()
        });
      };
      if (props.animate) {
        // anim(DOMElement, animationName, callback);
        cssAnimation(node, `${props.mode}${visible ? "In" : "Out"}`, fn);
      } else {
        fn();
      }
    },
    [emitCustomEvent, props.animate, props.mode]
  );

  return (
    <div
      ref={forwardRef}
      id={props.id}
      className={cs(prefixCls, `${prefixCls}-${props.mode}`, className)}
    >
      {props.renderToggle(visible, onVisibleChange)}
      <div
        ref={boxRef}
        className={cs({ [`${className}-body`]: className })}
        style={{ height: "100%" }}
      >
        {props.children}
      </div>
    </div>
  );
}

ExpandCollapse.propTypes = {
  animate: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  mode: PropTypes.oneOf(["slideLeft", "slideRight", "slideUp", "slideDown"]),
  renderToggle: PropTypes.func
};

ExpandCollapse.defaultProps = {
  animate: true,
  visible: false,
  mode: "slideLeft",
  renderToggle: (visible, onVisibleChange) => (
    <span data-show={visible} onClick={() => onVisibleChange(!visible)}>
      Toggle
    </span>
  )
};

export default forwardRef((props, ref) => (
  <ExpandCollapse forwardRef={ref} {...props} />
));
