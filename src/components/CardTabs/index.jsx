import { Children } from "react";
import "./index.less";
import cs from "classnames";

// 类名前缀
const prefixCls = "tabs-card";

function CardTabs(props) {
  const { className, onTabChange, activeKey, children } = props;
  const tabs = []; // 用于渲染 tab bar
  const panels = []; // 用于渲染 tab panel

  console.log(children, "children");

  Children.forEach(children, (tabPane) => {
    // tabpane 是子组件
    const key = tabPane.key;
    if (tabPane) {
      // console.log(tabPane.props, "tabPane", tabPane);
      // tab 可能是 string 或 reactnode
      const { tab, children, ...rest } = tabPane.props;
      tabs.push({ tab, key });
      panels.push({ key, panel: children, ...rest });
    }
  });
  // console.log(tabs);

  return (
    <div className={cs(prefixCls, className)}>
      {/* tab-bar */}
      <ul role="tablist" className={`${prefixCls}-bar`}>
        {tabs.map(({ tab, key }) => {
          const isActive = activeKey === key;
          // const tabClassName = isActive
          //   ? "tabs-card-tab tabs-card-tab-active"
          //   : "tabs-card-tab";
          const tabClassName = cs(`${prefixCls}-tab`, {
            [`${prefixCls}-tab-active`]: isActive
          });
          return (
            <li
              key={key}
              role="tab"
              className={tabClassName}
              onClick={() => {
                onTabChange(key === activeKey ? undefined : key);
              }}
            >
              {tab}
            </li>
          );
        })}
      </ul>
      {/* tab-panel */}
      <div className={`${prefixCls}-tabpanel-wrapper`}>
        {panels.map(({ panel, key }, index) => {
          const isActive = activeKey === key;
          // const tabPanelClassName = isActive
          //   ? "tabs-card-tabpanel tabs-card-tabpanel-active"
          //   : "tabs-card-tabpanel";
          const tabPanelClassName = cs(`${prefixCls}-tabpanel`, {
            [className]: className,
            [`${prefixCls}-tabpanel-active`]: isActive
          });
          let { tab } = tabs[index];
          // console.log(tab, "tab");
          // tab 可能是 string 或 reactnode
          // if (tab.props) {
          //   console.log(tab.props, "tab.props");
          //   Children.forEach(tab.props.children, (child) => {
          //     if (typeof child === "string") {
          //       tab = child;
          //     }
          //   });
          // }
          return (
            <div key={key} role="tabpanel" className={tabPanelClassName}>
              <div className={`${prefixCls}-tabpanel-header`}>{tab}</div>
              <div className={`${prefixCls}-tabpanel-content`}>{panel}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
CardTabs.TabPane = ({ children }) => children;

export default CardTabs;
