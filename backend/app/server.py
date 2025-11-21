import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from logging import config
from api.routes import users, items


# Define port
HOST = config.HOST
PORT = config.PORT

# API Router mapping
routes = {
    "/users": users.router,
    "/items": items.router,
}

class SimpleAPIHandler(BaseHTTPRequestHandler):
    """Custom HTTP Server Handler for API Requests"""

    def do_GET(self):
        """Handle GET Requests"""
        if self.path in routes:
            response = routes[self.path].router(1)  # Example user_id=1
            self._send_response(200, response)
        else:
            self._send_response(404, {"error": "Not Found"})

    def do_POST(self):
        """Handle POST Requests"""
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length).decode("utf-8")
        try:
            data = json.loads(post_data)
            response = {"message": "Data received", "data": data}
            self._send_response(200, response)
        except json.JSONDecodeError:
            self._send_response(400, {"error": "Invalid JSON"})

    def _send_response(self, status_code, data):
        """Send JSON response"""
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

# Start server
def run_server():
    """Run the HTTP server"""
    print(f"Starting API Server at http://{HOST}:{PORT}")
    server = HTTPServer((HOST, PORT), SimpleAPIHandler)
    server.serve_forever()

if __name__ == "__main__":
    run_server()
