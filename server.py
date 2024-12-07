import os
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("Landing.html")

class PageHandler(tornado.web.RequestHandler):
    def get(self, page_name):
        self.render(page_name)

def make_app():
    files_path = os.path.join(os.path.dirname(__file__), "Files")
    
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/Pages/(.*)", PageHandler),
        (r"/Files/(.*)", tornado.web.StaticFileHandler, {'path': files_path}),
    ],
    template_path=os.path.join(os.path.dirname(__file__), "Pages"))

if __name__ == "__main__":
    app = make_app()
    app.listen(29999)
    print("Server is running at http://localhost:29999/")
    tornado.ioloop.IOLoop.current().start()
