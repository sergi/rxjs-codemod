export default function (fileInfo, { jscodeshift: j }, api) {
  const ast = j(fileInfo.source);

  const SPLIT_OPERATORS = {
    bufer: (j, node) => {
      const args = node.arguments;
      const t = args[0].type;
      if (t === 'FunctionExpression' && t === 'ArrowFunctionExpression') {
        node.callee.property.name = 'bufferWhen';
      } else if (args.length === 2) {
        node.callee.property.name = 'bufferToggle';
      }
    },
    distinctUntilChanged: (j, node) => {
      const args = node.arguments;
      if (args.length === 2) {
        node.arguments = [args[1], args[0]];
      }
    },
    map: (j, node) => {
      const args = node.arguments;
      const t = args[0].type;
      if (t !== 'FunctionExpression' && t !== 'ArrowFunctionExpression') {
        node.callee.property.name = 'mapTo';
      }
    },
    flatMap: (j, node) => {
      const args = node.arguments;
      const t = args[0].type;
      if (t !== 'FunctionExpression' && t !== 'ArrowFunctionExpression') {
        node.callee.property.name = 'mapTo';
      }
    },
    throttle: (j, node) => {
      const args = node.arguments;
      const t = args[0].type;
      console.log(t, node.callee.property.name);
      node.callee.property.name = 'throttleTime';
    },
    window: (j, node) => {
      const args = node.arguments;
      const t = args[0].type;
      if (t === 'FunctionExpression' && t === 'ArrowFunctionExpression') {
        node.callee.property.name = 'windowWhen';
      } else if (args.length === 2) {
        node.callee.property.name = 'windowToggle';
      }
    },
  };

  return ast
    .find(j.CallExpression)
    .forEach(transformExpression(j))
    .toSource()

  function transformExpression(j) {
    return (ast) => {
      const methodName = ast.node.callee.property.name;
      const splitOperator = SPLIT_OPERATORS[methodName];
      if (splitOperator) {
        splitOperator(j, ast.node);
      }
    }
  }
}
