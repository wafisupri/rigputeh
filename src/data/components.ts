/**
 * White Ghost Rig Component Data Model
 * All specs, positions, and benchmark data for the White Ghost Rig
 */

export interface ComponentSpec {
  name: string;
  model: string;
  brand: string;
  image: string;
  keySpecs: string[];
  benchmark: BenchmarkData;
  slideDirection: 'left' | 'right' | 'up' | 'down';
  slideDistance: number;
  rotation?: { x: number; y: number; z: number };
}

export interface BenchmarkData {
  type: 'fps' | 'temp' | 'score' | 'latency' | 'throughput';
  title: string;
  unit: string;
  dataPoints: number[];
  labels: string[];
  targetLine?: number;
  color: string;
}

export interface ComponentPosition {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

// Component specs for the White Ghost Rig
export const COMPONENTS: Record<string, ComponentSpec> = {
  case: {
    name: 'Case',
    model: 'Segotep Endura Pro+ 240S White',
    brand: 'Segotep',
    image: import.meta.env.BASE_URL + "specs/case-segotep-endura-pro-240s-white.png",
    keySpecs: [
      'Pillar-less panoramic dual-chamber design',
      'Tempered glass front & side panels',
      'White steel chassis',
      'Support for 360mm radiators',
      'Vertical GPU mount ready'
    ],
    slideDirection: 'up',
    slideDistance: 3,
    rotation: { x: 0, y: 0, z: 0 },
    benchmark: {
      type: 'temp',
      title: 'Airflow Performance (Front-to-Back)',
      unit: '°C Δ',
      dataPoints: [1.2, 1.8, 2.3, 2.9, 3.4, 3.6, 3.8, 4.0, 4.1, 4.2],
      labels: ['Idle', 'Web', 'Gaming', 'Render', 'Compile', 'Cinebench', 'Prime95', 'AVX2', 'AVX-512', 'Max'],
      targetLine: 4,
      color: '#00d4aa'
    }
  },
  gpu: {
    name: 'Graphics Card',
    model: 'XFX Swift AMD Radeon RX 9060 XT 16GB',
    brand: 'XFX',
    image: import.meta.env.BASE_URL + "specs/gpu-xfx-swift-rx9060xt-16gb.png",
    keySpecs: [
      '16 GB GDDR6 VRAM',
      'Triple-fan white shroud',
      'AMD RDNA 4 architecture',
      'Boost Clock ~3.2 GHz',
      'PCIe 5.0 x16'
    ],
    slideDirection: 'right',
    slideDistance: 8,
    rotation: { x: 0, y: -Math.PI / 6, z: 0 },
    benchmark: {
      type: 'fps',
      title: '4K Gaming Performance',
      unit: 'FPS',
      dataPoints: [118, 132, 145, 158, 161, 169, 172, 175, 178, 180],
      labels: ['Cyberpunk', 'RDR2', 'Warzone', 'Apex', 'Valorant', 'CS2', 'Fortnite', 'Alan Wake 2', 'Avatar', 'Avg'],
      targetLine: 144,
      color: '#00d4aa'
    }
  },
  cooler: {
    name: 'CPU Cooler',
    model: 'ID-COOLING FX360 LCD White',
    brand: 'ID-COOLING',
    image: import.meta.env.BASE_URL + "specs/cpu-cooler-id-cooling-fx360-lcd-white.png",
    keySpecs: [
      '360mm Radiator',
      '1.48" LCD screen on pump head',
      '3x ARGB PWM fans',
      'White braided tubing',
      'Custom GIF / sensor readout support'
    ],
    slideDirection: 'up',
    slideDistance: 6,
    rotation: { x: -Math.PI / 6, y: 0, z: 0 },
    benchmark: {
      type: 'temp',
      title: 'Thermal Performance (Ryzen 7 7800X3D)',
      unit: '°C',
      dataPoints: [42, 55, 62, 68, 71, 74, 77, 79, 81, 83],
      labels: ['Idle', 'Web', 'Gaming', 'Cinebench', 'Render', 'Compile', 'Prime95', 'AVX2', 'AVX-512', 'Max'],
      targetLine: 80,
      color: '#00d4aa'
    }
  },
  cpu: {
    name: 'Processor',
    model: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    image: import.meta.env.BASE_URL + "specs/cpu-ryzen-7800x3d.png",
    keySpecs: [
      '8 Cores / 16 Threads',
      '3D V-Cache (96MB total)',
      '5.0 GHz Max Boost',
      'AM5 Socket',
      '120W TDP'
    ],
    slideDirection: 'left',
    slideDistance: 8,
    rotation: { x: 0, y: Math.PI / 4, z: 0 },
    benchmark: {
      type: 'score',
      title: 'Cinebench 2024 Multi-Core',
      unit: 'pts',
      dataPoints: [1620, 1680, 1725, 1770, 1810, 1845, 1875, 1900, 1920, 1945],
      labels: ['Stock', 'PBO', '-10UV', '-15UV', '-20UV', '-25UV', '-30UV', 'Curve+OC', 'Water', 'Max'],
      color: '#00b896'
    }
  },
  motherboard: {
    name: 'Motherboard',
    model: 'MSI B650 PRO-S',
    brand: 'MSI',
    image: import.meta.env.BASE_URL + "specs/mobo-msi-b650-pro-s.png",
    keySpecs: [
      'AM5 Socket (Ryzen 7000/8000)',
      'B650 Chipset',
      'VRM heatsink array',
      'DDR5 6000+ MT/s (OC)',
      'PCIe 4.0 M.2 support'
    ],
    slideDirection: 'down',
    slideDistance: 3,
    rotation: { x: Math.PI / 8, y: 0, z: 0 },
    benchmark: {
      type: 'latency',
      title: 'Memory Latency Scaling',
      unit: 'ns',
      dataPoints: [72, 68, 64, 61, 59, 57, 55, 54, 53, 52],
      labels: ['4800', '5200', '5600', '6000', '6200', '6400', '6600', '6800', '7000', '7200'],
      color: '#1effc8'
    }
  },
  ram: {
    name: 'Memory',
    model: 'XPG Lancer Blade 32GB (16x2) 6000MHz White',
    brand: 'XPG',
    image: import.meta.env.BASE_URL + "specs/ram-xpg-lancer-blade-16x2-6000mhz.png",
    keySpecs: [
      '32 GB Total (2x16GB)',
      'DDR5-6000 CL30',
      'Low-profile blade design',
      'Intel XMP 3.0 / AMD EXPO',
      'White aluminum heatsink'
    ],
    slideDirection: 'down',
    slideDistance: 5,
    rotation: { x: Math.PI / 6, y: 0, z: 0 },
    benchmark: {
      type: 'throughput',
      title: 'Memory Bandwidth & Latency',
      unit: 'GB/s / ns',
      dataPoints: [82.4, 86.1, 89.8, 93.2, 96.5, 99.7, 102.3, 105.2, 108.8, 112.0],
      labels: ['4800', '5200', '5600', '6000', '6200', '6400', '6600', '6800', '7000', '7200'],
      color: '#1effc8'
    }
  },
  storage: {
    name: 'Storage',
    model: '1TB Samsung 990 Pro',
    brand: 'Samsung',
    image: import.meta.env.BASE_URL + "specs/ssd-1tb-samsung-990-pro.png",
    keySpecs: [
      '1 TB Capacity',
      'PCIe 4.0 x4 NVMe',
      '7,450 / 6,900 MB/s R/W',
      '1,400K / 1,550K IOPS',
      '5-Year Warranty'
    ],
    slideDirection: 'right',
    slideDistance: 4,
    rotation: { x: 0, y: Math.PI / 6, z: 0 },
    benchmark: {
      type: 'throughput',
      title: 'Sequential Read/Write (CrystalDiskMark)',
      unit: 'MB/s',
      dataPoints: [7450, 7420, 7380, 7350, 7310, 7280, 7240, 7200, 7150, 7100],
      labels: ['Fresh', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'],
      color: '#00b896'
    }
  },
  psu: {
    name: 'Power Supply',
    model: 'Cooler Master MWE Gold 850 V3 White',
    brand: 'Cooler Master',
    image: import.meta.env.BASE_URL + "specs/psu-coolermaster-850-mwe-gold-v3.png",
    keySpecs: [
      '850W 80+ Gold',
      'Fully Modular White cables',
      '120mm HDB fan',
      'DC-to-DC conversion',
      '5-Year Warranty'
    ],
    slideDirection: 'left',
    slideDistance: 5,
    rotation: { x: 0, y: -Math.PI / 6, z: 0 },
    benchmark: {
      type: 'score',
      title: 'Efficiency Curve (80+ Gold)',
      unit: '%',
      dataPoints: [86, 89, 90, 91, 92, 92.5, 92, 91.5, 91, 90],
      labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
      targetLine: 90,
      color: '#00d4aa'
    }
  }
};

// Assembly order - the sequence components appear in the scroll timeline
export const ASSEMBLY_ORDER: (keyof typeof COMPONENTS)[] = [
  'case',
  'gpu',
  'cooler',
  'cpu',
  'motherboard',
  'ram',
  'storage',
  'psu'
];

// Component colors for Three.js materials
export const COMPONENT_COLORS: Record<string, number> = {
  case: 0x00d4aa,
  gpu: 0x00d4aa,
  cooler: 0x1effc8,
  cpu: 0x00b896,
  motherboard: 0x00d4aa,
  ram: 0x1effc8,
  storage: 0x00b896,
  psu: 0x00d4aa
};

// Default positions when assembled
export const ASSEMBLED_POSITIONS: Record<string, ComponentPosition> = {
  case: { x: 0, y: -0.5, z: 1.2, rotationX: 0, rotationY: 0, rotationZ: 0 },
  gpu: { x: 0, y: -0.5, z: 1.2, rotationX: 0, rotationY: 0, rotationZ: 0 },
  cpu: { x: 0, y: 0.3, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 },
  cooler: { x: 0, y: 1.8, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 },
  ram: { x: -1.2, y: 0.8, z: 0.5, rotationX: 0, rotationY: 0, rotationZ: 0 },
  storage: { x: 0.8, y: -0.8, z: 0.3, rotationX: 0, rotationY: 0, rotationZ: 0 },
  psu: { x: -2, y: -1.5, z: -0.5, rotationX: 0, rotationY: 0, rotationZ: 0 },
  motherboard: { x: 0, y: -1.2, z: 0, rotationX: -Math.PI / 2, rotationY: 0, rotationZ: 0 }
};

// Slid-out positions
export function getSlidOutPosition(componentId: string): ComponentPosition {
  const assembled = ASSEMBLED_POSITIONS[componentId];
  const spec = COMPONENTS[componentId];
  const dist = spec.slideDistance;

  let x = assembled.x;
  let y = assembled.y;
  const z = assembled.z;

  switch (spec.slideDirection) {
    case 'left': x -= dist; break;
    case 'right': x += dist; break;
    case 'up': y += dist; break;
    case 'down': y -= dist; break;
  }

  return {
    x, y, z,
    rotationX: assembled.rotationX + (spec.rotation?.x || 0),
    rotationY: assembled.rotationY + (spec.rotation?.y || 0),
    rotationZ: assembled.rotationZ + (spec.rotation?.z || 0)
  };
}

// Battlestation monitors
export const BATTLESTATION = {
  main: {
    name: 'MSI MAG 274QRFW X32',
    spec: '27" QHD 320Hz Rapid IPS — White',
    image: import.meta.env.BASE_URL + "specs/monitor-main-msi-274qrfw-x32.png"
  },
  secondary: {
    name: 'MSI PRO MP275W E2',
    spec: '27" FHD 120Hz IPS — White',
    image: import.meta.env.BASE_URL + "specs/monitor-secondary-msi-pro-mp275w-e2.png"
  }
};
