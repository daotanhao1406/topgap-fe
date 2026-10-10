const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const dir = 'src/features/matchup/components';
const sources = ['reference-matchup', 'arena-shell', 'arena-stage', 'level-trades'];

function split(value, delimiter = ',') {
  const result = []; let start = 0; let depth = 0; let quote = '';
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    if (quote) { if (c === quote && value[i - 1] !== '\\') quote = ''; }
    else if (c === '"' || c === "'") quote = c;
    else if ('(['.includes(c)) depth++;
    else if (')]'.includes(c)) depth--;
    else if (!depth && (delimiter === ' ' ? /\s/.test(c) : c === delimiter)) {
      if (value.slice(start, i).trim()) result.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  if (value.slice(start).trim()) result.push(value.slice(start).trim());
  return result;
}

function expand(prop, value) {
  const values = split(value, ' ');
  if (prop === 'margin' || prop === 'padding') {
    const [a, b = a, c = a, d = b] = values;
    return Object.fromEntries(['top', 'right', 'bottom', 'left'].map((side, i) => [`${prop}-${side}`, [a,b,c,d][i]]));
  }
  if (/^(margin|padding)-(inline|block)$/.test(prop)) {
    const [base, axis] = prop.split('-');
    return Object.fromEntries((axis === 'inline' ? ['left','right'] : ['top','bottom']).map((side, i) => [`${base}-${side}`, values[i] ?? values[0]]));
  }
  if (/^border(-(top|right|bottom|left))?$/.test(prop)) {
    const prefix = prop;
    const width = values.find(v => /^\d|^thin$|^medium$|^thick$/.test(v)) ?? (value === '0' ? '0' : 'medium');
    const style = values.find(v => /^(solid|dashed|dotted|double|none)$/.test(v)) ?? (value === '0' ? 'none' : 'solid');
    const color = values.find(v => v !== width && v !== style) ?? 'currentColor';
    return { [`${prefix}-width`]: width, [`${prefix}-style`]: style, [`${prefix}-color`]: color };
  }
  if (prop === 'font') {
    const sizeIndex = values.findIndex(v => /^\d/.test(v));
    const [size, line = 'normal'] = values[sizeIndex].split('/');
    return { 'font-style': values.includes('italic') ? 'italic' : 'normal', 'font-weight': values.includes('bold') ? '700' : values.slice(0,sizeIndex).find(v => /^\d/.test(v)) ?? '400', 'font-size': size, 'line-height': line, 'font-family': values.slice(sizeIndex+1).join(' ') };
  }
  return { [prop]: value };
}

const literal = {
  'display:block':'block', 'display:inline':'inline', 'display:flex':'flex', 'display:inline-flex':'inline-flex', 'display:grid':'grid', 'display:inline-block':'inline-block', 'display:none':'hidden',
  'position:relative':'relative','position:absolute':'absolute','isolation:isolate':'isolate','overflow:hidden':'overflow-hidden','overflow:visible':'overflow-visible','overflow-x:auto':'overflow-x-auto',
  'align-items:center':'items-center','align-items:start':'items-start','align-items:flex-start':'items-start','align-items:stretch':'items-stretch','align-self:center':'self-center','align-self:stretch':'self-stretch',
  'justify-content:center':'justify-center','justify-content:space-between':'justify-between','justify-content:flex-start':'justify-start','justify-self:end':'justify-self-end','justify-self:start':'justify-self-start','place-items:center':'place-items-center',
  'flex-direction:column':'flex-col','flex-direction:row':'flex-row','flex-wrap:wrap':'flex-wrap','flex-shrink:0':'shrink-0','flex:1':'flex-1','flex-basis:100%':'basis-full',
  'text-align:center':'text-center','text-align:left':'text-left','white-space:nowrap':'whitespace-nowrap','text-transform:uppercase':'uppercase','text-decoration:none':'no-underline','font-variant-numeric:tabular-nums':'tabular-nums',
  'object-fit:cover':'object-cover','pointer-events:none':'pointer-events-none','cursor:pointer':'cursor-pointer','box-shadow:none':'shadow-none','outline:none':'outline-none','background:transparent':'bg-transparent','background-image:none':'bg-none','list-style:none':'list-none',
  'border-radius:50%':'rounded-full','border-radius:0':'rounded-none','font-style:italic':'italic','font-style:normal':'not-italic','font-family:var(--font-sans)':'font-sans','font-weight:700':'font-bold','font-weight:600':'font-semibold','font-weight:500':'font-medium','font-weight:400':'font-normal',
  'transition:none':'transition-none','animation:none':'animate-none','scroll-behavior:auto':'scroll-auto',
  'grid-template-columns:repeat(2, minmax(0, 1fr))':'grid-cols-2','grid-template-columns:repeat(3, minmax(0, 1fr))':'grid-cols-3','grid-template-columns:repeat(4, minmax(0, 1fr))':'grid-cols-4',
};
const prefixes = {'width':'w','height':'h','min-width':'min-w','min-height':'min-h','max-width':'max-w','max-height':'max-h','top':'top','right':'right','bottom':'bottom','left':'left','inset':'inset','gap':'gap','row-gap':'gap-y','z-index':'z','font-size':'text','line-height':'leading','letter-spacing':'tracking','font-weight':'font','font-family':'font','object-position':'object','border-radius':'rounded','opacity':'opacity','outline-offset':'outline-offset','scroll-margin-top':'scroll-mt','vertical-align':'align','order':'order'};
function arbitrary(value) { return value.replace(/\s+/g, '_').replaceAll('"', "'"); }
function utility(prop, value) {
  const direct = literal[`${prop}:${value}`]; if (direct) return direct;
  if (/^(margin|padding)-(top|right|bottom|left)$/.test(prop)) {
    const [base,side] = prop.split('-'); const prefix = `${base[0]}${side[0]}`;
    if (value === 'auto') return `${prefix}-auto`;
    return `${prefix}-${/^0(px)?$/.test(value) ? '0' : `[${arbitrary(value)}]`}`;
  }
  if (prop === 'color') return value === 'inherit' ? 'text-inherit' : `text-[${value.startsWith('var(') ? 'color:' : ''}${arbitrary(value)}]`;
  if (prefixes[prop]) {
    if (['width','height','min-width','min-height','max-width','max-height'].includes(prop) && value === '100%') return `${prefixes[prop]}-full`;
    if (['width','height'].includes(prop) && value === 'auto') return `${prefixes[prop]}-auto`;
    if (['gap','min-width','min-height','inset','top','right','bottom','left'].includes(prop) && /^0(px)?$/.test(value)) return `${prefixes[prop]}-0`;
    return `${prefixes[prop]}-[${arbitrary(value)}]`;
  }
  return `[${prop}:${arbitrary(value)}]`;
}

const maps = {};
const groups = {};
for (const source of sources) {
  const short = source === 'reference-matchup' ? 'reference' : source === 'arena-shell' ? 'arena' : source === 'arena-stage' ? 'duel' : 'trades';
  const root = postcss.parse(fs.readFileSync(path.join(dir, `${source}.module.css`),'utf8'));
  const buckets = {}; const groupKeys = new Set();
  root.walkRules(rule => {
    let media = ''; if (rule.parent.type === 'atrule') {
      const width = rule.parent.params.match(/max-width:\s*(\d+)px/);
      media = width ? `max-[${width[1]}px]:` : 'motion-reduce:';
    }
    for (let selector of split(rule.selector)) {
      let theme = ''; if (selector.startsWith(':global(html.light) ')) { theme = '[html.light_&]:'; selector = selector.replace(':global(html.light) ', ''); }
      // Root resets are already supplied by Tailwind Preflight. Keep link and focus defaults scoped with zero-specificity ancestors.
      if (selector.startsWith('.root :is(h') || selector === '.root h2:where(:not([data-matchup-cards] *))' || selector === '.root h3:where(:not([data-matchup-cards] *))') continue;
      if (source === 'arena-shell') selector = selector.replace(/^\.arena /, '').replace(/^\.root (?=\.)/, '');
      if (source === 'level-trades') selector = selector.replace(/^\.section (?=\.title)/, '').replace(/^\.grid (?=\.card)/, '').replace(/^\.card (?=\.summary)/, '');
      if (source === 'arena-stage') selector = selector.replace(/^\.center (?=\.swap)/, '');
      const matches = [...selector.matchAll(/\.([a-zA-Z][\w-]*)/g)];
      if (!matches.length) throw new Error(`No anchor: ${selector}`);
      let anchor = matches.at(-1); let key = anchor[1]; let before = selector.slice(0,anchor.index); let suffix = selector.slice(anchor.index+anchor[0].length);
      if (source === 'arena-shell' && key === 'arena') key = 'root';
      // These ancestor scopes are guaranteed by component composition; conditional scopes get named Tailwind groups.
      let context = '';
      if (source === 'arena-stage' && key === 'enemy' && before === '.champion') { key = 'champion'; before = ''; context = 'data-[enemy]:'; }
      if (key === 'arenaCards' && before === '.root') before = '';
      for (const parent of [...before.matchAll(/\.([a-zA-Z][\w-]*)([^.]*?)(?=\s+\.|$)/g)]) {
        const parentKey = parent[1]; if (parentKey === 'root') continue;
        if (source === 'arena-shell' && parentKey === 'arena') continue;
        const name = `${short}-${parentKey}`; groupKeys.add(parentKey);
        const state = parent[2].trim();
        if (state === ':hover') context += `group-hover/${name}:`;
        else if (state === '[aria-pressed="true"]') context += `group-aria-pressed/${name}:`;
        else context += `group-[&]/${name}:`;
      }
      if (source === 'arena-stage' && before.trim() === '.enemy') { context = 'group-data-[enemy]/duel-champion:'; groupKeys.delete('enemy'); groupKeys.add('champion'); }
      const prefix = theme + media + context;
      let variant = '';
      if (suffix) {
        // Descendant defaults must not outrank component utilities.
        if (key === 'root') variant = `[:where(&)${arbitrary(suffix)}]:`;
        else variant = `[&${arbitrary(suffix)}]:`;
      }
      const bucketKey = prefix + variant;
      const bucketsForKey = buckets[key] ??= new Map();
      const declarations = bucketsForKey.get(bucketKey) ?? new Map(); bucketsForKey.set(bucketKey, declarations);
      rule.walkDecls(decl => {
        for (const [prop,value] of Object.entries(expand(decl.prop,decl.value.replace(/\s+/g,' ')))) declarations.set(prop,{value,important:!!decl.important});
      });
    }
  });
  maps[source] = {buckets, short}; groups[source] = groupKeys;
}

function render(source,key) {
  const {buckets,short} = maps[source];
  const entries = buckets[key]; if (!entries) throw new Error(`Missing ${source}.${key}`);
  const classes = [];
  if (groups[source].has(key)) classes.push(`group/${short}-${key}`);
  if (source === 'arena-stage' && key === 'champion') classes.push('group/duel-champion');
  for (const [variant,decls] of entries) {
    for (const [prop,{value,important}] of decls) classes.push(variant+utility(prop,value)+(important?'!':''));
  }
  return [...new Set(classes)].join(' ');
}

// Arena uses the same card components with inherited Arena tokens, without the reference wallpaper or page padding.
const ref = maps['reference-matchup'].buckets;
const arenaRoot = new Map();
for (const [variant,decls] of ref.root) {
  if (variant.includes('html.light') || variant.startsWith('max-')) continue;
  arenaRoot.set(variant,new Map(decls));
}
for (const [variant,decls] of ref.arenaCards) {
  if (!arenaRoot.has(variant)) arenaRoot.set(variant,new Map());
  for (const [prop,value] of decls) arenaRoot.get(variant).set(prop,value);
}
ref.arenaCards = arenaRoot;

const sharedKeys = {panel:'matchupPanelClasses',panelHeading:'matchupPanelHeadingClasses',planBody:'matchupPlanBodyClasses'};
const shared = Object.entries(sharedKeys).map(([key,name]) => `export const ${name} = ${JSON.stringify(render('reference-matchup',key))};`).join('\n\n')+'\n';
fs.writeFileSync(path.join(dir,'matchup-classes.ts'),shared);

for (const filename of fs.readdirSync(dir).filter(f=>f.endsWith('.tsx'))) {
  const file = path.join(dir,filename); let content = fs.readFileSync(file,'utf8');
  const aliases = [...content.matchAll(/import (\w+) from "\.\/([\w-]+)\.module\.css";/g)];
  if (!aliases.length) continue;
  const imports = new Set();
  content = content.replace(/import \w+ from "\.\/[\w-]+\.module\.css";\r?\n/g,'');
  // Collapse unconditional root compositions before replacing individual references.
  content = content.replace('`${styles.root} ${styles.arena}`','styles.root');
  content = content.replace('`${cardStyles.root} ${cardStyles.arenaCards}`','cardStyles.arenaCards');
  // Give the enemy champion a semantic state attribute instead of a styling class.
  content = content.replace('className={`${styles.champion} ${index === 1 ? styles.enemy : ""}`}','data-enemy={index === 1 || undefined}\n            className={styles.champion}');
  // Use complete alternatives to avoid conflicting grid utilities on the same element.
  content = content.replace('`${styles.contentGrid} ${variant === "quick" ? styles.contentGridWithoutLoadout : ""}`', 'variant === "quick" ? styles.quickContentGrid : styles.contentGrid');
  if (filename === 'matchup-cards.tsx') {
    const quick = new Map([...ref.contentGrid].map(([variant,decls])=>[variant,new Map(decls)]));
    for (const [variant,decls] of ref.contentGridWithoutLoadout) {
      if (!quick.has(variant)) quick.set(variant,new Map());
      for (const [prop,value] of decls) quick.get(variant).set(prop,value);
    }
    // Full and quick card grids both collapse to one column on mobile.
    quick.set('max-[700px]:',new Map([['grid-template-columns',{value:'1fr',important:false}]]));
    ref.quickContentGrid = quick; groups['reference-matchup'].add('quickContentGrid');
  }
  for (const [,alias,source] of aliases) {
    content = content.replace(new RegExp(`${alias}\\.(\\w+)`,'g'), (_,key)=> {
      if (source==='reference-matchup' && sharedKeys[key]) { imports.add(sharedKeys[key]); return sharedKeys[key]; }
      return JSON.stringify(render(source,key));
    });
  }
  if (imports.size) {
    const statement = `import { ${[...imports].join(', ')} } from "./matchup-classes";\n`;
    const lastImport = [...content.matchAll(/^import [\s\S]*?;\r?\n/gm)].at(-1);
    content = content.slice(0,lastImport.index+lastImport[0].length)+statement+content.slice(lastImport.index+lastImport[0].length);
  }
  // The quick-grid ancestor marker is named for the public component state.
  content = content.replaceAll('reference-contentGridWithoutLoadout','reference-quickContentGrid');
  fs.writeFileSync(file,content);
}

// All nonzero class declarations are now expressed as Tailwind utilities.
for (const source of sources) fs.unlinkSync(path.join(dir,`${source}.module.css`));
fs.writeFileSync('.tmp-tailwind-map.json',JSON.stringify(Object.fromEntries(sources.map(source=>[source,Object.fromEntries(Object.keys(maps[source].buckets).map(key=>[key,render(source,key)]))])),null,2));
console.log('Converted four CSS Modules to Tailwind classes.');
