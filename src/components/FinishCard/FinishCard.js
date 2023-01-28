import { Grid, Segment } from "semantic-ui-react";
import "./style.css";

const FinishCard = () => {
  return (
    <Segment stacked padded className="finishSegment">
      <Grid>
        <Grid.Row className="centered">
          <h1 className="test">All done!</h1>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default FinishCard;
