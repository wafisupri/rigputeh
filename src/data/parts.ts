export interface Bar {
  name: string
  value: number
  ours?: boolean
}

export interface Chart {
  title: string
  unit: string
  betterIsLower?: boolean
  bars: Bar[]
}

export interface Part {
  id: string
  name: string
  model: string
  brand: string
  role: string
  specs: [string, string][]
  img: string
  alt: string
  chart: Chart
}

export const CHART_NOTE =
  'Indicative figures compiled from published reviews and vendor specifications.'

export const STAGE = {
  case: '/parts/case-segotep-endura-pro-240s-white--0.webp',
  mobo: '/parts/mobo-msi-b650-pro-s--0.webp',
  cpu: '/parts/cpu-ryzen-7800x3d--3.webp',
  cooler: '/parts/cpu-cooler-id-cooling-fx360-lcd-white--0.webp',
  gpu: '/parts/gpu-xfx-swift-rx9060xt-16gb--1.webp',
  ramA: '/parts/ram-xpg-lancer-blade-16x2-6000mhz--3.webp',
  ramB: '/parts/ram-xpg-lancer-blade-16x2-6000mhz--4.webp',
  ssd: '/parts/ssd-1tb-samsung-990-pro--0.webp',
  psu: '/parts/psu-coolermaster-850-mwe-gold-v3--4.webp',
  monMain: '/parts/monitor-main-msi-274qrfw-x32-27-qhd-320hz-rapid-ips-white--0.webp',
  monSec: '/parts/monitor-secondary-msi-pro-mp275w-e2-27-fhd-120hz-ips-white--1.webp',
  hero: '/parts/white-ghost-rig--0.webp',
  desk: '/parts/white-ghost-rig--2.webp'
} as const

export const CORE: Part[] = [
  {
    id: 'cpu',
    name: 'CPU',
    model: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    role: '3D V-Cache gaming chip — 8 cores that punch above their TDP.',
    specs: [
      ['Cores', '8C / 16T'],
      ['Cache', '104 MB (96 3D)'],
      ['Boost', 'Up to 5.0 GHz'],
      ['TDP', '120 W']
    ],
    img: '/parts/cpu-ryzen-7800x3d--3.webp',
    alt: 'AMD Ryzen 7 7800X3D processor IHS',
    chart: {
      title: '1440p gaming average',
      unit: 'FPS',
      bars: [
        { name: 'AMD R9 9950X', value: 158 },
        { name: 'AMD R7 9800X3D', value: 152 },
        { name: 'AMD R7 7800X3D', value: 141, ours: true },
        { name: 'Intel i9-14900K', value: 138 },
        { name: 'Intel i7-14700K', value: 133 },
        { name: 'AMD R7 9700X', value: 127 }
      ]
    }
  },
  {
    id: 'gpu',
    name: 'GPU',
    model: 'XFX Swift RX 9060 XT 16GB',
    brand: 'XFX',
    role: 'RDNA 4 white triple-fan card — 1440p ultra without breaking a sweat.',
    specs: [
      ['VRAM', '16 GB GDDR6'],
      ['Boost', '~3.23 GHz'],
      ['Arch', 'RDNA 4'],
      ['Bus', 'PCIe 5.0 ×16']
    ],
    img: '/parts/gpu-xfx-swift-rx9060xt-16gb--1.webp',
    alt: 'XFX Swift Radeon RX 9060 XT 16GB graphics card, triple-fan front',
    chart: {
      title: '1440p ultra average',
      unit: 'FPS',
      bars: [
        { name: 'NVIDIA RTX 5070', value: 142 },
        { name: 'NVIDIA RTX 5060 Ti', value: 118 },
        { name: 'AMD RX 9060 XT', value: 112, ours: true },
        { name: 'NVIDIA RTX 4060 Ti', value: 105 },
        { name: 'NVIDIA RTX 5060', value: 96 },
        { name: 'Intel Arc B580', value: 92 },
        { name: 'AMD RX 7600 XT', value: 84 }
      ]
    }
  },
  {
    id: 'vram',
    name: 'VRAM',
    model: '16 GB GDDR6 on-board',
    brand: 'AMD / SK Hynix',
    role: '16 GB of GDDR6 — room for 1440p textures, RT, and long sessions.',
    specs: [
      ['Capacity', '16 GB'],
      ['Type', 'GDDR6 · 20 Gbps'],
      ['Bandwidth', '322 GB/s'],
      ['Headroom', '1440p+ textures']
    ],
    img: '/parts/gpu-xfx-swift-rx9060xt-16gb--0.webp',
    alt: 'XFX Swift RX 9060 XT backplate covering 16 GB GDDR6 modules',
    chart: {
      title: 'Frame buffer capacity',
      unit: 'GB',
      bars: [
        { name: 'RTX 5090 (24 GB)', value: 24 },
        { name: 'RX 7900 XTX (24 GB)', value: 24 },
        { name: 'AMD RX 9060 XT', value: 16, ours: true },
        { name: 'NVIDIA RTX 5060 Ti', value: 16 },
        { name: 'NVIDIA RTX 5060', value: 8 },
        { name: 'NVIDIA RTX 4060', value: 8 },
        { name: 'Intel Arc B580', value: 12 }
      ]
    }
  },
  {
    id: 'ram',
    name: 'RAM',
    model: 'XPG Lancer Blade 32 GB',
    brand: 'XPG',
    role: '2×16 GB DDR5-6000 CL30 — EXPO-tuned, low-profile white blades.',
    specs: [
      ['Kit', '2 × 16 GB'],
      ['Speed', 'DDR5-6000'],
      ['Timing', 'CL30 EXPO'],
      ['Profile', 'Low-profile']
    ],
    img: '/parts/ram-xpg-lancer-blade-16x2-6000mhz--1.webp',
    alt: 'XPG Lancer Blade DDR5 memory module',
    chart: {
      title: 'AIDA64 read bandwidth',
      unit: 'GB/s',
      bars: [
        { name: 'G.Skill Trident Z5 DDR5-8000', value: 114 },
        { name: 'Corsair Dominator DDR5-7200', value: 104 },
        { name: 'XPG Lancer Blade DDR5-6000', value: 89, ours: true },
        { name: 'Kingston Fury DDR5-5600', value: 82 },
        { name: 'Corsair Vengeance DDR5-4800', value: 74 },
        { name: 'G.Skill Ripjaws DDR4-3600', value: 51 }
      ]
    }
  },
  {
    id: 'ssd',
    name: 'SSD',
    model: 'Samsung 990 PRO 1 TB',
    brand: 'Samsung',
    role: 'PCIe 4.0 flagship — games load before the splash screen finishes.',
    specs: [
      ['Capacity', '1 TB'],
      ['Interface', 'PCIe 4.0 ×4'],
      ['Read / Write', '7,450 / 6,900 MB/s'],
      ['Endurance', '600 TBW']
    ],
    img: '/parts/ssd-1tb-samsung-990-pro--0.webp',
    alt: 'Samsung 990 PRO 1TB NVMe SSD',
    chart: {
      title: 'Sequential read',
      unit: 'MB/s',
      bars: [
        { name: 'Samsung 990 EVO Plus (Gen5)', value: 12400 },
        { name: 'Samsung 990 PRO', value: 7450, ours: true },
        { name: 'WD Black SN850X (Gen4)', value: 7300 },
        { name: 'Crucial T500 (Gen4)', value: 7400 },
        { name: 'Kingston NV2 (Gen4)', value: 5000 },
        { name: 'Samsung 980 PRO (Gen3)', value: 3500 },
        { name: 'Crucial MX500 (SATA)', value: 560 }
      ]
    }
  },
  {
    id: 'monitor',
    name: 'Monitor',
    model: 'MSI MAG 274QRFW X32',
    brand: 'MSI',
    role: '27″ QHD Rapid IPS at 320 Hz — the primary display of the battlestation.',
    specs: [
      ['Panel', '27″ Rapid IPS'],
      ['Resolution', '2560 × 1440'],
      ['Refresh', '320 Hz OC'],
      ['Extras', 'HDR400 · ΔE < 2']
    ],
    img: '/parts/monitor-main-msi-274qrfw-x32-27-qhd-320hz-rapid-ips-white--0.webp',
    alt: 'MSI MAG 274QRFW X32 27 inch QHD 320Hz white monitor',
    chart: {
      title: 'Refresh rate',
      unit: 'Hz',
      bars: [
        { name: 'ASUS ROG Swift OLED 32"', value: 480 },
        { name: 'Alienware AW2725DF', value: 360 },
        { name: 'MSI MAG 274QRFW X32', value: 320, ours: true },
        { name: 'Samsung Odyssey G7', value: 240 },
        { name: 'LG 27GP850B', value: 165 },
        { name: 'Dell S2722DGM', value: 144 }
      ]
    }
  }
]

export const SUPPORTING: Part[] = [
  {
    id: 'case',
    name: 'Case',
    model: 'Segotep Endura Pro+ 240S White',
    brand: 'Segotep',
    role: 'Pillar-less dual-chamber glass cube — the White Ghost silhouette.',
    specs: [
      ['Layout', 'Dual-chamber'],
      ['Panels', 'Tempered glass ×2'],
      ['Cooling', 'Up to 360 mm rad'],
      ['Theme', 'All-white steel']
    ],
    img: '/parts/case-segotep-endura-pro-240s-white--0.webp',
    alt: 'Segotep Endura Pro+ 240S white dual-chamber case',
    chart: {
      title: 'Load airflow Δ temp',
      unit: '°C',
      betterIsLower: true,
      bars: [
        { name: 'Lian Li O11 Dynamic EVO', value: 7.2 },
        { name: 'Fractal Meshify 2', value: 4.8 },
        { name: 'NZXT H7 Flow', value: 4.5 },
        { name: 'Segotep Endura Pro+', value: 3.8, ours: true },
        { name: 'Lian Li O11D EVO RGB', value: 3.5 }
      ]
    }
  },
  {
    id: 'cooler',
    name: 'Cooler',
    model: 'ID-COOLING FX360 LCD White',
    brand: 'ID-COOLING',
    role: '360 mm AIO with an LCD pump head — keeps the 7800X3D quiet.',
    specs: [
      ['Radiator', '360 mm'],
      ['Pump', '1.9″ LCD head'],
      ['Fans', '3 × ARGB PWM'],
      ['Noise', '< 32 dBA typ.']
    ],
    img: '/parts/cpu-cooler-id-cooling-fx360-lcd-white--2.webp',
    alt: 'ID-COOLING FX360 LCD White 360mm AIO cooler',
    chart: {
      title: 'Cinebench load temp',
      unit: '°C',
      betterIsLower: true,
      bars: [
        { name: 'AMD Wraith Prism (stock)', value: 89 },
        { name: 'Noctua NH-D15 (air)', value: 77 },
        { name: 'Corsair iCUE H150i (240mm)', value: 73 },
        { name: 'ID-COOLING FX360 LCD', value: 69, ours: true },
        { name: 'NZXT Kraken X73 (420mm)', value: 67 }
      ]
    }
  },
  {
    id: 'mobo',
    name: 'Motherboard',
    model: 'MSI B650 PRO-S',
    brand: 'MSI',
    role: 'AM5 B650 board — VRM headroom for EXPO and a clean white theme.',
    specs: [
      ['Socket', 'AM5'],
      ['Chipset', 'B650'],
      ['Memory', 'DDR5-7600+ OC'],
      ['Storage', 'PCIe 4.0 M.2 ×2']
    ],
    img: '/parts/mobo-msi-b650-pro-s--0.webp',
    alt: 'MSI B650 PRO-S AM5 motherboard',
    chart: {
      title: 'Max memory OC',
      unit: 'MT/s',
      bars: [
        { name: 'ASUS ROG Crosshair X670E', value: 8000 },
        { name: 'MSI B650 PRO-S', value: 7600, ours: true },
        { name: 'Gigabyte B650M DS3H', value: 6400 }
      ]
    }
  },
  {
    id: 'psu',
    name: 'PSU',
    model: 'Cooler Master MWE Gold 850 V3',
    brand: 'Cooler Master',
    role: '850 W 80+ Gold, fully modular white cables — quiet under load.',
    specs: [
      ['Wattage', '850 W'],
      ['Rating', '80+ Gold'],
      ['Cables', 'Fully modular'],
      ['Fan', '120 mm HDB']
    ],
    img: '/parts/psu-coolermaster-850-mwe-gold-v3--3.webp',
    alt: 'Cooler Master MWE Gold 850 V3 power supply',
    chart: {
      title: 'Efficiency at 50% load',
      unit: '%',
      bars: [
        { name: 'Seasonic Prime TX-850 (Titanium)', value: 96 },
        { name: 'Corsair HX850i (Platinum)', value: 94 },
        { name: 'Cooler Master MWE Gold 850 V3', value: 92, ours: true },
        { name: 'EVGA SuperNOVA 850 G7 (Gold)', value: 91 },
        { name: 'Thermaltake Toughpower 850 (Bronze)', value: 85 }
      ]
    }
  },
  {
    id: 'monitor-sec',
    name: 'Secondary',
    model: 'MSI PRO MP275W E2',
    brand: 'MSI',
    role: '27″ FHD 120 Hz IPS — Discord, charts, and the second screen.',
    specs: [
      ['Panel', '27″ IPS'],
      ['Resolution', '1920 × 1080'],
      ['Refresh', '120 Hz'],
      ['Use', 'Chat / charts']
    ],
    img: '/parts/monitor-secondary-msi-pro-mp275w-e2-27-fhd-120hz-ips-white--1.webp',
    alt: 'MSI PRO MP275W E2 27 inch FHD 120Hz white monitor',
    chart: {
      title: 'Refresh rate',
      unit: 'Hz',
      bars: [
        { name: 'ASUS VG278Q (144 Hz)', value: 144 },
        { name: 'MSI PRO MP275W E2', value: 120, ours: true },
        { name: 'LG 27MP400 (100 Hz)', value: 100 },
        { name: 'Dell SE2723DS (75 Hz)', value: 75 },
        { name: 'HP V24i (60 Hz)', value: 60 }
      ]
    }
  }
]
