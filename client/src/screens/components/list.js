import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export const List = (props) => {
    if (props.items && props.search && props.items.length === 0) {
        return (
            <p className="empty-items-message">Seems like there are no synonims for this word!
                You can add them in Add page.</p>
        )
    }
    else return (
        <ListGroup className="list-items">
            {props.items
                && props.items.map(item =>
                    <ListGroupItem
                        className="list-item"
                        key={item}>
                        {item}
                    </ListGroupItem>)
            }
        </ListGroup>
    )
}