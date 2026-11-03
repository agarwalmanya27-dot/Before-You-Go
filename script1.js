let currentDestination = destinations.find(d => Number(d.dest_id) === 1) || destinations[0];
let showingAll = false;
const $ = id => document.getElementById(id);
const clean = value => String(value ?? '').trim();

function placesFor(destination) {
  return places.filter(p => Number(p.dest_id) === Number(destination.dest_id));
}
function imageFor(destination, destinationPlaces) {
  // The spreadsheet stores a local images/... path, but those image files were not included.
  // Use the first real place-photo URL from the places table as a working banner fallback.
  return destinationPlaces.find(p => clean(p.p_image).startsWith('http'))?.p_image || '';
}
function renderDestination(destination) {
  currentDestination = destination;
  const list = placesFor(destination);
  $('destinationName').textContent = clean(destination.dest_name);
  $('aboutName').textContent = clean(destination.dest_name);
  $('destinationState').textContent = '⌖ ' + clean(destination.state);
  $('destinationDescription').textContent = clean(destination.descrip);
  $('attractionCity').textContent = clean(destination.dest_name);
  $('destinationTags').innerHTML = '';
  const vibes = [clean(destination.vibe), 'Cultural', 'Heritage'].filter((v,i,a) => v && a.indexOf(v) === i).slice(0,3);
  vibes.forEach(v => { const tag=document.createElement('span'); tag.textContent=v; $('destinationTags').appendChild(tag); });
  const banner = imageFor(destination,list);
  $('hero').style.backgroundImage = banner ? `linear-gradient(90deg,rgba(9,19,37,.15),rgba(9,19,37,.05)),url("${banner}")` : 'linear-gradient(110deg,#1d3048,#c28d62)';
  renderPlaces(list);
  renderChips();
}
function renderPlaces(list) {
  const grid = $('attractionGrid');
  grid.innerHTML = '';
  const visible = showingAll ? list : list.slice(0,4);
  visible.forEach(place => {
    const button = document.createElement('button');
    button.className = 'place-card';
    const img = document.createElement('img');
    img.src = clean(place.p_image);
    img.alt = clean(place.place_name);
    img.loading = 'lazy';
    img.onerror = () => { img.style.visibility='hidden'; img.parentElement.classList.add('image-missing'); };
    const title = document.createElement('strong');
    title.textContent = clean(place.place_name);
    button.append(img,title);
    button.addEventListener('click', () => openPlace(place));
    grid.appendChild(button);
  });
  $('viewAll').style.display = list.length > 4 ? 'inline-block' : 'none';
  $('viewAll').innerHTML = showingAll ? 'Show Less <span>↑</span>' : 'View All <span>→</span>';
}
function renderChips(filter='') {
  const holder = $('destinationChips');
  holder.innerHTML = '';
  destinations.filter(d => clean(d.dest_name).toLowerCase().includes(filter.toLowerCase())).forEach(d => {
    const b=document.createElement('button');
    b.className='destination-chip'+(Number(d.dest_id)===Number(currentDestination.dest_id)?' active':'');
    b.textContent=clean(d.dest_name);
    b.addEventListener('click',()=>{showingAll=false;renderDestination(d);window.scrollTo({top:0,behavior:'smooth'});});
    holder.appendChild(b);
  });
}
function openPlace(place) {
  $('dialogImage').src=clean(place.p_image);
  $('dialogImage').alt=clean(place.place_name);
  $('dialogTitle').textContent=clean(place.place_name);
  $('dialogDescription').textContent=clean(place.descrip);
  $('dialogRoute').textContent='VISITING ROUTE · '+clean(place.route);
  $('placeDialog').showModal();
}
let toastTimer;
function toast(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600);}
$('viewAll').addEventListener('click',()=>{showingAll=!showingAll;renderPlaces(placesFor(currentDestination));});
$('destinationSearch').addEventListener('input',e=>renderChips(e.target.value));
$('routeFeature').addEventListener('click',()=>{showingAll=true;renderPlaces(placesFor(currentDestination));$('attractions-section')?.scrollIntoView({behavior:'smooth'});$('attractionGrid').scrollIntoView({behavior:'smooth',block:'center'});});
$('foodFeature').addEventListener('click',()=>toast('Food details are not included in the Excel files yet.'));
$('shoppingFeature').addEventListener('click',()=>toast('Shopping details are not included in the Excel files yet.'));
$('searchBtn').addEventListener('click',()=>{$('destinationSearch').focus();$('destinationBrowser').scrollIntoView({behavior:'smooth'});});
$('dialogClose').addEventListener('click',()=>$('placeDialog').close());
$('placeDialog').addEventListener('click',e=>{if(e.target===$('placeDialog'))$('placeDialog').close();});
renderDestination(currentDestination);
