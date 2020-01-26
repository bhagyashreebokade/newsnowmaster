import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

class DashboardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=45b42b4a800c4b6cb7da2ce682ad6866&pageSize=100")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result :: ',result);
          this.setState({
            isLoaded: true,
            items: result.articles
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  
  render() {
    console.log('render :: ',this.state);
    // <li key={item.name}>
    //           {item.name} {item.price}
    //         </li>
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map((item,idx) => (
            // <li key={idx}>
              <Card key={idx} style={{display: 'inline-block'}} className="col-sm-4">
              <CardImg top width="100%" src={item.urlToImage} alt={item.title} />
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
                <Button>Read Full Story</Button>
              </CardBody>
            </Card>
          // </li>
          ))}
        </div>
      );
    }
  }
}

export default DashboardContent;