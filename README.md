# GraphQL API
Este proyecto es una GraphQL API que tambíen implementa Sequelize para comunicarse con MySQL, además de JWT para la gestión de sesiones, la interfaz es un empaquetado de Angular, consulta el repositorio [aquí](https://github.com/KernelWar/angular-graphql "aquí")  o mira el [demo](https://angular-graphql.vercel.app "demo").

### Configuración
En la ruta `/environments` contiene las variables de entorno, en el archivo `environment.dev.ts` configure `host`, `port`, `user`, `password` y `database_name` por default se mira así:
```javascript
const environment = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database_name: 'db_graphql',
    production: false,
}
module.exports = {
    environment
}
```

### Como empezar de forma local
- Cree una base de datos de MySQL de forma local teniendo en cuenta la variable de entorino `database_name`
- Desde su terminal preferida estando en la raiz del proyecto ejecute `npm install`
- Si todo va bien, ejecute `npm run dev` para abrir el proyecto en un navegador en modo **DESARROLLO**
- El comando anterior ejecutará la creación de las tablas y si lo prefiere ejecute de forma manual la inserción de datos contenida en el archivo `inserts.sql`, la contraseña para todos los usuarios es `qwerty123`
- Para iniciar el proyecto ejecute `npm run dev` por default se despliega en el `puerto 4000`
#### Nota: 
- La interfaz que se carga con este proyecto se conecta al servidor en **producción** por lo que si requiere el uso de forma local se recomienda usar el proyecto de angular como frond principal de esa forma podra usar la interfaz de desarrollo con la base de datos de producción

### Producción
- En el archivo `environment/environment.prod.ts` se muestran las variables de producción, para ejecutar el proyecto usando la base de datos de **PRODUCCIÓN** ejecute `npm run start`
