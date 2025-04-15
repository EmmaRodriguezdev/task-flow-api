import fs from 'fs';
import path from 'path';

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('❌ Debes proporcionar un nombre para el módulo.');
  process.exit(1);
}

const capitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
// Ruta base: se utilizará la carpeta 'src/modules' (y se creará si no existe)
const basePath = path.join(process.cwd(), 'src', 'modules', moduleName);

const files = [
  {
    name: `${moduleName}.routes.ts`,
    content: `// Rutas para ${capitalized}\n\nexport const ${moduleName}Routes = [];`
  },
  {
    name: `${moduleName}.service.ts`,
    content: `// Servicio para ${capitalized}\n\nexport class ${capitalized}Service {}`
  },
  {
    name: `${moduleName}.controller.ts`,
    content: `// Controlador para ${capitalized}\n\nexport class ${capitalized}Controller {}`
  },
  {
    name: `${moduleName}.model.ts`,
    content: `// Modelo para ${capitalized}\n\nexport interface ${capitalized} {}`
  }
];

// Crear carpeta del módulo (incluyendo src/modules si es necesario)
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
  console.log(`📁 Carpeta creada: ${basePath}`);
} else {
  console.log(`⚠️ La carpeta ya existe: ${basePath}`);
}

// Crear archivos
files.forEach(file => {
  const filePath = path.join(basePath, file.name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, file.content);
    console.log(`📄 Archivo creado: ${file.name}`);
  } else {
    console.log(`⚠️ Ya existe: ${file.name}`);
  }
});
