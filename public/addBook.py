from json import dump
import sys

name = sys.argv[1]
url = sys.argv[2]
image = sys.argv[3]

with open("server_backend/data/books/" + name + ".json", "w") as file: 
  dump({
    "name": name,
    "url": url,
    "image": image,
    "watchers": []
  }, file, indent="\t", sort_keys=True)

print(name)