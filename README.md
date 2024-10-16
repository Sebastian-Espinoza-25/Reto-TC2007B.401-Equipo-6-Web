# Reto-TC2007B.401-Equipo-6-Web
### Integrantes del Equipo

- [Julio Cesar Vivas Medina](https://github.com/Dino-Julius)                  - A01749879
- [Sebastián Espinoza Farías](https://github.com/Sebastian-Espinoza-25)       - A01750311
- [Manuel Olmos Antillón](https://github.com/molmos14)                        - A01750748
- [Ulises Jaramillo Portilla](https://github.com/Ulises-JPx)                  - A01798380
- [Jesús Ángel Guzmán Ortega](https://github.com/XxCppSlayerxX)               - A01799257


## Descripción del Proyecto

Esta es una aplicación web desarrollada con **React**. Está diseñada para ser un **panel de control** interactivo con múltiples herramientas para la gestión de usuarios, productos, pedidos, socios y publicaciones. La aplicación está contenedorizada utilizando **Docker** para facilitar su despliegue. **ES UNA VERSIÓN DEMO/EJEMPLO DE LA APP**.

## Contenidos del Proyecto

### Estructura del Proyecto

- **public/**: Contiene el archivo `index.html` y otros recursos públicos como imágenes.
- **src/**: Código fuente de la aplicación React.
   - **index.js**: Punto de entrada principal.
   - **App.js**: Componente principal que gestiona la estructura de la aplicación.
   - **components/**: Componentes modulares organizados por funcionalidad:
      - **OrderTools/**: Gestión de pedidos (`Orders.jsx`, `OrderTable.jsx`).
      - **DashboardTools/**: Panel de administración (`Dashboard.jsx`).
      - **PostsTools/**: Gestión de publicaciones (`Posts.jsx`, `PostForm.jsx`).
      - **UserTools/**: Gestión de usuarios (`Users.jsx`, `UserTable.jsx`).
      - **PartnerTools/**: Gestión de socios (`Partners.jsx`, `PartnerForm.jsx`).
      - **Sidebar/**: Barra lateral de navegación (`Sidebar.jsx`).
      - **LoginTools/**: Herramientas de autenticación (`LoginForm.jsx`).
      - **ProfileTools/**: Gestión de perfil de usuario (`Profile.jsx`, `ProfileView.jsx`).
      - **ProductTools/**: Gestión de productos (`Products.jsx`, `ProductForm.jsx`).
   - **styles/**: Estilos CSS específicos para los componentes.

- **Dockerfile**: Archivo de configuración para contenedorización.
- **package.json**: Detalles de dependencias y scripts del proyecto.
- **.git/**: Carpeta de control de versiones con Git.

## Dependencias

Este proyecto utiliza las siguientes dependencias clave:

- **React 18**: Framework de JavaScript para construir interfaces de usuario.
- **Material UI (@mui/material)**: Componentes estilizados para una interfaz de usuario consistente.
- **ApexCharts & Chart.js**: Bibliotecas para crear gráficos interactivos.
- **Framer Motion**: Animaciones para componentes.
- **React Router Dom**: Gestión de rutas dentro de la aplicación.
- **dotenv**: Manejo de variables de entorno.

## Instalación

### Requisitos

- **Node.js** (v14 o superior)
- **Docker** (si se desea ejecutar con Docker)

### Instalación Manual

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/usuario/proyecto-web.git
   cd proyecto-web
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Accede a la aplicación en `http://localhost:3001`.

### Ejecución con Docker

Si prefieres usar Docker:

1. Construye la imagen Docker:
   ```bash
   docker build -t proyecto-web .
   ```

2. Inicia un contenedor con la imagen:
   ```bash
   docker run -p 3001:3001 proyecto-web
   ```

3. Abre `http://localhost:3001` en tu navegador.

## Uso

La aplicación proporciona varias herramientas interactivas para la gestión de usuarios, productos, pedidos, socios y publicaciones. Puedes navegar entre estas secciones usando la barra lateral.

## Personalización

Los componentes y estilos se pueden modificar dentro de la carpeta `src/`. Usa **Prettier** para mantener el código formateado correctamente.

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama.
3. Envía un pull request para revisión.