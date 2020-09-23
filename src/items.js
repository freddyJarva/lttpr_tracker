const bow = 'images/bow.png'
const silvers = 'images/silvers.png'
const blumerang = 'images/boomerang0.png'
const boomerang = 'images/boomerang2.png'
const hookshot = 'images/hookshot.png'
const bombs = 'images/bomb0.png'
const powder = 'images/powder.png'
const shroom = 'images/mushroom.png'
const greenPendant = 'images/dungeon1.png'
const pendant = 'images/dungeon2.png'
const crystal = 'images/dungeon3.png'
const redCrystal = 'images/dungeon4.png'
const aganim = 'images/agahnim0.png'
const frod = 'images/firerod.png'
const irod = 'images/icerod.png'
const bombos = 'images/bombos.png'
const ether = 'images/ether.png'
const quake = 'images/quake.png'
const lantern = 'images/lantern.png'
const hammer = 'images/hammer.png'
const flute = 'images/flute.png'
const shovel = 'images/shovel.png'
const net = 'images/net.png'
const book = 'images/book.png'
const bottle = 'images/bottle0.png'
const bottle1 = 'images/bottle1.png'
const bottle2 = 'images/bottle2.png'
const bottle3 = 'images/bottle3.png'
const bottle4 = 'images/bottle4.png'
const somaria = 'images/somaria.png'
const byrna = 'images/byrna.png'
const cape = 'images/cape.png'
const mirror = 'images/mirror.png'
const boots = 'images/boots.png'
const glove1 = 'images/glove0.png'
const glove2 = 'images/glove2.png'
const flippers = 'images/flippers.png'
const orb = 'images/moonpearl.png'
const sword1 = 'images/sword0.png'
const sword2 = 'images/sword2.png'
const sword3 = 'images/sword3.png'
const sword4 = 'images/sword4.png'
const shield1 = 'images/shield0.png'
const shield2 = 'images/shield2.png'
const shield3 = 'images/shield3.png'
const uncle = 'images/uncle.png'

// const items = [
//   {name: 'bow', type: 'item', state: [0, 1, 2], images: [bow, bow, silvers]},
//   {name: 'blue', type: 'doubleItem', state: [0, 1], images: [blumerang, blumerang]},
//   {name: 'boomerang', type: 'doubleItem', state: [0, 1], images: [boomerang, boomerang]},
//   {name: 'hookshot', type: 'item', state: [0, 1], images: [hookshot, hookshot]},
//   {name: 'bombs', type: 'item', state: [0, 1], images: [bombs, bombs]},
//   {name: 'powder', type: 'doubleItem', state: [0, 1], images: [powder, powder]},
//   {name: 'shroom', type: 'doubleItem', state: [0, 1], images: [shroom, shroom]},
//   {type: 'filler'},
//   {name: 'HC', type: 'dungeon', state: [0, 1], reward: [0], images: [uncle]},
//   {name: 'frod', type: 'item', state: [0, 1], images: [frod, frod]},
//   {name: 'irod', type: 'item', state: [0, 1], images: [irod, irod]},
//   {name: 'bombos', type: 'medallion', state: [0, 1], entryTo: ['', 'MM', 'TR', 'BOTH'], images: [bombos, bombos]},
//   {name: 'ether', type: 'medallion', state: [0, 1], entryTo: ['', 'MM', 'TR', 'BOTH'], images: [ether, ether]},
//   {name: 'quake', type: 'medallion', state: [0, 1], entryTo: ['', 'MM', 'TR', 'BOTH'], images: [quake, quake]},
//   {type: 'filler'},
//   {name: 'EP', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'lantern', type: 'item', state: [0, 1], images: [lantern, lantern]},
//   {name: 'hammer', type: 'item', state: [0, 1], images: [hammer, hammer]},
//   {name: 'flute', type: 'doubleItem', state: [0, 1], images: [flute, flute]},
//   {name: 'shovel', type: 'doubleItem', state: [0, 1], images: [shovel, shovel]},
//   {name: 'net', type: 'item', state: [0, 1], images: [net, net]},
//   {name: 'book', type: 'item', state: [0, 1], images: [book, book]},
//   {type: 'filler'},
//   {name: 'DP', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'bottle', type: 'item', state: [0, 1, 2, 3, 4], images: [bottle, bottle1, bottle2, bottle3, bottle4]},
//   {name: 'somaria', type: 'item', state: [0, 1], images: [somaria, somaria]},
//   {name: 'byrna', type: 'item', state: [0, 1], images: [byrna, byrna]},
//   {name: 'cape', type: 'item', state: [0, 1], images: [cape, cape]},
//   {name: 'mirror', type: 'item', state: [0, 1], images: [mirror, mirror]},
//   {type: 'filler'},
//   {name: 'TOH', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'boots', type: 'item', state: [0, 1], images: [boots, boots]},
//   {name: 'glove', type: 'item', state: [0, 1, 2], images: [glove1, glove1, glove2]},
//   {name: 'flippers', type: 'item', state: [0, 1], images: [flippers, flippers]},
//   {name: 'orb', type: 'item', state: [0, 1], images: [orb, orb]},
//   {name: 'sword', type: 'item', state: [0, 1, 2, 3, 4], images: [sword1, sword1, sword2, sword3, sword4]},
//   {name: 'shield', type: 'item', state: [0, 1, 2, 3], images: [shield1, shield1, shield2, shield3]},
//   {name: 'AT', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [aganim, aganim]},
//   {name: 'POD', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'SP', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'SW', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'TT', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'IP', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'MM', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]},
//   {name: 'TR', type: 'dungeon', state: [0, 1], reward: [0, 1, 2, 3], images: [crystal, redCrystal, pendant, greenPendant]}
// ]


const items = [
  {name: 'bow', type: 'item',  images: [bow, bow, silvers]},
  {name: 'blue', type: 'doubleItem', images: [blumerang, blumerang]},
  {name: 'boomerang', type: 'doubleItem', images: [boomerang, boomerang]},
  {name: 'hookshot', type: 'item', images: [hookshot, hookshot]},
  {name: 'bombs', type: 'item', images: [bombs, bombs]},
  {name: 'powder', type: 'doubleItem', images: [powder, powder]},
  {name: 'shroom', type: 'doubleItem', images: [shroom, shroom]},

  {name: 'HC', type: 'dungeon', images: [uncle], smallKeyMax: 1, smallKeyMin: 1, bigKey: false},
  {name: 'EP', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 0, smallKeyMin: 0, smallKeyGoMode: 0, bigKey: true},
  {name: 'frod', type: 'item', images: [frod, frod]},
  {name: 'irod', type: 'item', images: [irod, irod]},
  {name: 'bombos', type: 'medallion', entryTo: ['', 'MM', 'TR', 'BOTH'], images: [bombos, bombos]},
  {name: 'ether', type: 'medallion', entryTo: ['', 'MM', 'TR', 'BOTH'], images: [ether, ether]},
  {name: 'quake', type: 'medallion', entryTo: ['', 'MM', 'TR', 'BOTH'], images: [quake, quake]},

  {name: 'DP', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 1, smallKeyMin: 1, smallKeyGoMode: 0, bigKey: true},
  {name: 'TH', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 1, smallKeyMin: 1, smallKeyGoMode: 0, bigKey: true},
  {name: 'lantern', type: 'item', images: [lantern, lantern]},
  {name: 'hammer', type: 'item', images: [hammer, hammer]},
  {name: 'flute', type: 'doubleItem', images: [flute, flute]},
  {name: 'shovel', type: 'doubleItem', images: [shovel, shovel]},
  {name: 'net', type: 'item', images: [net, net]},
  {name: 'book', type: 'item', images: [book, book]},

  {name: 'AT', type: 'dungeon', images: [aganim, aganim], smallKeyMax: 2, smallKeyMin: 2, smallKeyGoMode: 2, bigKey: false},
  {name: 'PD', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 6, smallKeyMin: 4, smallKeyGoMode: 1, bigKey: true},
  {name: 'bottle', type: 'item', images: [bottle, bottle1, bottle2, bottle3, bottle4]},
  {name: 'somaria', type: 'item', images: [somaria, somaria]},
  {name: 'byrna', type: 'item', images: [byrna, byrna]},
  {name: 'cape', type: 'item', images: [cape, cape]},
  {name: 'mirror', type: 'item', images: [mirror, mirror]},

  {name: 'SP', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 1, smallKeyMin: 1, smallKeyGoMode: 1, bigKey: true},
  {name: 'SW', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 3, smallKeyMin: 0, smallKeyGoMode: 0, bigKey: true},
  {name: 'boots', type: 'item', images: [boots, boots]},
  {name: 'glove', type: 'item', images: [glove1, glove1, glove2]},
  {name: 'flippers', type: 'item', images: [flippers, flippers]},
  {name: 'orb', type: 'item', images: [orb, orb]},
  {name: 'sword', type: 'doubleItem', images: [sword1, sword1, sword2, sword3, sword4]},
  {name: 'shield', type: 'doubleItem', images: [shield1, shield1, shield2, shield3]},
  {name: 'TT', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 1, smallKeyMin: 1, smallKeyGoMode: 0, bigKey: true},
  {name: 'IP', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 2, smallKeyMin: 0, smallKeyGoMode: 0, bigKey: true},
  {name: 'MM', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 3, smallKeyMin: 0, smallKeyGoMode: 0, bigKey: true},
  {name: 'TR', type: 'dungeon', images: [null, crystal, redCrystal, pendant, greenPendant], smallKeyMax: 4, smallKeyMin: 4, smallKeyGoMode: 0, bigKey: true},
  {name: 'GT', type: 'dungeon', images: [aganim, aganim], smallKeyMax: 4, smallKeyMin: 4, smallKeyGoMode: 1, bigKey: true},
]

export default items;