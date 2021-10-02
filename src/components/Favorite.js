import React, { Component } from 'react';
import Axios from 'axios';
import {
    Card, Button, Form, Row, Col, InputGroup, FormControl, FloatingLabel
} from 'react-bootstrap';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = { dataDB: [], showUpdate: false, ids: '', name: '', img: '', level: '' }
    }
    componentDidMount = () => {
        console.log(BACKEND_URL);
        Axios.get(`https://${BACKEND_URL}/DBdata`).then(res => {
            this.setState({ dataDB: res.data })
        })
    }
    handleDelete = (id) => {
        let ID = id;
        let config = { method: "DELETE", baseURL: `https://${BACKEND_URL}`, url: `/delete/${ID}`, }
        Axios(config).then(response => { this.setState({ dataDB: response.data }) })
    }
    handleNAME = (event) => { this.setState({ name: event.target.value }); }
    handleIMG = (event) => { this.setState({ img: event.target.value }); }
    handleLEVEL = (event) => { this.setState({ level: event.target.value }); }
    handleUpdate = (id, name, img, level) => {
        this.setState({
            ids: id,
            name: name,
            img: img,
            level: level,
            showUpdate: true
        })
    }
    handleUpdateForm = (id) => {
        let ID = id;
        let config = {
            method: "PUT",
            baseURL: `https://${BACKEND_URL}`,
            url: `/update/${ID}`,
            data: { name: this.state.name, img: this.state.img, level: this.state.level }
        }
        Axios(config).then(response => { this.setState({ dataDB: response.data }) });
    }
    render() {
        return (
            <>
                {!this.state.showUpdate ? <br></br> :
                    <Form onSubmit={() => this.handleUpdateForm(this.state.ids)}>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                    Name
                    </Form.Label>
                      <Form.Control id="inlineFormInputName" placeholder={this.state.name} onChange={this.handleNAME} />
                            </Col>
                            <Col sm={3} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                    Username
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>@</InputGroup.Text>
             <FormControl id="inlineFormInputGroupUsername" placeholder={this.state.img} onChange={this.handleIMG} />
                                </InputGroup>
                            </Col>
                            <Col sm={2} className="my-1">
<FloatingLabel onChange={this.handleLEVEL} controlId="floatingTextarea" label={this.state.level} className="mb-3">
                                    <Form.Control as="textarea" />
                                </FloatingLabel>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button variant="success" type="submit">UPDATE ✔️</Button>
                            </Col>
                        </Row>
                    </Form>
                }
                <div class="row">
                    {console.log('DB', this.state.dataDB)}
                    {this.state.dataDB.map(item => {
                        return <>
                            <Card style={{ width: '18rem' }}>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Text>
                                        {item.level}
                                    </Card.Text>
                        <Button variant="danger" onClick={() => this.handleDelete(item._id)}>Delete</Button>{' '}
{' '}<Button variant="success" onClick={() => this.handleUpdate(item._id, item.name, item.img, item.level)}>Update</Button>
                                </Card.Body>
                            </Card>
                        </>
                    })
                    }
                </div>
            </>
        )
    }
}
export default Favorite