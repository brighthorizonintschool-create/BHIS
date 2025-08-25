/* ====== Horizon Academy Shared JS ====== */

// Mark active link
(function(){
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('nav a').forEach(a=>{
        const href = (a.getAttribute('href')||'').toLowerCase();
        if ((here==='' && href==='index.html') || href===here) a.classList.add('active');
    });
})();

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
});

// Scroll-triggered reveal
document.addEventListener('DOMContentLoaded', ()=>{
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); }});
    }, {threshold:.12});
    document.querySelectorAll('section,.card,.gallery-item').forEach(el=>obs.observe(el));
});

// Back to top
document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.createElement('button');
    btn.id = 'backToTop'; btn.textContent = '↑';
    document.body.appendChild(btn);
    window.addEventListener('scroll', ()=>{ btn.style.display = window.scrollY>300 ? 'block':'none'; });
    btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
});

// Gallery filter (used on gallery.html)
document.addEventListener('DOMContentLoaded', ()=>{
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            filterButtons.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            galleryItems.forEach(item=>{
                const match = (f==='all' || item.dataset.category===f);
                if (match){ item.style.display='block'; setTimeout(()=> item.classList.add('visible'), 20); }
                else{ item.classList.remove('visible'); setTimeout(()=> item.style.display='none', 200); }
            });
        });
    });
});

// Lightbox (gallery)
document.addEventListener('DOMContentLoaded', ()=>{
    const imgs = document.querySelectorAll('.gallery-item img');
    if (!imgs.length) return;
    const box = document.createElement('div'); box.id='lightbox';
    const pic = document.createElement('img'); box.appendChild(pic);
    document.body.appendChild(box);
    imgs.forEach(im=> im.addEventListener('click', ()=>{ pic.src = im.src; box.classList.add('active'); }));
    box.addEventListener('click', ()=> box.classList.remove('active'));
});

// Stats counters (about.html)
document.addEventListener('DOMContentLoaded', ()=>{
    const nums = document.querySelectorAll('.stat-number[data-target]');
    nums.forEach(el=>{
        const target = parseInt(el.dataset.target,10)||0;
        let cur = 0; const dur = 2000; const step = Math.max(1, Math.ceil(target/(dur/40)));
        const t = setInterval(()=>{ cur += step; if(cur>=target){cur=target; clearInterval(t);} el.textContent = cur; }, 40);
    });
});

// Calendar month navigation (calendar.html)
document.addEventListener('DOMContentLoaded', ()=>{
    const label = document.getElementById('monthYear');
    const prev  = document.getElementById('prevMonth');
    const next  = document.getElementById('nextMonth');
    if (!label || !prev || !next) return;

    let current = new Date();
    const render = ()=>{
        label.textContent = current.toLocaleDateString(undefined, {month:'long', year:'numeric'});
    };
    render();
    prev.addEventListener('click', ()=>{ current.setMonth(current.getMonth()-1); render(); });
    next.addEventListener('click', ()=>{ current.setMonth(current.getMonth()+1); render(); });
});
