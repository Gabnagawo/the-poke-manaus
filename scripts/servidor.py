import http.server
import mimetypes
import os
import socketserver

PORT = 3005
DIRECTORY = os.path.abspath(".next-export")

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("application/manifest+json", ".webmanifest")
mimetypes.add_type("text/plain", ".txt")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Clean URL handling for static export (e.g. /privacidade -> /privacidade.html or /privacidade/index.html)
        path = self.path.split("?")[0].split("#")[0]
        local_path = os.path.join(DIRECTORY, path.lstrip("/"))
        
        if not os.path.exists(local_path) and not os.path.splitext(local_path)[1]:
            if os.path.exists(local_path + ".html"):
                self.path = path + ".html"
            elif os.path.exists(os.path.join(local_path, "index.html")):
                self.path = os.path.join(path, "index.html")
            else:
                # 404 page
                if os.path.exists(os.path.join(DIRECTORY, "_not-found.html")):
                    self.path = "/_not-found.html"
                elif os.path.exists(os.path.join(DIRECTORY, "404.html")):
                    self.path = "/404.html"

        return super().do_GET()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving {DIRECTORY} at http://localhost:{PORT}")
    httpd.serve_forever()
