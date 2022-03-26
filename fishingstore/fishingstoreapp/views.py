import json
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest


def index(request: HttpRequest):
    # list of all endpoints
    endpoints = [
        {
            "name": "add_product",
            "method": "POST",
            "url": "/add_product",
            "description": "add a new product to the database"
        },
        {
            "name": "get_products",
            "method": "GET",
            "url": "/get_products",
            "description": "get all products from the database"
        },
        {
            "name": "add_mockup_products",
            "method": "GET",
            "url": "/add_mockup_products",
            "description": "add mockup products to the database"
        },
        {
            "name": "create_table",
            "method": "GET",
            "url": "/create_table",
            "description": "create the database"
        }
    ]

    # returning endpoints as JSON with indentation
    return HttpResponse(json.dumps(endpoints, indent=4), content_type="application/json")


# endpoint receiving product as POST in JSON format and writing it to SQLite database
def add_product(request: HttpRequest):
    import json
    import sqlite3
    if request.method == "POST":
        data = json.loads(request.body)
        name = data["name"]
        price = data["price"]
        description = data["description"]
        image = data["image"]
        with sqlite3.connect("fishingstore.db") as connection:
            cursor = connection.cursor()
            cursor.execute(
                "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
                (name, price, description, image)
            )
        return HttpResponse(status=201)
    return HttpResponse(status=400)


# endpoint returing products with ids from database in JSON format
def get_products(request: HttpRequest):
    import sqlite3
    import json
    with sqlite3.connect("fishingstore.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
    return HttpResponse(json.dumps(products, indent=4), content_type="application/json")


# endpoint adding 3 mockup fishingrod products to database
def add_mockup_products(request: HttpRequest):
    import sqlite3
    with sqlite3.connect("fishingstore.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
            ("Fishing Rod", "10", "A fishing rod", "fishingrod.jpg")
        )
        cursor.execute(
            "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
            ("Fishing Line", "5", "A fishing line", "fishingline.jpg")
        )
        cursor.execute(
            "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
            ("Fishing Hook", "5", "A fishing hook", "fishinghook.jpg")
        )
    return HttpResponse(status=201)

# endpoint creating table Products in SQLite database
def create_table(request: HttpRequest):
    import sqlite3
    with sqlite3.connect("fishingstore.db") as connection:
        cursor = connection.cursor()
        cursor.execute("""CREATE TABLE products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        )""")
    return HttpResponse(status=201)
