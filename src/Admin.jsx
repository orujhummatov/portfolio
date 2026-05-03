import { useState } from 'react'

const ADMIN_PASSWORD = 'admin2024'
const REPO = 'orujhummatov/portfolio'

const defaultHero = {
  name: 'Oruj Hummatov',
  rolesText: 'Product Manager\nStartup Founder\nCybersecurity Researcher\nCommunity Builder',
  location: '📍 Baku, Azerbaijan',
}
const defaultAbout = {
  paragraphs: [
    'I am a Product Manager, Startup Founder, and Cybersecurity Researcher based in Baku, Azerbaijan.',
    'Currently pursuing my MSc in Cyber Security at Baku Engineering University, with a dissertation focused on Quantum-based information protection in optical communication systems.',
    'Founder of StarTap, a student mentorship and startup community program with 14 mentor tracks.',
  ],
  stats: [
    { number: '7+', label: 'Projects', icon: '🚀' },
    { number: '3+', label: 'Competitions', icon: '🏆' },
    { number: '2', label: 'Active Startups', icon: '💡' },
    { number: 'MSc', label: 'Cyber Security', icon: '🎓' },
  ],
}
const defaultProjects = [
  { icon: '🗺️', title: 'gAIde', desc: 'AI-driven city exploration mobile app.', tags: 'AI, Mobile, React Native' },
  { icon: '🍽️', title: 'NUSH', desc: "Azerbaijan's first certified home chefs marketplace.", tags: 'Marketplace, FoodTech, Startup' },
  { icon: '🌱', title: 'EkoEthanol', desc: 'Zero-waste bio-refinery converting bread waste and sheep wool into ethanol.', tags: 'BioTech, Sustainability' },
  { icon: '📅', title: 'Schedify', desc: 'AI-driven university scheduling SaaS for Azerbaijan and Central Asia.', tags: 'SaaS, AI, EdTech' },
  { icon: '🛠️', title: 'AppForge', desc: 'No-code mobile app builder.', tags: 'No-Code, React, Vite' },
  { icon: '🐾', title: 'PETTY', desc: 'Transparent animal welfare and donation platform for Azerbaijan.', tags: 'Social Impact, Transparency, Azerbaijan' },
  { icon: '🏛️', title: 'BEU Technopark Platform', desc: 'Commercial services platform with Bronze/Silver/Gold membership tiers.', tags: 'B2B, Platform, Technopark' },
]
const defaultCompetitions = [
  { comp: 'IsDB Innovation Pitch 2026', project: 'NUSH', status: 'Completed', color: '#00ff9d' },
  { comp: 'KOBİA Grant (~18,655 AZN)', project: 'NUSH', status: 'Completed', color: '#00ff9d' },
  { comp: 'TEKNOFEST 2026 Biotechnology', project: 'EkoEthanol', status: 'Positive Progress', color: '#00d4ff' },
  { comp: 'İZİA Investment Plan', project: 'EkoEthanol', status: 'Prepared', color: '#00ff9d' },
  { comp: 'StartupSchool.az Season 4', project: 'NUSH + EkoEthanol', status: 'Applied', color: '#00ff9d' },
  { comp: 'QS Reimagine Education Awards 2026', project: 'StarTap', status: 'Strongest Candidate', color: '#f59e0b' },
]
const defaultTimeline = [
  { date: '2024 — Present', title: 'Innovation & Startup PM', org: 'BEU Technopark', desc: 'Leading commercial platform development, Founder Institute & Plug and Play partnerships.', current: true },
  { date: '2024 — Present', title: 'Founder & Lead', org: 'StarTap Program', desc: '14 mentor tracks, weekly English sessions, monthly expert events.', current: true },
  { date: '2023 — Present', title: 'MSc Cyber Security', org: 'Baku Engineering University', desc: 'Dissertation: Quantum-based information protection in optical communication systems.', current: true },
  { date: '2019 — 2023', title: 'B.Sc. Information Technologies', org: 'BEU', desc: 'Erasmus+ international exchange program participant.', current: false },
  { date: '2022 — 2023', title: 'Engineer', org: 'Global Protech', desc: 'Software engineering and product development experience.', current: false },
]
const defaultContact = {
  email: 'ohummatov@beu.edu.az',
  linkedin: 'https://linkedin.com/in/oruj-hummatov',
  tagline: 'Open to collaborations, partnerships, and new opportunities.',
}

const inp = { width:'100%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',padding:'0.6rem 1rem',borderRadius:'8px',fontSize:'0.9rem',outline:'none',boxSizing:'border-box',fontFamily:'inherit' }
const lbl = { color:'rgba(255,255,255,0.6)',fontSize:'0.8rem',marginBottom:'0.3rem',display:'block' }
const card = { background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'1.25rem',marginBottom:'1rem' }
const btnP = { background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',border:'none',color:'#fff',padding:'0.65rem 1.5rem',borderRadius:'8px',fontWeight:700,cursor:'pointer',fontSize:'0.9rem' }
const btnD = { background:'rgba(255,59,59,0.1)',border:'1px solid #ff3b3b',color:'#ff3b3b',padding:'0.4rem 0.8rem',borderRadius:'6px',cursor:'pointer',fontSize:'0.8rem' }
const btnA = { background:'rgba(0,212,255,0.1)',border:'1px solid #00d4ff',color:'#00d4ff',padding:'0.5rem 1rem',borderRadius:'8px',cursor:'pointer',fontSize:'0.85rem',marginTop:'0.5rem' }

export default function Admin() {
  const [authed, setAuthed] = useState(localStorage.getItem('adminAuth') === 'true')
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [tab, setTab] = useState('hero')
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)
  const [hero, setHero] = useState(defaultHero)
  const [about, setAbout] = useState(defaultAbout)
  const [projects, setProjects] = useState(defaultProjects)
  const [competitions, setCompetitions] = useState(defaultCompetitions)
  const [timeline, setTimeline] = useState(defaultTimeline)
  const [contact, setContact] = useState(defaultContact)
  const [ghToken, setGhToken] = useState(localStorage.getItem('ghToken') || '')
  const [tokenSaved, setTokenSaved] = useState(false)

  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),4000) }

  const login = () => {
    if (pw === ADMIN_PASSWORD) { localStorage.setItem('adminAuth','true'); setAuthed(true) }
    else { setPwErr(true); setTimeout(()=>setPwErr(false),2000) }
  }

  const logout = () => { localStorage.removeItem('adminAuth'); setAuthed(false); window.location.hash='' }

  const genDataJs = () => {
    const heroOut = { name:hero.name, roles:hero.rolesText.split('\n').filter(r=>r.trim()), location:hero.location }
    const projOut = projects.map(p => ({ ...p, tags:p.tags.split(',').map(t=>t.trim()).filter(Boolean) }))
    return `// src/data.js\n\nexport const heroData = ${JSON.stringify(heroOut,null,2)}\n\nexport const aboutData = ${JSON.stringify(about,null,2)}\n\nexport const projectsData = ${JSON.stringify(projOut,null,2)}\n\nexport const competitionsData = ${JSON.stringify(competitions,null,2)}\n\nexport const timelineData = ${JSON.stringify(timeline,null,2)}\n\nexport const contactData = ${JSON.stringify(contact,null,2)}\n`
  }

  const save = async () => {
    const token = localStorage.getItem('ghToken')
    if (!token) { showToast('⚠️ Əvvəlcə Settings-də token əlavə edin!',false); setTab('settings'); return }
    setSaving(true)
    try {
      const r = await fetch(`https://api.github.com/repos/${REPO}/contents/src/data.js`, { headers:{Authorization:`token ${token}`} })
      const f = await r.json()
      if (!f.sha) throw new Error('data.js tapılmadı')
      const encoded = btoa(unescape(encodeURIComponent(genDataJs())))
      const pr = await fetch(`https://api.github.com/repos/${REPO}/contents/src/data.js`, {
        method:'PUT', headers:{Authorization:`token ${token}`,'Content-Type':'application/json'},
        body:JSON.stringify({ message:'Admin: portfolio yeniləndi', content:encoded, sha:f.sha })
      })
      if (!pr.ok) throw new Error('Yazma xətası')
      showToast('✅ Saxlandı! Sayt ~1-2 dəq sonra yenilənəcək.')
    } catch(e) { showToast('❌ Xəta: '+e.message,false) }
    setSaving(false)
  }

  if (!authed) return (
    <div style={{minHeight:'100vh',background:'#0a0a0f',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'2.5rem',width:'100%',maxWidth:'380px'}}>
        <h1 style={{textAlign:'center',marginBottom:'0.5rem',background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontSize:'1.8rem',fontWeight:900}}>🔐 Admin Panel</h1>
        <p style={{textAlign:'center',color:'rgba(255,255,255,0.4)',marginBottom:'2rem',fontSize:'0.9rem'}}>Portfolio idarəetmə paneli</p>
        <label style={lbl}>Şifrə</label>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder="Şifrəni daxil edin" style={{...inp,marginBottom:'1rem',border:pwErr?'1px solid #ff3b3b':inp.border}} />
        {pwErr && <p style={{color:'#ff3b3b',fontSize:'0.85rem',marginBottom:'0.75rem'}}>❌ Yanlış şifrə</p>}
        <button onClick={login} style={{...btnP,width:'100%',padding:'0.8rem'}}>Daxil ol</button>
      </div>
    </div>
  )

  const tabs = [{id:'hero',label:'🏠 Hero'},{id:'about',label:'👤 About'},{id:'projects',label:'🚀 Projects'},{id:'competitions',label:'🏆 Competitions'},{id:'timeline',label:'📅 Timeline'},{id:'contact',label:'📬 Contact'},{id:'settings',label:'⚙️ Settings'}]

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0f',color:'#fff',fontFamily:'system-ui,sans-serif'}}>
      <div style={{background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1 style={{margin:0,background:'linear-gradient(135deg,#00d4ff,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontSize:'1.3rem',fontWeight:900}}>🎨 Portfolio Admin</h1>
        <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
          <a href="https://orujhummatov.github.io/portfolio/" target="_blank" rel="noreferrer" style={{color:'rgba(255,255,255,0.4)',fontSize:'0.85rem',textDecoration:'none'}}>Sayta bax →</a>
          <button onClick={logout} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.6)',padding:'0.4rem 1rem',borderRadius:'6px',cursor:'pointer',fontSize:'0.85rem'}}>🔓 Çıxış</button>
        </div>
      </div>
      <div style={{display:'flex',minHeight:'calc(100vh - 65px)'}}>
        <div style={{width:'200px',flexShrink:0,background:'rgba(255,255,255,0.02)',borderRight:'1px solid rgba(255,255,255,0.07)',padding:'1.5rem 0'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{width:'100%',textAlign:'left',padding:'0.75rem 1.5rem',background:tab===t.id?'rgba(0,212,255,0.1)':'transparent',border:'none',borderLeft:tab===t.id?'3px solid #00d4ff':'3px solid transparent',color:tab===t.id?'#00d4ff':'rgba(255,255,255,0.6)',cursor:'pointer',fontSize:'0.9rem',fontFamily:'inherit'}}>{t.label}</button>
          ))}
        </div>
        <div style={{flex:1,padding:'2rem',overflowY:'auto',paddingBottom:'6rem'}}>

          {tab==='hero' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>🏠 Hero</p>
            <div style={{marginBottom:'1rem'}}><label style={lbl}>Ad</label><input style={inp} value={hero.name} onChange={e=>setHero({...hero,name:e.target.value})} /></div>
            <div style={{marginBottom:'1rem'}}><label style={lbl}>Rollar (hər sətirdə bir rol)</label><textarea style={{...inp,minHeight:'100px',resize:'vertical'}} value={hero.rolesText} onChange={e=>setHero({...hero,rolesText:e.target.value})} /></div>
            <div style={{marginBottom:'1rem'}}><label style={lbl}>Məkan</label><input style={inp} value={hero.location} onChange={e=>setHero({...hero,location:e.target.value})} /></div>
          </div>}

          {tab==='about' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>👤 About</p>
            {about.paragraphs.map((p,i)=>(
              <div key={i} style={{marginBottom:'1rem'}}><label style={lbl}>Paraqraf {i+1}</label><textarea style={{...inp,minHeight:'80px',resize:'vertical'}} value={p} onChange={e=>{const a=[...about.paragraphs];a[i]=e.target.value;setAbout({...about,paragraphs:a})}} /></div>
            ))}
            <p style={{color:'#00d4ff',fontSize:'1rem',fontWeight:700,marginTop:'2rem',marginBottom:'1rem'}}>Statistikalar</p>
            {about.stats.map((s,i)=>(
              <div key={i} style={{...card,display:'grid',gridTemplateColumns:'80px 100px 1fr',gap:'0.75rem',alignItems:'center'}}>
                <div><label style={lbl}>İkon</label><input style={inp} value={s.icon} onChange={e=>{const a=[...about.stats];a[i]={...a[i],icon:e.target.value};setAbout({...about,stats:a})}} /></div>
                <div><label style={lbl}>Rəqəm</label><input style={inp} value={s.number} onChange={e=>{const a=[...about.stats];a[i]={...a[i],number:e.target.value};setAbout({...about,stats:a})}} /></div>
                <div><label style={lbl}>Etiket</label><input style={inp} value={s.label} onChange={e=>{const a=[...about.stats];a[i]={...a[i],label:e.target.value};setAbout({...about,stats:a})}} /></div>
              </div>
            ))}
          </div>}

          {tab==='projects' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>🚀 Layihələr</p>
            {projects.map((p,i)=>(
              <div key={i} style={card}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.75rem'}}><span style={{color:'rgba(255,255,255,0.7)',fontWeight:600}}>Layihə {i+1}</span><button style={btnD} onClick={()=>setProjects(projects.filter((_,j)=>j!==i))}>🗑️ Sil</button></div>
                <div style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:'0.75rem',marginBottom:'0.75rem'}}>
                  <div><label style={lbl}>İkon</label><input style={inp} value={p.icon} onChange={e=>{const a=[...projects];a[i]={...a[i],icon:e.target.value};setProjects(a)}} /></div>
                  <div><label style={lbl}>Başlıq</label><input style={inp} value={p.title} onChange={e=>{const a=[...projects];a[i]={...a[i],title:e.target.value};setProjects(a)}} /></div>
                </div>
                <div style={{marginBottom:'0.75rem'}}><label style={lbl}>Təsvir</label><textarea style={{...inp,minHeight:'70px',resize:'vertical'}} value={p.desc} onChange={e=>{const a=[...projects];a[i]={...a[i],desc:e.target.value};setProjects(a)}} /></div>
                <div><label style={lbl}>Etiketlər (vergüllə)</label><input style={inp} value={p.tags} onChange={e=>{const a=[...projects];a[i]={...a[i],tags:e.target.value};setProjects(a)}} /></div>
              </div>
            ))}
            <button style={btnA} onClick={()=>setProjects([...projects,{icon:'🆕',title:'',desc:'',tags:''}])}>➕ Layihə əlavə et</button>
          </div>}

          {tab==='competitions' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>🏆 Yarışmalar</p>
            {competitions.map((c,i)=>(
              <div key={i} style={card}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.75rem'}}><span style={{color:'rgba(255,255,255,0.7)',fontWeight:600}}>Yarışma {i+1}</span><button style={btnD} onClick={()=>setCompetitions(competitions.filter((_,j)=>j!==i))}>🗑️ Sil</button></div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'0.75rem'}}>
                  <div><label style={lbl}>Yarışma adı</label><input style={inp} value={c.comp} onChange={e=>{const a=[...competitions];a[i]={...a[i],comp:e.target.value};setCompetitions(a)}} /></div>
                  <div><label style={lbl}>Layihə</label><input style={inp} value={c.project} onChange={e=>{const a=[...competitions];a[i]={...a[i],project:e.target.value};setCompetitions(a)}} /></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 120px',gap:'0.75rem'}}>
                  <div><label style={lbl}>Status</label><input style={inp} value={c.status} onChange={e=>{const a=[...competitions];a[i]={...a[i],status:e.target.value};setCompetitions(a)}} /></div>
                  <div><label style={lbl}>Rəng (hex)</label><input style={inp} value={c.color} onChange={e=>{const a=[...competitions];a[i]={...a[i],color:e.target.value};setCompetitions(a)}} /></div>
                </div>
              </div>
            ))}
            <button style={btnA} onClick={()=>setCompetitions([...competitions,{comp:'',project:'',status:'',color:'#00ff9d'}])}>➕ Yarışma əlavə et</button>
          </div>}

          {tab==='timeline' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>📅 Təcrübə & Təhsil</p>
            {timeline.map((t,i)=>(
              <div key={i} style={card}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.75rem'}}><span style={{color:'rgba(255,255,255,0.7)',fontWeight:600}}>#{i+1}</span><button style={btnD} onClick={()=>setTimeline(timeline.filter((_,j)=>j!==i))}>🗑️ Sil</button></div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'0.75rem'}}>
                  <div><label style={lbl}>Tarix</label><input style={inp} value={t.date} onChange={e=>{const a=[...timeline];a[i]={...a[i],date:e.target.value};setTimeline(a)}} /></div>
                  <div><label style={lbl}>Vəzifə/Proqram</label><input style={inp} value={t.title} onChange={e=>{const a=[...timeline];a[i]={...a[i],title:e.target.value};setTimeline(a)}} /></div>
                </div>
                <div style={{marginBottom:'0.75rem'}}><label style={lbl}>Təşkilat</label><input style={inp} value={t.org} onChange={e=>{const a=[...timeline];a[i]={...a[i],org:e.target.value};setTimeline(a)}} /></div>
                <div style={{marginBottom:'0.75rem'}}><label style={lbl}>Təsvir</label><textarea style={{...inp,minHeight:'70px',resize:'vertical'}} value={t.desc} onChange={e=>{const a=[...timeline];a[i]={...a[i],desc:e.target.value};setTimeline(a)}} /></div>
                <label style={{display:'flex',alignItems:'center',gap:'0.5rem',cursor:'pointer',color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>
                  <input type="checkbox" checked={t.current} onChange={e=>{const a=[...timeline];a[i]={...a[i],current:e.target.checked};setTimeline(a)}} />
                  Hal-hazırda davam edir
                </label>
              </div>
            ))}
            <button style={btnA} onClick={()=>setTimeline([...timeline,{date:'',title:'',org:'',desc:'',current:false}])}>➕ Təcrübə əlavə et</button>
          </div>}

          {tab==='contact' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>📬 Əlaqə</p>
            <div style={{marginBottom:'1rem'}}><label style={lbl}>Email</label><input style={inp} value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} /></div>
            <div style={{marginBottom:'1rem'}}><label style={lbl}>LinkedIn URL</label><input style={inp} value={contact.linkedin} onChange={e=>setContact({...contact,linkedin:e.target.value})} /></div>
            <div style={{marginBottom:'1rem'}}><label style={lbl}>Tagline</label><textarea style={{...inp,minHeight:'80px',resize:'vertical'}} value={contact.tagline} onChange={e=>setContact({...contact,tagline:e.target.value})} /></div>
          </div>}

          {tab==='settings' && <div>
            <p style={{color:'#00d4ff',fontSize:'1.2rem',fontWeight:700,marginBottom:'1.5rem'}}>⚙️ Tənzimləmələr</p>
            <div style={{...card,maxWidth:'500px'}}>
              <p style={{color:'rgba(255,255,255,0.7)',fontSize:'0.9rem',marginBottom:'1rem',lineHeight:1.6}}>GitHub Personal Access Token daxil edin (<code style={{color:'#00d4ff'}}>repo</code> scope ilə). Dəyişiklikləri GitHub-a yazmaq üçün lazımdır.</p>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.8rem',marginBottom:'1rem'}}>Token almaq: <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" style={{color:'#8b5cf6'}}>github.com/settings/tokens</a> → "Generate new token (classic)" → <code style={{color:'#00d4ff'}}>repo</code></p>
              <label style={lbl}>GitHub Token</label>
              <input type="password" style={{...inp,marginBottom:'0.75rem'}} value={ghToken} onChange={e=>setGhToken(e.target.value)} placeholder="ghp_xxxxxxxxxxxx" />
              <button style={btnP} onClick={()=>{localStorage.setItem('ghToken',ghToken);setTokenSaved(true);setTimeout(()=>setTokenSaved(false),2000)}}>Token saxla</button>
              {tokenSaved && <span style={{color:'#00ff9d',marginLeft:'1rem',fontSize:'0.85rem'}}>✅ Saxlandı!</span>}
            </div>
          </div>}

        </div>
      </div>

      <button onClick={save} disabled={saving} style={{position:'fixed',bottom:'2rem',right:'2rem',zIndex:9999,background:saving?'rgba(255,255,255,0.1)':'linear-gradient(135deg,#00d4ff,#8b5cf6)',border:'none',color:'#fff',padding:'0.9rem 2rem',borderRadius:'50px',fontWeight:700,cursor:saving?'not-allowed':'pointer',fontSize:'1rem',boxShadow:'0 0 30px rgba(0,212,255,0.3)'}}>
        {saving ? '⏳ Saxlanır...' : '💾 GitHub-a Saxla'}
      </button>

      {toast && <div style={{position:'fixed',bottom:'2rem',left:'2rem',zIndex:9999,background:toast.ok?'rgba(0,255,157,0.1)':'rgba(255,59,59,0.1)',border:`1px solid ${toast.ok?'#00ff9d':'#ff3b3b'}`,color:toast.ok?'#00ff9d':'#ff3b3b',padding:'1rem 1.5rem',borderRadius:'12px',fontWeight:600,fontSize:'0.9rem',maxWidth:'350px'}}>{toast.msg}</div>}
    </div>
  )
}
