import cs from "classnames";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import "./index.less";

export default function ProcessLog(props) {
  const { onDetail, details, data } = props;

  const generateItem = (e, i) => {
    let statusText = "";
    let statusEl = null;
    let isErr = false;
    switch (e.status) {
      case "Completed":
        statusEl = (
          <>
            <CheckCircleOutlined style={{ color: "#00C08E" }} />
            运行成功
          </>
        );
        break;
      case "Error":
        isErr = true;
        statusText = "流程结束运行";
        statusEl = (
          <>
            <CloseCircleOutlined style={{ color: "#FF494E" }} />
            运行失败
          </>
        );
        break;
      default:
        if (e.seq === 0) statusText = "流程开始运行";
        statusEl = (
          <>
            <SyncOutlined style={{ color: "#00A2D0" }} />
            开始运行
          </>
        );
    }

    return (
      <li className={cs("list-item", { error: isErr })} key={i}>
        <div className="list-item-content">
          <div className="list-item-header">
            {e.logTime}
            <small>{statusText}</small>
          </div>
          <div className="list-item-title">{e.operatorName}</div>
          <ul className="list-item-extra">
            <li>{statusEl}</li>
            {e.status === "Running" ? null : (
              <li>耗时&nbsp;{e.consumingTime}ms</li>
            )}
            {isErr && !details ? (
              <li className="last" onClick={() => onDetail(e)}>
                详情
              </li>
            ) : null}
          </ul>
        </div>
        {details ? (
          <>
            {/* <div className="list-item-description">{e.trace}</div> */}
            <div className="list-item-err">{e.trace}</div>
          </>
        ) : null}
      </li>
    );
  };

  return (
    <div className="process-log">
      {data?.length ? (
        <ul className="list">{data.map(generateItem)}</ul>
      ) : (
        <div style={{ padding: 16 }}> 暂无运行日志！ </div>
      )}
    </div>
  );
}
