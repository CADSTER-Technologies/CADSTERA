window.onload = function() {
    const ui = SwaggerUIBundle({
      url: "/swagger.json",  // Load your Swagger spec
      dom_id: "#swagger-ui",
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout"
    });
  };