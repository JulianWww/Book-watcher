import * as React from 'react';
import { AppBar, Button, Container, Grid, Link, List, ListItem, Tab, Tabs, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateButton from './NavitageButton';
import { IToken } from 'denanu-login';


export var setMainMenuHidden: ( val: boolean ) => void = (val: boolean) => {}

interface DesktopContainerProps extends IToken {
  children?: React.ReactNode;
}
/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const pages: string[] = [
  "About",
  "Book-List"
]

function getLoc(url: string) {
  const [,base] = url.split("/", 2);
  return pages.indexOf(base);
}

export var lastUrl = "/Book-List";

function DesktopContainer(props: DesktopContainerProps) {
  const nav = useNavigate();
  const loc = useLocation();
  var idx = getLoc(loc.pathname);
  if (idx === -1) {
    idx = getLoc(lastUrl);
  }
  else {
    lastUrl = loc.pathname;
  }


  return (
      <AppBar>
        <Toolbar>
          <Tabs value={idx} sx={{ flexGrow: 1, alignSelf: 'flex-end' }}>
            {
              pages.map((val: string)=> <Tab key={val} label={val.replace("-", " ")} onClick={()=>nav("/" + val)}/>)
            }
          </Tabs>
          <>
            {props.token ?
              <>
                <Button onClick={(e) => props.setToken(undefined)}>
                  Log Out
                </Button>
                <p style={{ marginLeft: '0.5em' }}>
                  Logged in as {props.token.username}
                </p>
              </>
              :
              <>
                <NavigateButton url="/login">
                  Log in
                </NavigateButton>
                <NavigateButton url="/signup" style={{ marginLeft: '0.5em' }}>
                  Sign up
                </NavigateButton>
              </>
            }
          </>
        </Toolbar>
      </AppBar>
    )
}

interface ResponsiveContainerProps extends DesktopContainerProps{
  children?: React.ReactNode;
}

// <MobileContainer>{children}</MobileContainer>

class MainMenu extends React.Component<ResponsiveContainerProps, {}>{

  render = () => (
        <DesktopContainer token={this.props.token} setToken={this.props.setToken}>{}</DesktopContainer>
  )
}

export default MainMenu;

const REPO_LINK = 'https://github.com/MunFgz/FgzMun';
export function Footer(props: {}) {
  const nav = useNavigate();

  return (
  <div style={{ padding: '5em 0em' }}>
    <Container>
      <Grid container justifyContent="space-around">
        <Grid item>
          <h3 content="About" />
          <List>
            <ListItem>
              <Link href={REPO_LINK}>
                Source
              </Link>
            </ListItem>
            <ListItem>
              <Link href={REPO_LINK + "/blob/master/LICENSE"}>
                License
              </Link>
            </ListItem>
            <ListItem>
              <Link onClick={()=>nav("/About")}>
                Dataprotection
              </Link>
            </ListItem>
            <ListItem>
              <Link href={REPO_LINK + "/issues"}>
               Issues
              </Link>
            </ListItem>
            {/* <List.Item as="a">Contact Us</List.Item> TODO */}
          </List>
        </Grid>
        <Grid item>
          <p>
            <b>
              Julian Wandhoven
            </b>
            <br/>
            Schlössliweg 5
            <br />
            8044 Zürich
            <br/>
            Schweiz
            <br/>
            <br/>
            <b>
              E-Mail: 
            </b> Jwandhoven@gmail.com
            <br/>
            <b>
              Telefon:
            </b> +41762102508
            <br/>
            <b>
              Internet:
            </b> https://mun.fgz.ch
            <br/>
          </p>
        </Grid>
      </Grid>
    </Container>
  </div>
)}