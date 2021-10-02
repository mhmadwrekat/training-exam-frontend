import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataApi: []
        }
      }
      componentDidMount = () => {
        console.log(BACKEND_URL);
        Axios.get(`https://${BACKEND_URL}/data`).then(res => {
          this.setState({ dataApi: res.data })
        })
      }
      handleSubmit = (name, img, level) => {
        console.log('WORKED',name,img,level);
        let config = {
          method: "POST", baseURL:`https://${BACKEND_URL}`, url: "/create",
          data: {
            name: name,
            img: img,
            level: level
          }
        }
        Axios(config);
      }
    render() {
        return (
            <div class="row">
                {console.log('API',this.props.dataApi)}
                {this.state.dataApi.map(item => {
                    return <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Text>
                                    {item.level}
                                </Card.Text>
        <Button onClick={()=>this.handleSubmit(item.name , item.img , item.level)} variant="danger">Favorite</Button>
                            </Card.Body>
                        </Card>
                    </>
                })
                }
            </div>
        )
    }
}
export default Main