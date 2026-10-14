// Las Vegas Collection — sourced from caaDoc.txt (Las Vegas Sotheby's International Realty).
// Language-neutral listing facts; all UI labels resolve through i18n dictionaries.

export type VegasTagKey = 'tag.newMarket' | 'tag.newListing' | 'tag.available' | 'tag.newConstruction';

export type VegasTypeKey = 'type.home' | 'type.penthouse' | 'type.condo' | 'type.loft';

export type VegasFactKey =
  | 'facts.bedrooms'
  | 'facts.bathrooms'
  | 'facts.interior'
  | 'facts.lot'
  | 'facts.built'
  | 'facts.stories'
  | 'facts.parking'
  | 'facts.mls'
  | 'facts.id'
  | 'facts.county'
  | 'facts.taxes'
  | 'facts.fees'
  | 'facts.marketed';

export type VegasAmenKey = 'vamen.utilities' | 'vamen.interior' | 'vamen.outdoor' | 'vamen.community';

export type VegasListing = {
  id: string;
  address: string;
  location: string;
  price: string;
  beds: number;
  baths: string;
  bathsFull: number;
  bathsPartial: number;
  sqft: string;
  year: number;
  mls: string;
  tagKey: VegasTagKey;
  typeKey: VegasTypeKey;
  photos: string[]; // encoded image segments for photo()
  video?: string;
  facts: { k: VegasFactKey; v: string }[];
  description: string[];
  amenities: { k: VegasAmenKey; items: string[] }[];
};

export const photo = (encoded: string, w = 1920) =>
  `https://img-v2.gtsstatic.net/reno/imagereader.aspx?url=${encoded}&w=${w}&q=75&option=N&permitphotoenlargement=false&fallbackimageurl=https://www.sothebysrealty.com/resources/siteresources/commonresources/images/nophoto/no_image_new.png`;

const sothebys = (id: string) => `https%3A%2F%2Fm.sothebysrealty.com%2F1103i215%2F${id}`;

const shots = (...ids: string[]) => ids.map(sothebys);

const cotality = (photoNum: string, token: string) =>
  `https%3A%2F%2Fapi.cotality.com%2Ftrestle%2FMedia%2FProperty%2FPHOTO-Jpeg%2F1151331092%2F${photoNum}%2FMTU3Mi8yMjU2LzE5%2FMTkvODk0NS8xNzgyODQwODA1%2F${token}%3Fdate%3D2026-09-29`;

const tour = (videoId: string) =>
  `https://players.brightcove.net/5699924528001/default_default/index.html?videoId=${videoId}&autoplay=any&playsinline=true&muted=false`;

export const vegasListings: VegasListing[] = [
  {
    id: 'soaring-bird',
    address: '4 Soaring Bird Ct',
    location: 'The Ridges, Summerlin, Las Vegas, Nevada, USA',
    price: '$17,500,000',
    beds: 6,
    baths: '7.5',
    bathsFull: 6,
    bathsPartial: 3,
    sqft: '11,211',
    year: 2016,
    mls: '2741570',
    tagKey: 'tag.newMarket',
    typeKey: 'type.home',
    photos: shots(
      '1dpy8n9wvx9bms2v3e1br54gb7i215', 'dcsvnrjw8hnfmpjbhkf3kx1bz1i215', 'e2x35tpvjabzm4pc262rg4mf63i215', 'd1bsnvczsh5jmw62ekpaqpv7q6i215', 'rtbtzkzpzht7mbp0wmknjwn9n3i215',
      '81tzgk6jpkkg4ha837f9a51nt5i215', 'ebf577v04ggjm32vzc8saks2g6i215', 'x3d5g8jsfs0x40jtvd6jjhv512i215', 'y28v42pdfs89m8ta58f6528kv2i215', 'bqmvm35b6qvhmbj3cqvtae7fd4i215',
      'jy669d8bxzj5ma292m4ggn6a52i215', 'ezez30yw1hrwmv6jyvfs45by65i215', 'e5z4d2tvs62w4njc4pzfbq14e6i215', 'e3dnf11s064nmzj49c92kykvm4i215', 'syj1dm71tfdgm4asjvkh30hb44i215',
      'vn5vgsdgdxj8mvy8883yxts6r5i215', 'qmn5j38f4m4c4ptf8eatncdcq6i215', 't8hcpa2ggctr4gjspdf0b5ss62i215', 'xsj087pk7w2tmt2cx8vjdh8117i215', 'z36cvczw5dw24nyzwsfm8z1cs5i215',
      'k4we16cqdjebm5ey3qh0n3zt82i215', 'v979yzvj06044yy8jdhkb4f0s6i215', 'b5mnatr3cy5r4hegxk4651ezj5i215', 'cqhsam1rjsnt4vewpgachqbm65i215', 'av6ktfjg8tfa41ty5phkhbtew6i215',
      '595bg6a8jm3742p4spgkjydh10i215',
    ),
    video: tour('6389638613112'),
    facts: [
      { k: 'facts.lot', v: '1 Acre' },
      { k: 'facts.built', v: '2016' },
      { k: 'facts.stories', v: '4' },
      { k: 'facts.parking', v: '4-Car Garage' },
      { k: 'facts.mls', v: '2741570' },
      { k: 'facts.id', v: '332448' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.taxes', v: '$73,500 / Year' },
      { k: 'facts.fees', v: '$610 + $67 / Monthly' },
      { k: 'facts.marketed', v: 'Las Vegas Sotheby’s International Realty · Randy Char & Samantha Jones' },
    ],
    description: [
      'Architecturally significant and masterfully built by Blue Heron, this modern estate rests on a 1-acre homesite, delivering unmatched privacy and panoramic views within the guard-gated community of The Ridges in Summerlin.',
      'Interior Layout: Spanning 4 levels, the open-concept design features grand living spaces beneath soaring architectural lines. It includes 6 generous suites, a detached casita, a fitness studio, an executive office, and a state-of-the-art theater. The primary suite offers ample closet space and a showstopping outdoor shower. The lower level is customized for entertaining with an indoor/outdoor theater, bar, and wine room.',
      'Outdoor Grounds: Designed as a private resort-caliber retreat, the property features two saltwater pools, a spa, a fire feature, a grilling lounge, and cascading waterfalls that flow down to a lower-level koi pond.',
    ],
    amenities: [
      { k: 'vamen.utilities', items: ['Central A/C', 'Custom Style', '4-Car Garage', 'Guard Gated'] },
      { k: 'vamen.interior', items: ['2 Gas Fireplaces', 'Breakfast Bar', 'Carpeted, Hardwood & Tile Flooring', 'Casita', 'In-Home Fitness Center', 'Marble Countertops', 'Media Room / Home Theater', 'Outdoor Kitchen', 'Screen Room', 'Washer & Dryer Included', 'Courtyard'] },
      { k: 'vamen.outdoor', items: ['Two Saltwater Pools', 'Spa & Fire Feature', 'Grilling Lounge', 'Cascading Waterfalls to Koi Pond', 'Showstopping Outdoor Shower'] },
    ],
  },
  {
    id: 'panorama-towers',
    address: '4575 Dean Martin Drive #3300',
    location: 'Panorama Towers, Las Vegas, Nevada, USA',
    price: '$4,250,000',
    beds: 3,
    baths: '3.5',
    bathsFull: 3,
    bathsPartial: 1,
    sqft: '4,820',
    year: 2005,
    mls: '2741624',
    tagKey: 'tag.available',
    typeKey: 'type.penthouse',
    photos: shots(
      'yfh4a4k6mhqsm4e3xt4ne1bgh4i215', 'qf7t1ebtk2k2my2453k9pyy9m5i215', 'jzqvvbpf3mtv4x67gh34az3736i215', '6cqf264vhq69m4yry846ab1ws6i215', '79k7069n04vm4kydv1y5jdwv80i215',
      'rzwgkz1dgrssm8pwrwrrqgb0p3i215', 'e31e26a0szd2m6tqs651abjt93i215', 'mspt2sh8gkycmf21w5etyvvj97i215', '9cf2p6tm1c3vm66fstx9a50020i215', '1d61h8cq220jmby4zb4f8294g1i215',
      'knsbtx0meg3d48pgygpx17pcw4i215', 'z5y1cc4bgzxjm4tn4212bgw3r3i215', 'nckhr88g76sbmee071xvdyzc34i215', 'y74ry4hd34j9meeh4tfc61h704i215', 'xe1fbk407wrcm0a2jweb29thh1i215',
      'jwfrvq13rgrjmz2sf3tgny1cv1i215', 'mqa6z4jna3y140a0fbkzac4ck4i215', 'q2m7zzm91q4f48pa9w6p5z4wx4i215', 'msckymb1snph42tfmh34yr9hf1i215', 'mxxyda0r6s5s4ejrcqfbrs9ky3i215',
      'yqp39c70d4aa4n6mr6atgk51p2i215', 'y6cbrtm6207c4bp0smn3tbhhf3i215', 'wdxwvjc2vfvs4dtzbn80zssjh2i215', '8xw4bgf7smbrmvyhtj4x3mwzv7i215', '9tvwcykx6typmb65tk5p13kx60i215',
      'ey83zj3ybvn8m7yg30aq9zfp14i215', '0pjbazss0483m2t88p42gy3j26i215', 'gp32braysetpmaatgk82s7ftr5i215', 'gk5sm4pnn0rk4weqk67geqh731i215', 'zjjaq10m454p476mgc2j38c987i215',
      '16t206ppfmyj41apxytk1dbgn1i215', 'qnfmcwk39nt249ttctkbrhm7k7i215', 'fghdre6r7jp14pe2496bvh8bg6i215', 'fckg15qy2y824qtqe5te7g5pj3i215', '29qtm88v1vpq4kjccape5z9k15i215',
      'ww57vvw5w92hmnpk8yrjybjzh2i215', 'npnkrcppkmr7mceet3hmk9f9c5i215',
    ),
    video: tour('6386571967112'),
    facts: [
      { k: 'facts.built', v: '2005' },
      { k: 'facts.stories', v: 'Level 33 · 34-Story Building' },
      { k: 'facts.parking', v: '2 First-Floor Spaces + Valet' },
      { k: 'facts.mls', v: '2741624' },
      { k: 'facts.id', v: 'MHM8CE' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.taxes', v: '$19,292 / Year' },
      { k: 'facts.fees', v: '$4,200 / Monthly (HOA)' },
      { k: 'facts.marketed', v: 'Las Vegas Sotheby’s International Realty · Michael Zelina' },
    ],
    description: [
      'Positioned on the best corner of guard-gated Panorama Towers overlooking Allegiant Stadium, this fully furnished, turn-key penthouse was styled by Design by Sasha.',
      'Views & Layout: Features breathtaking 270-degree panoramic views of the Las Vegas Strip, surrounding mountains, and sunsets from four private balconies. Expansive high-rise living space highlighted by walls of windows, a dramatic 20-foot floating bar, multiple fireplaces, custom lighting, and motorized shades.',
      'Kitchen: Custom-designed with an oversized island, new Dacor appliances, a six-burner gas range, a warming drawer, a built-in electric oven, and a 300-bottle wine refrigerator.',
      'Parking: Includes two prime first-floor parking spaces directly across from the building entrance, plus valet service.',
    ],
    amenities: [
      { k: 'vamen.community', items: ['Guard-Gated Entry & 24-Hour Security', 'Driver / Valet Service', 'Indoor Spa', 'Fitness Center', 'Business Center', 'Community Media Room', 'Dog Park', 'Association Pool & Barbecue Area', 'Indoor Racquetball Court', 'Closed-Circuit Cameras & Floor Access Control'] },
      { k: 'vamen.interior', items: ['3 Electric Fireplaces', 'Custom Dacor Kitchen & 300-Bottle Wine Fridge', 'Dramatic 20-Ft Floating Bar', 'Motorized Shades & Custom Lighting', 'Tinted Windows & Window Treatments', 'Walk-In Closets', 'In-Unit Washer & Dryer', 'Programmable Thermostat'] },
      { k: 'vamen.outdoor', items: ['Four Private Balconies', '270-Degree Strip, Mountain & Sunset Views'] },
    ],
  },
  {
    id: 'rhodolite-court',
    address: '11453 Rhodolite Court',
    location: 'Silver Ridge, The Ridges, Las Vegas, Nevada, USA',
    price: '$4,000,000',
    beds: 4,
    baths: '4.5',
    bathsFull: 4,
    bathsPartial: 1,
    sqft: '4,619',
    year: 2019,
    mls: '2819880',
    tagKey: 'tag.newListing',
    typeKey: 'type.home',
    photos: shots(
      'arwee9rtcf1a49y3m2mq1s32f5i215', 'rzj3th03svq0mbph4bc3eykgw5i215', '8bb0hnpfr4k64djhc7dwyb7jd4i215', '1ghwg19g722h4vtbhecg5ypzp6i215', '2tc7pvvjy7zg4wej56rhtyk6x6i215',
      'fgz22pvqs3aymzey225gyjv746i215', 'f5sh5x5hkt98mca9cb5136nq46i215', 'tk2cbggzrydf456vx32rwx6635i215', 'g677h9g9mrpw4t2834eqef0486i215', 'n8zrzd3b1va34qe6mbxkjyx1p2i215',
      'c6k0z1jm2rbqmdjb5p7p16g2z4i215', 'nxj1ms9e3fbkm2224g4hxcr946i215', 'n06y0550phtj4gph55xb11w8r4i215', 'b7g314xaw2gx4atty16kf40zp5i215', 'ms9qj6pyhxd94nyrq47mvxjcq5i215',
      'm1tf8b4k6yrz42yhhv9qjxxbq2i215', 'nj7m4pvb71pk4ayz4gbmhyc8s2i215', 'z7d31tby5ptkmr6wdzm084jhj0i215', '7dtv2yadwks3m5jdhj9hr3z8q4i215', '5npbw4dvzrdg4ne5dbjx8mfmk5i215',
      'hx09ha4gj0h84s6sfs65e48hs1i215', '6h5fvpqj7wywmnp4xvmncwgd30i215', 'mkwafyz4s0va47ejxgwzgsv4v5i215', '3ha6kpyx6qpgm064480d2q98p3i215', 'qap7f6sg2m6y4gjc7a5t7zn037i215',
      'k0me79hs90jym629zx9q1ajhh2i215', 'a7dbgx70f4pg4ath1mqmtg7tz1i215', 'bgpv3y4wj14a4byghkscmdtc81i215', 'gx5csxtk1wqs4wtjhkkejd5db0i215', 'cv1p4s4c756n4fewa21f4x4v62i215',
      'za4ydwp4rt1b49a1mj2rzg6bs2i215', 'mxsfnqv9bvag4k6jhd5n3d00s3i215', 'hhce5qpev4n7mma694442gbzt3i215', '5y9v0vwjd2akmkavm28wwqw611i215', 'b0bxz14mjkc54st1dqm936mq34i215',
      '7jz6qr4j3qy94z28m14y3w87j6i215', '5cfbn23t4fxbme258ppvcnwh35i215',
    ),
    video: tour('6405271355112'),
    facts: [
      { k: 'facts.lot', v: '0.3 Acres (Corner Lot)' },
      { k: 'facts.built', v: '2019' },
      { k: 'facts.parking', v: '3-Car Garage w/ Glass Doors' },
      { k: 'facts.mls', v: '2819880' },
      { k: 'facts.id', v: 'ZDGF6G' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.taxes', v: '$19,916 / Year' },
      { k: 'facts.fees', v: '$540 + $198 + $65 / Monthly' },
      { k: 'facts.marketed', v: 'Las Vegas Sotheby’s International Realty · Randy Char & Samantha Jones' },
    ],
    description: [
      'Positioned on a private corner lot in Silver Ridge, this modern architectural residence blends contemporary finishes with an open-concept indoor-outdoor layout.',
      'Living Spaces: The main heart of the home features a dramatic living room with a striking linear fireplace and a sophisticated wet bar. A versatile flex space includes corner pocket sliders that open directly to the backyard.',
      'Bedrooms: Includes a convenient guest suite on the main level. Upstairs, two additional guest suites and a privately situated primary retreat await. The primary suite features a private balcony, dual walk-in closets with custom built-ins, and a spa-inspired luxury bathroom.',
      'Backyard Resort: The grounds feature sleek shellcrete flooring, a large covered patio, an outdoor kitchen, lush green space, and an impressive 60-foot linear pool with a water feature and spa.',
    ],
    amenities: [
      { k: 'vamen.utilities', items: ['Central A/C', 'Pitched Tile Roof', '3-Car Garage w/ Modern Glass Doors'] },
      { k: 'vamen.interior', items: ['2 Gas Fireplaces', 'Balcony', 'Breakfast Bar', 'Carpet & Tile Flooring', 'Indoor-Outdoor Pocket Doors', 'Customized Walk-In Closets', 'Washer / Dryer Included'] },
      { k: 'vamen.outdoor', items: ['60-Ft Linear Pool w/ Water Feature & Spa', 'Covered Patio & Outdoor Kitchen', 'Shellcrete Flooring', 'Lush Green Space'] },
      { k: 'vamen.community', items: ['Guard-Gated Community Security', 'Fitness Center', 'Pool & Spa Access at The Ridges'] },
    ],
  },
  {
    id: 'desert-heights',
    address: '11233 Desert Heights Avenue',
    location: 'Ascension, Summerlin, Las Vegas, Nevada, USA',
    price: '$3,800,000',
    beds: 4,
    baths: '4.5',
    bathsFull: 4,
    bathsPartial: 1,
    sqft: '3,951',
    year: 2025,
    mls: '2813019',
    tagKey: 'tag.newConstruction',
    typeKey: 'type.home',
    photos: shots(
      'kjqvtw55f9ht4xjzp8etjyfx17i215', '7a4f1yw3vpwfmnte6c9md1cb17i215', 'cv3k3szjr447m0pf073nyshvm0i215', 'wd65fyzrab06m5tja76yqkm5h4i215', 'mtre1v2m2d654se9pghtggxwj6i215',
      'sa8433gpjfeeme66bq0nk8d0b2i215', '74k5qhzbvth84r693z8f356rt3i215', '2tsxsfrr6vzkmsexbkdq68msm0i215', 'hyjrahc9ma6p43299cnp7jfjs5i215', 'dqahdeeb3q1amr2c0wxz4a4b57i215',
      '3mpmsytabrmdmdykszxz05b341i215', '41yvsw6hkz7wmyj4dtqw5bz9j0i215', 'de3z0z278g51mrjw5qr8ewh412i215', 'dr10jx75p62p4sybn6vyg37ed0i215', '6ntwcwbjv0w84zt2643j3f1k32i215',
      'n1p2tps1acm344ewkgynx3mtw7i215', 'c5eq4s1398wdmdtjdfbjy9aay6i215', 'fv6r4278nz8nm0p399fqgsk103i215', '4m2wjfft0e5smnebgbhs81jm64i215', 'zhfjmnk7261pme605by0qnrpv6i215',
      'tkr1k80s960bm42rrhpxgatsm1i215', 'fh8h9gke23w4m5pnnhpjsmj3v5i215', 'ha96t32yntmn4ke9xc21bn33w1i215', 'ha0tmx41x6xemvjr0f4w4e3rm2i215',
    ),
    facts: [
      { k: 'facts.lot', v: '0.24 Acres (10,454 Sq. Ft.)' },
      { k: 'facts.built', v: '2025' },
      { k: 'facts.stories', v: '1' },
      { k: 'facts.parking', v: '3-Car Attached Garage' },
      { k: 'facts.mls', v: '2813019' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.taxes', v: '~$3,898 / Year' },
      { k: 'facts.fees', v: '$76 + $307 / Monthly' },
      { k: 'facts.marketed', v: 'Las Vegas Sotheby’s International Realty · Kaori Nagao-Chiti' },
    ],
    description: [
      'Positioned within Ascension—Summerlin’s premier guard-gated community—this contemporary single-story home provides a rare opportunity to own a coveted floor plan without waiting for new construction.',
      'Living Spaces & Interior: Features an expansive single-story layout with luxury vinyl plank flooring, insulated windows, a gas great room fireplace, and multiple downstairs bedrooms equipped with walk-in closets and private en-suite baths.',
      'Primary Suite: The private primary suite features a dedicated sitting area, custom walk-in closets, and direct access to tranquil outdoor views.',
      'Kitchen: Equipped with a butler’s pantry, custom cabinets, a large central island, quartz countertops, high-end stainless steel appliances, a gas range, and a walk-in pantry.',
      'Outdoor & Grounds: Private backyard featuring a custom in-ground pool, an outdoor hot tub/spa, a covered and enclosed patio/courtyard, a built-in barbecue area, synthetic grass, and a dog run, with stunning city and mountain views.',
      'Community Amenities: Access to Ascension’s exclusive clubhouse featuring two community pools, a state-of-the-art fitness center, a golf simulator, weekend events, food trucks, basketball/pickleball courts, parks, and 24/7 guard-gated security.',
    ],
    amenities: [
      { k: 'vamen.interior', items: ['Luxury Vinyl Plank Flooring', 'Gas Great Room Fireplace', 'Butler’s Pantry & Walk-In Pantry', 'Quartz Island & High-End Appliances', 'Walk-In Closets & En-Suite Baths', 'Primary Suite Sitting Area'] },
      { k: 'vamen.outdoor', items: ['Custom In-Ground Pool & Hot Tub', 'Covered & Enclosed Patio / Courtyard', 'Built-In Barbecue Area', 'Synthetic Grass & Dog Run', 'City & Mountain Views'] },
      { k: 'vamen.community', items: ['Ascension Clubhouse Access', 'Two Community Pools', 'Fitness Center & Golf Simulator', 'Basketball / Pickleball Courts & Parks', '24/7 Guard-Gated Security', 'Weekend Events & Food Trucks'] },
    ],
  },
  {
    id: 'summit-club',
    address: '11665 Summit Club Drive',
    location: 'The Summit Club, Summerlin, Las Vegas, Nevada, USA',
    price: '$13,500,000',
    beds: 3,
    baths: '3.5',
    bathsFull: 3,
    bathsPartial: 1,
    sqft: '2,477',
    year: 2021,
    mls: '2749389',
    tagKey: 'tag.available',
    typeKey: 'type.condo',
    photos: [
      cotality('1', 'pgfQHQrMwVmo-Ny-VoO_VClCgW3aHf-eR7BT-bcBIxQ'),
      cotality('2', '3hnCFZeJxhaOhzrgpFF3EjM4JuDY-SnX3SzvqWBbwtM'),
      cotality('3', 'T4wA5yLc8t2x52l_D1LYRRH_zrGj35N2-v6BABww5Ns'),
      cotality('4', 'TmzTrxAE64_siYAvKHYm1QXQtSyZyF_XVD4z2fYk2_o'),
      cotality('5', '91rOet3NHle_RQ60ONfKgZfHbE6SfIuW9waDsh0E1N4'),
      cotality('7', '9Sv0lkD0dHy8AqVa8Xav3LnDu7XVCa9QuRLJ5Lo8S_s'),
      cotality('8', 'sduIMZi7iz8Xfeo_-95g5uotgWee1BjoKkZ8UQJdmCA'),
      cotality('10', 'hsH_iHAKlMUaKuaLi-pm_-bRjIAWZJaMIcRsgOcKD1U'),
      cotality('16', 'kOjc4vY5PiARThOwxqHDyrQg0WUEfLbLgk5xEgYd8Po'),
      cotality('17', 'ZMGvPywNHQRMfJFqRS0O3LQW02eE9ar7iC74V5KnbVQ'),
      cotality('18', 'r-rkHc6Y4A3Af02oaMlxiqNYm0PjBqEmAWa6f_Om_sc'),
      cotality('20', 'Whi6Dma47eWVJYI6nwkxabicmb1tHtFDZ2z2-qAu6l8'),
      cotality('21', 'QkEW6koSXGaTJpksUKsx7pMDLrWLdgdP9lXsw7_4WGU'),
      cotality('24', 'N6gegrD_AusMvexY3hGkhWacRao5EIbmLb1LvpqDCzU'),
      cotality('25', '7qnZpucpTLm20TfYzOu4xzPm2bpF2AiiJ-cwRd78GSQ'),
      cotality('26', 'j_yZ-Ifra704BGMGY9GTtUORX-p3WMNhjhvUCd3RKA8'),
      cotality('27', '7dPzJQB4w3L41a1OhZnUGSRgmBktx-Jhf7BDHtymTTM'),
      cotality('28', 'zAYfKuSWJLKoU5f-ilClpDANMKmE2yYZ6lDGMKEruyU'),
      cotality('29', 'eIKP4R6jpjpN2xV9Ji9D5T98e2nKepniNrOISXhwhMo'),
    ],
    facts: [
      { k: 'facts.lot', v: '0.55 Acres' },
      { k: 'facts.built', v: '2021' },
      { k: 'facts.parking', v: 'Attached Garage + Valet Service' },
      { k: 'facts.mls', v: '2749389' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.marketed', v: 'Las Vegas Sotheby’s International Realty · Courtesy of Summit Club Realty, LLC' },
    ],
    description: [
      'Positioned on the top level (third floor) of the Club Tower within the ultra-exclusive Summit Club, this corner residence is located just steps away from the Clubhouse, sports courts, and Practice Facility.',
      'Living Spaces: The interior features a sun-drenched primary suite accompanied by two expansive guest suites with luxurious finishes throughout. The open great room features a cozy seating area near a fireplace, an elegant dining space, a wet bar, and an open kitchen.',
      'Indoor-Outdoor Living: Sliding glass doors wrap around the great room, expanding out to a wrap-around terrace that delivers panoramic views of the surrounding desert landscape and mountains.',
    ],
    amenities: [
      { k: 'vamen.utilities', items: ['Central Air', 'Electric, Gas & Propane Heating'] },
      { k: 'vamen.interior', items: ['Furnished', 'Great Room w/ Fireplace', 'Wet Bar & Open Kitchen', 'Patio & Panoramic Views', 'Bedroom on Main Level', 'Dishwasher & Disposal'] },
      { k: 'vamen.community', items: ['Clubhouse Access', 'Subterranean Garage w/ Valet', '24/7 Guard-Gated Security'] },
    ],
  },
  {
    id: 'granite-ridge',
    address: '11280 Granite Ridge Drive #1106',
    location: 'Fairway Hills, The Ridges, Las Vegas, Nevada, USA',
    price: '$1,750,000',
    beds: 3,
    baths: '2.5',
    bathsFull: 2,
    bathsPartial: 1,
    sqft: '2,414',
    year: 2021,
    mls: '2781167',
    tagKey: 'tag.newMarket',
    typeKey: 'type.condo',
    photos: shots(
      'xwc6aej2s9c84qpqj43mt8vn52i215', '3aqkd6f76rtdm222epk5r03nh4i215', 'qc2mbe088631m3px6mr9wczfm1i215', 'qp8tnj42mk5sm36q2s17j98f03i215', 'hstbdz92ye1a49afv7ytj1hda3i215',
      'b1nkmk4ezbvhm0pc8r0398fn06i215', '5cjzatmcxghf4feke9t21295m3i215', 'xdfwvw4r4frz48ap8myqjrwqt5i215', 'g6a20xzmpmapm4t42acyxytvv2i215', 'axn93kejj9hmmxt8ss2a6z3jy6i215',
      '1akwxxa00gqmm8jx3n9fgtesq7i215', 'hvs82cdmvt1n4stjdn8g2dmy06i215', 'wm8hjajf8gkg42291ar4f969z1i215', 'rxxfst4kfff54d2rpzvg2tm4c4i215', 'zkpxvnsjxtjmmyy9c9c84t02v1i215',
      '8gr6fj51tj9gmz2hjw8ktbddc6i215', 'vgr1axd9a92eme6t76dz8zpc83i215', 'd6wbr66bp6tvmpjnb6gtjsr1d7i215',
    ),
    video: tour('6395445888112'),
    facts: [
      { k: 'facts.built', v: '2021' },
      { k: 'facts.parking', v: 'Private 2-Car Garage' },
      { k: 'facts.mls', v: '2781167' },
      { k: 'facts.id', v: '34HZHD' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.taxes', v: '$9,563 / Year' },
      { k: 'facts.fees', v: '$465 + $647 + $57 / Monthly' },
      { k: 'facts.marketed', v: 'Las Vegas Sotheby’s International Realty · Randy Char & Samantha Jones' },
    ],
    description: [
      'Exquisitely designed and positioned on the top floor, this residence showcases sweeping panoramic views of the adjacent golf course, surrounding mountains, and the desert skyline.',
      'Living Spaces: The open-concept great room features floor-to-ceiling windows framing the scenic views, a sleek gas fireplace, and a striking custom wine display.',
      'Kitchen: Features top-of-the-line appliances (including double ovens, gas cooktop, built-in microwave, and wine refrigerator), an oversized waterfall-edge island, and a spacious walk-in pantry.',
      'Primary Suite: Includes a private balcony with picturesque views, an indoor fireplace, dual walk-in closets, and a spa-inspired bathroom equipped with a deep soaking tub and an oversized rainfall shower.',
      'Additional Rooms: A dramatic glass-walled executive office and a convenient main-level laundry room with a sink and cabinets. Expansive outdoor sliders open to a large terrace ideal for outdoor dining and entertaining.',
    ],
    amenities: [
      { k: 'vamen.utilities', items: ['High-Efficiency Central A/C & Heating', 'Tankless Water Heater', 'Double-Pane Low-E Windows', 'Programmable Thermostat'] },
      { k: 'vamen.interior', items: ['Hardwood & Porcelain Tile Flooring', '2 Gas Fireplaces', 'Elevator Access', 'Security System', 'Custom Wine Display', 'Glass-Walled Executive Office', 'Main-Level Laundry Room'] },
      { k: 'vamen.outdoor', items: ['Private Balcony w/ Golf Course Views', 'Large Outdoor Entertaining Terrace'] },
      { k: 'vamen.community', items: ['Guard-Gated Access', 'Clubhouse', 'Fitness Center', 'Community Pool & Spa', 'Golf Course Access', 'Jogging Paths', 'Tennis & Pickleball Courts', 'Basketball Court'] },
    ],
  },
  {
    id: 'metropolis',
    address: '360 East Desert Inn Road #1001',
    location: 'Metropolis, Las Vegas, Nevada, USA',
    price: '$1,000,000',
    beds: 2,
    baths: '2.5',
    bathsFull: 2,
    bathsPartial: 1,
    sqft: '2,534',
    year: 2005,
    mls: '2790305',
    tagKey: 'tag.available',
    typeKey: 'type.loft',
    // No photos provided for this listing in the source document — stock image used.
    photos: [],
    facts: [
      { k: 'facts.built', v: '2005' },
      { k: 'facts.parking', v: '2 Assigned Spaces' },
      { k: 'facts.mls', v: '2790305' },
      { k: 'facts.id', v: 'JJLD5L' },
      { k: 'facts.county', v: 'Clark County' },
      { k: 'facts.taxes', v: '$4,823 / Year' },
      { k: 'facts.fees', v: '$1,394 / Monthly (HOA)' },
    ],
    description: [
      'Perched high above the city with no neighboring unit on one side for heightened privacy, this residence at Metropolis offers 270-degree panoramic views spanning from sunrise over the valley to the neon glow of the Las Vegas Strip, the Sphere, and the adjacent golf course.',
      'Living Spaces: Defined by dramatic 20-foot ceilings and expansive floor-to-ceiling windows, the open-concept floor plan features refined custom finishes throughout. It includes a versatile loft area ideal for an executive home office, media lounge, or guest retreat.',
      'Kitchen: Features custom cabinetry, granite countertops, an oversized center island with a breakfast bar, hardwood flooring, and top-tier stainless steel appliances (including a built-in electric convection oven, microwave, dishwasher, and refrigerator).',
      'Furnishing: Offered fully furnished.',
    ],
    amenities: [
      { k: 'vamen.community', items: ['24-Hour Security & Floor-Access Control', 'Concierge Service', 'Fitness Center', 'Association Pool & Spa'] },
      { k: 'vamen.interior', items: ['Fully Furnished', 'Dramatic 20-Ft Ceilings', 'Floor-to-Ceiling Windows', 'Granite Kitchen w/ Breakfast Bar', 'Custom Window Treatments', 'Main-Level Laundry Closet', 'Private Outdoor Terrace'] },
    ],
  },
];
