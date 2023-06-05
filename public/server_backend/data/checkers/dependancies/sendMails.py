from os.path import dirname
from os import getcwd
from json import load
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def getEmail(watcher):
  with open(getcwd() + f"/../login/{watcher}.json") as file:
    return load(file)["email"]
  
def getApi():
  with open(getcwd() + "/../mail_api_key.txt") as file:
    return file.read()

def sendMails(fiction_name, fiction_url, next_chapter_url, unsub, data):
  sg = SendGridAPIClient(getApi())
  watchers = data["watchers"]
  with open(dirname(__file__) + "/newChapterMail.html") as file:
    mail = file.read()
  
  mail = mail.replace("FICTION_NAME", fiction_name).replace("FICTION_URL", fiction_url).replace("FICTION_CHAPTER_URL", next_chapter_url).replace("UNSUBSCRIBE_URL", unsub)

  print(f"\nsending Mails for '{fiction_name}' to: ")

  for watcher in watchers:
    print("\t", watcher, end="\t\t\t");
    message = Mail(
        from_email='Book Next Chapter Notifier <denanu.pandovah@gmail.com>',
        to_emails=f'{watcher} <{getEmail(watcher)}>',
        subject=f'A new chapter of {fiction_name} is available',
        html_content=mail)

    try:
        sg.send(message)
    except Exception as e:
        print(e.message)
    
    print("done")
  
  print("all messages sent")