# SWETest - Full Stack User Management Application

Una aplicación completa de gestión de usuarios construida con React + TypeScript en el frontend y Node.js + Express + PostgreSQL en el backend.

## 🏗️ Arquitectura del Proyecto
swetest/
├── api/ # Backend API (Node.js + Express + TypeScript)
│ ├── src/
│ │ ├── server/
│ │ │ ├── config/ # Configuración de base de datos
│ │ │ ├── data/ # Modelos, controladores, repositorios
│ │ │ └── index.ts # Punto de entrada del servidor
│ │ └── Dockerfile # Contenedor Docker para el backend
├── frontend/ # Frontend (React + TypeScript + Vite)
│ ├── src/
│ │ ├── components/ # Componentes React
│ │ ├── services/ # Servicios de API
│ │ ├── types/ # Definiciones de tipos TypeScript
│ │ └── main.tsx # Punto de entrada de React
│ └── Dockerfile.dev # Contenedor Docker para desarrollo
├── docker-compose.yml # Orquestación de contenedores
└── README.md # Este archivo


## 🚀 Ejecución Local

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **PostgreSQL** (versión 14 o superior)
- **Docker** y **Docker Compose** (opcional, para ejecución en contenedores)

### Ejecución con Docker

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

#### 2. Acceder a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Base de Datos**: localhost:5432

## Configuración

### Backend (API)

#### Estructura de Archivos
- **`index.ts`**: Punto de entrada del servidor Express
- **`database.ts`**: Configuración de conexión a PostgreSQL con Sequelize
- **`UserController.ts`**: Controlador para operaciones CRUD de usuarios
- **`UserRepository.ts`**: Capa de acceso a datos con Sequelize
- **`User.ts`**: Modelo de datos para usuarios

#### Endpoints de API
GET /api/v1/users # Obtener todos los usuarios
POST /api/v1/createUser # Crear nuevo usuario
PUT /api/v1/updateUser/:id # Actualizar usuario
DELETE /api/v1/deleteUser/:id # Eliminar usuario
GET /api/v1/users/:id # Obtener usuario por ID

### Frontend

#### Estructura de Archivos
- **`App.tsx`**: Componente principal de la aplicación
- **`UserManagement.tsx`**: Componente de gestión de usuarios
- **`userService.ts`**: Servicio para comunicación con la API
- **`user.ts`**: Definición de tipos TypeScript

#### Tecnologías Utilizadas
- **React 19** con TypeScript
- **Vite** como bundler y servidor de desarrollo
- **Tailwind CSS** para estilos
- **Lucide React** para iconos

### Comandos Docker Útiles

```bash
# Construir y ejecutar
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Reconstruir un servicio específico
docker-compose up --build api
```

## �� Solución de Problemas

### Problema: "Failed to fetch users"
- **Causa**: Backend no está ejecutándose o no puede conectarse a la base de datos
- **Solución**: Verificar que el backend esté corriendo y la base de datos esté disponible

### Problema: "Cannot find package 'cors'"
- **Causa**: Dependencias no instaladas correctamente
- **Solución**: Ejecutar `npm install` en el directorio del backend

### Problema: "Connection refused" en base de datos
- **Causa**: Variables de entorno incorrectas o base de datos no disponible
- **Solución**: Verificar archivo `.env` y estado de la base de datos

### Problema: Frontend no se actualiza
- **Causa**: Problemas con hot reload en Docker
- **Solución**: Verificar volúmenes montados y configuración de Vite

## 📝 Notas de Desarrollo

### Estructura de Respuestas de API

```json
{
  "status": "OK",
  "message": "Mensaje descriptivo",
  "data": {
    // Datos de la respuesta
  }
}
```

### Manejo de Errores

```json
{
  "status": "Error",
  "message": "Descripción del error",
  "error": "Detalles adicionales"
}