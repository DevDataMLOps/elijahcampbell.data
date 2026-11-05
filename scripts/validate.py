"""Dependency-free checks for the active static portfolio; --external checks HTTP links."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import sys

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]; self.assets=[]; self.cards=0
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.append(attrs['id'])
        if tag=='a':self.links.append(attrs.get('href',''))
        if tag in ('script','img'):self.assets.append(attrs.get('src',''))
        if tag=='link' and attrs.get('rel')=='stylesheet':self.assets.append(attrs['href'])
        if tag=='img':assert attrs.get('alt'), 'Image missing description'
        if tag=='article' and 'case-study' in attrs.get('class','').split():self.cards+=1
        if attrs.get('target')=='_blank':assert 'noopener' in attrs.get('rel',''), 'Unsafe external target'

def main():
    page=Page(); text=(ROOT/'index.html').read_text(encoding='utf-8');page.feed(text)
    assert page.cards==4,'Expected four curated case studies'
    assert len(page.ids)==len(set(page.ids)),'Duplicate ID'
    for value in page.links+page.assets:
        assert value,'Empty URL'
        parsed=urlparse(value)
        if parsed.scheme:
            assert parsed.scheme in ('https','mailto'),f'Unexpected URL: {value}'
            continue
        if parsed.path:assert (ROOT/unquote(parsed.path)).is_file(),f'Missing local file: {value}'
        if parsed.fragment:assert parsed.fragment in page.ids,f'Broken anchor: {value}'
    assert (ROOT/'ElijahC-DataCloud.pdf').read_bytes().startswith(b'%PDF-'),'Invalid resume PDF'
    for legacy in ['30%','40%','£10K','£10,000']:
        assert legacy not in text,f'Unsubstantiated homepage claim: {legacy}'
    for title in ['Cloud &amp;','My contribution.','Project-based training','Evidence boundary.','prefers-reduced-motion']:
        assert title in text+(ROOT/'assets/css/phase2.css').read_text(),title
    evidence=(ROOT/'docs/portfolio-evidence.md').read_text(encoding='utf-8')
    for claim in ['88.21%','95.55%','1,000,000','2,938','13/13','8 of 51','243,553','223,966','19,587']:
        assert claim in text and claim in evidence,f'Missing evidence mapping: {claim}'
    print(f'PASS: four studies, {len(page.ids)} unique anchors, {len(page.links)} links, {len(page.assets)} assets, resume and claim mapping')
    if '--external' in sys.argv:
        urls=sorted({v for v in page.links if v.startswith('https://')})
        def check(url):
            try:
                with urlopen(Request(url,headers={'User-Agent':'Portfolio-Link-Check/2.0'}),timeout=40) as response:
                    return url,response.status
            except Exception as exc:return url,str(exc)
        failed=[]
        with ThreadPoolExecutor(max_workers=6) as pool:
            for url,result in pool.map(check,urls):
                print(result,url)
                if result!=200:failed.append((url,result))
        print(f'External links: {len(urls)-len(failed)}/{len(urls)} returned HTTP 200')
        if failed:sys.exit(1)
if __name__=='__main__':main()
