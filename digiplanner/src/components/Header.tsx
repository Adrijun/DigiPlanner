import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../SassComponents/Header.scss';
import { Link } from 'react-router-dom';
import PostItICon from '../assets/icons/notes.png';
import PriorityIcon from '../assets/icons/prioritize.png';
function Header() {
  return (
    <>
      <Container
        fluid
        className="headerContainer d-flex justify-content-center align-items-center"
      >
        <Row className="headerRow w-100">
          <Col className="headerCol text-right col-12">
            <h1 className="headerTitle text-center">DigiPlanner</h1>
            <h2 className="headerUnderTitle text-center ">
              Empowering Productivity
            </h2>
          </Col>
        </Row>
      </Container>

      <section className="navbar d-flex justify-content-start align-items-center">
        <Link to={'/postit'} className="ms-4">
          <img src={PostItICon} alt="" width="40" height="40" />
        </Link>
        <Link to={'/priority'} className="ms-4">
          <img src={PriorityIcon} alt="" width="40" height="40" />
        </Link>
        <Col className="col-12">
          <Row>
            <span className="underline  "></span>
          </Row>
        </Col>
      </section>
    </>
  );
}

export default Header;
