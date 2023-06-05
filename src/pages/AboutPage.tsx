import { useNavigate } from 'react-router-dom';
import { Container, Link, Typography } from "@mui/material";

interface Props {

}

export default function AboutPage(pros: Props) {
  const nav = useNavigate();

  return <Container>
    <Typography
      component="h1"
      variant="h2"
      align="center"
      gutterBottom
    >
      Book Watcher
    </Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>
      Keep track of your favorit Webnovels
    </Typography>

    The book watcher allows you to keep track of when your favorit webnovels have new chapters available. When watching a book you will be informed within one houre of a new chapter becomming available by E-Mail. 
    You of course may stop watching any book at anytime or unsubscribe from all of them at one. We will not send you any E-Mails, that are not related to books you are watching or required for authentification (login).
    <br/>
    Please report any issues or requests <Link href="">here</Link>.

    <Typography variant="h4" align="center" sx={{mt:2}}>
      Getting Started
    </Typography>
    To get started <Link onClick={()=>nav("/login")}>create an account</Link>. Then confirm your E-Mail. With that done you are all ready to go. Just go to the <Link onClick={()=>nav("/Book-List")}>"Book List"</Link> tab and switch the watch button to on for the books you want to watch.

    <Typography variant="h4" align="center" sx={{mt:2}}>
      User Agreement
    </Typography>
    This is an free service. We do not use any trackers save those neded for authentication and then only if remember me is clicked. We try to keep all of your data safe and provide the best service possible. However we do not take responsibility for any databreaches or problems. Use this at your own risk. 

  </Container>
}