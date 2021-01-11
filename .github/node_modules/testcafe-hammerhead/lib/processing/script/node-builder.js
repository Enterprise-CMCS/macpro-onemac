"use strict";

exports.__esModule = true;
exports.createStringLiteral = createStringLiteral;
exports.createTempVarIdentifier = createTempVarIdentifier;
exports.createAssignmentExprStmt = createAssignmentExprStmt;
exports.createBlockExprStmt = createBlockExprStmt;
exports.createVarDeclaration = createVarDeclaration;
exports.createProcessScriptMethCall = createProcessScriptMethCall;
exports.createLocationGetWrapper = createLocationGetWrapper;
exports.createLocationSetWrapper = createLocationSetWrapper;
exports.createPropertySetWrapper = createPropertySetWrapper;
exports.createMethCallWrapper = createMethCallWrapper;
exports.createPropertyGetWrapper = createPropertyGetWrapper;
exports.createComputedPropertyGetWrapper = createComputedPropertyGetWrapper;
exports.createComputedPropertySetWrapper = createComputedPropertySetWrapper;
exports.createGetEvalMethCall = createGetEvalMethCall;
exports.getProxyUrlLiteral = getProxyUrlLiteral;
exports.createGetProxyUrlMethCall = createGetProxyUrlMethCall;
exports.createGetPostMessageMethCall = createGetPostMessageMethCall;
exports.createExpandedConcatOperation = createExpandedConcatOperation;
exports.createHtmlProcessorWrapper = createHtmlProcessorWrapper;

var _esotopeHammerhead = require("esotope-hammerhead");

var _internalLiteral = _interopRequireDefault(require("./internal-literal"));

var _instruction = _interopRequireDefault(require("./instruction"));

var _url = require("../../utils/url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------------------------
// WARNING: this file is used by both the client and the server.
// Do not use any browser or node-specific API!
// -------------------------------------------------------------
function createStringLiteral(value) {
  return {
    type: _esotopeHammerhead.Syntax.Literal,
    value: value,
    raw: `"${value}"`
  };
}

function createTempVarIdentifier() {
  return {
    type: _esotopeHammerhead.Syntax.Identifier,
    name: _internalLiteral.default.tempVar
  };
}

function createAssignmentExprStmt(left, right) {
  return {
    type: _esotopeHammerhead.Syntax.ExpressionStatement,
    expression: {
      type: _esotopeHammerhead.Syntax.AssignmentExpression,
      operator: '=',
      left: left,
      right: right
    }
  };
}

function createBlockExprStmt(children) {
  return {
    type: _esotopeHammerhead.Syntax.BlockStatement,
    body: children
  };
}

function createVarDeclaration(identifier, init) {
  return {
    type: _esotopeHammerhead.Syntax.VariableDeclaration,
    declarations: [{
      type: _esotopeHammerhead.Syntax.VariableDeclarator,
      id: identifier,
      init: init || null
    }],
    kind: 'var'
  };
}

function createProcessScriptMethCall(arg, isApply) {
  const args = [arg];

  if (isApply) {
    args.push({
      type: _esotopeHammerhead.Syntax.Literal,
      value: true,
      raw: 'true'
    });
  }

  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.processScript
    },
    arguments: args
  };
}

function createLocationGetWrapper() {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.getLocation
    },
    arguments: [{
      type: _esotopeHammerhead.Syntax.Identifier,
      name: 'location'
    }]
  };
}

function createLocationSetWrapper(value, wrapWithSequence) {
  const tempIdentifier = createTempVarIdentifier();
  const locationIdentifier = {
    type: _esotopeHammerhead.Syntax.Identifier,
    name: 'location'
  };
  let wrapper = {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.MemberExpression,
      computed: false,
      object: {
        type: _esotopeHammerhead.Syntax.FunctionExpression,
        id: null,
        params: [],
        body: {
          type: _esotopeHammerhead.Syntax.BlockStatement,
          body: [createVarDeclaration(tempIdentifier, value), {
            type: _esotopeHammerhead.Syntax.ReturnStatement,
            argument: {
              type: _esotopeHammerhead.Syntax.LogicalExpression,
              operator: '||',
              left: {
                type: _esotopeHammerhead.Syntax.CallExpression,
                callee: {
                  type: _esotopeHammerhead.Syntax.Identifier,
                  name: _instruction.default.setLocation
                },
                arguments: [locationIdentifier, tempIdentifier]
              },
              right: {
                type: _esotopeHammerhead.Syntax.AssignmentExpression,
                operator: '=',
                left: locationIdentifier,
                right: tempIdentifier
              }
            }
          }]
        },
        generator: false
      },
      property: {
        type: _esotopeHammerhead.Syntax.Identifier,
        name: 'call'
      }
    },
    arguments: [{
      type: _esotopeHammerhead.Syntax.ThisExpression
    }]
  };

  if (wrapWithSequence) {
    wrapper = {
      type: _esotopeHammerhead.Syntax.SequenceExpression,
      expressions: [{
        type: 'Literal',
        value: 0,
        raw: '0'
      }, wrapper]
    };
  }

  return wrapper;
}

function createPropertySetWrapper(propertyName, obj, value) {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.setProperty
    },
    arguments: [obj, createStringLiteral(propertyName), value]
  };
}

function createMethCallWrapper(owner, meth, args) {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.callMethod
    },
    arguments: [owner, meth, {
      type: _esotopeHammerhead.Syntax.ArrayExpression,
      elements: args
    }]
  };
}

function createPropertyGetWrapper(propertyName, owner) {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.getProperty
    },
    arguments: [owner, createStringLiteral(propertyName)]
  };
}

function createComputedPropertyGetWrapper(property, owner) {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.getProperty
    },
    arguments: [owner, property]
  };
}

function createComputedPropertySetWrapper(property, owner, value) {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.setProperty
    },
    arguments: [owner, property, value]
  };
}

function createGetEvalMethCall(node) {
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.getEval
    },
    arguments: [node]
  };
}

function getProxyUrlLiteral(source, resolver) {
  const proxyUrl = resolver(String(source.value), (0, _url.getResourceTypeString)({
    isScript: true
  }));
  return {
    type: _esotopeHammerhead.Syntax.Literal,
    value: proxyUrl,
    raw: `"${proxyUrl}"`
  };
}

function createGetProxyUrlMethCall(arg, baseUrl) {
  const args = [arg];

  if (baseUrl) {
    args.push({
      type: _esotopeHammerhead.Syntax.Literal,
      value: baseUrl,
      raw: `"${baseUrl}"`
    });
  }

  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.getProxyUrl
    },
    arguments: args
  };
}

function createGetPostMessageMethCall(node) {
  const parentObject = node.type === _esotopeHammerhead.Syntax.MemberExpression ? node.object : null;
  return {
    type: _esotopeHammerhead.Syntax.CallExpression,
    callee: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.getPostMessage
    },
    arguments: parentObject ? [parentObject] : [{
      type: _esotopeHammerhead.Syntax.Literal,
      value: null
    }, node]
  };
}

function createExpandedConcatOperation(left, right) {
  return {
    type: _esotopeHammerhead.Syntax.AssignmentExpression,
    operator: '=',
    left: left,
    right: {
      type: _esotopeHammerhead.Syntax.BinaryExpression,
      operator: '+',
      left: left,
      right: right
    }
  };
}

function createHtmlProcessorWrapper(node) {
  const member = {
    type: _esotopeHammerhead.Syntax.MemberExpression,
    computed: false,
    object: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: 'parent'
    },
    property: {
      type: _esotopeHammerhead.Syntax.Identifier,
      name: _instruction.default.processHtml
    }
  };
  return {
    type: _esotopeHammerhead.Syntax.ExpressionStatement,
    expression: {
      type: _esotopeHammerhead.Syntax.CallExpression,
      callee: member,
      arguments: [{
        type: _esotopeHammerhead.Syntax.Identifier,
        name: 'window'
      }, node.expression]
    }
  };
}