'use strict';
// Scene photos: file + credit. Scenes refer to these by name (img:'name').

const PHOTOS={
 "start": {
  "src": "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=760&q=80"
 },
 "naboen": {
  "src": "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=760&q=80"
 },
 "motorvei_start": {
  "src": "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&w=760&q=80"
 },
 "veiskulder": {
  "src": "https://images.unsplash.com/photo-1464464562-70c39f5e6d9c?auto=format&fit=crop&w=760&q=80"
 },
 "sorte_van": {
  "src": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=760&q=80"
 },
 "inne_vanen": {
  "src": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=760&q=80"
 },
 "vanen_dypere": {
  "src": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=760&q=80"
 },
 "etter_flukt": {
  "src": "https://images.unsplash.com/photo-1568604934584-a43deba94eb8?auto=format&fit=crop&w=760&q=80"
 },
 "bensinstasjon_gjemt": {
  "src": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=760&q=80"
 },
 "bensinstasjon": {
  "src": "https://images.unsplash.com/photo-1525103504173-8dc1582c7430?auto=format&fit=crop&w=760&q=80"
 },
 "hacking_start": {
  "src": "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=760&q=80"
 },
 "presse_ring": {
  "src": "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=760&q=80"
 },
 "informant_møte": {
  "src": "https://images.unsplash.com/photo-1573400582672-5e45cc01b1c3?auto=format&fit=crop&w=760&q=80"
 },
 "tbane_start": {
  "src": "https://images.unsplash.com/photo-1454414604154-7c7e8cc3cbea?auto=format&fit=crop&w=760&q=80"
 },
 "politistasjon": {
  "src": "https://images.unsplash.com/photo-1485575301924-6891ef935dcd?auto=format&fit=crop&w=760&q=80"
 },
 "undergrunn_møte": {
  "src": "https://images.unsplash.com/photo-1585366119957-f61e898a89e1?auto=format&fit=crop&w=760&q=80"
 },
 "sykehuset": {
  "src": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=760&q=80"
 },
 "militaerbase": {
  "src": "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=760&q=80"
 },
 "base_intern": {
  "src": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=760&q=80"
 },
 "kontrollrom": {
  "src": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=760&q=80"
 },
 "kontrollrom_eps": {
  "src": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=760&q=80"
 },
 "kloakken": {
  "src": "https://images.unsplash.com/photo-1544985361-b420d7a77043?auto=format&fit=crop&w=760&q=80"
 },
 "bunker_nod": {
  "src": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=760&q=80"
 },
 "havnen": {
  "src": "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=760&q=80"
 },
 "havn_radio": {
  "src": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=760&q=80"
 },
 "ubaten": {
  "src": "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=760&q=80"
 },
 "skogens_inngang": {
  "src": "https://images.unsplash.com/photo-1448375240586-882707db8855?auto=format&fit=crop&w=760&q=80"
 },
 "hytten": {
  "src": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=760&q=80"
 },
 "radiomasten": {
  "src": "https://images.unsplash.com/photo-1584984180436-b51f0f09b552?auto=format&fit=crop&w=760&q=80"
 },
 "nyhetshuset": {
  "src": "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=760&q=80"
 },
 "sendestudio": {
  "src": "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=760&q=80"
 },
 "sendestudio_double": {
  "src": "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=760&q=80"
 },
 "server_uten_kort": {
  "src": "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?auto=format&fit=crop&w=760&q=80"
 },
 "stromsentralen": {
  "src": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=760&q=80"
 },
 "checkpoint": {
  "src": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=760&q=80"
 },
 "bunker_ankomst": {
  "src": "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=760&q=80"
 },
 "bunker_opprør": {
  "src": "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=760&q=80"
 },
 "hemmelig_møte": {
  "src": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=760&q=80"
 },
 "fyrtarnet": {
  "src": "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=760&q=80"
 },
 "apoteket": {
  "src": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=760&q=80"
 },
 "ambassaden": {
  "src": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=760&q=80"
 },
 "garasjen": {
  "src": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=760&q=80"
 },
 "trikken": {
  "src": "https://images.unsplash.com/photo-1474487548417-781cb6d646df?auto=format&fit=crop&w=760&q=80"
 },
 "slutt_rad": {
  "src": "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?auto=format&fit=crop&w=760&q=80"
 },
 "slutt1": {
  "src": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=760&q=80"
 },
 "slutt2": {
  "src": "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=760&q=80"
 },
 "slutt3": {
  "src": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=760&q=80"
 },
 "slutt_hemmelig": {
  "src": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=760&q=80"
 }
};
