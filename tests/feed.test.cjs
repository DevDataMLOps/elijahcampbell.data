const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/phase2.js'), 'utf8');

class Element {
  constructor() {
    this.children = []; this.attrs = {}; this.listeners = {}; this.textContent = '';
    const classes = new Set();
    this.classList = {
      add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x),
      toggle: x => { if (classes.has(x)) { classes.delete(x); return false; } classes.add(x); return true; }
    };
  }
  append(child) { this.children.push(child); }
  replaceChildren() { this.children = []; }
  setAttribute(k,v) { this.attrs[k] = v; }
  addEventListener(k,v) { this.listeners[k] = v; }
  querySelectorAll() { return []; }
  focus() { this.focused = true; }
  // Any attempt to render API data as HTML is a regression.
  set innerHTML(value) { assert.match(value, /^<i class="fas fa-(sun|moon)" aria-hidden="true"><\/i>$/); }
}
async function run({payload=[],ok=true,reject=false,storageError=false,timeout=false,observe=false,reduced=false}={}) {
  const elements = Object.fromEntries(['.theme-toggle','.nav-toggle','.nav-links','.site-header','#year','#repo-grid','#repo-status'].map(k=>[k,new Element()]));
  const listeners = {};
  const reveal = new Element();
  const root = {dataset:{theme:'dark'}};
  let timer, cleared = false, saved;
  const document = {
    documentElement:root, querySelector:s=>elements[s], querySelectorAll:()=>[reveal],
    createElement:()=>new Element(), addEventListener:(k,v)=>listeners[k]=v
  };
  const context = {
    document,window:{},matchMedia:()=>({matches:reduced}),Date,AbortController,
    localStorage:{getItem:()=>{if(storageError)throw Error();return saved;},setItem:(k,v)=>{if(storageError)throw Error();saved=v;}},
    addEventListener:()=>{},setTimeout:fn=>{timer=fn;return 1;},clearTimeout:()=>{cleared=true;},
    fetch:async (url,{signal})=>{
      assert.match(url,/sort=updated&direction=desc/);
      if(timeout) return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))));
      if(reject)throw Error('offline');
      return {ok,json:async()=>payload};
    }
  };
  if(observe) {
    context.IntersectionObserver=class { observe(){} unobserve(){} };
    context.window.IntersectionObserver=context.IntersectionObserver;
  }
  vm.runInNewContext(source, context);
  if(timeout)timer();
  await new Promise(resolve=>setImmediate(resolve));
  return {elements,listeners,root,reveal,cleared};
}
test('untrusted content stays text; URL and counts cannot inject markup', async()=>{
  const attack='<img src=x onerror=alert(1)>';
  const {elements}=await run({payload:[{name:'Safe-Repo',description:attack,language:attack,html_url:'javascript:alert(1)',stargazers_count:attack,forks_count:-1},{name:'../escape'},{name:'bad" onclick="alert(1)'}]});
  const cards=elements['#repo-grid'].children;
  assert.equal(cards.length,1);
  assert.equal(cards[0].children[1].textContent,attack);
  assert.equal(cards[0].children[2].children[1].textContent,'0 stars');
  assert.equal(cards[0].children[3].href,'https://github.com/DevDataMLOps/Safe-Repo');
});
for(const [name,options] of Object.entries({offline:{reject:true},http:{ok:false},malformed:{payload:{}},empty:{payload:[]},timeout:{timeout:true}})) {
  test(name+' produces four verified links and clears timeout',async()=>{
    const {elements,cleared}=await run(options);
    assert.equal(elements['#repo-grid'].children.length,4);
    assert.match(elements['#repo-status'].textContent,/verified repository links/);
    assert.equal(cleared,true);
    for(const card of elements['#repo-grid'].children) assert.match(card.children[3].href,/^https:\/\/github.com\/DevDataMLOps\//);
  });
}
test('activity order preserved, forks and archives excluded, six-card cap',async()=>{
  const {elements}=await run({payload:[{name:'fork',fork:true},{name:'archive',archived:true},...Array.from({length:8},(_,i)=>({name:'Repo'+i}))]});
  const cards=elements['#repo-grid'].children;
  assert.equal(cards.length,6);assert.equal(cards[0].children[0].textContent,'Repo0');assert.equal(cards[5].children[0].textContent,'Repo5');
});
test('disabled storage does not break theme, navigation or repository fallback',async()=>{
  const {elements,root,listeners}=await run({storageError:true});
  elements['.theme-toggle'].listeners.click();assert.equal(root.dataset.theme,'light');
  elements['.nav-toggle'].listeners.click();assert.equal(elements['.nav-toggle'].attrs['aria-expanded'],'true');
  listeners.keydown({key:'Escape'});assert.equal(elements['.nav-toggle'].attrs['aria-expanded'],'false');assert.equal(elements['.nav-toggle'].focused,true);
  assert.equal(elements['#repo-grid'].children.length,4);
});
test('reduced motion and absent observer leave content visible',async()=>{
  for(const options of [{observe:false},{observe:true,reduced:true}]) {
    const {reveal}=await run(options);assert.equal(reveal.classList.contains('reveal-pending'),false);
  }
});
