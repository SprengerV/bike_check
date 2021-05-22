import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

const cats = ['All', 'Mountain', 'Road', 'Gravel', 'Touring', 'BMX', 'Commuter', 'Custom Builds', 'Vintage'];

const SideBar = (props) => {

  return (
  <Col xs="2">
    <Card>
      <Card.Header className="categoryHeader">
          Categories
      </Card.Header>
      <Card.Body>
        { cats.map((cat, i) =><> 
          <Button key={ i } variant="light">{ cat }</Button><br></br>
        </>)}
      </Card.Body>
    </Card>
  </Col>
  );
}

export default SideBar;