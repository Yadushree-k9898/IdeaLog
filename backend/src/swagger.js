// swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Taking API",
      version: "1.0.0",
      description: "API documentation for the Note Taking App",
    },
    servers: [
      { url: "http://localhost:5000/api" }, 
    ],
  },
 
  apis: ['./**/routes/*.js']

};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
