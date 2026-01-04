// =====================
// INITIALISATION
// =====================
let biens = JSON.parse(localStorage.getItem("biens")) || [];
let agents = JSON.parse(localStorage.getItem("agents")) || [];
let clients = JSON.parse(localStorage.getItem("clients")) || [];
let visites = JSON.parse(localStorage.getItem("visites")) || [];
let contrats = JSON.parse(localStorage.getItem("contrats")) || [];

let editIdx = {
  biens: null,
  agents: null,
  clients: null,
  visites: null,
  contrats: null
};

// =====================
// NAVIGATION
// =====================
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// =====================
// BIENS
// =====================
function saveBien() {
  let obj = {
    titre: bienTitre.value,
    ville: bienVille.value,
    prix: bienPrix.value
  };

  if (editIdx.biens === null) biens.push(obj);
  else biens[editIdx.biens] = obj;

  editIdx.biens = null;
  localStorage.setItem("biens", JSON.stringify(biens));
  renderAll();
}

function editBien(i) {
  bienTitre.value = biens[i].titre;
  bienVille.value = biens[i].ville;
  bienPrix.value = biens[i].prix;
  editIdx.biens = i;
}

// =====================
// AGENTS
// =====================
function saveAgent() {
  let obj = { nom: agentNom.value, tel: agentTel.value };

  if (editIdx.agents === null) agents.push(obj);
  else agents[editIdx.agents] = obj;

  editIdx.agents = null;
  localStorage.setItem("agents", JSON.stringify(agents));
  renderAll();
}

function editAgent(i) {
  agentNom.value = agents[i].nom;
  agentTel.value = agents[i].tel;
  editIdx.agents = i;
}

// =====================
// CLIENTS
// =====================
function saveClient() {
  let obj = { name: clientName.value, phone: clientPhone.value };

  if (editIdx.clients === null) clients.push(obj);
  else clients[editIdx.clients] = obj;

  editIdx.clients = null;
  localStorage.setItem("clients", JSON.stringify(clients));
  renderAll();
}

function editClient(i) {
  clientName.value = clients[i].name;
  clientPhone.value = clients[i].phone;
  editIdx.clients = i;
}

// =====================
// VISITES
// =====================
function saveVisite() {
  let obj = { bien: visiteBien.value, date: visiteDate.value };

  if (editIdx.visites === null) visites.push(obj);
  else visites[editIdx.visites] = obj;

  editIdx.visites = null;
  localStorage.setItem("visites", JSON.stringify(visites));
  renderAll();
}

function editVisite(i) {
  visiteBien.value = visites[i].bien;
  visiteDate.value = visites[i].date;
  editIdx.visites = i;
}

// =====================
// CONTRATS
// =====================
function saveContrat() {
  let obj = { ref: contratRef.value, montant: contratMontant.value };

  if (editIdx.contrats === null) contrats.push(obj);
  else contrats[editIdx.contrats] = obj;

  editIdx.contrats = null;
  localStorage.setItem("contrats", JSON.stringify(contrats));
  renderAll();
}

function editContrat(i) {
  contratRef.value = contrats[i].ref;
  contratMontant.value = contrats[i].montant;
  editIdx.contrats = i;
}

// =====================
// SUPPRESSION
// =====================
function deleteItem(arrayName, i) {
  if (confirm("Supprimer cet élément ?")) {
    window[arrayName].splice(i, 1);
    localStorage.setItem(arrayName, JSON.stringify(window[arrayName]));
    renderAll();
  }
}

// =====================
// AFFICHAGE
// =====================
function renderAll() {

  biensList.innerHTML = biens.map((b,i)=>`
  <tr>
    <td>${b.titre}</td>
    <td>${b.ville}</td>
    <td>${b.prix}</td>
    <td>
      <button class="btn-edit" onclick="editBien(${i})">✏</button>
      <button class="btn-delete" onclick="deleteItem('biens',${i})">X</button>
    </td>
  </tr>`).join("");

  agentsList.innerHTML = agents.map((a,i)=>`
  <tr>
    <td>${a.nom}</td>
    <td>${a.tel}</td>
    <td>
      <button class="btn-edit" onclick="editAgent(${i})">✏</button>
      <button class="btn-delete" onclick="deleteItem('agents',${i})">X</button>
    </td>
  </tr>`).join("");

  clientsList.innerHTML = clients.map((c,i)=>`
  <tr>
    <td>${c.name}</td>
    <td>${c.phone}</td>
    <td>
      <button class="btn-edit" onclick="editClient(${i})">✏</button>
      <button class="btn-delete" onclick="deleteItem('clients',${i})">X</button>
    </td>
  </tr>`).join("");

  visitesList.innerHTML = visites.map((v,i)=>`
  <tr>
    <td>${v.bien}</td>
    <td>${v.date}</td>
    <td>
      <button class="btn-edit" onclick="editVisite(${i})">✏</button>
      <button class="btn-delete" onclick="deleteItem('visites',${i})">X</button>
    </td>
  </tr>`).join("");

  contratsList.innerHTML = contrats.map((co,i)=>`
  <tr>
    <td>${co.ref}</td>
    <td>${co.montant}</td>
    <td>
      <button class="btn-edit" onclick="editContrat(${i})">✏</button>
      <button class="btn-delete" onclick="deleteItem('contrats',${i})">X</button>
    </td>
  </tr>`).join("");

  loadDashboard();
}

// =====================
// DASHBOARD
// =====================
function loadDashboard() {
  cBiens.innerText = biens.length;
  cAgents.innerText = agents.length;
  cVisites.innerText = visites.length;

  let revenue = contrats.reduce((s,c)=> s + Number(c.montant), 0);
  cRevenue.innerText = revenue + " MAD";

  updateChart();
}

// =====================
// CHART
// =====================
let myChart;
function updateChart() {
  const ctx = document.getElementById("myChart").getContext("2d");
  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Biens","Agents","Clients","Contrats"],
      datasets: [{
        data: [biens.length, agents.length, clients.length, contrats.length],
        backgroundColor: ["#8b0000","#c00000","#ff4d4d","#550000"]
      }]
    }
  });
}

renderAll();
