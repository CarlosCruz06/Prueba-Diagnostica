# Florista API

## Tecnologías Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose

## Requisitos Previos
1. Tener Node.js instalado en tu máquina. [Descargar Node.js](https://nodejs.org)
2. Tener MongoDB instalado y corriendo localmente o utilizar una instancia de MongoDB en la nube (por ejemplo, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

## Instalación

1. Clona este repositorio:
    ```bash
    git clone <url_del_repositorio>
    ```

2. Entra en el directorio del proyecto:
    ```bash
    cd florista-api
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Configura la conexión a la base de datos:
    - Si utilizas MongoDB local, asegúrate de que MongoDB esté corriendo en `localhost:27017` y que la base de datos se llame `florista`. Si utilizas MongoDB Atlas o cualquier otro servicio, ajusta la cadena de conexión en el archivo `app.js`:
      ```javascript
      mongoose.connect('mongodb://localhost:27017/florista', { useNewUrlParser: true, useUnifiedTopology: true })
      ```

## Uso

### Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
