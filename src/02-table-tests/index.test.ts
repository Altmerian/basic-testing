import { simpleCalculator, Action } from './index';

test.each`
  a            | b            | action                 | expected
  ${1}         | ${2}         | ${Action.Add}          | ${3}
  ${2}         | ${2}         | ${Action.Add}          | ${4}
  ${3}         | ${2}         | ${Action.Add}          | ${5}
  ${5}         | ${2}         | ${Action.Subtract}     | ${3}
  ${2}         | ${5}         | ${Action.Subtract}     | ${-3}
  ${-5}        | ${-2}        | ${Action.Subtract}     | ${-3}
  ${3}         | ${2}         | ${Action.Multiply}     | ${6}
  ${10}        | ${0}         | ${Action.Multiply}     | ${0}
  ${-3}        | ${-2}        | ${Action.Multiply}     | ${6}
  ${6}         | ${2}         | ${Action.Divide}       | ${3}
  ${2}         | ${4}         | ${Action.Divide}       | ${0.5}
  ${5}         | ${0}         | ${Action.Divide}       | ${Infinity}
  ${2}         | ${3}         | ${Action.Exponentiate} | ${8}
  ${10}        | ${0}         | ${Action.Exponentiate} | ${1}
  ${-2}        | ${3}         | ${Action.Exponentiate} | ${-8}
  ${1}         | ${2}         | ${'invalid'}           | ${null}
  ${'invalid'} | ${2}         | ${Action.Add}          | ${null}
  ${1}         | ${'invalid'} | ${Action.Add}          | ${null}
`('$a $action $b = $expected', ({ a, b, action, expected }) => {
  expect(simpleCalculator({ a, b, action })).toBe(expected);
});
