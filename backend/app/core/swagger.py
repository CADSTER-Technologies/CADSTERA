import os
import json


def generate_swagger(app):
    """Generate Swagger documentation from Flask routes."""
    swagger_template = {
        "swagger": "2.0",
        "info": {
            "title": "PDF Comparator API",
            "description": "API to compare two PDF files and highlight differences.",
            "version": "1.0.0"
        },
        "paths": {},
    }
    
    print("Creating 'docs' directory...", app.url_map)
    
    # Extract routes from Flask app
    if hasattr(app, 'url_map'):
        print("Creating 'docs' directory...", app.url_map)
        for rule in app.url_map.iter_rules():
            endpoint = str(rule)
            methods = [m for m in rule.methods if m not in ["OPTIONS", "HEAD"]]

            if endpoint.startswith("/static"):  # Ignore static files
                continue

            swagger_template["paths"][endpoint] = {
                method.lower(): {"summary": f"Endpoint: {endpoint}"}
                for method in methods
            }

    # Ensure 'docs' directory exists - FIXED INDENTATION
    docs_dir = r"..\docs"
    
    if not os.path.exists(docs_dir):
        print("Creating 'docs' directory...")
        os.makedirs(docs_dir)  # Create the directory if it doesn't exist
   
    # Save Swagger JSON
    with open(os.path.join(docs_dir, "swagger.json"), "w") as f:
        json.dump(swagger_template, f, indent=4)

    return swagger_template  # Return JSON data instead of just writing a file
