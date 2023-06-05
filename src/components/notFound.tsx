import * as React from 'react';

interface Props {
  item: string;
  id: string;
}

interface State {
}

export class NotFound extends React.PureComponent<Props, State> {
  componentDidMount() {
    const { item, id } = this.props;
    console.info(`${item} with ID ${id} could not be found`);
  }

  render() {
    const { item, id } = this.props;
    return (
      <>Not Found</>
    );
  }
}