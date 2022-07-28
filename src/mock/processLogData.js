export default {
  processId: "88737AD6D0B54355AE86A9E3D81E5488",
  processInstanceId: "CC6E68BEFFA14D1EA14082955BFCE3E0",
  logs: [
    {
      seq: 0,
      operatorInstanceId: "7decd709aa398264f0482218fa86a910",
      operatorName: "CustomOperator",
      status: "Running",
      trace: null,
      logTime: "2022-07-26 15:19:29.665",
      consumingTime: 0
    },
    {
      seq: 1,
      operatorInstanceId: "7decd709aa398264f0482218fa86a910",
      operatorName: "CustomOperator",
      status: "Error",
      trace:
        'Traceback (most recent call last):\n  File "/opt/runtime/app/service/multiple_operator_process_executor.py", line 130, in execute\n    result, meta_datas = operator_processor.invoke(operator_instance, config, context, status_reportor)\n  File "/opt/runtime/app/operator_processor/custom_operator_processor.py", line 46, in invoke\n    exec(script, data_dict)\n  File "<string>", line 2, in <module>\nNameError: name \'main\' is not defined\n',
      logTime: "2022-07-26 15:19:29.724",
      consumingTime: 59
    }
  ]
};
