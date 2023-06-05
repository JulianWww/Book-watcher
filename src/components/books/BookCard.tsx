import { Card, CardActions, CardMedia, Grid } from "@mui/material";
import { IBook, setWatchingbook } from "../../api/books";
import IOSSwitch from "../utility/IOSSwitch";
import { IToken } from "denanu-login";
import { ChangeEvent, useState } from "react";

interface Props extends IBook, IToken {
}


export default function BookCard(props: Props) {
  const { token, image, watching, name } = props;

  const [ isWatching, setIsWatching ] = useState(watching);

  return <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        image={ image }
      />
      <CardActions>
        <IOSSwitch sx={{mr:1}} defaultChecked={watching} disabled={!token} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setIsWatching(!isWatching);
          setWatchingbook(name, !isWatching, token);
        }}/> Watch
      </CardActions>
    </Card>
  </Grid>
}