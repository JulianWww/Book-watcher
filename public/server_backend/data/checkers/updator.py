from os import listdir, getcwd, chdir
from os.path import isfile, join, dirname, abspath
from json import load, dump
from royalRoad import updateRoyalRoal

abspath = abspath(__file__)
dname = dirname(abspath)
chdir(dname)

bookPath = getcwd() + "/../books"

for filePath in [join(bookPath, f) for f in listdir(bookPath) if isfile(join(bookPath, f))]:
  with open(filePath) as file:
    data = load(file)
  
  if data["updater"]["type"] == "royalRoad":
    updateRoyalRoal(data, filePath)
  
  #with open(filePath, "w") as file:
  #  dump(data, file, indent="\t", sort_keys=True)


print("done running updator")