import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IBookList } from '../api/books';
import loadBooks from '../api/books';
import BookCard from '../components/books/BookCard';
import { IToken } from 'denanu-login';

interface Props extends IToken {

}

interface State {
  books: IBookList;
}


export default class Album extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount(): void {
    loadBooks(books => this.setState({ books: books }), this.props.token);
  }

  render() {
    const { books } = this.state;

    return (<>
      <Box
        sx={{
          pt: 6,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Select Book to Watch
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Select a Book to start monitoring for new chapters.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {
            books.map(book => 
                <BookCard {...book} {...this.props} key={book.name}/>
              )
          }
        </Grid>
      </Container>
      </>
    );
  }
}