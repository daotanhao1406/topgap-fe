import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { __unstable__loadDesignSystem } from '@tailwindcss/node';

const dir = 'src/features/matchup/components';
const files = fs.readdirSync(dir).filter(name => /\.(tsx|ts)$/.test(name));
const design = await __unstable__loadDesignSystem(fs.readFileSync('src/app/globals.css','utf8'),{base:path.resolve('src/app')});
const candidates = new Set();

function splitToken(token) {
  let level = 0; let last = -1;
  for (let i=0;i<token.length;i++) {
    if (token[i] === '[') level++;
    if (token[i] === ']') level--;
    if (token[i] === ':' && level === 0) last=i;
  }
  const utility = token.slice(last+1);
  return [token.slice(0,last+1),utility];
}

function simplify(value) {
  if (value.includes('text-[700]')) value = value.replace('not-italic font-normal text-[700] leading-[normal] font-[24px/1.25_var(--font-sans)]','font-sans text-[24px] font-bold leading-[1.25]');
  const contexts = new Map();
  for (let token of value.split(/\s+/)) {
    const [prefix,raw] = splitToken(token);
    const context = prefix.replaceAll('[&::before]:','before:').replaceAll('[&::after]:','after:').replaceAll('&_>_','&>').replaceAll('&_>','&>').replaceAll('_+_','+');
    const important = raw.endsWith('!'); let utility = important ? raw.slice(0,-1) : raw;
<<<<<<< ours
<<<<<<< ours
    utility = utility.replace(/^\[border(-(?:top|right|bottom|left))?-width:([^\]]+)\]$/,(_,side='',width)=>`border${{'-top':'-t','-right':'-r','-bottom':'-b','-left':'-l'}[side]??''}-${width==='1px'?'':width==='2px'?'2':width==='3px'?'[3px]':width==='0'?'0':`[${width}]`}`).replace(/^(border(?:-[trbl])?)-$/,'$1');
    utility = utility.replace(/^(border(?:-[trbl])?)-$/,'$1');
=======
    utility = utility.replace(/^\[border(-(?:top|right|bottom|left))?-width:([^\]]+)\]$/,(_,side='',width)=>`border${{'-top':'-t','-right':'-r','-bottom':'-b','-left':'-l'}[side]??''}-${width==='1px'?'':width==='2px'?'2':width==='3px'?'[3px]':width==='0'?'0':`[${width}]`}`).replace(/^border-$/,'border');
>>>>>>> theirs
=======
    utility = utility.replace(/^\[border(-(?:top|right|bottom|left))?-width:([^\]]+)\]$/,(_,side='',width)=>`border${{'-top':'-t','-right':'-r','-bottom':'-b','-left':'-l'}[side]??''}-${width==='1px'?'':width==='2px'?'2':width==='3px'?'[3px]':width==='0'?'0':`[${width}]`}`).replace(/^border-$/,'border');
>>>>>>> theirs
    utility = utility.replace(/^\[border(-(?:top|right|bottom|left))?-style:([^\]]+)\]$/,(_,side='',style)=>side ? `[border${side}-style:${style}]` : `border-${style}`);
    utility = utility.replace(/^\[border(-(?:top|right|bottom|left))?-color:([^\]]+)\]$/,(_,side='',color)=>`border${{'-top':'-t','-right':'-r','-bottom':'-b','-left':'-l'}[side]??''}-[${color.startsWith('var(')?'color:':''}${color}]`);
    utility = utility.replace(/^\[background:(var\(--[\w-]+\)|#[a-fA-F0-9]+)\]$/,(_,color)=>`bg-[${color.startsWith('var(')?'color:':''}${color}]`);
    utility = utility.replace(/^\[background(-image)?:(.*gradient.*)\]$/,(_,image,gradient)=>`bg-[${gradient}]`);
    utility = utility.replace(/^\[box-shadow:(.*)\]$/,'shadow-[$1]');
    utility = utility.replace(/^\[grid-template-columns:(.*)\]$/,'grid-cols-[$1]').replace(/^\[grid-template-rows:(.*)\]$/,'grid-rows-[$1]');
    utility = utility.replace(/^\[grid-column:1_\/_-1\]$/,'col-span-full').replace(/^\[grid-column:auto\]$/,'col-auto').replace(/^\[grid-column:3\]$/,'col-start-3').replace(/^\[grid-row:1\]$/,'row-start-1');
    utility = utility.replace(/^\[content:''\]$/,"content-['']").replace(/^font-\[Georgia/,'font-[family-name:Georgia');
    const key = context+(important?'!':'');
    if (!contexts.has(key)) contexts.set(key,{context,important,utilities:[]});
    contexts.get(key).utilities.push(utility);
  }
  const result=[];
  for (const {context,important,utilities} of contexts.values()) {
    const merged = new Set(utilities);
    for (const kind of ['p','m']) {
      for (const [target,a,b] of [[`${kind}x`,`${kind}l`,`${kind}r`],[`${kind}y`,`${kind}t`,`${kind}b`],[kind,`${kind}x`,`${kind}y`]]) {
        const left = [...merged].find(u=>u.startsWith(`${a}-`));
        const right = [...merged].find(u=>u.startsWith(`${b}-`));
        if (left && right && left.slice(a.length+1)===right.slice(b.length+1)) { merged.delete(left); merged.delete(right); merged.add(`${target}-${left.slice(a.length+1)}`); }
      }
    }
    for (const utility of merged) result.push(context+utility+(important?'!':''));
  }
  return result.join(' ');
}

for (const filename of files) {
  const file=path.join(dir,filename); let source=fs.readFileSync(file,'utf8');
<<<<<<< ours
<<<<<<< ours
  source=source.replaceAll('group/reference-cooldown ','').replaceAll('group-[&]/reference-cooldown:','[&+&]:');
  if (filename==='level-trades.tsx') source=source.replace('mb-[18px] text-', 'font-bold mb-[18px] text-');
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  if (filename==='arena-matchup.tsx') source=source.replace('[color-scheme:dark] w-full','[color-scheme:dark] [html.light_&]:[color-scheme:light] w-full');
  // The picker and ability loadouts share identical layout utilities.
  source=source.replace(/className=\{`\$\{("flex justify-center[^\n]+?")\} \$\{"justify-center max-\[699px\]:justify-start"\}`\}/g,'className={$1}');
  const tree=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,filename.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  const edits=[];
  function visit(node) {
    if (ts.isStringLiteral(node) && /(?:\[|\bflex\b|\bgrid\b|\babsolute\b|\bblock\b|\bmin-w-0\b)/.test(node.text) && node.text.includes(' ') && !node.text.includes('/images') || ts.isStringLiteral(node) && node.text.startsWith('[--page:')) {
      const value=simplify(node.text);
      value.split(/\s+/).forEach(c=>candidates.add(c));
      edits.push({start:node.getStart(tree),end:node.end,text:JSON.stringify(value)});
    }
    ts.forEachChild(node,visit);
  }
  visit(tree);
  for (const edit of edits.reverse()) source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
  source=source.replace(/className=\{("(?:[^"\\]|\\.)*")\}/g,'className=$1');
  fs.writeFileSync(file,source);
}
const css=design.candidatesToCss([...candidates]);
const invalid=[...candidates].filter((candidate,i)=>!css[i] && !candidate.startsWith('group/'));
console.log(`Checked ${candidates.size} distinct Tailwind candidates; ${invalid.length} invalid.`);
console.log(invalid);
console.log('Group example:',design.candidatesToCss(['group-[&]/reference-arenaCards:border-[color:var(--arena-edge)]'])[0]);
console.log('Font example:',design.candidatesToCss(["font-[family-name:Georgia,_'Times_New_Roman',_serif]"])[0]);
if (invalid.length) process.exitCode=1;
