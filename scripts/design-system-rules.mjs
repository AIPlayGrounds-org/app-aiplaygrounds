import { parse as parseAstro } from '@astrojs/compiler-rs';
import postcss from 'postcss';
import ts from 'typescript';

const literalColor =
  /(?:^|[\s,(])#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lch|lab|hwb|color)\(/i;
const number = String.raw`(?:\d*\.)?\d+`;
const unit = new RegExp(`(?<![\\w.-])-?${number}(?:px|rem)\\b`);
const sizing = /^(?:gap|row-gap|column-gap|(?:padding|margin)(?:-[\w-]+)?)$/;
const colors =
  /^(?:color|background-color|border(?:-[\w-]+)?-color|outline-color|fill|stroke|stop-color)$/;
const namedColor =
  /^(?:black|white|red|green|blue|gray|grey|purple|yellow|orange|rebeccapurple)$/i;
const arbitraryUtility =
  /(?:^|[\s:])(?:-?[mp][trblxyse]?|gap(?:-[xy])?|rounded(?:-[\w-]+)?|text|font|leading|tracking|shadow|bg|border(?:-[\w-]+)?|z|duration|delay|ease)-\[(?:[+-]?(?:\d|\.\d)|#|rgba?\()[^\]]*\]/;
const stockRadius =
  /(?:^|[\s:])rounded(?:-[trblse]{1,2})?-(?:xs|sm|md|lg|xl|[2-9]xl)(?=\s|$)/;

function topLevelValues(value) {
  let depth = 0;
  let result = '';
  for (const char of value) {
    if (char === '(') depth++;
    else if (char === ')') depth--;
    else if (!depth) result += char;
  }
  return result;
}

export function declarationRule(prop, value) {
  if (
    literalColor.test(value) ||
    ((colors.test(prop) || prop === 'background') && namedColor.test(value))
  )
    return 'color literal';
  if (
    /^(?:transition|animation)(?:-|$)|^--editorial-delay$/.test(prop) &&
    /(?:^|[\s,(])(?:\d*\.?\d+(?:ms|s)\b|(?:cubic-bezier|steps)\(|(?:ease(?:-in|-out|-in-out)?|linear)\b)/.test(
      value,
    )
  )
    return 'tiempo o curva literal';
  if (
    prop === 'border-radius' &&
    /var\(--radius-(?:xs|sm|md|lg|xl|[2-9]xl)\s*[,)]/.test(value)
  )
    return 'radio de Tailwind sin conexión al sistema';
  if (
    (sizing.test(prop) || prop === 'border-radius') &&
    (unit.test(topLevelValues(value)) ||
      /^calc\(\s*-?(?:\d*\.)?\d+(?:px|rem)\s*\)$/.test(value))
  )
    return 'espacio o radio fijo fuera de escala';
  if (
    /^(?:font-size|font-weight|line-height|letter-spacing|z-index)$/.test(
      prop,
    ) &&
    /^-?(?:\d*\.)?\d+(?:px|rem|em)?$/.test(value) &&
    !/^(?:0|1)$/.test(value)
  )
    return 'tipografía o capa literal';
  if (prop === 'font' && /(?:^|\s)[1-9]00\s/.test(topLevelValues(value)))
    return 'peso literal en shorthand tipográfico';
  if (
    /^border(?:-[\w-]+)?$/.test(prop) &&
    /^-?\d+(?:px|rem)\s+(?:solid|dotted|dashed)\b/.test(value)
  )
    return 'grosor de borde literal';
  if (
    /^border(?:-[\w-]+)?-width$/.test(prop) &&
    unit.test(topLevelValues(value))
  )
    return 'grosor de borde literal';
  if (
    prop === 'box-shadow' &&
    !/^(?:none|inherit|initial|unset|revert|var\()/.test(value)
  )
    return 'sombra literal';
  return undefined;
}

function walkAst(node, action) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const child of node) walkAst(child, action);
    return;
  }
  if (node.type) action(node);
  for (const child of Object.values(node)) walkAst(child, action);
}

const illustrationPaint = new Map([
  [
    'src/components/labs/ProductCover.astro',
    new Set([
      '#19352d',
      '#567367',
      '#b4d9bd',
      '#7e9b91',
      '#b1a5ea',
      '#66d49c',
      '#3e946d',
      '#f1fff3',
      '#f5f8fc',
      '#80a5be',
      '#3f687f',
      '#64764c',
      '#fcfaf0',
      '#7c945c',
    ]),
  ],
]);

export function inspectAstro(path, content) {
  const { ast } = parseAstro(content);
  const imports =
    ast.frontmatter?.program?.body.filter(
      ({ type }) => type === 'ImportDeclaration',
    ) ?? [];
  const iconNames = new Set(
    imports
      .filter(({ source }) => source.value === '@lucide/astro')
      .flatMap(({ specifiers }) => specifiers.map(({ local }) => local.name)),
  );
  const styles = [];
  const scripts = [];
  const errors = [];
  const report = (node, message) => {
    // Compiler offsets are bytes, including when the source contains accented text.
    const line = Buffer.from(content)
      .subarray(0, node.start)
      .toString('utf8')
      .split('\n').length;
    errors.push(`${path}:${line}: ${message}`);
  };
  walkAst(ast.body, (node) => {
    if (
      node.type === 'JSXElement' &&
      ['style', 'script'].includes(node.openingElement.name.name)
    ) {
      const target =
        node.openingElement.name.name === 'style' ? styles : scripts;
      target.push(node.children.map((child) => child.raw ?? '').join(''));
    }
    if (node.type !== 'JSXOpeningElement') return;
    for (const attr of node.attributes) {
      const name = attr.name?.name;
      const value = attr.value?.expression ?? attr.value;
      if (!value) continue;
      if (
        iconNames.has(node.name.name) &&
        name === 'size' &&
        value.type === 'Literal' &&
        /^\d+(\.\d+)?$/.test(String(value.value))
      ) {
        report(attr, 'usa una utilidad de tamaño de icono');
      }
      if (['class', 'class:list', 'inputClass'].includes(name)) {
        walkAst(value, (part) => {
          if (
            part.type === 'Literal' &&
            typeof part.value === 'string' &&
            (arbitraryUtility.test(part.value) || stockRadius.test(part.value))
          )
            report(attr, `utilidad visual arbitraria: ${part.value}`);
        });
      }
      if (
        colors.test(name ?? '') &&
        value.type === 'Literal' &&
        literalColor.test(String(value.value)) &&
        !illustrationPaint.get(path)?.has(value.value)
      ) {
        report(attr, 'pigmento de interfaz literal');
      }
      if (name !== 'style') continue;
      const check = (prop, css) => {
        const rule = declarationRule(prop, String(css));
        if (rule) report(attr, `${rule} en estilo inline (${prop})`);
      };
      if (value.type === 'Literal' && typeof value.value === 'string') {
        postcss
          .parse(`x{${value.value}}`, { from: path })
          .walkDecls(({ prop, value }) => check(prop, value));
      }
      walkAst(value, (part) => {
        if (part.type !== 'Property' || part.value?.type !== 'Literal') return;
        const prop = part.key.name ?? part.key.value;
        if (typeof prop === 'string')
          check(
            prop.startsWith('--')
              ? prop
              : prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
            part.value.value,
          );
      });
    }
  });
  return { styles, scripts, errors };
}

export function inspectScript(path, code) {
  const source = ts.createSourceFile(
    path,
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const errors = [];
  const imports = new Set();
  function visit(node) {
    const specifier =
      ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
        ? node.moduleSpecifier
        : ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword
          ? node.arguments[0]
          : undefined;
    const typeOnly = ts.isImportDeclaration(node)
      ? node.importClause?.isTypeOnly
      : ts.isExportDeclaration(node) && node.isTypeOnly;
    if (!typeOnly && specifier && ts.isStringLiteralLike(specifier))
      imports.add(specifier.text);
    if (ts.isPropertyAssignment(node)) {
      const property = node.name.getText(source).replace(/^['"]|['"]$/g, '');
      const literal =
        ts.isStringLiteralLike(node.initializer) ||
        ts.isNumericLiteral(node.initializer);
      if (
        literal &&
        path.startsWith('src/motion/') &&
        /^(?:duration|delay|ease|loopDelay)$/.test(property)
      )
        errors.push(`${path}: ${property} debe leer un Motion Token`);
      if (
        literal &&
        /^(?:color|background|border|fill|stroke|shadow)/i.test(property) &&
        (literalColor.test(node.initializer.text) ||
          namedColor.test(node.initializer.text))
      )
        errors.push(`${path}: pigmento literal de interfaz (${property})`);
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'setProperty'
    ) {
      const [key, css] = node.arguments;
      if (
        key &&
        css &&
        ts.isStringLiteralLike(key) &&
        ts.isStringLiteralLike(css) &&
        declarationRule(key.text, css.text)
      )
        errors.push(`${path}: literal visual en setProperty (${key.text})`);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return { errors, imports };
}
