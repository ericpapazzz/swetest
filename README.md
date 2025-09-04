# SWETest - Full Stack User Management Application

Una aplicación de gestión de usuarios construida con React + TypeScript en el frontend y Node.js + Express + PostgreSQL en el backend.

## 🏗️ Arquitectura del Proyecto

```
swetest/
├── api/                          # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── server/
│   │   │   ├── config/           # Configuración de base de datos
│   │   │   ├── data/             # Modelos, controladores, repositorios
│   │   │   └── index.ts          # Punto de entrada del servidor
│   │   └── Dockerfile            # Contenedor Docker para el backend
├── frontend/                     # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── services/             # Servicios de API
│   │   ├── types/                # Definiciones de tipos TypeScript
│   │   └── main.tsx              # Punto de entrada de React
│   └── Dockerfile.dev            # Contenedor Docker para desarrollo
├── docker-compose.yml            # Orquestación de contenedores
└── README.md                     # Este archivo
```


## 🚀 Ejecución Local

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **PostgreSQL** (versión 14 o superior)
- **Docker** y **Docker Compose** (opcional, para ejecución en contenedores)

#### 1. Configurar Base de Datos Local

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE swetest;

# Conectar a la base de datos
\c swetest

# Crear tabla de usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL
);

# Salir de psql
\q
```

#### 2. Configurar variables de entorno

Crear archivo `.env` en /api:

```env
POSTGRES_HOST=postgres o POSTGRES_HOST=localhost // utiliza 'postgres' para ejecutar utilizando docker contenedores y 'localhost' para ejecutar local
POSTGRES_DB=tu_db
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_contrasena
POSTGRES_PORT=5432
```

Crear archivo `.env` en la raíz del proyecto:

```env
# Database Credentials for the Postgres Service
POSTGRES_DB=tu_db
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_contrasena
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

### Ejecución con Docker

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

#### Acceder a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Base de Datos**: localhost:5432

### Ejecución Local

#### Ejecutar Backend

```bash
# Navegar al directorio del backend
cd api

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar en modo desarrollo
npm run dev
```

El backend estará disponible en: `http://localhost:8000`

#### Ejecutar Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar en modo desarrollo
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

## Configuración

### Backend (API)

#### Estructura de Archivos
- **`index.ts`**: Punto de entrada del servidor Express
- **`database.ts`**: Configuración de conexión a PostgreSQL con Sequelize
- **`UserController.ts`**: Controlador para operaciones CRUD de usuarios
- **`UserRepository.ts`**: Capa de acceso a datos con Sequelize
- **`User.ts`**: Modelo de datos para usuarios

#### Endpoints de API
- GET /api/v1/users # Obtener todos los usuarios 
- POST /api/v1/createUser # Crear nuevo usuario
- PUT /api/v1/updateUser/:id # Actualizar usuario
- DELETE /api/v1/deleteUser/:id # Eliminar usuario
- GET /api/v1/users/:id # Obtener usuario por ID
- GET /api/v1/health # 
- GET /api/v1/analytics #

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

### Comandos Docker

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
```