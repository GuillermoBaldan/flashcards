import {
  faCirclePlay,
  faPlay,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@components/Card/Card";

export default function Home() {
  return (
    <main>
      <Row className="d-flex gap-3 h-100">
        <Col>
        <Card>
          <h2 className="subtitle">Java</h2>
        </Card>
        </Col>
        <Col>
        <Card>
          <div className="d-flex align-items-start gap-4">
            <h2 className="subtitle">Juega Ya!</h2>
            <FontAwesomeIcon className="subtitle" icon={faPlayCircle} />
          </div>
          <div></div>
        </Card>
        </Col>
        <Col className="d-flex flex-column gap-3">
          <Card></Card>
          <Card>card</Card>
        </Col>
      </Row>
    </main>
  );
}
