import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

const cats = ['All', 'Mountain', 'Road', 'Gravel', 'Touring', 'BMX', 'Commuter', 'Custom Builds', 'Vintage'];

const SideBar = (props) => {
  const select = (event) => {
    props.func(event.target.innerHTML.toLowerCase());
   
  }
  return (
    <Card>
      <Card.Header className="categoryHeader">
          Categories
      </Card.Header>
      <Card.Body>
        { cats.map((cat, i) =><> 
          <Button onClick={ select } key={ i } variant="light">{ cat }</Button><br></br>
        </>)}
      </Card.Body>
    </Card>
  );
}

export default SideBar;