from flask import Flask, render_template

app = Flask(__name__)

PROJECTS = [
    {
        "id": 1,
        "title": "Plant Disease Detection System",
        "description": "AI-based system using MobileNetV2 to detect plant diseases with high accuracy and provide remedies.",
        "image": "images/plant-disease.jpg",
        "link": "https://satyam079-dr-plant.hf.space/",
        "category": "ML",
        "featured": True
    },
    {
        "id": 2,
        "title": "Sales Dashboard",
        "description": "Interactive dashboard analyzing sales trends and performance using data visualization tools.",
        "image": "images/sales-dashboard.jpg",
        "link": "https://public.tableau.com/views/SalesCustomerDashboard_17388425315190/CustomerDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
        "category": "Dashboards",
        "featured": True
    },
    {
        "id": 3,
        "title": "Decathlon Sales & Customer Analytics Dashboard",
        "description": "An interactive Excel dashboard analyzing multi-year (2024-2026) sales and customer data for a retail sports brand, with drill-down capability by month and year.",
        "image": "images/excel-dashboard.jpg",
        "link": "https://lnkd.in/p/dXc_xJjq",
        "category": "Dashboards",
        "featured": False
    },
    {
        "id": 4,
        "title": "",
        "description": "Interactive Power BI dashboard delivering sales, customer segmentation, and logistics intelligence across $2.26M in retail transactions.",
        "image": "images/superstore.png",
        "link": "https://lnkd.in/p/dMmadZNn",
        "category": "Dashboards",
        "featured": True
    },
    #     {
    #     "id": 5,
    #     "title": "testing101",
    #     "description": "This is just for testing puprose.",
    #     "image": "images/churn-prediction.jpg",
    #     "link": "#",
    #     "category": "WebApp",
    #     "featured": False
    # }
]

def get_home_projects(limit=3):
    featured = [p for p in PROJECTS if p.get("featured")]
    if len(featured) < limit:
        remaining = [p for p in PROJECTS if p not in featured]
        featured += remaining
    return featured[:limit]

def get_categories():
    return sorted(set(p["category"] for p in PROJECTS))

@app.route("/")
def home():
    return render_template(
        "index.html",
        projects=get_home_projects(3),
        active="home"
    )

@app.route("/projects")
def projects():
    return render_template(
        "projects.html",
        projects=PROJECTS,
        categories=get_categories(),
        active="projects"
    )

if __name__ == "__main__":
    app.run(debug=True)