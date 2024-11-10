# Frontend de la Aplicación Web de Alimentación

Este proyecto es la interfaz de usuario de una aplicación web de alimentación, desarrollada en Next.js, que permite gestionar ingredientes, recibir recomendaciones de recetas personalizadas y generar planes alimenticios. El frontend está desplegado en Netlify y se conecta con un backend en Django, que proporciona los datos a través de una API.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para construir aplicaciones web.
- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework CSS para estilos rápidos y adaptables.
- **Axios**: Librería para hacer solicitudes HTTP.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **JWT**: JSON Web Tokens para manejo de autenticación (frontend maneja tokens en el almacenamiento local).

## Estructura de Carpetas

- **src/app**: Contiene las diferentes páginas y secciones de la aplicación.
  - **admin**: Módulo de administración para gestionar usuarios y otros servicios.
  - **categorias**: Gestión de categorías.
  - **dieta**: Gestión de dietas.
  - **ingredientes**: Módulo de ingredientes.
  - **login**: Autenticación de usuarios.
  - **no-access**: Página de acceso denegado para usuarios sin permisos.
  - **planes-alimenticios**: Gestión de planes alimenticios personalizados.
  - **recetas**: Sección de recetas con opciones de visualización y edición.
  - **register**: Registro de nuevos usuarios.
  - **welcome**: Pantalla de bienvenida.

- **src/components**: Componentes reutilizables de la aplicación.
  - `FormInput.tsx`: Componente de entrada de formulario.
  - `LoginForm.tsx`: Componente de formulario de inicio de sesión.
  - `RegisterForm.tsx`: Componente de formulario de registro.

- **src/config**: Configuración de la API.
  - `apiConfig.ts`: Define los endpoints de la API para conectar con el backend.

- **src/utils**: Utilidades y funciones auxiliares.

## Configuración de API (`src/config/apiConfig.ts`)

Este archivo contiene las URL de los endpoints necesarios para interactuar con el backend. Algunas de las rutas configuradas son:

- **Usuarios**: `/api/users/`, `/api/users/register/`
- **Categorías**: `/api/categorias/`, `/api/categorias/crear/`
- **Dietas**: `/api/dietas/`, `/api/dietas/agregar/`
- **Ingredientes**: `/api/ingredientes/`, `/api/ingredientes/agregar/`
- **Planes Alimenticios**: `/api/planes-alimenticios/`, `/api/planes-alimenticios/agregar/`
- **Recetas**: `/api/recetas/`, `/api/recetas/agregar/`

## Configuración del Proyecto

### Requisitos

Es necesario tener instalado **Node.js** en una versión compatible, así como un gestor de paquetes, ya sea **npm** o **yarn**.

### Instalación

1. Clonar el repositorio y ubicarse en la carpeta del proyecto.
2. Instalar las dependencias definidas en el archivo `package.json`.
3. Configurar las variables de entorno en un archivo `.env.local` en la raíz del proyecto. Asegurarse de definir `NEXT_PUBLIC_API_BASE_URL` para especificar la URL base de la API.
4. Iniciar el servidor de desarrollo para trabajar en modo local.
5. Compilar la aplicación para producción y desplegarla en el servidor.

## Scripts Disponibles

- `dev`: Inicia el servidor de desarrollo de Next.js.
- `build`: Compila el proyecto para producción.
- `start`: Inicia el servidor en modo producción.
- `lint`: Ejecuta ESLint para comprobar el código.

## Estilos

Este proyecto utiliza **Tailwind CSS** para una rápida personalización de estilos y adaptabilidad en distintas pantallas.

## Despliegue

El frontend está desplegado en Netlify. Es importante configurar el `NEXT_PUBLIC_API_BASE_URL` en las variables de entorno de Netlify para asegurar una conexión adecuada con el backend.

## Funcionalidades del Frontend

- **Autenticación y autorización**: Permite el inicio de sesión de usuarios y controla el acceso basado en roles (usuario o administrador).
- **Manejo de CRUD**:
  - **Usuarios**: Los administradores pueden gestionar los usuarios desde la interfaz de administración.
  - **Categorías**: CRUD completo para categorías.
  - **Dietas**: Permite ver y crear dietas.
  - **Ingredientes**: CRUD completo para los ingredientes disponibles.
  - **Planes alimenticios**: Creación y gestión de planes alimenticios personalizados.
  - **Recetas**: Permite agregar, editar, eliminar y ver recetas, incluyendo recomendaciones personalizadas basadas en ingredientes disponibles.

## Notas Adicionales

Este README se enfoca exclusivamente en el frontend de la aplicación. Si deseas detalles sobre el backend, consulta el README correspondiente en el repositorio del backend.
