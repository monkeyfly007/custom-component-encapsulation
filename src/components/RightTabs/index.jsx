import { useEffect, useRef, useState, Children } from "react";
import cs from "classnames";
import { DoubleRightOutlined, LeftOutlined } from "@ant-design/icons";
import ExCollapse from "../ExpandCollapse";
import "./index.less";

function RightTabs({
  bodyStyle,
  children,
  className,
  activeKey: defaultActive,
  onTabClick
}) {
  const collapseRef = useRef();
  const [activeKey, setActiveKey] = useState(defaultActive);

  useEffect(() => {
    if (defaultActive === activeKey) {
      return;
    }
    const collapse = collapseRef.current;
    console.log(collapse, defaultActive, collapse.getVisibleValue());
    if (!defaultActive) {
      collapse.toggleCollapse(false, () => {
        setActiveKey(undefined);
        collapse.emitCustomEvent("resize.collapse.rewrite", { visible: false });
      });
    } else {
      setActiveKey(defaultActive);
      collapse.emitCustomEvent("resize.collapse.rewrite", { visible: true });
      if (!collapse.getVisibleValue()) {
        collapse.toggleCollapse(true);
      }
    }
  }, [activeKey, defaultActive]);

  const tabs = [];
  const panels = [];
  Children.forEach(children, (child) => {
    const key = child.key;
    if (child) {
      const { tab, hideTab, children, ...options } = child.props;
      tabs.push({ tab, key, hideTab });
      panels.push({ key, pane: children, ...options });
    }
  });

  const prefixCls = "right-tabs-card";
  return (
    <ExCollapse
      ref={collapseRef}
      // animate={false}
      className={cs(prefixCls, className)}
      mode="slideRight"
      renderToggle={() => {
        return (
          <ul role="tablist" className={`${prefixCls}-bar`}>
            {tabs.map(({ tab, key, hideTab }) => {
              const active = activeKey === key;
              const className = cs(`${prefixCls}-tab`, {
                [`${prefixCls}-tab-active`]: active
              });
              return (
                <li
                  key={key}
                  role="tab"
                  aria-selected={active}
                  className={className}
                  style={hideTab ? { display: "none" } : null}
                  onClick={() => {
                    onTabClick(key === activeKey ? undefined : key);
                  }}
                >
                  {tab}
                </li>
              );
            })}
          </ul>
        );
      }}
    >
      {panels.map(({ pane, bodyStyle, className, goBack, key }, i) => {
        const active = activeKey === key;
        className = cs(`${prefixCls}-tabpane`, {
          [className]: className,
          [`${prefixCls}-tabpane-active`]: active
        });
        let { tab } = tabs[i];
        if (tab.props) {
          Children.forEach(tab.props.children, (child) => {
            if (typeof child === "string") {
              tab = child;
            }
          });
        }
        return (
          <div
            key={key}
            role="tabpanel"
            style={{
              width: 260,
              position: "relative",
              ...bodyStyle
            }}
            aria-hidden={!active}
            className={className}
          >
            <div className={`${prefixCls}-tabpane-header`}>
              {goBack ? (
                <span className="go-back" onClick={goBack}>
                  <LeftOutlined />
                  返回
                </span>
              ) : null}
              {tab}
              <span
                className={`${prefixCls}-tabpane-close`}
                onClick={() => onTabClick(undefined)}
              >
                <DoubleRightOutlined />
              </span>
            </div>
            <div className={`${prefixCls}-tabpane-content`}>{pane}</div>
          </div>
        );
      })}
    </ExCollapse>
  );
}

RightTabs.TabPane = ({ children }) => children;

export default RightTabs;
