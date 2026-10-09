import yaml

with open("_data/tools.yml", "r") as f:
    projects = yaml.safe_load(f)

projects.sort(key=lambda item: item["title"].casefold())

with open("_data/tools.yml", "w") as f:
    yaml.safe_dump(
        projects,
        f,
        sort_keys=False,
        allow_unicode=True,
        default_flow_style=False
    )
