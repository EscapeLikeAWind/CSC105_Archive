import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardText, CardTitle, CardBody, CardImg, Breadcrumb, BreadcrumbItem,
        Button, Modal, ModalBody, ModalHeader, Label, Row, Col, CardImgOverlay } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ModalOpen: false
      };
      this.togglemodalopen = this.togglemodalopen.bind(this);
    }
  
    togglemodalopen() {
      this.setState({
        ModalOpen: !this.state.ModalOpen
      });
    }
  
    handleSubmit(values) {
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
  
    render() {
      return (
        <div>
          <Button outline onClick={this.togglemodalopen}>
            <span className="fa fa-pencil" /> Submit Comment
          </Button>
          <Modal isOpen={this.state.ModalOpen} toggle={this.togglemodalopen}>
            <ModalHeader toggle={this.togglemodalopen}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <Col md={{ size: 12 }}>
                    <Control.select
                      model=".rating"
                      name="rating"
                      className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={12}>
                    Your Name
                  </Label>
                  <Col md={12}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{required,minLength: minLength(3),maxLength: maxLength(15)}}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: " Wow ! your name is incredibly short like a domain ! XD",
                        maxLength: " Such a big name ..... is it a firname really ??"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={12}>
                    Comment
                  </Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows={5}
                      className="form-control"/>
                  </Col>
                </Row>
                <Button type="submit" value="submit" color="primary">
                  Submit Feedback
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
}

function RenderDish({dish}) {

        if(dish != null) {
            
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay> </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );

        } else {
            return(
                <div></div>
            );
        }

}

function RenderComments({comments, addComment, dishId}) {

        if(comments != null) {

            const comment = comments.map((comment) =>{
                return(
                    <div key={comment.id} className='list-unstyled m-3'>
          <li className="mb-1">{comment.comment}</li>
          <li className="mb-1">-- {comment.author}, {
            new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
              .format(new Date(Date.parse(comment.date)))}
          </li>
        </div>
                )
            })

            return(
                <div className="col-12 col-md-5 m-1">
                    <h4> Comments </h4>
                    {comment}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )

        } else {
            return (
                <div></div>
            );
        }

}

const Dishdetail = (props) => {

        if(props.dish != null) {

            return(
                <div className="container">

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>

                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                      addComment={props.addComment}
                      dishId={props.dishId}
                    />
                </div>
                
                </div>
            )

        }

}

export default Dishdetail;