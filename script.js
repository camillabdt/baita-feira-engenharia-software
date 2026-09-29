const state={score:0,answered:{},areas:{frontend:0,backend:0,mobile:0,quality:0,security:0,ai:0,devops:0,architecture:0,management:0,data:0},profileStep:0};
const screens=[...document.querySelectorAll('.screen')];
function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.go)));

const bugFeedback={
 bug1:['Boa! 🎯','O CVV é um dado sensível e não deve ficar exposto. Segurança também faz parte da interface.'],
 bug2:['Boa! 🔐','Aceitar “123” como senha aumenta muito o risco de acesso indevido. Sistemas precisam validar credenciais.'],
 bug3:['Boa! 🛒','Quantidade negativa quebra uma regra básica do negócio. Software precisa impedir estados inválidos.'],
 bug4:['Boa! ♿','Campos sem rótulos claros podem dificultar o uso, especialmente com leitores de tela. Acessibilidade é requisito de qualidade.'],
 bug5:['Boa! 💥','Ações destrutivas e irreversíveis devem pedir confirmação para evitar exclusões acidentais.']
};
const bugOrder=['bug1','bug2','bug3','bug4','bug5'];
document.querySelectorAll('.options').forEach(group=>{
 group.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
   const q=group.dataset.question;if(state.answered[q])return;state.answered[q]=true;group.classList.add('locked');
   const correct=btn.dataset.correct==='true';if(correct)state.score++;
   btn.classList.add(correct?'correct':'wrong');group.querySelector('[data-correct="true"]').classList.add('correct');
   const box=document.getElementById('feedback-'+q);const [title,text]=bugFeedback[q];
   box.innerHTML=correct?`<div class="ok"><b>${title}</b>${text}</div>`:`<div class="no"><b>Quase!</b>${text}</div>`;
   const idx=bugOrder.indexOf(q);setTimeout(()=>show(idx<bugOrder.length-1?bugOrder[idx+1]:'profile'),1250);
 }));
});

const steps=[...document.querySelectorAll('.quiz-step')];
const progress=document.getElementById('quiz-progress-bar');
function updateProgress(){progress.style.width=`${(state.profileStep/steps.length)*100}%`;}
updateProgress();
document.querySelectorAll('.profile-options button').forEach(btn=>btn.addEventListener('click',()=>{
 state.areas[btn.dataset.area]++;btn.classList.add('selected');
 setTimeout(()=>{steps[state.profileStep].classList.remove('active');state.profileStep++;updateProgress();if(state.profileStep<steps.length){steps[state.profileStep].classList.add('active')}else finishProfile();},220);
}));

const profiles={
 frontend:['🎨 Front-end & UX','Você parece gostar de transformar ideias em interfaces bonitas, claras, acessíveis e fáceis de usar.'],
 backend:['⚙️ Back-end & APIs','Você curte lógica, regras de negócio e entender o que faz um sistema funcionar por trás da tela.'],
 mobile:['📱 Desenvolvimento Mobile','Você se interessa por soluções que cabem no bolso e chegam diretamente às pessoas por aplicativos.'],
 quality:['🧪 Testes & Qualidade','Você tem olhar crítico, atenção aos detalhes e vontade de encontrar problemas antes do usuário.'],
 security:['🔐 Segurança de Software','Você tem perfil investigativo e gosta de antecipar riscos, proteger dados e entender como sistemas podem falhar.'],
 ai:['🤖 IA & Ciência de Dados','Você demonstra curiosidade por dados, padrões, automação inteligente e novas formas de resolver problemas.'],
 devops:['☁️ DevOps & Cloud','Você gosta de automação, infraestrutura e de manter sistemas rápidos, disponíveis e funcionando no mundo real.'],
 architecture:['🏗️ Arquitetura de Software','Você tende a enxergar o sistema como um todo e pensar em como as partes devem se organizar para crescer bem.'],
 management:['📊 Gestão de Produto & Projetos','Você gosta de conectar pessoas, prioridades e necessidades para transformar uma ideia em uma entrega útil.'],
 data:['🗄️ Banco de Dados & Engenharia de Dados','Você se interessa por organizar informação, garantir consistência e transformar dados em algo confiável e útil.']
};
function finishProfile(){
 const ranking=Object.entries(state.areas).sort((a,b)=>b[1]-a[1]);
 const [area]=ranking[0];const [title,text]=profiles[area];
 document.getElementById('profile-result').innerHTML=`<strong>${title}</strong><span>${text}</span>`;
 const extras=ranking.slice(1,3).map(([a])=>profiles[a][0]).join(' • ');
 document.getElementById('secondary-result').innerHTML=`<b>Você também mostrou afinidade com:</b><br>${extras}`;
 document.getElementById('score').textContent=`${state.score}/5`;show('result');
}
document.getElementById('restart').addEventListener('click',()=>location.reload());
