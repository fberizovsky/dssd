# Dependecias

Tener java 17.
Instalar desde: https://www.oracle.com/ar/java/technologies/downloads/#jdk17-windows
Tener Node.js y npm
Instalar desde: https://nodejs.org/en


# Iniciar el Proyecto

Para iniciar el backend correr el siguiente comando:
    
    ```
    ./mvnw spring-boot:run
    ```
Para iniciar el frontend correr los siguientes comandos:

    ```
    cd frontend/dssd-frontned
    npm install (para instalar dependencias)
    npm run dev

    ```


## Endpoints

El proyecto tiene los siguientes endpoints:

1. **GET http://localhost:8080/api/colectas**
    - Descripción: Este endpoint devuelve una lista de colectas.
    - Ejemplo de respuesta:
        ```json
            [
                {
                    "id": 1,
                    "items": [
                    {
                        "id": 1,
                        "nombre": "Hierro",
                        "cantidad": 5
                    },
                    {
                        "id": 2,
                        "nombre": "Cartón",
                        "cantidad": 3
                    },
                    {
                        "id": 3,
                        "nombre": "Cobre",
                        "cantidad": 10
                    }
                    ]
                }
        ]
        ```

2. **POST http://localhost:8080/api/colectas**
    - Descripción: Este endpoint crea un nueva colecta.
    - Ejemplo de solicitud:
        ```json
        {
            "items": [
                {
                "nombre": "Hierro",
                "cantidad": 5
                },
                {
                "nombre": "Cartón",
                "cantidad": 3
                },
                {
                "nombre": "Cobre",
                "cantidad": 10
                }
            ]
        }
        ```
