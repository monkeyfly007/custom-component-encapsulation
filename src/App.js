import { useState, useEffect } from "react";
import "./styles.css";
import CardTabs from "./components/CardTabs";
import RightTabs from "./components/RightTabs";
import ProcessLog from "./components/ProcessLog";
import processLogData from "./mock/processLogData";
import { QqOutlined, WechatOutlined, WeiboOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function App() {
  // 显示运行日志详情
  const [logDetail, setLogDetail] = useState(null);
  const [activeKey, setAativeKey] = useState("1");
  const [rihgtTabActiveKey, setRihgtTabActiveKey] = useState(undefined);

  const handleTabKeyChange = (key) => {
    setAativeKey(key);
  };

  const handleTabClick = (key) => {
    setRihgtTabActiveKey(key);
  };

  const emitMyEvent = () => {
    const myEvent = new CustomEvent("myEvent", {
      details: { name: "zs", age: 10 }
    });
    console.log("创建一个事件");
    window.dispatchEvent(myEvent);
  };

  useEffect(() => {
    // 调整 rightTabPane 窗口的大小
    function rightResize({ detail: { visible } }) {
      if (!visible) {
        setLogDetail(null);
      }
    }
    function myEventHandler(e) {
      console.log(e, "trigger myEvent");
    }
    window.addEventListener("resize.collapse", rightResize, false);
    // 监听自定义事件
    window.addEventListener("myEvent", myEventHandler, false);
    return () => {
      window.removeEventListener("resize.collapse", rightResize, false);
      window.removeEventListener("myEvent", myEventHandler, false);
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button type="primary" onClick={emitMyEvent}>
        创建并派发一个自定义事件
      </Button>
      <CardTabs activeKey={activeKey} onTabChange={handleTabKeyChange}>
        <CardTabs.TabPane tab="标签页1" key="1">
          标签页1的内容
        </CardTabs.TabPane>
        <CardTabs.TabPane
          tab={
            <div>
              <QqOutlined />
              标签页2
            </div>
          }
          key="2"
        >
          标签页2的内容
        </CardTabs.TabPane>
        <CardTabs.TabPane
          tab={
            <div>
              <WechatOutlined />
              <span>标签页3</span>
            </div>
          }
          key="3"
        >
          标签页3的内容
        </CardTabs.TabPane>
      </CardTabs>
      <section className="detail-panel">
        <RightTabs activeKey={rihgtTabActiveKey} onTabClick={handleTabClick}>
          <RightTabs.TabPane
            tab={
              <>
                <QqOutlined />
                流程信息
              </>
            }
            key="flowInfo"
          >
            流程信息组件的内容区
          </RightTabs.TabPane>
          <RightTabs.TabPane
            tab={
              <>
                <WechatOutlined />
                流程变量
              </>
            }
            key="flowVariables"
          >
            流程变量组件的内容区
          </RightTabs.TabPane>
          <RightTabs.TabPane
            tab={
              <>
                <WeiboOutlined />
                运行日志
              </>
            }
            goBack={logDetail ? () => setLogDetail(null) : null}
            bodyStyle={{ width: logDetail ? 520 : 260 }}
            key="runningRecords"
          >
            <ProcessLog
              data={processLogData?.logs ?? []}
              details={logDetail}
              onDetail={(logDetail) => setLogDetail(logDetail)}
            />
          </RightTabs.TabPane>
        </RightTabs>
      </section>
    </div>
  );
}
