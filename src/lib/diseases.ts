export interface Supplier {
  name: string;
  city: string;
  specialization: string;
  phone: string;
  mapUrl?: string;
}

export interface Disease {
  id: string;
  name: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  affectedCrops: string[];
  symptoms: string[];
  treatments: string[];
  prevention: string[];
  recovery: string;
  suppliers: Supplier[];
}

export const diseases: Disease[] = [
  {
    id: "healthy",
    name: "Healthy Leaf",
    severity: "Low",
    affectedCrops: ["Wheat", "Rice", "Maize", "Cotton"],
    symptoms: ["No spots", "Uniform green"],
    treatments: ["Regular watering", "Balanced fertilizer"],
    prevention: ["Crop rotation"],
    recovery: "Always healthy",
    suppliers: [
      { name: "Green Agro", city: "Lahore", specialization: "General Seeds", phone: "0300-1234567" },
      { name: "Healthy Crop Center", city: "Karachi", specialization: "Organic Fertilizers", phone: "0311-7654321" },
    ],
  },
  {
    id: "leaf-blight",
    name: "Leaf Blight",
    severity: "High",
    affectedCrops: ["Wheat", "Maize", "Rice"],
    symptoms: ["Water-soaked lesions", "Brown patches"],
    treatments: ["Apply Mancozeb", "Remove infected leaves"],
    prevention: ["Resistant varieties", "Crop rotation"],
    recovery: "10-14 days",
    suppliers: [
      { name: "AgriHeal", city: "Faisalabad", specialization: "Fungicides", phone: "0345-9876543" },
      { name: "Farm Solutions", city: "Multan", specialization: "Pesticides", phone: "0302-4455667" },
    ],
  },
  {
    id: "powdery-mildew",
    name: "Powdery Mildew",
    severity: "Medium",
    affectedCrops: ["Wheat", "Barley", "Cucurbits"],
    symptoms: ["White powdery spots", "Stunted growth"],
    treatments: ["Sulfur fungicide", "Neem oil"],
    prevention: ["Avoid dense planting"],
    recovery: "7-10 days",
    suppliers: [
      { name: "BioControl Labs", city: "Lahore", specialization: "Bio-agents", phone: "0333-1122334" },
      { name: "Crop Shield", city: "Karachi", specialization: "General Care", phone: "0301-9988776" },
    ],
  },
  {
    id: "rust-disease",
    name: "Rust Disease",
    severity: "High",
    affectedCrops: ["Wheat", "Barley", "Oats"],
    symptoms: ["Orange pustules", "Premature drying"],
    treatments: ["Triazole fungicide", "Remove volunteer plants"],
    prevention: ["Resistant varieties"],
    recovery: "14-21 days",
    suppliers: [
      { name: "RustFree Agro", city: "Faisalabad", specialization: "Wheat Experts", phone: "0346-5544332" },
      { name: "Wheat Care", city: "Multan", specialization: "Grain Protection", phone: "0300-6677889" },
    ],
  },
  {
    id: "bacterial-spot",
    name: "Bacterial Spot",
    severity: "Medium",
    affectedCrops: ["Tomato", "Pepper", "Cotton"],
    symptoms: ["Dark water-soaked spots", "Leaf curling"],
    treatments: ["Copper bactericide", "Prune branches"],
    prevention: ["Disease-free seeds", "Crop rotation"],
    recovery: "12-16 days",
    suppliers: [
      { name: "BactoStop", city: "Karachi", specialization: "Bactericides", phone: "0332-7788990" },
      { name: "Green Cure", city: "Lahore", specialization: "Vegetable Care", phone: "0347-1234560" },
    ],
  },
  {
    id: "mosaic-virus",
    name: "Mosaic Virus",
    severity: "Critical",
    affectedCrops: ["Tomato", "Tobacco", "Cucumber"],
    symptoms: ["Mottled yellow pattern", "Leaf distortion"],
    treatments: ["Remove infected plants", "Control aphids"],
    prevention: ["Resistant varieties", "Weed control"],
    recovery: "No cure",
    suppliers: [
      { name: "Vector Control", city: "Multan", specialization: "Virus Management", phone: "0303-1237890" },
      { name: "Crop Hygiene", city: "Faisalabad", specialization: "Sanitation", phone: "0310-4567891" },
    ],
  },
  {
    id: "root-rot",
    name: "Root Rot",
    severity: "High",
    affectedCrops: ["Cotton", "Soybean", "Chickpea"],
    symptoms: ["Wilting", "Brown/black roots"],
    treatments: ["Improve drainage", "Trichoderma"],
    prevention: ["Seed treatment", "Avoid overwatering"],
    recovery: "15-20 days",
    suppliers: [
      { name: "Root Guard", city: "Lahore", specialization: "Soil Health", phone: "0344-5678901" },
      { name: "BioRise", city: "Karachi", specialization: "Root Boosters", phone: "0321-9988776" },
    ],
  },
  {
    id: "anthracnose",
    name: "Anthracnose",
    severity: "Medium",
    affectedCrops: ["Mango", "Bean", "Chili"],
    symptoms: ["Sunken dark lesions", "Pink spore masses"],
    treatments: ["Chlorothalonil", "Prune twigs"],
    prevention: ["Resistant varieties", "Copper sprays"],
    recovery: "10-14 days",
    suppliers: [
      { name: "FruitShield", city: "Multan", specialization: "Fruit Care", phone: "0342-3344556" },
      { name: "Mango Care", city: "Karachi", specialization: "Tropical Experts", phone: "0331-2233445" },
    ],
  },
];

export const allSuppliers: Supplier[] = [
  { name: "Green Agro", city: "Lahore", specialization: "General Seeds", phone: "0300-1234567" },
  { name: "Healthy Crop Center", city: "Karachi", specialization: "Organic Fertilizers", phone: "0311-7654321" },
  { name: "AgriHeal", city: "Faisalabad", specialization: "Fungicides", phone: "0345-9876543" },
  { name: "Farm Solutions", city: "Multan", specialization: "Pesticides", phone: "0302-4455667" },
  { name: "BioControl Labs", city: "Lahore", specialization: "Bio-agents", phone: "0333-1122334" },
  { name: "Crop Shield", city: "Karachi", specialization: "General Care", phone: "0301-9988776" },
  { name: "RustFree Agro", city: "Faisalabad", specialization: "Wheat Experts", phone: "0346-5544332" },
  { name: "Wheat Care", city: "Multan", specialization: "Grain Protection", phone: "0300-6677889" },
  { name: "BactoStop", city: "Karachi", specialization: "Bactericides", phone: "0332-7788990" },
  { name: "Green Cure", city: "Lahore", specialization: "Vegetable Care", phone: "0347-1234560" },
  { name: "Vector Control", city: "Multan", specialization: "Virus Management", phone: "0303-1237890" },
  { name: "Crop Hygiene", city: "Faisalabad", specialization: "Sanitation", phone: "0310-4567891" },
  { name: "Root Guard", city: "Lahore", specialization: "Soil Health", phone: "0344-5678901" },
  { name: "BioRise", city: "Karachi", specialization: "Root Boosters", phone: "0321-9988776" },
  { name: "FruitShield", city: "Multan", specialization: "Fruit Care", phone: "0342-3344556" },
  { name: "Mango Care", city: "Karachi", specialization: "Tropical Experts", phone: "0331-2233445" },
  { name: "Peshawar Agri", city: "Peshawar", specialization: "Northern Crops", phone: "0322-1122334" },
  { name: "Rawalpindi Seeds", city: "Rawalpindi", specialization: "High Altitude Crops", phone: "0334-5566778" },
  { name: "Hyderabad Harvest", city: "Hyderabad", specialization: "Cotton Experts", phone: "0312-9988776" },
  { name: "Sialkot Soil", city: "Sialkot", specialization: "Soil Fertility", phone: "0341-2233445" },
];
