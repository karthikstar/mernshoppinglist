import React, {Component} from 'react';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import {CSSTransition, TransitionGroup} from 'react-transition-group';


import {connect} from 'react-redux'; // allows us to basically get state into a react component 
import {getItems,deleteItem} from '../actions/itemActions';

import PropTypes from 'prop-types';


class ShoppingList extends Component {
    static propTypes = {
        getItems:PropTypes.func.isRequired,
        item:PropTypes.object.isRequired,
        isAuthenticated:PropTypes.bool
    };

    componentDidMount(){
        this.props.getItems();
    } // runs when the component mounts
    
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };

    render(){
        const {items} = this.props.item;

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className = "shopping-list">
                        {items.map(({_id,name}) => (
                            <CSSTransition key = {_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? 
                                        <Button className="remove-btn" 
                                            color = "danger" 
                                            size="sm" 
                                            onClick={this.onDeleteClick.bind(this,_id)} >&times;
                                    </Button> : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
// &times gives the cross symbol for delete button
}


const mapStateToProps = (state) => ({
    item:state.item,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
// connect will take in 2 params
// mapStateToProps basically maps the state to this component