from wget import download
from os import listdir, remove
from os.path import dirname, basename, splitext, join, isfile
from dependancies.sendMails import sendMails

dir = dirname(__file__) + "/dynamic/"

#for file in [join(dir, f) for f in listdir(dir) if isfile(join(dir, f)) and f != "__init__.py"]:
#  remove(file)
#
#download("https://raw.githubusercontent.com/EL-S/RoyalRoadAPI/master/royalroadlapi.py", dir + "royalroadapi.py")
#print("\n\n")


import dependancies.dynamic.royalroadapi as royalroadapi

def buildUnsubscribe(filePath):
  return "https://wandhoven.ddns.net/book-watcher/unsubscribe/" + splitext(basename(filePath))[0]


__all__ = ["royalroadapi", "sendMails", "buildUnsubscribe"]

