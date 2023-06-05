from dependancies import royalroadapi as api, sendMails, buildUnsubscribe
import sys


def updateRoyalRoal(data, filePath):
  update = data["updater"]
  id = update["id"]

  fiction = api.get_fiction_object(id)
  
  lastChapter = api.get_chapter_links(fiction)[-1]
  if (lastChapter != update["last_chapter"]):
    sendMails(
      api.get_fiction_title(fiction),
      api.get_fiction_base_url(id),
      api.get_fiction_chapter_url(lastChapter),
      buildUnsubscribe(filePath),
      data
    )

  update["last_chapter"] = lastChapter
  return data