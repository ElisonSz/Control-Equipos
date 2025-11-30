# Control Equipos v2.0

Sistema completo de control y alquiler de equipos desarrollado con TypeScript, Express, MongoDB, Redis y WebSockets.

## Características

- ✅ Autenticación JWT con roles (Cliente, Admin, Operativo)
- ✅ Gestión completa de equipos con estados (disponible, reservado, dañado, en mantenimiento)
- ✅ Sistema de reservas con generación de tickets PDF
- ✅ Sistema de métricas para administradores y operativos
- ✅ Alertas en tiempo real de nuevas reservas mediante WebSockets
- ✅ Sistema de chat en tiempo real con soporte usando WebSockets y Redis
- ✅ Documentación completa de API con Swagger
- ✅ Arquitectura modular siguiendo principios SOLID
- ✅ Tests unitarios y de integración
- ✅ Despliegue con Docker y Docker Compose

## Tecnologías

- **Node.js** 20 LTS
- **TypeScript** 5.2
- **Express** 4.18
- **MongoDB** 7.0 con Mongoose
- **Redis** 7 para cache y WebSockets
- **Socket.IO** para WebSockets
- **Puppeteer** para generación de PDFs
- **Jest** para testing
- **Swagger** para documentación

## Requisitos Previos

- Node.js 20 LTS o superior
- Docker y Docker Compose (para despliegue con contenedores)
- MongoDB 7.0 (si se ejecuta sin Docker)
- Redis 7 (si se ejecuta sin Docker)

## Instalación

### Opción 1: Desarrollo Local (sin Docker)

1. Clonar el repositorio:
```bash
git clone https://github.com/ElisonSz/Control-Equipos.git
cd Control-Equipos
git checkout control-equipos/v2
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/control-equipos
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=tu-secreto-jwt-super-seguro
JWT_EXPIRES_IN=24h
```

4. Iniciar MongoDB y Redis localmente o usar Docker Compose solo para las bases de datos:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

5. Ejecutar en modo desarrollo:
```bash
npm run dev
```

### Opción 2: Despliegue con Docker Compose (Recomendado)

1. Clonar el repositorio:
```bash
git clone https://github.com/ElisonSz/Control-Equipos.git
cd Control-Equipos
git checkout control-equipos/v2
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones (especialmente `JWT_SECRET` para producción).

3. Construir y ejecutar todos los servicios:
```bash
docker-compose up -d --build
```

Esto iniciará:
- MongoDB en el puerto 27017
- Redis en el puerto 6379
- La aplicación en el puerto 4000

4. Crear usuario admin inicial:
```bash
docker-compose exec app node dist/scripts/seed.js
```

**Credenciales por defecto del admin:**
- Email: `admin@control-equipos.com`
- Password: `admin123456`

Puedes cambiar estas credenciales usando las variables de entorno `ADMIN_EMAIL` y `ADMIN_PASSWORD` en el archivo `.env`.

5. Ver logs:
```bash
docker-compose logs -f app
```

6. Detener servicios:
```bash
docker-compose down
```

Para detener y eliminar volúmenes:
```bash
docker-compose down -v
```

## Estructura del Proyecto

```
src/
├── config/           # Configuraciones (database, redis, logger, swagger)
├── controllers/      # Controladores HTTP
├── dto/             # Data Transfer Objects (validación)
├── middleware/      # Middlewares (auth, validation, error handling)
├── models/          # Modelos de Mongoose
├── repositories/   # Repositorios (acceso a datos)
├── routes/          # Rutas de Express
├── services/        # Lógica de negocio
├── types/           # Tipos TypeScript y enums
└── server.ts        # Punto de entrada de la aplicación
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión

### Usuarios
- `GET /api/users` - Listar usuarios (Admin/Operativo)
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario (Admin)
- `PUT /api/users/:id` - Actualizar usuario (Admin)
- `DELETE /api/users/:id` - Eliminar usuario (Admin)

### Equipos
- `GET /api/equipment` - Listar equipos
- `GET /api/equipment/available` - Listar equipos disponibles
- `GET /api/equipment/:id` - Obtener equipo por ID
- `POST /api/equipment` - Crear equipo (Admin/Operativo)
- `PUT /api/equipment/:id` - Actualizar equipo (Admin/Operativo)
- `DELETE /api/equipment/:id` - Eliminar equipo (Admin)

### Reservas
- `GET /api/reservations` - Listar reservas (Admin/Operativo)
- `GET /api/reservations/my-reservations` - Mis reservas (Cliente)
- `GET /api/reservations/pending` - Reservas pendientes (Admin/Operativo)
- `GET /api/reservations/:id` - Obtener reserva por ID
- `POST /api/reservations` - Crear reserva
- `PUT /api/reservations/:id` - Actualizar reserva (Admin/Operativo)
- `POST /api/reservations/:id/cancel` - Cancelar reserva

### Tickets
- `GET /api/tickets/:reservationId` - Generar ticket PDF

### Métricas
- `GET /api/metrics` - Obtener métricas (Admin/Operativo)

### Chat
- `POST /api/chat` - Enviar mensaje
- `GET /api/chat/my-messages` - Mis mensajes
- `GET /api/chat/conversation/:receiverId` - Conversación con usuario
- `GET /api/chat/support` - Mensajes de soporte (Admin/Operativo)

## Documentación Swagger

Una vez iniciado el servidor, accede a la documentación interactiva en:
```
http://localhost:4000/api-docs
```

## WebSockets

### Eventos del Cliente

#### Reservas
- `subscribe:reservations` - Suscribirse a actualizaciones de reservas (Operativo/Admin)
- `unsubscribe:reservations` - Desuscribirse de actualizaciones

#### Chat
- `chat:message` - Enviar mensaje
- `chat:join` - Unirse a una sala
- `chat:leave` - Salir de una sala

### Eventos del Servidor

#### Reservas
- `reservation:new` - Nueva reserva creada
- `alert:new-reservation` - Alerta de nueva reserva (Operativo/Admin)
- `reservations:update` - Actualización de lista de reservas

#### Chat
- `chat:message` - Mensaje recibido
- `chat:message:sent` - Confirmación de mensaje enviado
- `chat:support` - Mensaje de soporte (Operativo/Admin)
- `chat:error` - Error en chat

## Testing

Ejecutar tests:
```bash
npm test
```

Ejecutar tests en modo watch:
```bash
npm run test:watch
```

Generar reporte de cobertura:
```bash
npm run test:coverage
```

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar versión compilada
- `npm test` - Ejecutar tests
- `npm run lint` - Ejecutar linter
- `npm run lint:fix` - Corregir errores de linting

## Roles de Usuario

### Cliente
- Ver equipos disponibles
- Crear reservas
- Ver sus propias reservas
- Generar tickets de sus reservas
- Usar chat de soporte

### Operativo
- Todas las funciones de Cliente
- Ver todas las reservas
- Actualizar estado de reservas
- Gestionar equipos
- Ver métricas
- Recibir alertas de nuevas reservas
- Responder en chat de soporte

### Admin
- Todas las funciones de Operativo
- Gestionar usuarios
- Ver todas las métricas
- Eliminar equipos y usuarios

## Estados de Equipos

- `disponible` - Equipo disponible para alquiler
- `reservado` - Equipo reservado
- `danado` - Equipo dañado
- `en_mantenimiento` - Equipo en mantenimiento

## Estados de Reservas

- `pendiente` - Reserva pendiente de confirmación
- `confirmada` - Reserva confirmada
- `entregada` - Equipo entregado
- `devuelta` - Equipo devuelto
- `cancelada` - Reserva cancelada

## Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `4000` |
| `MONGODB_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/control-equipos` |
| `REDIS_HOST` | Host de Redis | `localhost` |
| `REDIS_PORT` | Puerto de Redis | `6379` |
| `REDIS_PASSWORD` | Contraseña de Redis (opcional) | - |
| `JWT_SECRET` | Secreto para JWT | - |
| `JWT_EXPIRES_IN` | Expiración del token JWT | `24h` |

## Producción

Para producción, asegúrate de:

1. Cambiar `JWT_SECRET` a un valor seguro y único
2. Configurar `NODE_ENV=production`
3. Usar MongoDB y Redis con autenticación
4. Configurar HTTPS
5. Revisar y ajustar límites de rate limiting
6. Configurar backups de base de datos
7. Monitorear logs y métricas

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

ISC

## Autor

ElisonSz
